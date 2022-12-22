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
    public class GraderingRepository : IGraderingRepository
    {

        private readonly SkiTKDContext _dbContext;
        public GraderingRepository(
            IConfiguration config, 
            SkiTKDContext dbContext
        ) {
          _dbContext = dbContext;
        }

        public bool Cancel(int registrationId) {
            var entity = FindRegistration(registrationId);
            entity.cancelled = true;
            _dbContext.SaveChanges();
            return true;
        }

        public GraderingRegistrationEntity AddRegistration(GraderingRegistration registration, int personId)
        {
            if(personId == 0) {
                throw new System.Exception("Databasefeil: Ingen person vedlagt i registrering.");
            }
            
            var alreadyExists = FindRegistration(personId);
            if(alreadyExists != null) {
                    if(alreadyExists.Payment != null) {
                        alreadyExists.Payment.vipps = registration.Vipps;
                    }
            }
            else {
                _dbContext.SaveChanges(); 

                var mappedRegistration = new GraderingRegistrationEntity {
                    personid = personId
                };

                var reg = _dbContext.Add(mappedRegistration);
                _dbContext.SaveChanges();
                return reg.Entity;
            }
            _dbContext.SaveChanges();
            
            return alreadyExists;
        }

        public GraderingRegistrationEntity FindRegistrationById(int registrationid)
        {
            return _dbContext.GraderingRegistrations.SingleOrDefault(x => x.registrationid == registrationid);

        }

        public GraderingRegistrationEntity FindRegistration(int personId)
        {
            return _dbContext.GraderingRegistrations.SingleOrDefault(x => x.personid == personId);

        }
    }
}

