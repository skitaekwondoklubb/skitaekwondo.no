using System;
using System.Threading.Tasks;
using SkiTKD.Data.Models;

namespace SkiTKD.Data.Interfaces
{
    public interface IGraphTokenService
    {
        Task<string> GetToken();
    }
}
