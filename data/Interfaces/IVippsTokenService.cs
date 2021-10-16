using System;
using System.Threading.Tasks;
using SkiTKD.Data.Models;

namespace SkiTKD.Data.Interfaces
{
    public interface IVippsTokenService
    {
        Task<VippsAccessTokenResponse> GetToken();
    }
}
