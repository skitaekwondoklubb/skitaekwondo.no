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

namespace SkiTKD.Data.Repositories
{
    public class VippsTokenService : IVippsTokenService
    {
        private readonly string _clientId;
        private readonly string _clientSecret;
        private readonly string _subscription;
        private readonly string _vippsEndpoint;
        private static VippsAccessTokenResponse _vippsToken;

        public VippsTokenService(IConfiguration config) {
            _clientId = config["Vipps:ClientId"];
            _clientSecret = config["Vipps:ClientSecret"];
            _subscription = config["Vipps:Subscription"];
            _vippsEndpoint = config["Vipps:Endpoint"];
        }

        public async Task<VippsAccessTokenResponse> GetToken() {
            if(_vippsToken != null && DateTimeOffset.FromUnixTimeSeconds(_vippsToken.expires_on).UtcDateTime < DateTime.UtcNow) {
                return _vippsToken;
            }

            using (var client = new HttpClient())
            {
                using (var request = new HttpRequestMessage(HttpMethod.Post, $"{_vippsEndpoint}/accesstoken/get"))
                {
                    request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    request.Headers.Add("client_id", _clientId);
                    request.Headers.Add("client_secret", _clientSecret);
                    request.Headers.Add("Ocp-Apim-Subscription-Key", _subscription);

                    using (var response = await client.SendAsync(request))
                    {
                        if (response.IsSuccessStatusCode)
                        {
                            var responseData = await response.Content.ReadAsStringAsync();
                            var accessTokenResponse = JsonConvert.DeserializeObject<VippsAccessTokenResponse>(responseData);
                            _vippsToken = accessTokenResponse;
                            return accessTokenResponse;
                        }

                        throw new Exception($"VIPPS ACCESS TOKEN: {response.ReasonPhrase}");
                    }
                }
             }
        }
    }
}