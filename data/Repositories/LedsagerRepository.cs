using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using SkiTKD.Data.Entities;
using SkiTKD.Data.Interfaces;

namespace SkiTKD.Data.Repositories
{
    public class LedsagerRepository : ILedsagerRepository
    {
        private readonly SkiTKDContext _dbContext;
        private readonly IPersonRepository _personRepo;

        public LedsagerRepository(SkiTKDContext dbContext, IPersonRepository personRepo) {
          _dbContext = dbContext;
          _personRepo = personRepo;
        }

        public LedsagerEntity AddLedsager(int personId, int forPersonId, int registrationId)
        {
            if(_personRepo.FindPersonById(personId) == null || _personRepo.FindPersonById(forPersonId) == null) {
                throw new System.Exception("Persons are missing from the db. Cannot add ledsager on unknown person.");
            }

            var entity = new LedsagerEntity {
                forpersonid = forPersonId,
                personid = personId,
                registrationid = registrationId
            };

            _dbContext.Add(entity);
            _dbContext.SaveChanges();

            return entity;
        }

        public LedsagerEntity FindLedsager(int personId)
        {
            var ledsager = _dbContext.Ledsagere.SingleOrDefault(x =>  x.personid == personId);
            return ledsager;
        }

        public List<LedsagerEntity> FindLedsagersForPerson(int forPersonId)
        {
            var ledsagere = _dbContext.Ledsagere.Where(x => x.forpersonid == forPersonId);
            return ledsagere.ToList();
        }
    }
}

