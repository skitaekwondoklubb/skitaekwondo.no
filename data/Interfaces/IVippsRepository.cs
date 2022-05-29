using System;
using System.Threading.Tasks;
using SkiTKD.Data.Models;

namespace SkiTKD.Data.Interfaces
{
    public interface IVippsRepository
    {
        Task<string> Payments(VippsPaymentRequestBody body);
        Task<VippsPaymentRequestBody> VinterleirToVippsRequest(VinterleirRegistration reg, int total);
        Task<VippsPaymentRequestBody> GraderingToVippsRequest(GraderingRegistration reg, int total);
    }
}
