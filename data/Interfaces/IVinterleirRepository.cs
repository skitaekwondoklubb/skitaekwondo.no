using System;
using System.Threading.Tasks;
using SkiTKD.Data.Models;

namespace SkiTKD.Data.Interfaces
{
    public interface IVinterleirRepository
    {
        Task<bool> AddRegistrationToExcel(VinterleirRegistration registration, string vippsOrderId);
        Task<ExcelModel> ReadFromExcel(string endpoint);
        Task<bool> UpdatePaidStatus(string endpoint, ExcelRow row);
    }
}
