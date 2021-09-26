

using System.Collections.Generic;
using System.Text;

namespace SkiTKD.Data.Models {
      public class Registration : Person {
        public string Club { get; set; }
        public GradeObj Grade { get; set; }
        public bool Gradering { get; set; }
        public string Allergies { get; set; }
        public string Pizza { get; set; }
        public bool Vegan { get; set; }
        public bool Theory { get; set; }
        public bool Physical { get; set; }
        public string OtherInfo { get; set; }

        public string[] ConvertToExcel() {
            string[] reg = { 
                FirstName, LastName, $"{Age}", 
                Telephone, Email, 
                Club, Grade.Name,
                Gradering ? "Ja" : "Nei",
                Theory ? "Ja" : "Nei", 
                Physical ? "Ja" : "Nei",
                Sleepover ? "Ja" : "Nei",
                Allergies, Pizza,
                Vegan ? "Ja" : "Nei",
                OtherInfo
            };
            return reg;
        }
    }

}