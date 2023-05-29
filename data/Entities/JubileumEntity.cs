
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SkiTKD.Data.Entities {
    [Table("jubileum")]
    public class JubileumEntity { 
        [Key]
        public int jubileumid { get; set; }
        public string firstname { get; set; }
        public string lastname { get; set; }
        public int adults { get; set; }
        public int children { get; set; }
    }
}