

using System.Collections.Generic;
using System.Text;

namespace SkiTKD.Data.Models {
    public class VippsPaymentRequestHeader {
        public string Authorization { get; set; }
        public string ContentType { get; set; }
        public string OcpApimSubscriptionKey { get; set; }
        public string MerchantSerialNumber { get; set; }
        public string VippsSystemName { get; set; }
        public string VippsSystemVersion { get; set; }
    }

    public class VippsPaymentRequestBody {
        public CustomerInfo CustomerInfo { get; set; }
        public MerchantInfo MerchantInfo { get; set; }
        public Transaction Transaction { get; set; }
    }

    public class VippsPaymentResponse {
        public string OrderId { get; set; }
        public string Url { get; set; }
    }

    public class CustomerInfo {
        public string? MobileNumber { get; set; }
    }
    public class MerchantInfo {
        public string CallbackPrefix { get; set; }
        public string FallBack { get; set; }
        public string MerchantSerialNumber { get; set; }
        public string AuthToken { get; set; }
        public string? ConsentRemovalPrefix { get; set; }
        public bool? IsApp { get; set; }
        public string? PaymentType { get; set; }
    }

    public class Transaction {
        public int Amount { get; set; }
        public string OrderId { get; set; }
        public string TransactionText { get; set; }
        public bool? SkipLandingPage { get; set; }
        public string? Scope { get; set; }
        public bool? UseExplicitCheckoutFlow { get; set; }
    }
}