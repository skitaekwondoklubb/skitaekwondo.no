using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SkiTKD.Data.Dto;
using SkiTKD.Data.Entities;
using SkiTKD.Data.Models;

namespace SkiTKD.Data.Interfaces
{
    public interface IRegistrationRepository
    {
        RegistrationEntity AddRegistration(VinterleirRegistration registration, int personId);
        RegistrationEntity FindRegistration(int personId);
        List<PublicRegistrationDto> GetAllPublicRegistrations();

        bool Cancel(int registrationId);
    }
}
