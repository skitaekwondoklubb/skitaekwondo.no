
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using SkiTKD.Data.Entities;

namespace SkiTKD.Data {
    public class SkiTKDContext : DbContext { 
        private readonly IConfiguration _config;

        public SkiTKDContext(IConfiguration config) {
            _config = config;
        }
        
        public DbSet<ClubEntity> Clubs { get; set; }
        public DbSet<GradeEntity> Grades { get; set; }
        public DbSet<GraderingRegistrationEntity> GraderingRegistrations { get; set; }
        public DbSet<PersonEntity> Persons { get; set; }
        public DbSet<VinterleirRegistrationEntity> VinterleirRegistrations { get; set; }
        public DbSet<LedsagerEntity> Ledsagere { get; set; }
        public DbSet<PaymentEntity> Payments { get; set; }
        public DbSet<VippsEntity> VippsOrders { get; set; }
        public DbSet<TransactionErrorEntity> TransactionErrors { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            => optionsBuilder.UseNpgsql(_config.GetConnectionString("postgre"))
            .UseLazyLoadingProxies();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
            => modelBuilder.UseIdentityColumns();
    }


}