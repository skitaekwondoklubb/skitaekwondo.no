using System;
using System.Threading.Tasks;
using SkiTKD.Data.Entities;
using SkiTKD.Data.Models;

namespace SkiTKD.Data.Interfaces
{
    public interface IPersonRepository
    {
        PersonEntity AddPerson(
            string firstName,
            string lastName,
            int age,
            string email,
            string telephone
        );
        PersonEntity FindPerson(string firstName, string lastName, string telephone);
        PersonEntity FindPersonById(int personId);

    }
}
