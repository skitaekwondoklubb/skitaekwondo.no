
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SkiTKD.Data.Entities {
    [Table("person")]
    public class PersonEntity { 
        [Key]
        public int personid { get; set; }
        public string firstname { get; set; }
        public string lastname { get; set; }
        public int age { get; set; }
        public string telephone { get; set; }
        public string email { get; set; }
    }

    [Table("ledsager")]
    public class LedsagerEntity { 
        [Key]
        public int ledsagerid { get; set; }
        [ForeignKey("Person")]
        public int personid { get; set; }
        [ForeignKey("ForPerson")]
        public int forpersonid { get; set; }
        [ForeignKey("Registration")]
        public int registrationid { get; set; }
        public bool haspaid { get; set; }

        public virtual PersonEntity Person { get; set; }
        public virtual PersonEntity ForPerson { get; set; }
        public virtual VinterleirRegistrationEntity Registration { get; set; }
    }
}