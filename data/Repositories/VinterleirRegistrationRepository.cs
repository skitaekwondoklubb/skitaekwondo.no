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
    public class VinterleirRegistrationRepository : IVinterleirRegistrationRepository
    {

        private readonly SkiTKDContext _dbContext;
        private readonly IGradeRepository _gradeRepo;
        private readonly IClubRepository _clubRepo;

        public VinterleirRegistrationRepository(
            IConfiguration config, 
            SkiTKDContext dbContext, 
            IGradeRepository gradeRepo, 
            IClubRepository clubRepo
        ) {
          _dbContext = dbContext;
          _gradeRepo = gradeRepo;
          _clubRepo = clubRepo;
        }
        
        public VinterleirRegistrationEntity AddRegistration(VinterleirRegistration registration, int personId) {
            if(personId == 0) {
                throw new System.Exception("Databasefeil: Ingen person vedlagt i registrering.");
            }
            
            var alreadyExists = FindRegistration(personId);

            if(alreadyExists != null) {
                    alreadyExists.clubid = registration.ClubId;
                    alreadyExists.allergies = registration.Allergies;
                    alreadyExists.gradeid = registration.GradeId;
                    alreadyExists.gradering = registration.Gradering;
                    alreadyExists.instructor = registration.Instructor;
                    alreadyExists.@public = registration.Public;
                    alreadyExists.sleepover = registration.Sleepover;
                    alreadyExists.vegan = registration.Vegan;
                    alreadyExists.otherinfo = registration.OtherInfo;
                    alreadyExists.wantstoinstruct = registration.WantsToInstruct;
            }
            else {
                var mappedRegistration = new VinterleirRegistrationEntity {
                    personid = personId,
                    clubid = registration.ClubId,
                    allergies = registration.Allergies,
                    gradeid = registration.GradeId,
                    gradering = registration.Gradering,
                    instructor = registration.Instructor,
                    @public = registration.Public,
                    sleepover = registration.Sleepover,
                    vegan = registration.Vegan,
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

        public bool Cancel(int registrationId)
        {
            var reg = _dbContext.VinterleirRegistrations.SingleOrDefault(x => x.registrationid == registrationId);
            reg.cancelled = true;
            _dbContext.SaveChanges();
            return true;
        }

        public VinterleirRegistrationEntity FindRegistration(int personId) {
            return _dbContext.VinterleirRegistrations.SingleOrDefault(x => x.personid == personId);
        } 


        public List<PublicRegistrationDto> GetAllPublicRegistrations()
        {
            var registrations =_dbContext.VinterleirRegistrations.Where(x => x.cancelled == false).Select(y => new PublicRegistrationDto {
                Name = y.@public ? $"{y.Person.firstname} {y.Person.lastname}" : "Anonym",
                Grade = y.@public ? $"{y.Grade.grade}. {PublicRegistrationDto.GetDan(y.Grade.isdan)}" : "-",
                Club = y.Club.name
            }).ToList();

            return registrations;
        }

        public List<PublicGradeDto> GetGradeNumbers()
        {
            var amount = _dbContext.VinterleirRegistrations.Where(x => x.cancelled == false).Select(y => y.gradeid).ToList();
            var grades = _gradeRepo.GetAllGrades();

            var list = new List<PublicGradeDto>();

            foreach (var grade in grades)
            {
                var totalOfThisGrade = amount.Where(x => x == grade.gradeid).Count();

                list.Add(new PublicGradeDto {
                    Amount = totalOfThisGrade,
                    Grade = new GradeDto { 
                        Grade = grade.grade,
                        GradeId  = grade.gradeid,
                        isDan = grade.isdan,
                        Name = grade.name
                    }
                });
            }

            return list;
        }
    }
}

