using ConfTerm.Services.Abstractions.Interfaces;
using ConfTerm.Services.Abstractions.Payloads.ISecretReader;
using Microsoft.Extensions.Hosting;
using System.Text;
using System.Text.Json;

namespace ConfTerm.Services.Concretes
{
    public class EnviromentVariableSecretReader : ISecretReader
    {
        public const string EnviromentVariablePrefix = "CONFTEM_";

        private static IDictionary<string, string> DevelopmentValues { get; } = new Dictionary<string, string>
        {
            { nameof(TokenKey), "DEVELOPMENT_TOKEN_KEY" },
            { nameof(DatabaseConnectionString), "C:\\Arquivos\\ConfTerm.db" },
            { nameof(Superuser), "{ \"Email\": \"superuser@valid.domain\", \"Password\": \"password1234\", \"Name\":\"Superuser\"}"}
        };

        private readonly ISetupInformationContext setupInformation;
        public EnviromentVariableSecretReader(ISetupInformationContext setupInformation)
        {
            this.setupInformation = setupInformation;
        }

        public byte[] TokenKey => Encoding.ASCII.GetBytes(ReadEnviromentVariable(nameof(TokenKey)));
        public string DatabaseConnectionString => ReadEnviromentVariable(nameof(DatabaseConnectionString));
        public Superuser Superuser => ReadEnviromentVariableAsJson<Superuser>(nameof(Superuser));

        private string ReadEnviromentVariable(string variableName)
        {
            if (setupInformation.Environment.IsDevelopment())
                return DevelopmentValues[variableName];

            return Environment.GetEnvironmentVariable(EnviromentVariablePrefix + variableName)
                ?? throw new ArgumentException($"Invalid variable name: {EnviromentVariablePrefix + variableName}");
        }
        private TObject ReadEnviromentVariableAsJson<TObject>(string variableName)
        {
            return JsonSerializer.Deserialize<TObject>(ReadEnviromentVariable(variableName))
                ?? throw new ArgumentException($"Invalid variable name: {EnviromentVariablePrefix + variableName}");
        }
    }
}
