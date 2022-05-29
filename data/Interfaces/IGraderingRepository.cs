using System;
using System.Threading.Tasks;
using SkiTKD.Data.Models;

namespace SkiTKD.Data.Interfaces
{
    public interface IGraderingRepository
    {
        Task<bool> AddRegistrationToExcel(GraderingRegistration registration, string vippsOrderId);
        Task<ExcelGraderingModel> ReadFromExcel();
        Task<bool> UpdatePaidStatus(GraderingExcelRow row);
        Task<bool> DeleteRow(GraderingExcelRow row);
        bool SendEmail(string firstName, string lastName, string email);
    }
}
