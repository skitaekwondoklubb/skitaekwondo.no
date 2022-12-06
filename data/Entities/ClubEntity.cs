
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SkiTKD.Data.Entities {
    [Table("club")]
    public class ClubEntity { 
        [Key]
        public int clubid { get; set; }
        public string name { get; set; }
    }
}