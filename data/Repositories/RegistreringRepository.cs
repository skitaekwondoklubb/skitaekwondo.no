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

namespace SkiTKD.Data.Repositories
{
    public class RegistreringRepository : IRegistreringRepository
    {
        private readonly string _clientId;
        private readonly string _user;
        private readonly string _path;
        private readonly string _password;
        private IGraphTokenService _tokenService;

        public RegistreringRepository(IConfiguration config, IGraphTokenService graphService) {
            _clientId = config["ClientId"];
            _user = config["ExcelUser"];
            _path = config["RegistrationPath"];
            _password = config["Pass"];
            _tokenService = graphService;
        }

        public async Task<bool> AddRegistrationToExcel(Registration registration)
        {
            var registrationEndpoint = $"https://graph.microsoft.com/v1.0/me/drive/root:{_path}:/workbook/tables/Table1/rows/add";

            string[][] regData = { registration.ConvertToExcel() }; // Only one.
            var succeeded = await SendToExcel(registrationEndpoint, regData);

            if(succeeded) {
                SendEmail(registration);
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

        public bool SendEmail(Registration reg) {
            int total = 800 + (reg.Pizza.Equals("Vil ikke ha pizza") ? 0 : 80);

            SmtpClient smtpClient = new SmtpClient("smtp-mail.outlook.com", 587);
            smtpClient.Credentials = new System.Net.NetworkCredential(_user, _password);
            smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;
            smtpClient.EnableSsl = true;
            MailMessage mail = new MailMessage(_user, reg.Email);
            mail.Subject = "Du er herved registrert til danseminar";
            mail.Body = @$"
                <h1>Takk for at du registrerte deg til danseminar!</h1>
                <p>Hei {reg.FirstName}, du er herved registrert til Ski Taekwondo Klubb sitt danseminar 22-24. oktober.<p>
                <p>Ikke glem å betale {total}kr til Vipps 15550. Husk <u><b>Navn</u></b> og <u><b>Klubb</u></b> i meldingsfeltet når du betaler.</p>
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
}
