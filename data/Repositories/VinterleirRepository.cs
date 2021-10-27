using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Mail;
using System.Security;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Graph;
using Microsoft.Identity.Client;
using Newtonsoft.Json;
using SkiTKD.Data.Interfaces;
using SkiTKD.Data.Models;
using static SkiTKD.Data.Models.VinterleirRegistration;

namespace SkiTKD.Data.Repositories
{
    public class VinterleirRepository : IVinterleirRepository
    {
        private readonly string clientId;
        private readonly string user;
        private readonly string path;
        private readonly string password;
        private readonly IGraphTokenService _tokenService;

        public VinterleirRepository(IConfiguration config, IGraphTokenService graphToken) {
            clientId = config["ClientId"];
            user = config["ExcelUser"];
            path = config["VinterleirPath"];
            password = config["Pass"];
            _tokenService = graphToken;
        }

        public async Task<bool> AddRegistrationToExcel(VinterleirRegistration registration, string vippsOrderId)
        {
            if(!string.IsNullOrEmpty(vippsOrderId)) {
                registration.OrderId = vippsOrderId;
                registration.PaymentMethod = "Vipps";
                registration.HasPaidYet = false;
            }
            else {
                registration.OrderId = "";
                registration.PaymentMethod = "Kort";
                registration.HasPaidYet = false;
            }

            // Add a ID to the ledsager.
            if(registration.HasLedsager) {
                foreach (var ledsager in registration.Ledsagere)
                {
                    ledsager.Id = Guid.NewGuid().ToString().Substring(0, 4);
                }
            }

            registration.Total = GetTotal(registration);

            var registrationEndpoint = $"https://graph.microsoft.com/v1.0/me/drive/root:{path}:/workbook/tables/Table1/rows/add";
            var ledsagerEndpoint = $"https://graph.microsoft.com/v1.0/me/drive/root:{path}:/workbook/tables/Table2/rows/add";

            string[][] regData = { registration.ConvertToExcel() }; // Only one.
            await SendToExcel(registrationEndpoint, regData);

            if(registration.HasLedsager) {
                foreach (var ledsager in registration.Ledsagere)
                {
                    if(!string.IsNullOrEmpty(vippsOrderId)) {
                        ledsager.OrderId = vippsOrderId;
                        ledsager.PaymentMethod = "Vipps";
                    }
                    else {
                         ledsager.OrderId = "";
                        ledsager.PaymentMethod = "Kort";
                    }
                }

                string[][] ledsagerReg = registration.ConvertLedsagereToExcel();
                await SendToExcel(ledsagerEndpoint, ledsagerReg);
            }

            return true;
        }

        // Data is a matrix in an excel sheet. 
        public async Task<bool> SendToExcel(string endpoint, string[][] data) {
            using (var client = new HttpClient())
            {
                using (var request = new HttpRequestMessage(HttpMethod.Post, endpoint))
                {
                    var userInfoRequest = new ExcelRequest();
                    userInfoRequest.index = null;
                    userInfoRequest.values = data;

                    // Serialize the information in the UserInfoRequest object
                    string jsonBody = JsonConvert.SerializeObject(userInfoRequest);
                    request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", await _tokenService.GetToken());
                    request.Content = new StringContent(jsonBody, Encoding.UTF8, "application/json");

                    using (var response = await client.SendAsync(request))
                    {
                        if (response.IsSuccessStatusCode)
                        {
                            return true;
                        }

                        throw new Exception(response.ReasonPhrase);
                    }
                }
             }
        }

        public async Task<ExcelModel> ReadFromExcel() {
            var endpoint = $"https://graph.microsoft.com/v1.0/me/drive/root:{path}:/workbook/tables/Table1/rows";
            var read = await ReadData(endpoint);
            return read;
        }

        private async Task<ExcelModel> ReadData(string endpoint) {
            using (var client = new HttpClient())
            {
                using (var request = new HttpRequestMessage(HttpMethod.Get, endpoint))
                {
                    request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", await _tokenService.GetToken());

                    using (var response = await client.SendAsync(request))
                    {
                        if (response.IsSuccessStatusCode)
                        {
                            var info = await response.Content.ReadAsStringAsync();
                            var data = JsonConvert.DeserializeObject<RawExcelModel>(info);
                            return new ExcelModel(data.value);
                        }

                        throw new Exception(response.ReasonPhrase);
                    }
                }
             }
        }

        public async Task<bool> DeleteRow(ExcelRow row) {
            var endpoint = $"https://graph.microsoft.com/v1.0/me/drive/root:{path}:/workbook/tables/Table1/rows/$/ItemAt(index={row.Index})";
            string[] empty = {
                "","","","","","","","","","","","","","","","","","",""
            };
            return await SendUpdatePaidStatus(endpoint, new ExcelRow(row.Index, empty));
        }

        public async Task<bool> UpdatePaidStatus(ExcelRow row) {
            var endpoint = $"https://graph.microsoft.com/v1.0/me/drive/root:{path}:/workbook/tables/Table1/rows/$/ItemAt(index={row.Index})";
            row.HasPaid = "Ja";
            return await SendUpdatePaidStatus(endpoint, row);
        }

        private async Task<bool> SendUpdatePaidStatus(string endpoint, ExcelRow row) {
            using (var client = new HttpClient())
            {
                using (var request = new HttpRequestMessage(HttpMethod.Patch, endpoint))
                {
                    var userInfoRequest = new ExcelUpdateRequest();
                    string[][] data = { row.ConvertToExcel() };
                    userInfoRequest.values = data;

                    // Serialize the information in the UserInfoRequest object
                    string jsonBody = JsonConvert.SerializeObject(userInfoRequest);
                    request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", await _tokenService.GetToken());
                    request.Content = new StringContent(jsonBody, Encoding.UTF8, "application/json");

                    using (var response = await client.SendAsync(request))
                    {
                        if (response.IsSuccessStatusCode)
                        {
                            return true;
                        }

                        throw new Exception(response.ReasonPhrase);
                    }
                }
             }
        }

        public int GetTotal(VinterleirRegistration reg) {
            if(reg.LastName.ToLower().Equals("test")) {     // Only for us to test.
                return 10;
            }

            var total = 975;

            if(reg.Age <= 12) {
                total -= 150;
            }
            
            if(reg.Instructor == InstructorType.SkiFullTimeInstructor) {
                total = 0;
            }
            else if(reg.Instructor == InstructorType.SkiHelperInstructor) { 
                total -= 475;
            }

            if(reg.Gradering == true && reg.Grade?.Dan == false && reg.Grade.Grade != 1) {
                total += 350;
            }

            foreach (var item in reg.HasLedsager ? reg.Ledsagere : new List<Ledsager>())
            {
                if(!item.AlreadyRegistered) {
                    total += 500;
                }
            }

            if(total < 0) { // So that no one manages to fuck with the data to be negative.
                total = 0;
            }

            return total;
        }

        public bool SendEmail(string firstName, string lastName, string email) {
            SmtpClient smtpClient = new SmtpClient("smtp-mail.outlook.com", 587);
            smtpClient.Credentials = new System.Net.NetworkCredential(user, password);
            smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;
            smtpClient.EnableSsl = true;
            MailMessage mail = new MailMessage(user, email);
            mail.Subject = "Du er herved registrert til vinterleir";
            mail.Body = @$"
                <h1>Takk for at du registrerte deg til vinterleir!</h1>
                <p>Hei {firstName} {lastName}, du er herved registrert til Ski Taekwondo Klubbs vinterleir 2021.<p>
                <p>For avbestilling, ta kontakt med oss på <a href='mailto: kontakt@skitaekwondo.no'>kontakt@skitaekwondo.no</a></p>
                <p>Med vennlig hilsen<p>
                <p>Ski Taekwondo Klubb</p>
            ";
            mail.BodyEncoding = System.Text.Encoding.UTF8;
            mail.IsBodyHtml = true;
            try {
                smtpClient.Send(mail);
                return true;
            }
            catch {
                Console.WriteLine("Klarte ikke levere mail!");
            }

            return false;
        }
    }

    public class ExcelRequest {
        public string index { get; set; }
        public string[][] values { get; set; }
    }


    public class ExcelUpdateRequest {
        public string[][] values { get; set; }
    }
}
