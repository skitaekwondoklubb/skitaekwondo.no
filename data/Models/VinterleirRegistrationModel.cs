

using System.Collections.Generic;
using System.Text;

namespace SkiTKD.Data.Models {
      public class VinterleirRegistration : Person {
        public bool Sleepover { get; set; }
        public int ClubId { get; set; }
        public int GradeId { get; set; }
        public InstructorType Instructor { get; set; }
        public bool Gradering { get; set; }
        public List<Ledsager> Ledsagere { get; set; }
        public string Allergies { get; set; }
        public bool Vegan { get; set; }
        public string OtherInfo { get; set; }
        public bool Public { get; set; }
        public bool WantsToInstruct { get; set; }
        public bool Vipps { get; set; }

        public enum InstructorType {
            NotInstructor,          // Not instructor
            SkiFullTimeInstructor,  // Only Ski Taekwondo Klubb
            SkiHelperInstructor,    // Only Ski Taekwondo Klubb
        }
    }

}