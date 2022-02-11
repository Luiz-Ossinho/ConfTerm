using ConfTerm.Application;
using ConfTerm.Infrastructure.Database;
using ConfTerm.Presentation.Helpers;
using ConfTerm.Services;
using ConfTerm.Services.Abstractions.Interfaces;
using ConfTerm.Services.Concretes;
using System.Reflection;

namespace ConfTerm.Presentation
{
    public static class DependencyInjection
    {
        public static ISetupInformationContext ConfigureServices(this WebApplicationBuilder builder)
        {
            var setupInformationContext = new SetupInformationContext(builder.Configuration, builder.Environment);
            var secretReader = new EnviromentVariableSecretReader(setupInformationContext);
            setupInformationContext.WithSecretReader(secretReader);

            builder.Services.AddSingleton<ISecretReader>(secretReader);
            builder.Services.AddSingleton<ISetupInformationContext>(setupInformationContext);
            builder.Services.AddApplication();
            builder.Services.AddDatabaseInfrastructure(setupInformationContext);
            builder.Services.AddSwagger();
            builder.Services.AddHttpContextAccessor();
            builder.Services.AddServices();

            return setupInformationContext;
        }

        public static IServiceCollection AddSwagger(this IServiceCollection services)
        {
            // Add services to the container.
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();

            return services;
        }


        public static bool IsInheritedFrom(this Type type, Type Lookup)
        {
            var baseType = type.BaseType;
            if (baseType == null)
                return false;

            if (baseType.IsGenericType
                    && baseType.GetGenericTypeDefinition() == Lookup)
                return true;

            return baseType.IsInheritedFrom(Lookup);
        }

        public static void AddEndpoints(this WebApplication app)
        {
            var endpointDefinitionsTypes = Assembly
                .GetExecutingAssembly()
                .GetTypes()
                .Where(x => x.IsClass && !x.IsAbstract && x.IsInheritedFrom(typeof(EndpointDefiniton<,>)));

            foreach (var endpointDefinitionType in endpointDefinitionsTypes)
            {
                dynamic endpointDefinitionInstance = Activator.CreateInstance(endpointDefinitionType);
                endpointDefinitionInstance.Map(app);
            }
        }

        public static async Task Configure(this WebApplication app, ISetupInformationContext setupInformation)
        {
            using var scope = app.Services.CreateScope();

            await Infrastructure.Database.DependencyInjection.EnsureCreated(scope);

            app.AddEndpoints();
            // Configure the HTTP request pipeline.
            if (setupInformation.Environment.IsDevelopment())
            {

                app.UseSwagger();
                app.UseSwaggerUI();
            }
        }
    }
}
