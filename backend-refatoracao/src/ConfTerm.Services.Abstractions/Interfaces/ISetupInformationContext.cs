using Microsoft.Extensions.Configuration;

namespace ConfTerm.Services.Abstractions.Interfaces
{
    public interface ISetupInformationContext
    {
        public IConfiguration Configuration { get; }
        public Microsoft.Extensions.Hosting.IHostingEnvironment Environment { get; }
        public ISecretReader SecretReader { get; }
    }
}
