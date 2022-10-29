
namespace SkiTKD.Data.Dto {
    public class PublicRegistrationDto { 
        public string Name { get; set; }
        public string Grade { get; set; }
        public string Club { get; set; }

        public static string GetDan(bool isDan) {
            return isDan ? "Dan" : "Cup";
        }
    }
}