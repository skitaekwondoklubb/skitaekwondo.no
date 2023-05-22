using System;
using System.Threading.Tasks;
using SkiTKD.Data.Entities;
using SkiTKD.Data.Models;

namespace SkiTKD.Data.Interfaces
{
    public interface IOtherRepository
    {
        OtherRegistrationEntity AddRegistration(OtherRegistration registration, int personId);
        OtherRegistrationEntity FindRegistrationById(int registrationid);
        OtherRegistrationEntity FindRegistration(int personId);
        bool Cancel(int registrationId);
    }
}
