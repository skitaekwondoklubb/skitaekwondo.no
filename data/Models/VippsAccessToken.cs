

using System.Collections.Generic;
using System.Text;

namespace SkiTKD.Data.Models {
    public class VippsAccessTokenRequest {
        public string client_id { get; set; }
        public string client_secret { get; set; }
        public string OcpApimSubscriptionKey { get; set; }
    }

    public class VippsAccessTokenResponse {
        public string token_type { get; set; }
        public int expires_in { get; set; }
        public int ext_expires_in { get; set; }
        public int expires_on { get; set; }
        public int not_before { get; set; }
        public string resource { get; set; }
        public string access_token { get; set; }
    }

    public class VippsAccessTokenError {
        public string errorGroup { get; set; }
        public string errorCode { get; set; }
        public string errorMesage { get; set; }
        public string contextId { get; set; }
    }
}