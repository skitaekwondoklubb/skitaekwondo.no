using System;
using System.Threading.Tasks;
using SkiTKD.Data.Models;

namespace SkiTKD.Data.Interfaces
{
    public interface IVinterleirRepository
    {
        Task<bool> AddRegistrationToExcel(VinterleirRegistration registration, string vippsOrderId);
        Task<ExcelModel> ReadFromExcel();
        Task<bool> UpdatePaidStatus(ExcelRow row);
        int GetTotal(VinterleirRegistration reg);
        Task<bool> DeleteRow(ExcelRow row);
        bool SendEmail(string firstName, string lastName, string email);
    }
}
