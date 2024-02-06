
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SkiTKD.Data.Entities {
    [Table("vipps")]
    public class VippsEntity { 
        [Key]
        public int vippsid { get; set; }
        [ForeignKey("Payment")]
        public int paymentid { get; set; }
        public string orderid { get; set; }
        public string transactionid { get; set; }
        public string transactiontext { get; set; }
        public string mobilenumber { get; set; }
        public double amount { get; set; }
        public string status { get; set; }
        public DateTime timestamp { get; set; }
        public bool captured { get; set; }

        public virtual PaymentEntity Payment { get; set; }
    }
    [Table("transactionError")]
    public class TransactionErrorEntity { 
        [Key]
        public int transactionerrorid { get; set; }
        public string contextid { get; set; }
        public string errormessage { get; set; }
        public string errorcode { get; set; }
        public string errorgroup { get; set; }
    }
}