
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using static SkiTKD.Data.Models.VinterleirRegistration;

namespace SkiTKD.Data.Entities {
    [Table("registration")]
    public class RegistrationEntity { 
        [Key]
        public int registrationid { get; set; }
        [ForeignKey("Person")]
        public int personid { get; set; }
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
        public bool vipps { get; set; }
        public bool cancelled { get; set; }
        public bool mailesent { get; set; }

        public virtual PersonEntity Person { get; set; }
        public virtual ClubEntity Club { get; set; }
        public virtual GradeEntity Grade { get; set; }
    }
}