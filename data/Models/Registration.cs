

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
        public GraderingType Type { get; set; }
    }

    public class SkoleRegistration : Person {
        public string ParentFirstName { get; set; }
        public string ParentLastName { get; set; }
        public bool FirstDay { get; set; }
        public bool SecondDay { get; set; }
        public bool ThirdDay { get; set; }
        public bool IsMember { get; set; }
    }

    public class NewMemberRegistration : Person {
        public string ParentFirstName { get; set; }
        public string ParentLastName { get; set; }
        public RefererType Referer { get; set; }
    }


    public class OtherRegistration : Person {
        public bool Vipps { get; set; }
        public TShirtModel[] Tshirts { get; set; }
    }

    public enum RefererType {
        Website,
        Email,
        QRCode
    }

    public enum GraderingType {
        Child,
        Adult
    }
}