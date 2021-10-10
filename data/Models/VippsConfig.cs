

using System.Collections.Generic;
using System.Text;

namespace SkiTKD.Data.Models {
    public class VippsConfig {
        public string ClientId { get; set; }
        public string ClientSecret { get; set; }
        public string Subscription { get; set; }
        public string MSN { get; set; }
        public VippsSystemConfig System { get; set; }
        public string Endpoint { get; set; }
    }

    public class VippsSystemConfig {
        public string Version { get; set; }
        public string Name { get; set; }
    }
}