using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
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
        private readonly string clientId;
        private readonly string user;
        private readonly string path;
        private readonly string password;
        private AuthenticationResult authenticationResult;

        public RegistreringRepository(IConfiguration config) {
            clientId = config["ClientId"];
            user = config["ExcelUser"];
            path = config["RegistrationPath"];
            password = config["Pass"];
        }

        private async Task<string> GetToken() {
            // Check if token already is set;
            if(authenticationResult != null && authenticationResult.ExpiresOn.CompareTo(DateTimeOffset.Now) > 0) {
                return authenticationResult.AccessToken;
            }

            var clientApp = PublicClientApplicationBuilder.Create(clientId)
            .WithAuthority("https://login.microsoftonline.com/organizations/")
            .Build();

            var scopes = new List<string>();
            scopes.Add("https://graph.microsoft.com/.default");
            
            var token = (await clientApp.AcquireTokenByUsernamePassword(scopes, user, new NetworkCredential("", password).SecurePassword).ExecuteAsync());
            authenticationResult = token;

            if(token == null) {
                throw new Exception("Did not get a token from AAD.");
            }

            return token.AccessToken;
        }

        public GraphServiceClient Login() {

            var client = new GraphServiceClient("https://graph.microsoft.com/v1.0", new DelegateAuthenticationProvider(async (requestMessage) => {
                requestMessage.Headers.Authorization = new AuthenticationHeaderValue("bearer", await GetToken());
            }));

            return client;
        }

        public async Task<bool> AddRegistrationToExcel(Registration registration)
        {
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
                    request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", await GetToken());
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
    }
}
