using System;
using System.Threading.Tasks;
using SkiTKD.Data.Models;

namespace SkiTKD.Data.Interfaces
{
    public interface IVippsRepository
    {
        Task<VippsAccessTokenResponse> TestGetTokenResponse();
        Task<string> Payments(VippsPaymentRequestBody body);
    }
}
