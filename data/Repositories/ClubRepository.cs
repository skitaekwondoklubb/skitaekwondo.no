using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using SkiTKD.Data.Entities;
using SkiTKD.Data.Interfaces;

namespace SkiTKD.Data.Repositories
{
    public class ClubRepository : IClubRepository
    {
        private readonly SkiTKDContext _dbContext;

        public ClubRepository(SkiTKDContext dbContext) {
          _dbContext = dbContext;
        }

        public ClubEntity FindClub(string name) {
           var club = _dbContext.Clubs.Single(x => x.Name.ToLower().StartsWith(name.ToLower()));
           return club;
        }
    }
}

