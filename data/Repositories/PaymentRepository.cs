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


        public PaymentRepository(SkiTKDContext dbContext, IPersonRepository personRepo, ILedsagerRepository ledsagerRepo, IGradeRepository gradeRepo) {
          _dbContext = dbContext;
          _personRepo = personRepo;
          _ledsagerRepo = ledsagerRepo;
          _gradeRepo = gradeRepo;
        }

        public PaymentEntity AddPayment(int registrationId, bool vipps, int amount)
        {
            var alreadyExists = FindPayment(registrationId);
            if(alreadyExists != null) {
                return alreadyExists;
            }

            var newPayment = new PaymentEntity {
                registrationid = registrationId,
                amount = amount,
                vipps = vipps,
                paid = false,
                cancelled = false
            };

            _dbContext.Add(newPayment);
            _dbContext.SaveChanges();

            return newPayment;
        }

        public PaymentEntity FindPayment(int registrationId)
        {
            return _dbContext.Payments.SingleOrDefault(x => x.registrationid == registrationId);
        }

        public PaymentEntity FindPaymentById(int paymentId)
        {
            return _dbContext.Payments.SingleOrDefault(x => x.paymentid == paymentId);
        }

        public bool SetPaid(int registrationId)
        {
            var payment = FindPayment(registrationId);
            payment.paid = true;
            _dbContext.SaveChanges();
            return true;
        }

        public bool HasPaid(int paymentId)
        {
            var payment = FindPaymentById(paymentId);
            return payment.paid;
        }

        public bool RegistrationHasPaid(int registrationId)
        {
            var payment = FindPayment(registrationId);
            return payment.paid;
        }

        public bool CancelPayment(int registrationId) {
            var payment = FindPayment(registrationId);
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
    }
}

