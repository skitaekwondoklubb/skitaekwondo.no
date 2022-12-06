
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SkiTKD.Data.Entities {
    [Table("payment")]
    public class PaymentEntity { 
        [Key]
        public int paymentid { get; set; }
        [ForeignKey("Registration")]
        public int registrationid { get; set; }
        public bool vipps { get; set; }
        public double amount { get; set; }
        public bool paid { get; set; }
        public bool cancelled { get; set; }


        public virtual RegistrationEntity Registration { get; set; }
    }
}