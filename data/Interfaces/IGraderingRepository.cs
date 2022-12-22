using System;
using System.Threading.Tasks;
using SkiTKD.Data.Entities;
using SkiTKD.Data.Models;

namespace SkiTKD.Data.Interfaces
{
    public interface IGraderingRepository
    {
        GraderingRegistrationEntity AddRegistration(GraderingRegistration registration, int personId);
        GraderingRegistrationEntity FindRegistrationById(int registrationid);
        GraderingRegistrationEntity FindRegistration(int personId);
        bool Cancel(int registrationId);
    }
}
