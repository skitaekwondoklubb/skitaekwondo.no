using System.Collections.Generic;

namespace SkiTKD.Data.Models {
    public class Person { 
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Age { get; set; }
        public string Telephone { get; set; }
        public string Email { get; set; }
        public bool Sleepover { get; set; }
        public virtual string PaymentMethod { get; set; }
        public virtual string OrderId { get; set; }
    }

    public class Ledsager : Person {
        public int Id { get; set; }
        public bool AlreadyRegistered { get; set; }

        public string[] ConvertToExcel() {
              string[] ledsager = { 
                    $"{Id}", 
                    FirstName, LastName, $"{Age}", 
                    Telephone, Email, 
                    Sleepover         ? "Ja" : "Nei",
                    AlreadyRegistered ? "Ja" : "Nei",
                    PaymentMethod, OrderId
                };
            return ledsager;
        }
    }
}