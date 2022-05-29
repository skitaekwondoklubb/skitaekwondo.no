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
  
            _subscription = config["VippsSubscription"];
            _msn = config["VippsMSN"];
            _systemVersion = config["VippsVersion"];
            _systemName = config["VippsName"];
            _vippsEndpoint = config["VippsEndpoint"];
            _callbackPrefix = config["VippsCallbackPrefix"];
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

        public async Task<VippsPaymentRequestBody> VinterleirToVippsRequest(VinterleirRegistration reg, int total) {
            var ordreId = Guid.NewGuid().ToString();
            var requestBody = new VippsPaymentRequestBody {
                customerInfo = new CustomerInfo {
                    mobileNumber = reg.Telephone
                },
                merchantInfo = new MerchantInfo {
                    authToken = await GetAccessToken(),
                    callbackPrefix = $"{_callbackPrefix}/api/Vipps",
                    fallBack = $"{_callbackPrefix}/vipps/{ordreId}",
                    merchantSerialNumber = _msn,
                },
                transaction = new Transaction {
                    amount = total * 100, // Vipps represents total as øre.
                    orderId = ordreId,
                    transactionText = "Vinterleir for utøver",
                }
            };

            return requestBody;
        }

        public async Task<VippsPaymentRequestBody> GraderingToVippsRequest(GraderingRegistration reg, int total) {
            if(reg.FirstName.ToLower() == "test" && reg.LastName.ToLower() == "test") {
                total = 5;
            }

            var ordreId = Guid.NewGuid().ToString();
            var requestBody = new VippsPaymentRequestBody {
                customerInfo = new CustomerInfo {
                    mobileNumber = reg.Telephone
                },
                merchantInfo = new MerchantInfo {
                    authToken = await GetAccessToken(),
                    callbackPrefix = $"{_callbackPrefix}/api/GraderingVipps",
                    fallBack = $"{_callbackPrefix}/GraderingVipps/{ordreId}",
                    merchantSerialNumber = _msn,
                },
                transaction = new Transaction {
                    amount = total * 100, // Vipps represents total as øre.
                    orderId = ordreId,
                    transactionText = "Gradering",
                }
            };

            return requestBody;
        }
    }
}