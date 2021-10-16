using System;
using System.Collections.Generic;
using System.Configuration;
using Microsoft.Extensions.Configuration;
using NUnit.Framework;
using SkiTKD.Data.Interfaces;
using SkiTKD.Data.Models;
using SkiTKD.Data.Repositories;

namespace SkiTKD.Test
{
    public class VippsTests
    {
        private IConfiguration configuration;
        private IVippsRepository _repo;
        private IVippsTokenService _tokenService;

        [SetUp]
        public void Setup()
        {
            InitConfiguration();
            _tokenService = new VippsTokenService(configuration);
            _repo = new VippsRepository(configuration, _tokenService);
        }

        public void InitConfiguration()
        {
            var config = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .AddJsonFile("appsettings.local.json")
                .Build();
            configuration = config;
        }


        [Test]
        public void GetToken()
        {
            var accessT = _tokenService.GetToken().GetAwaiter().GetResult();
            Assert.IsNotNull(accessT);
            Assert.IsNotEmpty(accessT.access_token);
        }

        [Test]
        public void PayUp()
        {
            var payment = new VippsPaymentRequestBody {
                customerInfo = new CustomerInfo {
                    mobileNumber = "93542486"
                },
                merchantInfo = new MerchantInfo {
                    authToken = "",
                    callbackPrefix = configuration["Vipps:HomePrefix"],
                    fallBack = "https://127.0.0.1/vinterleir",
                    merchantSerialNumber = configuration["Vipps:MSN"]
                },
                transaction = new Transaction {
                    amount = 1000,
                    orderId = "SKITKD-TEST-" + new Guid().ToString(),
                    transactionText = "TEST BETALING TIL LEIR"
                }
            };

            var response = _repo.Payments(payment).GetAwaiter().GetResult();
            Assert.IsNotNull(response);
            Assert.IsNotEmpty(response);
        }
    }
}