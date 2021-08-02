using System.Configuration;
using Microsoft.Extensions.Configuration;
using NUnit.Framework;
using SkiTKD.Data.Interfaces;
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
                .Build();
            configuration = config;
        }


        [Test]
        public void GetCurrent()
        {
            Assert.Pass();
        }
        
        [Test]

        public void WriteLine()
        {
            var f = _repo.AddInfoToExcel("TEST", "EKSTRATEST").GetAwaiter().GetResult();
            Assert.AreEqual("Success", f);
        }
    }
}