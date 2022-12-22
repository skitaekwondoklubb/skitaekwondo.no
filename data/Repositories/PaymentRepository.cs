using System;
using System.Collections.Generic;
using System.Linq;
using SkiTKD.Data.Entities;
using SkiTKD.Data.Interfaces;
using SkiTKD.Data.Models;
using static SkiTKD.Data.Models.VinterleirRegistration;

namespace SkiTKD.Data.Repositories
{
    public class PaymentRepository : IPaymentRepository
    {
        private readonly SkiTKDContext _dbContext;
        private readonly IPersonRepository _personRepo;
        private readonly ILedsagerRepository _ledsagerRepo;
        private readonly IGradeRepository _gradeRepo;
        private readonly IVippsRepository _vippsRepo;

        public PaymentRepository(SkiTKDContext dbContext, IPersonRepository personRepo, ILedsagerRepository ledsagerRepo, IGradeRepository gradeRepo, IVippsRepository vippsRepo) {
          _dbContext = dbContext;
          _personRepo = personRepo;
          _ledsagerRepo = ledsagerRepo;
          _gradeRepo = gradeRepo;
          _vippsRepo = vippsRepo;
        }

        public PaymentEntity AddPayment(RegistrationEntity registration, bool vipps, int amount)
        {
            var newPayment = new PaymentEntity {
                amount = amount,
                vipps = vipps,
                paid = false,
                cancelled = false
            };

            var paymentEntity = _dbContext.Add(newPayment);
            _dbContext.SaveChanges();

            if(paymentEntity.Entity?.paymentid == null) {
                throw new Exception("PAYMENT WAS NULL");
            }

            registration.paymentid = paymentEntity.Entity.paymentid;

            return newPayment;
        }

        public PaymentEntity FindPaymentByVipps(int vippsId)
        {
            try {
                return _dbContext.Payments.SingleOrDefault(x => x.vippsid == vippsId);
            }
            catch(Exception e) {
                Console.WriteLine($"Failed to get payment through vippsId: {vippsId}");
                throw new Exception($"Failed to get payment through vippsId: {vippsId}", e);
            }

        }

        public PaymentEntity FindPaymentById(int paymentId)
        {
            return _dbContext.Payments.SingleOrDefault(x => x.paymentid == paymentId);
        }

        public bool SetPaid(int paymentId)
        {
            var payment = FindPaymentById(paymentId);
            payment.paid = true;
            _dbContext.SaveChanges();
            return true;
        }

        public bool HasPaid(int paymentId)
        {
            var payment = FindPaymentById(paymentId);
            return payment.paid;
        }

        public bool CancelPayment(int paymentId) {
            var payment = FindPaymentById(paymentId);
            payment.cancelled = true;
            _dbContext.SaveChanges();
            return true;
        }

        public int GetTotal(VinterleirRegistration reg) {
            var grade = _gradeRepo.FindGradeById(reg.GradeId);

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

            if(reg.Gradering == true && grade.isdan == false && grade.grade != 1) {
                total += 350;
            }

            foreach (var item in reg.Ledsagere)
            {
                if(!item.AlreadyRegistered) {
                    total += 500;
                }
                else {
                    var exists = _personRepo.FindPerson(item.FirstName, item.LastName, item.Telephone);
                    if(exists == null) {
                        throw new System.NullReferenceException("Person that says they were registered was not found.");
                    }
                }
            }

            if(total < 0) { // So that no one manages to fuck with the data to be negative.
                total = 0;
            }

            return total;
        }

        public void SetVippsOnPayment(int paymentId, int vippsId)
        {
            var payment = FindPaymentById(paymentId);
            if(payment == null) {
                throw new NullReferenceException($"Tried to set Vippss on NULL payment: {paymentId}");
            }

            payment.vippsid = vippsId;
            payment.vipps = true;
            
            _dbContext.SaveChanges();
        }

        public RegistrationEntity FindRegistrationByPayment(int? paymentId)
        {
            if(paymentId == null) {
                throw new NullReferenceException("PaymentId is NULL");
            }

            
            var tryVinterleir = _dbContext.VinterleirRegistrations.SingleOrDefault(x => x.paymentid == paymentId);
            if(tryVinterleir != null) {
                return tryVinterleir;
            }

            var tryGradering = _dbContext.GraderingRegistrations.SingleOrDefault(x => x.paymentid == paymentId);
            if(tryGradering != null) {
                return tryGradering;
            }

            throw new Exception($"PaymentId {paymentId} is not connected to any registrations.");
        }

        public static int GetTotalGradering = 350;

    }
}

