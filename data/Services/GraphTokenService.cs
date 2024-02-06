using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using SkiTKD.Data.Models;
using SkiTKD.Data.Interfaces;
using Microsoft.Identity.Client;
using Microsoft.Identity.Client.Extensibility;

namespace SkiTKD.Data.Repositories
{
    public class GraphTokenService : IGraphTokenService
    {
        private readonly string _clientId;
        private readonly string _user;
        private readonly string _pass;
        private AuthenticationResult authenticationResult;

        public GraphTokenService(IConfiguration config) {
            _clientId = config["ClientId"];
            _user = config["ExcelUser"];
            _pass = config["Pass"];
        }


        public async Task<string> GetToken() {
            Console.WriteLine("CHECKING TOKEN:");
            Console.WriteLine($"CLIENTID: {_clientId}");
            Console.WriteLine($"USER: {_user}");
            Console.WriteLine($"PASS: {_pass}");
            Console.WriteLine(authenticationResult.ExpiresOn);

            // Check if token already is set;
            if(authenticationResult != null && authenticationResult.ExpiresOn.CompareTo(DateTimeOffset.Now) > 0) {
                return authenticationResult.AccessToken;
            }

            var clientApp = PublicClientApplicationBuilder.Create(_clientId)
            .WithAuthority("https://login.microsoftonline.com/organizations/")
            .Build();

            var scopes = new List<string>();
            scopes.Add("https://graph.microsoft.com/.default");
            
            var token = (await clientApp.AcquireTokenByUsernamePassword(scopes, _user,  new NetworkCredential("", _pass).SecurePassword).ExecuteAsync());
            authenticationResult = token;

            if(token == null) {
                throw new Exception("Did not get a token from AAD.");
            }

            Console.WriteLine($"TOKEN OK, RETURNING... {token.AccessToken}");

            return token.AccessToken;
        }
    }
}