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
    public class SkoleRepository : ISkoleRepository
    {

        private readonly SkiTKDContext _dbContext;
        private readonly IPersonRepository _personRepo;

        public SkoleRepository(
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


        public SkoleRegistrationEntity AddRegistration(SkoleRegistration registration, int personId)
        {
            if(personId == 0) {
                throw new System.Exception("Databasefeil: Ingen person vedlagt i registrering.");
            }
            
            var alreadyExists = FindRegistration(personId);
            
            if(alreadyExists == null) {
                _dbContext.SaveChanges(); 


                var mappedRegistration = new SkoleRegistrationEntity {
                    personid = personId,
                    parentfirstname = registration.ParentFirstName,
                    parentlastname = registration.ParentLastName,
                    firstday = registration.FirstDay,
                    secondday = registration.SecondDay,
                    thirdday = registration.ThirdDay,
                    ismember = registration.IsMember
                };

                var reg = _dbContext.Add(mappedRegistration);
                _dbContext.SaveChanges();
                return reg.Entity;
            }
            
            return alreadyExists;
        }

        public SkoleRegistrationEntity FindRegistrationById(int registrationid)
        {
            return _dbContext.SkoleRegistrations.SingleOrDefault(x => x.registrationid == registrationid);

        }

        public SkoleRegistrationEntity FindRegistration(int personId)
        {
            return _dbContext.SkoleRegistrations.SingleOrDefault(x => x.personid == personId);

        }
    }
}

