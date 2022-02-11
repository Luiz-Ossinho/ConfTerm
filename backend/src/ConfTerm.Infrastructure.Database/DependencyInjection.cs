using ConfTerm.Domain.ValueObjects;
using ConfTerm.Infrastructure.Database.Abstractions.Interfaces;
using ConfTerm.Infrastructure.Database.Models;
using ConfTerm.Infrastructure.Database.Repositories;
using ConfTerm.Services.Abstractions.Interfaces;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace ConfTerm.Infrastructure.Database
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddDatabaseInfrastructure(this IServiceCollection services, ISetupInformationContext setupInformation)
        {
            services.AddDatabase(setupInformation);

            services.AddScoped<IUnitOfWork>(sp => sp.GetService<ConfTermContext>() ?? throw new Exception("Nao foi possivel inciar db"));

            #region Repositories
            services.AddScoped<IUserRepository, UserRepository>();
            #endregion

            return services;
        }

        public static IServiceCollection AddDatabase(this IServiceCollection services, ISetupInformationContext setupInformation)
        {
            if (setupInformation.Environment.IsDevelopment())
            {
                var connectionStringBuilder = new SqliteConnectionStringBuilder { DataSource = setupInformation.SecretReader.DatabaseConnectionString, Cache = SqliteCacheMode.Shared };
                var sqliteConnection = new SqliteConnection(connectionStringBuilder.ToString());
                sqliteConnection.Open();

                return services.AddDbContext<ConfTermContext>(opt =>
                {
                    opt.UseSqlite(sqliteConnection);
                });
            }

            return services;
        }

        public static async Task EnsureCreated(IServiceScope scope)
        {
            var hashingSerivce = scope.ServiceProvider.GetService<IHashingService>() ?? throw new ArgumentException("Could not seed");
            var secretReader = scope.ServiceProvider.GetService<ISecretReader>() ?? throw new ArgumentException("Could not seed");
            var context = scope.ServiceProvider.GetService<ConfTermContext>() ?? throw new ArgumentException("Could not seed");

            context.Database.EnsureCreated();

            if (!context.Users.Any())
            {
                var salt = hashingSerivce.GenerateSalt();
                var superuser = secretReader.Superuser;

                var superUserModel = new UserModel
                {
                    Email = superuser.Email,
                    Name = superuser.Name,
                    Salt = salt,
                    Type = UserType.Administrator.Value
                };

                context.Users.Add(superUserModel);
            }

            await context.SaveChangesAsync();
        }
    }
}
