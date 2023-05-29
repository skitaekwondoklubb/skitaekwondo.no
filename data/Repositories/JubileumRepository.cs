using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using SkiTKD.Data.Dto;
using SkiTKD.Data.Entities;
using SkiTKD.Data.Interfaces;
using SkiTKD.Data.Models;

namespace SkiTKD.Data.Repositories
{
    public class JubileumRepository : IJubileumRepository
    {

        private readonly SkiTKDContext _dbContext;
        public JubileumRepository(
            IConfiguration config, 
            SkiTKDContext dbContext
        ) {
          _dbContext = dbContext;
        }

        public JubileumEntity AddRegistration(string firstName, string lastName, int adults, int children)
        {
            if(string.IsNullOrWhiteSpace(firstName) || string.IsNullOrWhiteSpace(lastName) || ((adults + children) <= 0) ) {
                throw new System.Exception("Databasefeil: Ingen personalia eller for få personer vedlagt i registrering.");
            }
            
            var mappedRegistration = new JubileumEntity {
                firstname = firstName,
                lastname = lastName,
                adults = adults,
                children = children
            };

            var reg = _dbContext.Add(mappedRegistration);

            _dbContext.SaveChanges();
            return mappedRegistration;
        }
    }
}

