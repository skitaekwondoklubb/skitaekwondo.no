
using System.ComponentModel.DataAnnotations;

namespace SkiTKD.Data.Entities {
    public class PersonEntity { 
        [Key]
        public int PersonId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Age { get; set; }
        public string Telephone { get; set; }
        public string Email { get; set; }
    }

    public class LedsagerEntity { 
        [Key]
        public int LedsagerId { get; set; }
        public int PersonId { get; set; }
        public int ForPersonId { get; set; }
        public int RegistrationId { get; set; }
        public bool HasPaid { get; set; }

        public virtual PersonEntity Person { get; set; }
        public virtual PersonEntity ForPerson { get; set; }
        public virtual RegistrationEntity Registration { get; set; }
    }
}