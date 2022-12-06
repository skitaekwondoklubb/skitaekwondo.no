

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SkiTKD.Data.Entities {
    [Table("grade")]
    public class GradeEntity { 
        [Key]
        public int gradeid { get; set; }
        public string name { get; set; }
        public double grade { get; set; }
        public bool isdan { get; set; }
    }
}