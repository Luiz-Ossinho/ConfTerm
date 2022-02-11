using ConfTerm.Services.Abstractions.Interfaces;

namespace ConfTerm.Presentation
{
#pragma warning disable CS0618 // Type or member is obsolete
    public class SetupInformationContext : ISetupInformationContext
    {
        public SetupInformationContext(IConfiguration configuration, IWebHostEnvironment webHostEnvironment)
        {
            Environment = webHostEnvironment as Microsoft.Extensions.Hosting.IHostingEnvironment ?? throw new ArgumentException("Could not build enviroment!");
            Configuration = configuration;
        }
        public IConfiguration Configuration { get; }
        public Microsoft.Extensions.Hosting.IHostingEnvironment Environment { get; }
        public ISecretReader SecretReader { get => Reader; }

        private ISecretReader Reader { get; set; } = default!;

        public SetupInformationContext WithSecretReader(ISecretReader secretReader)
        {
            Reader = secretReader;
            return this;
        }
    }
#pragma warning restore CS0618 // Type or member is obsolete

}
