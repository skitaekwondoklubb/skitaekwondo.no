using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SkiTKD.Data.Dto;
using SkiTKD.Data.Entities;
using SkiTKD.Data.Models;

namespace SkiTKD.Data.Interfaces
{
    public interface IVinterleirRegistrationRepository
    {
        VinterleirRegistrationEntity AddRegistration(VinterleirRegistration registration, int personId);
        VinterleirRegistrationEntity FindRegistration(int personId);
        List<PublicRegistrationDto> GetAllPublicRegistrations();
        List<PublicGradeDto> GetGradeNumbers();
        bool Cancel(int registrationId);

    }
}
