using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SkiTKD.Data.Dto;
using SkiTKD.Data.Models;

namespace SkiTKD.Data.Interfaces
{
    public interface IVinterleirAdminRepository
    {
        List<AdminRegistrationDto> GetUsers();
        string ExportToCsv();
    }
}
