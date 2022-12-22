
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using static SkiTKD.Data.Models.VinterleirRegistration;

namespace SkiTKD.Data.Entities {

    public enum RegistrationType {
        Unknown,
        Vinterleir,
        Gradering
    }

    public class RegistrationEntity { 
        [Key]
        public int registrationid { get; set; }
        [ForeignKey("Person")]
        public int personid { get; set; }
        [ForeignKey("Payment")]
        public int? paymentid { get; set; }
        public bool cancelled { get; set; }
        public bool mailsent { get; set; }
        public virtual PersonEntity Person { get; set; }
        public virtual PaymentEntity Payment { get; set; }
    }

    [Table("vinterleirregistration")]
    public class VinterleirRegistrationEntity : RegistrationEntity 
    { 
        [ForeignKey("Club")]
        public int clubid { get; set; }
        [ForeignKey("Grade")]
        public int gradeid { get; set; }
        public bool gradering { get; set; }
        public bool sleepover { get; set; }
        public bool vegan { get; set; }
        public string allergies { get; set; }
        public InstructorType instructor { get; set; }
        public bool wantstoinstruct { get; set; }
        public string otherinfo { get; set; }
        public bool @public { get; set; }

        public virtual ClubEntity Club { get; set; }
        public virtual GradeEntity Grade { get; set; }


    }

    [Table("graderingregistration")]
    public class GraderingRegistrationEntity : RegistrationEntity { 

    }
}