using System;
using System.Threading.Tasks;
using SkiTKD.Data.Entities;
using SkiTKD.Data.Models;

namespace SkiTKD.Data.Interfaces
{
    public interface IPaymentRepository
    {
        PaymentEntity AddPayment(int registrationId, bool vipps, int amount);
        bool SetPaid(int registrationId);
        PaymentEntity FindPayment(int registrationId);
        PaymentEntity FindPaymentById(int paymentId);

        int GetTotal(VinterleirRegistration reg);
        bool HasPaid(int paymentId);
        bool RegistrationHasPaid(int registrationId);
        bool CancelPayment(int registrationId);
    }
}
