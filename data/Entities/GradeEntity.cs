

using System.ComponentModel.DataAnnotations;

namespace SkiTKD.Data.Entities {
    public class GradeEntity { 
        [Key]
        public int GradeId { get; set; }
        public string Name { get; set; }
        public double Grade { get; set; }
        public bool isDan { get; set; }
    }
}