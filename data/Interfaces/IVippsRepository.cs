using System;
using System.Threading.Tasks;
using SkiTKD.Data.Entities;
using SkiTKD.Data.Models;

namespace SkiTKD.Data.Interfaces
{
    public interface IVippsRepository
    {
        Task<string> Payments(VippsPaymentRequestBody body);
        Task<VippsPaymentRequestBody> VinterleirToVippsRequest(int registrationId, string telephone, int paymentId, int total);
        VippsEntity FindVippsOrder(string orderId);
        VippsEntity FindVippsRegistration(int registrationId);
        bool SetTransactionData(string orderId, TransactionCallbackInfo info);
        string GetStatus(string orderId);
    }
}
