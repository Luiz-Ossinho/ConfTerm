using ConfTerm.Services.Abstractions.Interfaces;
using ConfTerm.Services.Concretes;
using Microsoft.Extensions.DependencyInjection;

namespace ConfTerm.Services
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddServices(this IServiceCollection services)
        {
            services.AddScoped<IRequesterService, HttpRequesterService>();
            services.AddScoped<IHashingService, HashingService>();
            services.AddScoped<ITokenService, JWTTokenService>();

            return services;
        }
    }
}
