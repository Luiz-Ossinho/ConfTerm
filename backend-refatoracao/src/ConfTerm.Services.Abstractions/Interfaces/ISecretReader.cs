using ConfTerm.Services.Abstractions.Payloads.ISecretReader;

namespace ConfTerm.Services.Abstractions.Interfaces
{
    public interface ISecretReader
    {
        byte[] TokenKey { get; }
        string DatabaseConnectionString { get; }
        Superuser Superuser { get; }
    }
}
