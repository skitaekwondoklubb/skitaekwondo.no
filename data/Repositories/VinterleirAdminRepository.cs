using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using CsvHelper;
using Microsoft.Extensions.Configuration;
using SkiTKD.Data.Dto;
using SkiTKD.Data.Entities;
using SkiTKD.Data.Interfaces;
using static SkiTKD.Data.Models.VinterleirRegistration;
using static SkiTKD.Data.Models.VinterleirRegistrationModel;

namespace SkiTKD.Data.Repositories
{
    public class VinteleirAdminRepository : IVinterleirAdminRepository
    {
        private readonly SkiTKDContext _dbContext;
        private readonly IVinterleirRegistrationRepository _regRepo;
        private readonly ILedsagerRepository _ledsagerRepo;
        private readonly IPaymentRepository _paymentRepo;
        private readonly IVippsRepository _vippsRepo;
        

        public VinteleirAdminRepository(
            IConfiguration config, 
            SkiTKDContext dbContext, 
            IVinterleirRegistrationRepository regRepo,
            ILedsagerRepository ledsagerRepo,
            IPaymentRepository paymentRepo,
            IVippsRepository vippsRepo
        ) {
            _dbContext = dbContext;
            _regRepo = regRepo;
            _ledsagerRepo = ledsagerRepo;
            _paymentRepo = paymentRepo;
            _vippsRepo = vippsRepo;
        }

        public List<AdminRegistrationDto> GetUsers()
        {
            try {
                var registrations = _dbContext.VinterleirRegistrations.Where(x => x.cancelled != true).ToList();
                var listOfRegistrations = new List<AdminRegistrationDto>();

                foreach (var reg in registrations)
                {
                    listOfRegistrations.Add(MapUser(reg));
                    var ledsagere = _ledsagerRepo.FindLedsagersForPerson(reg.personid);
                    foreach (var ledsager in ledsagere)
                    {
                        listOfRegistrations.Add(MapLedsager(ledsager));
                    }  
                }

                return listOfRegistrations;
            } 
            catch(Exception e) {
                Console.WriteLine(e.Message);
                Console.WriteLine(e.StackTrace);
                throw e;
            }
        }

        public string ExportToCsv()
        {
            using (var writer = new StringWriter())
            using (var csv = new CsvWriter(writer, CultureInfo.InvariantCulture))
            {
                var users = GetUsers();

                csv.WriteRecords(users);
                return writer.ToString();
            }
        }


        private string InstructorToString(InstructorType instructor) {
            switch (instructor)
            {
                case InstructorType.SkiFullTimeInstructor:
                    return "Ski Taekwondo Instruktør";
                case InstructorType.SkiHelperInstructor:
                    return "Ski Taekwondo Hjelpeinstruktør";             
                default:
                    return "Ikke instruktør";
            }
        }

        private AdminRegistrationDto MapUser(VinterleirRegistrationEntity reg) {


            return new AdminRegistrationDto {
                personid = reg.personid,
                firstname = reg.Person.firstname,
                lastname = reg.Person.lastname,
                age = reg.Person.age,
                allergies = reg.allergies,
                amount = reg.Payment.amount,
                club = reg.Club.name,
                email = reg.Person.email,
                grade = $"{reg.Grade.grade}. {(reg.Grade.isdan ? "Dan" : "Cup")}",
                gradering = reg.gradering,
                instructor =  InstructorToString(reg.instructor),
                isLedsager = false,
                isLedsagerForName = "false",
                orderid = reg.Payment.VippsEntity?.orderid,
                otherinfo = reg.otherinfo,
                paid = reg.Payment.paid,
                @public = reg.@public,
                sleepover = reg.sleepover,
                telephone = reg.Person.telephone,
                transactionid = reg.Payment.VippsEntity?.transactionid,
                vegan = reg.vegan,
                vipps = reg.Payment.vipps,
                wantstoinstruct = reg.wantstoinstruct
            };
        }

        private AdminRegistrationDto MapLedsager(LedsagerEntity ledsager) {
            var reg = ledsager.Registration;
            
            return  new AdminRegistrationDto {
                personid = ledsager.personid,
                firstname = ledsager.Person.firstname,
                lastname = ledsager.Person.lastname,
                age = ledsager.Person.age,
                allergies = "",
                amount = 500,
                club = reg.Club.name,
                email = ledsager.Person.email,
                grade = "",
                gradering = false,
                instructor = "Ikke instruktør",
                isLedsager = true,
                isLedsagerForName = $"{ledsager.ForPerson.firstname} {ledsager.ForPerson.lastname}",
                orderid = "",
                otherinfo = "",
                paid = ledsager.haspaid,
                @public = false,
                sleepover = reg.sleepover,
                telephone = ledsager.Person.telephone,
                transactionid = "",
                vegan = false,
                vipps = false,
                wantstoinstruct = false
            };
        }
    }
}

