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
    public class RegistrationRepository : IRegistrationRepository
    {

        private readonly SkiTKDContext _dbContext;
        private readonly IGradeRepository _gradeRepo;
        private readonly IClubRepository _clubRepo;

        public RegistrationRepository(
            IConfiguration config, 
            SkiTKDContext dbContext, 
            IGradeRepository gradeRepo, 
            IClubRepository clubRepo
        ) {
          _dbContext = dbContext;
          _gradeRepo = gradeRepo;
          _clubRepo = clubRepo;
        }
        
        public RegistrationEntity AddRegistration(VinterleirRegistration registration, int personId) {
            if(personId == 0) {
                throw new System.Exception("Databasefeil: Ingen person vedlagt i registrering.");
            }
            
            var alreadyExists = FindRegistration(personId);
            if(alreadyExists != null) {
                    alreadyExists.personid = personId;
                    alreadyExists.clubid = registration.ClubId;
                    alreadyExists.allergies = registration.Allergies;
                    alreadyExists.gradeid = registration.GradeId;
                    alreadyExists.gradering = registration.Gradering;
                    alreadyExists.instructor = registration.Instructor;
                    alreadyExists.@public = registration.Public;
                    alreadyExists.sleepover = registration.Sleepover;
                    alreadyExists.vegan = registration.Vegan;
                    alreadyExists.vipps = registration.Vipps;
                    alreadyExists.otherinfo = registration.OtherInfo;
                    alreadyExists.wantstoinstruct = registration.WantsToInstruct;
            }
            else {
                var mappedRegistration = new RegistrationEntity {
                    personid = personId,
                    clubid = registration.ClubId,
                    allergies = registration.Allergies,
                    gradeid = registration.GradeId,
                    gradering = registration.Gradering,
                    instructor = registration.Instructor,
                    @public = registration.Public,
                    sleepover = registration.Sleepover,
                    vegan = registration.Vegan,
                    vipps = registration.Vipps,
                    otherinfo = registration.OtherInfo,
                    wantstoinstruct = registration.WantsToInstruct
                };
                _dbContext.Add(mappedRegistration);
                _dbContext.SaveChanges();
                return mappedRegistration;
            }
            _dbContext.SaveChanges();
            
            return alreadyExists;
        }

        public RegistrationEntity FindRegistration(int personId) {
            return _dbContext.Registrations.SingleOrDefault(x => x.personid == personId);
        } 

        public bool Cancel(int registrationId) {
            var entity = FindRegistration(registrationId);
            entity.cancelled = true;
            _dbContext.SaveChanges();
            return true;
        }

        public List<PublicRegistrationDto> GetAllPublicRegistrations()
        {
            var registrations =_dbContext.Registrations.Where(x => x.@public == true).Select(y => new PublicRegistrationDto {
                Name = $"{y.Person.firstname} {y.Person.lastname}",
                Club = y.Club.name
            }).ToList();

            return registrations;
        }
    }
}

