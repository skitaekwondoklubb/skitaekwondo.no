

using System.Collections.Generic;
using System.Text;

namespace SkiTKD.Data.Models {
 
      public class VinterleirRegistrationModel : Person {
        public string Club { get; set; }
        public GradeObj Grade { get; set; }
        public bool Gradering { get; set; }
        public bool Sleepover { get; set; }
        public string Allergies { get; set; }
        public string Pizza { get; set; }
        public bool Vegan { get; set; }
        public bool Theory { get; set; }
        public bool Physical { get; set; }
        public string OtherInfo { get; set; }
        public bool Vipps { get; set; }
        
    }

    public class GraderingRegistration : Person {
        public bool Vipps { get; set; }
    }

}