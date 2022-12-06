using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SkiTKD.Data.Entities;
using SkiTKD.Data.Models;

namespace SkiTKD.Data.Interfaces
{
    public interface ILedsagerRepository
    {
        LedsagerEntity AddLedsager(int personId, int forPersonId, int registrationId);

        LedsagerEntity FindLedsager(int personId);
        List<LedsagerEntity> FindLedsagersForPerson(int forPersonId);
    }
}
