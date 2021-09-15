

using System.Collections.Generic;
using System.Text;

namespace SkiTKD.Data.Models {
      public class VinterleirRegistration : Person {
        public string Club { get; set; }
        public string Grade { get; set; }
        public bool Gradering { get; set; }
        public bool HasLedsager { get; set; }
        public List<Ledsager> Ledsagere { get; set; }
        public string Allergies { get; set; }
        public bool Vegan { get; set; }
        public string OtherInfo { get; set; }

        public string[][] ConvertLedsagereToExcel() {
            var convertedLedsagere = new List<string[]>();
            foreach (var ledsager in Ledsagere)
            {
                convertedLedsagere.Add(ledsager.ConvertToExcel());
            }

            return convertedLedsagere.ToArray();
        }

        public string ConvertLedsagereToString() {

            var builder = new StringBuilder();
            foreach (var Ledsager in Ledsagere)
            {
                builder.Append($"{Ledsager.FirstName} {Ledsager.LastName} ({Ledsager.Id}), ");
            }

            return builder.ToString();
        }

        public string[] ConvertToExcel() {
            string[] reg = { 
                FirstName, LastName, $"{Age}", 
                Telephone, Email, 
                Club, Grade,
                Gradering   ? "Ja" : "Nei",
                Sleepover   ? "Ja" : "Nei",
                Vegan       ? "Ja" : "Nei",
                HasLedsager ? "Ja" : "Nei",
                HasLedsager ? ConvertLedsagereToString() : "Ingen",
                Allergies, OtherInfo,
                PaymentMethod, OrderId
            };
            return reg;
        }
    }

}