using System.Collections.Generic;
using System.Configuration;
using Microsoft.Extensions.Configuration;
using NUnit.Framework;
using SkiTKD.Data.Interfaces;
using SkiTKD.Data.Models;
using SkiTKD.Data.Repositories;

namespace SkiTKD.Test
{
    public class MailTests
    {
        private IConfiguration configuration;
        private IRegistreringRepository _repo;
        private IGraphTokenService _tokenService;

        [SetUp]
        public void Setup()
        {
            InitConfiguration();
            _tokenService = InitTokenService();
            _repo = new RegistreringRepository(configuration, _tokenService);
        }

        public void InitConfiguration()
        {
            var config = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .AddJsonFile("appsettings.local.json")
                .Build();
            configuration = config;
        }

        public IGraphTokenService InitTokenService() {
            return new GraphTokenService(configuration);
        }


        [Test]

        public void TestSendMail()
        {
            var testRegistration = new Registration {
                FirstName = "Taekwondo",
                LastName = "Taekwondosen",
                Age = 42,
                Club = "Ski Taekwondo Klubb",
                Grade = new GradeObj {
                    Color = "",
                    Dan = true,
                    Grade = 10,
                    Name = "10. Dan"
                },
                Email = "sondrehusev@gmail.com",
                Gradering = true,
                Allergies = "Ingen",
                OrderId = "123",
                PaymentMethod = "Vipps",
                OtherInfo = "",
                Sleepover = true,
                Telephone = "81549300",
                Vegan = true,
                Physical = false,
                Pizza = "Pig style",
                Theory = false
            };

            var f = _repo.SendEmail(testRegistration);
            Assert.IsTrue(f);
        }
    }
}