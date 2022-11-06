
using static SkiTKD.Data.Models.VinterleirRegistration;

namespace SkiTKD.Data.Dto {
    public class PublicRegistrationDto { 
        public string Name { get; set; }
        public string Grade { get; set; }
        public string Club { get; set; }

        public static string GetDan(bool isDan) {
            return isDan ? "Dan" : "Cup";
        }
    }

    public class PublicGradeDto {
        public GradeDto Grade { get; set; }
        public int Amount { get; set; }
    }
    
    public class AdminRegistrationDto { 
        public int personid { get; set; }
        public string firstname { get; set; }
        public string lastname { get; set; }
        public string club { get; set; }
        public string grade { get; set; }
        public int age { get; set; }
        public string telephone { get; set; }
        public string email { get; set; }
        public bool gradering { get; set; }
        public bool sleepover { get; set; }
        public bool vegan { get; set; }
        public bool isLedsager { get; set; }
        public string isLedsagerForName { get; set; }
        public string allergies { get; set; }
        public string instructor { get; set; }
        public bool wantstoinstruct { get; set; }
        public string otherinfo { get; set; }
        public bool @public { get; set; }
        public double amount { get; set; }
        public bool paid { get; set; }
        public bool vipps { get; set; }
        public string orderid { get; set; }
        public string transactionid { get; set; }

    }
}