using System;
using System.Threading.Tasks;

namespace SkiTKD.Data.Interfaces
{
    public interface IVinterleirRepository
    {
        Task<string> AddInfoToExcel(string name, string address);
    }
}
