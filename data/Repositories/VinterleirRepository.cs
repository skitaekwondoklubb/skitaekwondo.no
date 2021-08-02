using System;
using System.Collections.Generic;
using System.Configuration;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Graph;
using Microsoft.Identity.Client;
using Newtonsoft.Json;
using SkiTKD.Data.Interfaces;

namespace SkiTKD.Data.Repositories
{
    public class VinterleirRepository : IVinterleirRepository
    {
        private readonly string clientId;
        private readonly string clientSecret;
        private readonly string user;
        private readonly string path;
        private AuthenticationResult authenticationResult;

        public VinterleirRepository(IConfiguration config) {
            clientId = config["ClientId"];
            clientSecret = config["ClientSecret"];
            user = config["User"];
            path = config["VinterleirExcelPath"];
        }

        private async Task<string> GetToken() {
            // Check if token already is set;
            if(authenticationResult != null && authenticationResult.ExpiresOn.CompareTo(DateTimeOffset.Now) > 0) {
                return authenticationResult.AccessToken;
            }

            var clientApp = ConfidentialClientApplicationBuilder.Create(clientId)
                            .WithClientSecret(clientSecret)
                            .Build();

            var scopes = new List<string>();
            scopes.Add("https://graph.microsoft.com/.default");
            
            var token = (await clientApp.AcquireTokenForClient(scopes).ExecuteAsync());
            authenticationResult = token;

            if(token == null) {
                throw new Exception("Did not get a token from AAD.");
            }

            return token.AccessToken;
        }

        public async Task<GraphServiceClient> Login() {

            var client = new GraphServiceClient("https://graph.microsoft.com/v1.0", new DelegateAuthenticationProvider(async (requestMessage) => {
                requestMessage.Headers.Authorization = new AuthenticationHeaderValue("bearer", await GetToken());
            }));

            return client;
        }

        public async Task<string> AddInfoToExcel(string name, string address)
        {
            var f = await Login();

            var children = await f.Users[$"{user}"].Drive.Root.Children
                .Request()
                .GetAsync();

            string endpoint = $"https://graph.microsoft.com/v1.0/Users/{user}/drive/root:/{path}:/workbook/tables/Table1/rows/add";
            using (var client = new HttpClient())
            {
                using (var request = new HttpRequestMessage(HttpMethod.Post, endpoint))
                {
                    // Populate UserInfoRequest object
                    string[] userInfo = { name, address  };
                    string[][] userInfoArray = { userInfo };
                    var userInfoRequest = new TestRequest();
                    userInfoRequest.index = null;
                    userInfoRequest.values = userInfoArray;

                    // Serialize the information in the UserInfoRequest object
                    string jsonBody = JsonConvert.SerializeObject(userInfoRequest);
                    request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", await GetToken());
                    request.Content = new StringContent(jsonBody, Encoding.UTF8, "application/json");

                    using (var response = await client.SendAsync(request))
                    {
                        if (response.IsSuccessStatusCode)
                        {
                            return "Success!";
                        }
                        return response.ReasonPhrase;
                    }
                }
             }
        }
    }

    public class Test {
        public string Name { get; set; }
        public string Tast { get; set; }
        public bool SuperTest { get; set; }
    }

    public class TestRequest {
        public string index { get; set; }
        public string[][] values { get; set; }
    }
}
