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

        [SetUp]
        public void Setup()
        {
            InitConfiguration();
            _repo = new VippsRepository(configuration);
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
            var accessT = _repo.TestGetTokenResponse().GetAwaiter().GetResult();
            Assert.IsNotNull(accessT);
            Assert.IsNotEmpty(accessT.access_token);
        }

        [Test]
        public void PayUp()
        {
            var payment = new VippsPaymentRequestBody {
                CustomerInfo = new CustomerInfo {
                    MobileNumber = "93542486"
                },
                MerchantInfo = new MerchantInfo {
                    AuthToken = "",
                    CallbackPrefix = configuration["Vipps:HomePrefix"],
                    FallBack = "https://127.0.0.1/vinterleir",
                    IsApp = false,
                    MerchantSerialNumber = configuration["Vipps:MSN"]
                },
                Transaction = new Transaction {
                    Amount = 1000,
                    OrderId = "SKITKD-TEST-" + new Guid().ToString(),
                    TransactionText = "TEST BETALING TIL LEIR"
                }
            };

            var response = _repo.Payments(payment).GetAwaiter().GetResult();
            Assert.IsNotNull(response);
            Assert.IsNotEmpty(response);
        }
    }
}