

using System.Collections.Generic;
using System.Text;

namespace SkiTKD.Data.Models {
      public class GraderingRegistration : Person {
        public string[] ConvertToExcel() {
            string[] reg = { 
                FirstName, LastName,
                Telephone, Email,
                PaymentMethod, OrderId,
                HasPaidYet ? "Ja" : "Nei",
                $"{Total}kr"
            };
            return reg;
        }
    }

}