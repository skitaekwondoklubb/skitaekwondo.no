
using System.ComponentModel.DataAnnotations;

namespace SkiTKD.Data.Entities {
    public class ClubEntity { 
        [Key]
        public int ClubId { get; set; }
        public string Name { get; set; }
    }
}