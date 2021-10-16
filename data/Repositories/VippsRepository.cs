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
        private readonly string _subscription;
        private readonly string _msn;
        private readonly string _systemName;
        private readonly string _systemVersion;
        private readonly string _vippsEndpoint;
        private readonly string _callbackPrefix;
        private IVippsTokenService _vippsTokenService;

        public VippsRepository(IConfiguration config, IVippsTokenService tokenService) {
  
            _subscription = config["Vipps:Subscription"];
            _msn = config["Vipps:MSN"];
            _systemVersion = config["Vipps:System:Version"];
            _systemName = config["Vipps:System:Name"];
            _vippsEndpoint = config["Vipps:Endpoint"];
            _callbackPrefix = config["Vipps:CallbackPrefix"];
            _vippsTokenService = tokenService;
        }

        private async Task<string> GetAccessToken() {
            var token = await _vippsTokenService.GetToken();

            if(token == null) {
                throw new NullReferenceException("Klarte ikke koble til Vipps. Vi fikk ikke token fra Vipps etter forespørsel.");
            }
            
            return token.access_token;
        }

        public async Task<string> Payments(VippsPaymentRequestBody body) {

            using (var client = new HttpClient())
            {
                using (var request = new HttpRequestMessage(HttpMethod.Post, $"{_vippsEndpoint}/ecomm/v2/payments"))
                {
                    string jsonBody = JsonConvert.SerializeObject(body);
                    request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", await GetAccessToken());
                    request.Headers.Add("Merchant-Serial-Number", _msn);
                    request.Headers.Add("Vipps-System-Name", _systemName);
                    request.Headers.Add("Vipps-System-Version", _systemVersion);
                    request.Headers.Add("Ocp-Apim-Subscription-Key", _subscription);
                    request.Content = new StringContent(jsonBody, Encoding.UTF8, "application/json");

                    using (var response = await client.SendAsync(request))
                    {
                        if (response.IsSuccessStatusCode)
                        {
                            var responseData = await response.Content.ReadAsStringAsync();
                            var paymentResponse = JsonConvert.DeserializeObject<VippsPaymentResponse>(responseData);
                            return paymentResponse.url;
                        }

                        throw new Exception($"Vipps ga feilmelding: {response.ReasonPhrase} {await response.Content.ReadAsStringAsync()}");
                    }
                }
            }
        }

        public async Task<VippsPaymentRequestBody> VinterleirToVippsRequest(VinterleirRegistration reg) {
            var requestBody = new VippsPaymentRequestBody {
                customerInfo = new CustomerInfo {
                    mobileNumber = reg.Telephone
                },
                merchantInfo = new MerchantInfo {
                    authToken = await GetAccessToken(),
                    callbackPrefix = $"{_callbackPrefix}/Vipps",
                    fallBack = $"{_callbackPrefix}/vinterleir",
                    merchantSerialNumber = _msn,
                },
                transaction = new Transaction {
                    amount = 975,
                    orderId = Guid.NewGuid().ToString(),
                    transactionText = "Vinterleir for utøver",
                }
            };

            return requestBody;
        }
    }
}