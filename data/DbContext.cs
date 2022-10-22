
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using SkiTKD.Data.Entities;

namespace SkiTKD.Data {
    public class SkiTKDContext : DbContext { 
        private readonly string _server;
        private readonly string _user;
        private readonly string _pw;
        private readonly string _db;

        public SkiTKDContext(IConfiguration config) {
            _server = config["DbServer"];
            _user = config["DbUser"];
            _pw = config["DbPw"];
            _db = config["DbDb"];
        }
        
        public DbSet<ClubEntity> Clubs { get; set; }
        public DbSet<GradeEntity> Grades { get; set; }
        public DbSet<PersonEntity> Persons { get; set; }
        public DbSet<RegistrationEntity> Registrations { get; set; }
        public DbSet<LedsagerEntity> Ledsagere { get; set; }
        public DbSet<PaymentEntity> Payments { get; set; }
        public DbSet<VippsEntity> VippsOrders { get; set; }
        public DbSet<TransactionErrorEntity> TransactionErrors { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            => optionsBuilder.UseNpgsql($"Host={_server};Username={_user};Password={_pw};Database={_db}");
        }
}