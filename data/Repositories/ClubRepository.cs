using System.Collections.Generic;
using System.Linq;
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
           var club = _dbContext.Clubs.Single(x => x.name.ToLower().StartsWith(name.ToLower()));
           return club;
        }

        public ClubEntity FindClubById(int clubId)
        {
           var club = _dbContext.Clubs.Single(x => x.clubid == clubId);
           return club;
        }

        public List<ClubEntity> GetAllClubs()
        {
          var clubs = _dbContext.Clubs.ToList();
          return clubs;
        }
    }
}

