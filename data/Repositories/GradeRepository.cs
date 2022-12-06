using System.Collections.Generic;
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
           var grades = _dbContext.Grades.Where(x => x.grade == number && x.isdan == dan);
           return grades.First();
        }

        public GradeEntity FindGradeById(int gradeId)
        {
           var grade = _dbContext.Grades.Single(x => x.gradeid == gradeId);
           return grade;
        }

        public List<GradeEntity> GetAllGrades() {
           var grades = _dbContext.Grades.ToList();
           return grades;
        }
    }
}

