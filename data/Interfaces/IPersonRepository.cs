using System;
using System.Threading.Tasks;
using SkiTKD.Data.Entities;
using SkiTKD.Data.Models;

namespace SkiTKD.Data.Interfaces
{
    public interface IPersonRepository
    {
        PersonEntity AddPerson(Person registration);
        PersonEntity FindPerson(string firstName, string lastName, string telephone);
    }
}
