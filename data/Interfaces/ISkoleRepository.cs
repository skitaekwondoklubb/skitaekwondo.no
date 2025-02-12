using System;
using System.Threading.Tasks;
using SkiTKD.Data.Entities;
using SkiTKD.Data.Models;

namespace SkiTKD.Data.Interfaces
{
    public interface ISkoleRepository
    {
        SkoleRegistrationEntity AddRegistration(SkoleRegistration registration, int personId);
        SkoleRegistrationEntity FindRegistrationById(int registrationid);
        SkoleRegistrationEntity FindRegistration(int personId);
        bool Cancel(int registrationId);
    }
}
