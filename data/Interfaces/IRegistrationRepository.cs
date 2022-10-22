using System;
using System.Threading.Tasks;
using SkiTKD.Data.Entities;
using SkiTKD.Data.Models;

namespace SkiTKD.Data.Interfaces
{
    public interface IRegistrationRepository
    {
        RegistrationEntity AddRegistration(VinterleirRegistration registration, PersonEntity person);
        RegistrationEntity FindRegistration(int personId);
        bool Cancel(int registrationId);
    }
}
