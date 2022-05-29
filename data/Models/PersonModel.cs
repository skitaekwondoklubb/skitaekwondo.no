using System.Collections.Generic;

namespace SkiTKD.Data.Models {
    public class Person { 
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Age { get; set; }
        public string Telephone { get; set; }
        public string Email { get; set; }
    
        // Vipps specific
        public virtual string PaymentMethod { get; set; }
        public virtual string OrderId { get; set; }
        public virtual bool HasPaidYet { get; set; }
        public virtual int Total { get; set; }
    }

    public class Ledsager : Person {
        public string Id { get; set; }
        public bool AlreadyRegistered { get; set; }

        public string[] ConvertToExcel() {
              string[] ledsager = { 
                    Id,
                    FirstName, LastName, $"{Age}", 
                    Telephone, Email, 
                    AlreadyRegistered ? "Ja" : "Nei",
                    PaymentMethod, OrderId
                };
            return ledsager;
        }
    }
}