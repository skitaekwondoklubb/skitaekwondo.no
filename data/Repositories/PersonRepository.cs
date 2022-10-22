using System.Linq;
using SkiTKD.Data.Entities;
using SkiTKD.Data.Interfaces;

namespace SkiTKD.Data.Repositories
{
    public class PersonRepository : IPersonRepository
    {
        private readonly SkiTKDContext _dbContext;

        public PersonRepository(SkiTKDContext dbContext) {
          _dbContext = dbContext;
        }

        public PersonEntity AddPerson(Models.Person registration)
        {
            var alreadyExists = FindPerson(registration.FirstName, registration.LastName, registration.Telephone);
            if(alreadyExists != null) {
                return alreadyExists;
            }

            var newPerson = new PersonEntity {
                FirstName = registration.FirstName,
                LastName = registration.LastName,
                Age = registration.Age, 
                Email = registration.Email,
                Telephone = registration.Telephone
            };

            _dbContext.Add(newPerson);
            _dbContext.SaveChanges();
            return newPerson;
        }

        public PersonEntity FindPerson(string firstName, string lastName, string telephone) {
           var people = _dbContext.Persons.Where(x => x.FirstName.ToLower() == x.FirstName.ToLower() && x.LastName.ToLower() == x.LastName.ToLower());
           if(people.Count() > 1) {
                return people.SingleOrDefault(x => x.Telephone == telephone);
           }

           return people.First();
        }
    }
}

