using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SkiTKD.Data.Entities;
using SkiTKD.Data.Models;

namespace SkiTKD.Data.Interfaces
{
    public interface IClubRepository
    {
        ClubEntity FindClub(string name);
        ClubEntity FindClubById(int clubId);
        List<ClubEntity> GetAllClubs();
    }
}
