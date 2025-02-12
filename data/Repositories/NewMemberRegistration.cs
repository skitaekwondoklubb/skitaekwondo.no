using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using CsvHelper;
using Microsoft.Extensions.Configuration;
using Microsoft.Graph;
using SkiTKD.Data.Dto;
using SkiTKD.Data.Entities;
using SkiTKD.Data.Interfaces;
using SkiTKD.Data.Models;

namespace SkiTKD.Data.Repositories
{
    public class NewMemberRepository : INewMemberRepository
    {

        private readonly SkiTKDContext _dbContext;

        public NewMemberRepository(
            IPersonRepository _personRepo,
            SkiTKDContext dbContext
        ) {
          _dbContext = dbContext;
        }

        public NewMemberRegistrationEntity AddRegistration(NewMemberRegistration registration, int personId)
        {
            if(personId == 0) {
                throw new Exception("Databasefeil: Ingen person vedlagt i registrering.");
            }
            
            var alreadyExists = FindRegistration(personId);
            
            if(alreadyExists == null) {
                _dbContext.SaveChanges(); 


                var mappedRegistration = new NewMemberRegistrationEntity {
                    personid = personId,
                    parentfirstname = registration.ParentFirstName,
                    parentlastname = registration.ParentLastName,
                    registrationdate = DateTime.Now,
                    referer = registration.Referer
                };

                var reg = _dbContext.Add(mappedRegistration);
                _dbContext.SaveChanges();
                return reg.Entity;
            }
            
            return alreadyExists;
        }

        public List<NewMemberRegistrationDto> GetAllNewMembers()
        {
            var registrations =_dbContext.NewMemberRegistrations.Where(x => x.cancelled == false).Select((p) => new NewMemberRegistrationDto {
                registrationId = p.registrationid,
                firstname = p.Person.firstname,
                lastname = p.Person.lastname,
                age = p.Person.age,
                email = p.Person.email,
                parentfirstname = p.parentfirstname,
                parentlastname = p.parentlastname,
                telephone = p.Person.telephone,
                registrationdate = p.registrationdate,
                referer = Utilities.GetReferer(p.referer)
            }).ToList();

            return registrations;
        }

        public NewMemberRegistrationEntity FindRegistrationById(int registrationid)
        {
            return _dbContext.NewMemberRegistrations.SingleOrDefault(x => x.registrationid == registrationid);
        }

        public NewMemberRegistrationEntity FindRegistration(int personId)
        {
            return _dbContext.NewMemberRegistrations.SingleOrDefault(x => x.personid == personId);
        }

        public bool Remove(int registrationId)
        {
            var reg = FindRegistrationById(registrationId);
            if(reg != null) {
                _dbContext.Remove(reg);
                _dbContext.SaveChanges();
                return true;
            }
            return false;
        }


        public string ExportToCsv()
        {
            using (var writer = new StringWriter())
            using (var csv = new CsvWriter(writer, CultureInfo.InvariantCulture))
            {
                var users = GetAllNewMembers();

                csv.WriteRecords(users);
                return writer.ToString();
            }
        }
    }
}

