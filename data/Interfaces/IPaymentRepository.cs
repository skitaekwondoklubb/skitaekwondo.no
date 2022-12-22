using System;
using System.Threading.Tasks;
using SkiTKD.Data.Entities;
using SkiTKD.Data.Models;

namespace SkiTKD.Data.Interfaces
{
    public interface IPaymentRepository
    {
        PaymentEntity AddPayment(RegistrationEntity reg, bool vipps, int amount);
        bool SetPaid(int paymentId);
        PaymentEntity FindPaymentByVipps(int vippsId);
        PaymentEntity FindPaymentById(int paymentId);
        RegistrationEntity FindRegistrationByPayment(int? paymentId);
        int GetTotal(VinterleirRegistration reg);
        bool HasPaid(int paymentId);
        bool CancelPayment(int paymentId);
        void SetVippsOnPayment(int paymentId, int vippsId);
    }
}
