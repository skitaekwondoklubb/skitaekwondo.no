using System;
using System.Threading.Tasks;
using SkiTKD.Data.Entities;
using SkiTKD.Data.Models;

namespace SkiTKD.Data.Interfaces
{
    public interface IVippsRepository
    {
        Task<string> Payments(VippsPaymentRequestBody body);
        Task<VippsPaymentRequestBody> VinterleirToVippsRequest(RegistrationEntity reg, int total);
        VippsEntity FindVippsOrder(string orderId);
        bool SetTransactionData(string orderId, TransactionCallbackInfo info);
    }
}
