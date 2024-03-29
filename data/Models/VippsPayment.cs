

using System.Collections.Generic;
using System.Text;

namespace SkiTKD.Data.Models {
    public class VippsPaymentRequestBody {
        public CustomerInfo customerInfo { get; set; }
        public MerchantInfo merchantInfo { get; set; }
        public Transaction transaction { get; set; }
    }

    public class VippsPaymentResponse {
        public string orderId { get; set; }
        public string url { get; set; }
    }


    public class CustomerInfo {
        public string? mobileNumber { get; set; }
    }
    public class MerchantInfo {
        public string callbackPrefix { get; set; }
        public string fallBack { get; set; }
        public string merchantSerialNumber { get; set; }
        public string authToken { get; set; }
    }

    public class Transaction {
        public int amount { get; set; }
        public string orderId { get; set; }
        public string transactionText { get; set; }
    }

    public class PaymentTypes {
        public static string Regular = "eComm Regular Payment";
        public static string Express = "eComm Express Payment";
    }

    public static class CallbackStatuses {
        public const string Nothing = "";
        public const string Reserved = "RESERVED";
        public const string Reserved_Failed = "RESERVE_FAILED";
        public const string Cancelled = "CANCELLED";
        public const string Rejected = "REJECTED";
    }


    public static class CaptureStatuses {
        public const string Nothing = "";
        public const string Refunded = "Refund";
        public const string Cancelled = "Cancelled";
        public const string Captured = "Captured";
    }


    public class VippsCaptureRequestBody {
        public CaptureMerchantInfo merchantInfo { get; set; }
        public CaptureTransaction transaction { get; set; }
    }

    public class CaptureMerchantInfo {
        public string merchantSerialNumber { get; set; }
    }

    public class CaptureTransaction {
        public int amount { get; set; }
        public string transactionText { get; set; }
    }

    public class VippsCaptureResponse {
        public string paymentInstrument { get; set; }
        public string orderId { get; set; }
        public string url { get; set; }
        public VippsCaptureTransactionInfo transactionInfo { get; set; }
        public VippsCaptureTransactionSummary transactionSummary { get; set; }
    }

    public class VippsCaptureTransactionInfo {
        public int amount { get; set; }
        public string status { get; set; }
        public string timestamp { get; set; }
        public string transactionId { get; set; }
        public string transactionText { get; set; }
    }

    public class VippsCaptureTransactionSummary {
        public int capturedAmount { get; set; }
        public int refundedAmount { get; set; }
        public int remainingAmountToCapture { get; set; }
        public int remainingAmountToRefund { get; set; }
        public int bankIdentificationNumber { get; set; }
    }
}