using System.Collections.Generic;
using SkiTKD.Data.Dto;
using SkiTKD.Data.Entities;
using SkiTKD.Data.Models;

namespace SkiTKD.Data.Interfaces
{
    public interface INewMemberRepository
    {
        NewMemberRegistrationEntity AddRegistration(NewMemberRegistration registration, int personId); 
        List<NewMemberRegistrationDto> GetAllNewMembers();
        bool Remove(int registrationId);
        NewMemberRegistrationEntity FindRegistrationById(int registrationid);
        NewMemberRegistrationEntity FindRegistration(int personId);

        string ExportToCsv();
    }
}
