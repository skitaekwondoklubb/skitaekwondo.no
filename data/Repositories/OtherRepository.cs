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
    public class OtherRepository : IOtherRepository
    {

        private readonly SkiTKDContext _dbContext;
        public OtherRepository(
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

        public OtherRegistrationEntity AddRegistration(OtherRegistration registration, int personId)
        {
            if(personId == 0) {
                throw new System.Exception("Databasefeil: Ingen person vedlagt i registrering.");
            }

            // Find/Add registration.
            var theEntity = FindRegistration(personId);
            if(theEntity != null) {
                    if(theEntity.Payment != null) {
                        theEntity.Payment.vipps = registration.Vipps;
                    }
            }
            else {
                var mappedRegistration = new OtherRegistrationEntity {
                    personid = personId
                };

                var reg = _dbContext.Add(mappedRegistration);
                _dbContext.SaveChanges();
                theEntity = reg.Entity;
            }
         
            // Add T-shirts
            foreach (var tshirt in registration.Tshirts)
            {
                var newTshirt = new TShirtEntity {
                    registrationid = theEntity.registrationid,
                    model = tshirt.Model,
                    size = tshirt.Size
                };

                _dbContext.Add(newTshirt);
            }

            _dbContext.SaveChanges();
            return theEntity;
        }

        public OtherRegistrationEntity FindRegistrationById(int registrationid)
        {
            return _dbContext.OtherRegistrations.SingleOrDefault(x => x.registrationid == registrationid);
        }

        public OtherRegistrationEntity FindRegistration(int personId)
        {
            return _dbContext.OtherRegistrations.SingleOrDefault(x => x.personid == personId);

        }
    }
}

