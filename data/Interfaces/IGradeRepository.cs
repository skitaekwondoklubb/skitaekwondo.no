using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SkiTKD.Data.Entities;
using SkiTKD.Data.Models;

namespace SkiTKD.Data.Interfaces
{
    public interface IGradeRepository
    {
        GradeEntity FindGrade(double number, bool dan);
        GradeEntity FindGradeById(int gradeId);
        List<GradeEntity> GetAllGrades();
    }
}
