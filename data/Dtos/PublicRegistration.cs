
using System.Globalization;
using CsvHelper.Configuration;
using CsvHelper.Configuration.Attributes;
using static SkiTKD.Data.Models.VinterleirRegistration;

namespace SkiTKD.Data.Dto {
    public class PublicRegistrationDto { 
        public string Name { get; set; }
        public string Grade { get; set; }
        public string Club { get; set; }

        public static string GetDan(bool isDan) {
            return isDan ? "Dan" : "Cup";
        }
    }

    public class PublicGradeDto {
        public GradeDto Grade { get; set; }
        public int Amount { get; set; }
    }
    
    public class AdminRegistrationDto { 
        [Name("DeltakerId")]
        public int personid { get; set; }

        [Name("Fornavn")]
        public string firstname { get; set; }

        [Name("Etternavn")]
        public string lastname { get; set; }

        [Name("Klubb")]
        public string club { get; set; }

        [Name("Grad")]
        public string grade { get; set; }

        [Name("Alder")]
        public int age { get; set; }

        [Name("Telefon")]
        public string telephone { get; set; }

        [Name("Epost")]
        public string email { get; set; }

        [Name("Ønsker gradering")]
        [BooleanTrueValues("Ja")]
        [BooleanFalseValues("Nei")]
        public bool gradering { get; set; }

        [Name("Overnatter")]
        [BooleanTrueValues("Ja")]
        [BooleanFalseValues("Nei")]
        public bool sleepover { get; set; }

        [Name("Veganer")]
        [BooleanTrueValues("Ja")]   
        [BooleanFalseValues("Nei")]
        public bool vegan { get; set; }

        [Name("Allergier")]
        public string allergies { get; set; }

        [Name("Er instruktør i Ski")]
        public string instructor { get; set; }

        [Name("Ønsker å instruere")]
        [BooleanTrueValues("Ja")]
        [BooleanFalseValues("Nei")]
        public bool wantstoinstruct { get; set; }

        [Name("Annen informasjon")]
        public string otherinfo { get; set; }

        [Name("Vises offentlig")]
        [BooleanTrueValues("Ja")]
        [BooleanFalseValues("Nei")]
        public bool @public { get; set; }

        [Name("Betalingsum")]
        public double amount { get; set; }

        [Name("Har betalt")]
        [BooleanTrueValues("Ja")]
        [BooleanFalseValues("Nei")]
        public bool paid { get; set; }

        [Name("Vipps")]
        [BooleanTrueValues("Ja")]
        [BooleanFalseValues("Nei")]
        public bool vipps { get; set; }

        [Name("Vipps OrdreId")]
        public string orderid { get; set; }

        [Name("Vipps TranskasjonsId")]
        public string transactionid { get; set; }

        [Name("Er ledsager")]
        [BooleanTrueValues("Ja")]
        [BooleanFalseValues("Nei")]
        public bool isLedsager { get; set; }

        [Name("Ledager for")]
        [NullValues("")]
        public string isLedsagerForName { get; set; }

    }
}