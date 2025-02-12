
using System;
using CsvHelper.Configuration.Attributes;

namespace SkiTKD.Data.Dto {
    public class NewMemberRegistrationDto { 
        [Name("Id")]
        public int registrationId { get; set; }
        [Name("Fornavn")]
        public string firstname { get; set; }

        [Name("Etternavn")]
        public string lastname { get; set; }

        [Name("Alder")]
        public int age { get; set; }

        [Name("Telefon")]
        public string telephone { get; set; }

        [Name("Epost")]
        public string email { get; set; }
        [Name("Foresatts fornavn")]
        public string parentfirstname { get; set; }

        [Name("Foresatts etternavn")]
        public string parentlastname { get; set; }
        [Name("Registrert")]
        public DateTime registrationdate { get; set; }
        [Name("Referert fra")]
        public string referer { get; set; }
    }
}