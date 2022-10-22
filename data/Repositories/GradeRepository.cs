using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using SkiTKD.Data.Entities;
using SkiTKD.Data.Interfaces;

namespace SkiTKD.Data.Repositories
{
    public class GradeRepository : IGradeRepository
    {
        private readonly SkiTKDContext _dbContext;


        public GradeRepository(SkiTKDContext dbContext) {
          _dbContext = dbContext;
        }

        public GradeEntity FindGrade(double number, bool dan) {
           var grades = _dbContext.Grades.Where(x => x.Grade == number && x.isDan == dan);
           return grades.First();
        }
    }
}

