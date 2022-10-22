
using System.ComponentModel.DataAnnotations;
using static SkiTKD.Data.Models.VinterleirRegistration;

namespace SkiTKD.Data.Entities {
    public class RegistrationEntity { 
        [Key]
        public int RegistrationId { get; set; }
        public int PersonId { get; set; }
        public int ClubId { get; set; }
        public int GradeId { get; set; }
        public bool Gradering { get; set; }
        public bool Sleepover { get; set; }
        public bool Vegan { get; set; }
        public string Allergies { get; set; }
        public InstructorType Instructor { get; set; }
        public bool WantsToInstruct { get; set; }
        public string OtherInfo { get; set; }
        public bool Public { get; set; }
        public bool Vipps { get; set; }
        public bool Cancelled { get; set; }

        public virtual PersonEntity Person { get; set; }
        public virtual ClubEntity Club { get; set; }
        public virtual GradeEntity Grade { get; set; }
    }
}