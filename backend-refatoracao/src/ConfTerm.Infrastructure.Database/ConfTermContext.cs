using ConfTerm.Infrastructure.Database.Mappings;
using ConfTerm.Infrastructure.Database.Models;
using ConfTerm.Services.Abstractions.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ConfTerm.Infrastructure.Database
{
    public class ConfTermContext : DbContext, IUnitOfWork
    {
        public ConfTermContext(DbContextOptions<ConfTermContext> options) : base(options) { }

        public DbSet<UserModel> Users { get; set; } = default!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new UserMapping());

            base.OnModelCreating(modelBuilder);
        }
    }
}
