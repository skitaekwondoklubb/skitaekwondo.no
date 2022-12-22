using System;
using System.Threading.Tasks;
using SkiTKD.Data.Entities;
using SkiTKD.Data.Models;

namespace SkiTKD.Data.Interfaces
{
    public interface IVippsRepository
    {
        Task<string> Payments(VippsPaymentRequestBody body);
        Task<VippsPaymentRequestBody> VippsRequest(int registrationId, string telephone, int paymentId, int total, string transactionText);
        VippsEntity FindVippsOrder(string orderId);
        bool SetTransactionData(string orderId, TransactionCallbackInfo info);
        string GetStatus(string orderId);
    }
}
