
using System;
using System.ComponentModel.DataAnnotations;

namespace SkiTKD.Data.Entities {
    public class PaymentEntity { 
        [Key]
        public int PaymentId { get; set; }
        public int RegistrationId { get; set; }
        public bool Vipps { get; set; }
        public double Amount { get; set; }
        public bool Paid { get; set; }
        public bool Cancelled { get; set; }

        public virtual RegistrationEntity Registration { get; set; }
    }
}