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
    public class VippsRepository : IVippsRepository
    {
        private readonly string clientId;
        private readonly string clientSecret;
        private readonly string subscription;
        private readonly string msn;
        private readonly string systemName;
        private readonly string systemVersion;
        private readonly string vippsEndpoint;
        private static VippsAccessTokenResponse vippsToken;

        public VippsRepository(IConfiguration config) {
            clientId = config["Vipps:ClientId"];
            clientSecret = config["Vipps:ClientSecret"];
            subscription = config["Vipps:Subscription"];
            msn = config["Vipps:MSN"];
            systemVersion = config["Vipps:System:Version"];
            systemName = config["Vipps:System:Name"];
            vippsEndpoint = config["Vipps:Endpoint"];
        }

        private async Task<VippsAccessTokenResponse> GetToken() {
            using (var client = new HttpClient())
            {
                using (var request = new HttpRequestMessage(HttpMethod.Post, $"{vippsEndpoint}/accesstoken/get"))
                {
                    request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    request.Headers.Add("client_id", clientId);
                    request.Headers.Add("client_secret", clientSecret);
                    request.Headers.Add("Ocp-Apim-Subscription-Key", subscription);

                    using (var response = await client.SendAsync(request))
                    {
                        if (response.IsSuccessStatusCode)
                        {
                            var responseData = await response.Content.ReadAsStringAsync();
                            var accessTokenResponse = JsonConvert.DeserializeObject<VippsAccessTokenResponse>(responseData);
                            vippsToken = accessTokenResponse;
                            return accessTokenResponse;
                        }

                        throw new Exception($"VIPPS ACCESS TOKEN: {response.ReasonPhrase}");
                    }
                }
             }
        }

        public async Task<VippsAccessTokenResponse> TestGetTokenResponse()
        {
            return await GetToken();
        }

        public async Task<string> Payments(VippsPaymentRequestBody body) {
            if(vippsToken == null || DateTimeOffset.FromUnixTimeSeconds(vippsToken.expires_on).UtcDateTime > DateTime.UtcNow) {
                await GetToken();
            }

            using (var client = new HttpClient())
            {
                using (var request = new HttpRequestMessage(HttpMethod.Post, $"{vippsEndpoint}/ecomm/v2/payments"))
                {
                    string jsonBody = JsonConvert.SerializeObject(body);
                    request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", vippsToken.access_token);
                    request.Headers.Add("Merchant-Serial-Number", msn);
                    request.Headers.Add("Vipps-System-Name", systemName);
                    request.Headers.Add("Vipps-System-Version", systemVersion);
                    request.Headers.Add("Ocp-Apim-Subscription-Key", subscription);
                    request.Content = new StringContent(jsonBody, Encoding.UTF8, "application/json");

                    using (var response = await client.SendAsync(request))
                    {
                        if (response.IsSuccessStatusCode)
                        {
                            var responseData = await response.Content.ReadAsStringAsync();
                            var paymentResponse = JsonConvert.DeserializeObject<VippsPaymentResponse>(responseData);
                            return paymentResponse.Url;
                        }

                        throw new Exception($"VIPPS ACCESS TOKEN: {response.ReasonPhrase}");
                    }
                }
            }
        }
    }
}