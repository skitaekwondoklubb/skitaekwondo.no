

using System.Collections.Generic;
using System.Text;

namespace SkiTKD.Data.Models {
    public class VippsPaymentCallbackModel {
        public string merchantSerialNumber { get; set; }
        public string orderId { get; set; }
        public TransactionCallbackInfo transactionInfo { get; set; }
        public TransactionCallbackErrorInfo errorInfo { get; set; }
    }

    public class TransactionCallbackInfo {
        public double amount { get; set; }
        public string status { get; set; }
        public string timeStamp { get; set; }
        public string transactionId { get; set; }
    }

    public class TransactionCallbackErrorInfo {
        public string errorGroup { get; set; }
        public string errorCode { get; set; }
        public string errorMessage { get; set; }
        public string contextId { get; set; }
    }

}