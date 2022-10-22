using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
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


        public RegistrationRepository(IConfiguration config, SkiTKDContext dbContext, IGradeRepository gradeRepo, IClubRepository clubRepo) {
          _dbContext = dbContext;
          _gradeRepo = gradeRepo;
          _clubRepo = clubRepo;
        }
        
        public RegistrationEntity AddRegistration(VinterleirRegistration registration, PersonEntity person) {
            if(person == null) {
                throw new System.Exception("Databasefeil: Ingen person vedlagt i registrering.");
            }

            var clubId = _clubRepo.FindClub(registration.Club).ClubId;
            var gradeId = _gradeRepo.FindGrade(registration.Grade.Grade, registration.Grade.isDan).GradeId;


            var mappedRegistration = new RegistrationEntity {
                PersonId = person.PersonId,
                ClubId = clubId,
                Allergies = registration.Allergies,
                GradeId = gradeId,
                Gradering = registration.Gradering,
                Instructor = registration.Instructor,
                Public = registration.Public,
                Sleepover = registration.Sleepover,
                Vegan = registration.Vegan,
                Vipps = registration.PaymentMethod == "Vipps",
                OtherInfo = registration.OtherInfo,
                WantsToInstruct = registration.WantsToInstruct
            };

            _dbContext.Add(mappedRegistration);

            return null;
        }

        public RegistrationEntity FindRegistration(int personId) {
            return _dbContext.Registrations.SingleOrDefault(x => x.PersonId == personId);
        } 

        public bool Cancel(int registrationId) {
            var entity = FindRegistration(registrationId);
            entity.Cancelled = true;
            _dbContext.SaveChanges();
            return true;
        }
    }
}

