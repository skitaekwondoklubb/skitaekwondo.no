using System.Collections.Generic;
using System.Configuration;
using Microsoft.Extensions.Configuration;
using NUnit.Framework;
using SkiTKD.Data.Interfaces;
using SkiTKD.Data.Models;
using SkiTKD.Data.Repositories;

namespace SkiTKD.Test
{
    public class Tests
    {
        private IConfiguration configuration;
        private IVinterleirRepository _repo;

        [SetUp]
        public void Setup()
        {
            InitConfiguration();
            _repo = new VinterleirRepository(configuration);
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
        public void GetCurrent()
        {
            Assert.Pass();
        }
        
        [Test]

        public void TestSingleRegistration()
        {
            var testRegistration = new VinterleirRegistration {
                FirstName = "Taekwondo",
                LastName = "Taekwondosen",
                Age = 42,
                Club = "Ski Taekwondo Klubb",
                Grade = "10. Dan",
                Email = "taekwondo@sted.no",
                Gradering = true,
                HasLedsager = false,
                Allergies = "Ingen",
                OrderId = "123",
                PaymentMethod = "Vipps",
                Ledsagere = new List<Ledsager>(),
                OtherInfo = "",
                Sleepover = true,
                Telephone = "81549300",
                Vegan = true
            };

            var f = _repo.AddRegistrationToExcel(testRegistration).GetAwaiter().GetResult();
            Assert.IsTrue(f);
        }

        [Test]

        public void TestLedsagerRegistration()
        {
            var testRegistration = new VinterleirRegistration {
                FirstName = "Taekwondo",
                LastName = "Taekwondosen",
                Age = 42,
                Club = "Ski Taekwondo Klubb",
                Grade = "10. Dan",
                Email = "taekwondo@sted.no",
                Gradering = true,
                HasLedsager = true,
                Allergies = "Ingen",
                OrderId = "123",
                PaymentMethod = "Vipps",
                Ledsagere = new List<Ledsager> {
                    new Ledsager {
                        Id = 1,
                        FirstName = "Ledsager",
                        LastName = "Ledsagersen",
                        Age = 42,
                        AlreadyRegistered = false,
                        Email = "ledsager@ledsagersen.no",
                        Sleepover = true,
                        Telephone = "88888888",
                        PaymentMethod = "Vipps",
                        OrderId = "123"
                    }
                },
                OtherInfo = "Ikke så mye",
                Sleepover = true,
                Telephone = "81549300",
                Vegan = true
            };

            var f = _repo.AddRegistrationToExcel(testRegistration).GetAwaiter().GetResult();
            Assert.IsTrue(f);
        }
    }
}