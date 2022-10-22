
using System;
using System.ComponentModel.DataAnnotations;

namespace SkiTKD.Data.Entities {
    public class VippsEntity { 
        [Key]
        public int VippsId { get; set; }
        public int RegistrationId { get; set; }
        public int PaymentId { get; set; }
        public string OrderId { get; set; }
        public string TransactionId { get; set; }
        public string TransactionText { get; set; }
        public string MobileNumber { get; set; }
        public double Amount { get; set; }
        public string Status { get; set; }
        public DateTime TimeStamp { get; set; }

        public virtual RegistrationEntity Registration { get; set; }
    }

    public class TransactionErrorEntity { 
        [Key]
        public int TransactionErrorId { get; set; }
        public string ContextId { get; set; }
        public string ErrorMessage { get; set; }
        public string ErrorCode { get; set; }
        public string ErrorGroup { get; set; }
    }
}