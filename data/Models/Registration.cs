

using System.Collections.Generic;
using System.Text;

namespace SkiTKD.Data.Models {
      public class Registration : Person {
        public string Allergies { get; set; }
        public bool Pizza { get; set; }
        public bool Vegan { get; set; }
        public string OtherInfo { get; set; }

             public string[] ConvertToExcel() {
            string[] reg = { 
                FirstName, LastName, $"{Age}", 
                Telephone, Email, 
                Pizza ? "Ja" : "Nei",
                Vegan ? "Ja" : "Nei",
                Allergies, OtherInfo
            };
            return reg;
        }
    }

}