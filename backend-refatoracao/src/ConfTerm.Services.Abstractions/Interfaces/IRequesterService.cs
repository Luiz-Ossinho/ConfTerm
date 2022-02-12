using ConfTerm.Domain.ValueObjects;

namespace ConfTerm.Services.Abstractions.Interfaces
{
    public interface IRequesterService
    {
        public Email Email { get; }
        public UserType UserType { get; }
    }
}
