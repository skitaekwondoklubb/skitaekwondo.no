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

        public PersonEntity AddPerson(
            string firstName,
            string lastName,
            int age,
            string email,
            string telephone
        )
        {
            var alreadyExists = FindPerson(firstName, lastName, telephone);
            if(alreadyExists != null) {
                return alreadyExists;
            }

            var newPerson = new PersonEntity {
                firstname = firstName,
                lastname = lastName,
                age = age, 
                email = email,
                telephone = telephone
            };

            var saved = _dbContext.Add(newPerson);
            _dbContext.SaveChanges();
            return saved.Entity;
        }

        public PersonEntity FindPerson(string firstName, string lastName, string telephone) {
           var people = _dbContext.Persons.Where(x => firstName.ToLower() == x.firstname.ToLower() && lastName.ToLower() == x.lastname.ToLower());
           if(people.Count() > 1) {
                return people.SingleOrDefault(x => x.telephone == telephone);
           }

           return people.Count() > 0 ? people.First() : null;
        }

        public PersonEntity FindPersonById(int personId)
        {
            var person = _dbContext.Persons.SingleOrDefault(x => x.personid == personId);
            return person;
        }
    }
}

