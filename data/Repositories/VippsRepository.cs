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
using SkiTKD.Data.Entities;
using System.Linq;

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
        private readonly SkiTKDContext _dbContext;

        public VippsRepository(IConfiguration config, IVippsTokenService tokenService, SkiTKDContext context) {
  
            _subscription = config["VippsSubscription"];
            _msn = config["VippsMSN"];
            _systemVersion = config["VippsVersion"];
            _systemName = config["VippsName"];
            _vippsEndpoint = config["VippsEndpoint"];
            _callbackPrefix = config["VippsCallbackPrefix"];
            _vippsTokenService = tokenService;
            _dbContext = context;
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

        public async Task<VippsPaymentRequestBody> VinterleirToVippsRequest(int registrationId, string telephone, int paymentid, int total) {
            var ordreId = Guid.NewGuid().ToString();
            var requestBody = new VippsPaymentRequestBody {
                customerInfo = new CustomerInfo {
                    mobileNumber = telephone
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

            var order = new VippsEntity {
                orderid = ordreId,
                mobilenumber = requestBody.customerInfo.mobileNumber,
                amount = requestBody.transaction.amount,
                paymentid = paymentid,
                transactiontext = requestBody.transaction.transactionText,
                registrationid = registrationId,
                timestamp = DateTime.UtcNow
            };

            _dbContext.VippsOrders.Add(order);
            _dbContext.SaveChanges();

            return requestBody;
        }

        public VippsEntity FindVippsOrder(string orderId) {
            var vippsOrder = _dbContext.VippsOrders.SingleOrDefault(x => x.orderid == orderId);
            return vippsOrder;
        }

        public bool SetTransactionData(string orderId, TransactionCallbackInfo info) {
            var order = FindVippsOrder(orderId);
            order.transactionid = info.transactionId;
            order.status = info.status;
            DateTime orderTimestamp = DateTime.UtcNow;
            DateTime.TryParse(info.timeStamp, out orderTimestamp);
            order.timestamp = orderTimestamp;

            _dbContext.SaveChanges();
            return true;
        }

        public string GetStatus(string orderId)
        {
            var vipps = FindVippsOrder(orderId);
            if(vipps != null) {
                switch (vipps.status)
                {
                    case CallbackStatuses.Rejected :
                        return CallbackStatuses.Rejected;
                    case CallbackStatuses.Cancelled :
                        return CallbackStatuses.Cancelled;
                    case CallbackStatuses.Reserved :
                        return CallbackStatuses.Reserved;
                    case CallbackStatuses.Reserved_Failed:
                        return CallbackStatuses.Reserved_Failed;
                    default:
                        return null;
                }
            }
            return null;
        }

        public VippsEntity FindVippsRegistration(int registrationId)
        {
            var vipps = _dbContext.VippsOrders.SingleOrDefault(x => x.registrationid == registrationId);
            return vipps;
        }
    }
}