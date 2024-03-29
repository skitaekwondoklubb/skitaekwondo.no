using System.Collections.Generic;
using System.Configuration;
using System.Linq;
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
        private IGraphTokenService _tokenService;
        private IVinterleirRepository _repo;

        [SetUp]
        public void Setup()
        {
            InitConfiguration();
            _tokenService = InitGraphTokenService();
            _repo = new VinterleirRepository(configuration, _tokenService);
        }

        public void InitConfiguration()
        {
            var config = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .AddJsonFile("appsettings.local.json")
                .Build();
            configuration = config;
        }

        public IGraphTokenService InitGraphTokenService()
        {
            return new GraphTokenService(configuration);
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
                Grade = new GradeObj {
                    Color = "Hvitt",
                    Dan = false,
                    Grade = 10,
                    Name = "10. cup"
                },
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

            var f = _repo.AddRegistrationToExcel(testRegistration, null).GetAwaiter().GetResult();
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
                Grade = new GradeObj {
                    Color = "Ingen",
                    Dan = false,
                    Grade = 10,
                    Name = "Ingen grad"
                },
                Email = "taekwondo@sted.no",
                Gradering = true,
                HasLedsager = true,
                Allergies = "Ingen",
                OrderId = "123",
                PaymentMethod = "Vipps",
                Ledsagere = new List<Ledsager> {
                    new Ledsager {
                        Id = "1",
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

            var f = _repo.AddRegistrationToExcel(testRegistration, null).GetAwaiter().GetResult();
            Assert.IsTrue(f);
        }

        [Test]
        public void TestRead() {
            var f = _repo.ReadFromExcel().GetAwaiter().GetResult();
            Assert.IsNotNull(f);
        }

        [Test]
        public void TestUpdate() {
            var people = _repo.ReadFromExcel().GetAwaiter().GetResult();

            var f = _repo.UpdatePaidStatus(people.People.Last()).GetAwaiter().GetResult();
            Assert.IsNotNull(f);
        }
    }
}