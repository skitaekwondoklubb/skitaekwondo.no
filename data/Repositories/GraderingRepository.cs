using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Graph;
using Newtonsoft.Json;
using SkiTKD.Data.Interfaces;
using SkiTKD.Data.Models;
using static SkiTKD.Data.Models.VinterleirRegistration;

namespace SkiTKD.Data.Repositories
{
    public class GraderingRepository : IGraderingRepository
    {
        private readonly string clientId;
        private readonly string user;
        private readonly string path;
        private readonly string password;
        private readonly IGraphTokenService _tokenService;

        public GraderingRepository(IConfiguration config, IGraphTokenService graphToken) {
            clientId = config["ClientId"];
            user = config["ExcelUser"];
            path = config["GraderingPath"];
            password = config["Pass"];
            _tokenService = graphToken;
        }

        public async Task<bool> AddRegistrationToExcel(GraderingRegistration registration, string vippsOrderId)
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

            registration.Total = 350;

            var registrationEndpoint = $"https://graph.microsoft.com/v1.0/me/drive/root:{path}:/workbook/tables/Table1/rows/add";

            string[][] regData = { registration.ConvertToExcel() }; // Only one.
            await SendToExcel(registrationEndpoint, regData);

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

        public async Task<ExcelGraderingModel> ReadFromExcel() {
            var endpoint = $"https://graph.microsoft.com/v1.0/me/drive/root:{path}:/workbook/tables/Table1/rows";
            var read = await ReadData(endpoint);
            return read;
        }

        private async Task<ExcelGraderingModel> ReadData(string endpoint) {
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
                            var data = JsonConvert.DeserializeObject<RawGraderingExcelModel>(info);
                            return new ExcelGraderingModel(data.value);
                        }

                        throw new Exception(response.ReasonPhrase);
                    }
                }
             }
        }

        public async Task<bool> DeleteRow(GraderingExcelRow row) {
            var endpoint = $"https://graph.microsoft.com/v1.0/me/drive/root:{path}:/workbook/tables/Table1/rows/$/ItemAt(index={row.Index})";
            string[] empty = {
                "","","","",""
            };
            return await SendUpdatePaidStatus(endpoint, new GraderingExcelRow(row.Index, empty));
        }

        public async Task<bool> UpdatePaidStatus(GraderingExcelRow row) {
            var endpoint = $"https://graph.microsoft.com/v1.0/me/drive/root:{path}:/workbook/tables/Table1/rows/$/ItemAt(index={row.Index})";
            row.HasPaid = "Ja";
            return await SendUpdatePaidStatus(endpoint, row);
        }

        private async Task<bool> SendUpdatePaidStatus(string endpoint, GraderingExcelRow row) {
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

        public bool SendEmail(string firstName, string lastName, string email) {
            try {
                var f =    new GraphServiceClient(
                new DelegateAuthenticationProvider(
                    (requestMessage) =>
                    {
                        requestMessage.Headers.Authorization = new AuthenticationHeaderValue("bearer", _tokenService.GetToken().GetAwaiter().GetResult());
                        return Task.FromResult(0);
                    })
                );

                var message = new Message
                {
                    Subject = "Du er registrert til gradering",
                    Body = new ItemBody
                    {
                        ContentType = BodyType.Html,
                        Content = @$"
                            <p>Hei {firstName} {lastName}, du er herved registrert til gradering i Ski Taekwondo Klubb.<p>
                            <p>For avbestilling, ta kontakt med oss på <a href='mailto: kontakt@skitaekwondo.no'>kontakt@skitaekwondo.no</a></p>
                            <p>Med vennlig hilsen<p>
                            <p>Ski Taekwondo Klubb</p>
                        "
                    },
                    ToRecipients = new List<Recipient>()
                    {
                        new Recipient
                        {
                            EmailAddress = new EmailAddress
                            {
                                Address = email
                            }
                        }
                    }
                };
                

                f.Me.SendMail(message, null).Request().PostAsync().GetAwaiter().GetResult();
                    return true;
            }
            catch(Exception e) {
                Console.WriteLine("Klarte ikke levere mail!");
            }

            return false;
        }
    }
}

