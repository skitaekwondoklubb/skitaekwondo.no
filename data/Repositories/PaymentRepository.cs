using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using SkiTKD.Data.Entities;
using SkiTKD.Data.Interfaces;
using SkiTKD.Data.Models;
using static SkiTKD.Data.Models.VinterleirRegistration;

namespace SkiTKD.Data.Repositories
{
    public class PaymentRepository : IPaymentRepository
    {
        private readonly SkiTKDContext _dbContext;

        public PaymentRepository(SkiTKDContext dbContext) {
          _dbContext = dbContext;
        }

        public PaymentEntity AddPayment(int registrationId, bool vipps, int amount)
        {
            var alreadyExists = FindPayment(registrationId);
            if(alreadyExists != null) {
                return alreadyExists;
            }

            var newPayment = new PaymentEntity {
                RegistrationId = registrationId,
                Amount = amount,
                Vipps = vipps,
                Paid = false,
                Cancelled = false
            };

            _dbContext.Add(newPayment);
            _dbContext.SaveChanges();

            return newPayment;
        }

        public PaymentEntity FindPayment(int registrationId)
        {
            return _dbContext.Payments.SingleOrDefault(x => x.RegistrationId == registrationId);
        }

        public PaymentEntity FindPaymentById(int paymentId)
        {
            return _dbContext.Payments.SingleOrDefault(x => x.PaymentId == paymentId);
        }

        public bool SetPaid(int registrationId)
        {
            var payment = FindPayment(registrationId);
            payment.Paid = true;
            _dbContext.SaveChanges();
            return true;
        }

        public bool HasPaid(int paymentId)
        {
            var payment = FindPaymentById(paymentId);
            return payment.Paid;
        }

        public bool RegistrationHasPaid(int registrationId)
        {
            var payment = FindPayment(registrationId);
            return payment.Paid;
        }

        public bool CancelPayment(int registrationId) {
            var payment = FindPayment(registrationId);
            payment.Cancelled = true;
            _dbContext.SaveChanges();
            return true;
        }

        public int GetTotal(VinterleirRegistration reg) {
            if(reg.LastName.ToLower().Equals("test")) {     // Only for us to test.
                return 10;
            }

            var total = 975;

            if(reg.Age <= 12) {
                total -= 150;
            }
            
            if(reg.Instructor == InstructorType.SkiFullTimeInstructor) {
                total = 0;
            }
            else if(reg.Instructor == InstructorType.SkiHelperInstructor) { 
                total -= 475;
            }

            if(reg.Gradering == true && reg.Grade?.isDan == false && reg.Grade.Grade != 1) {
                total += 350;
            }

            foreach (var item in reg.HasLedsager ? reg.Ledsagere : new List<Ledsager>())
            {
                if(!item.AlreadyRegistered) {
                    total += 500;
                }
            }

            if(total < 0) { // So that no one manages to fuck with the data to be negative.
                total = 0;
            }

            return total;
        }
    }
}

