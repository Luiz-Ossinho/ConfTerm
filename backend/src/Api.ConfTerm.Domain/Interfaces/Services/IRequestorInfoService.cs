using Api.ConfTerm.Domain.ValueObjects;

namespace Api.ConfTerm.Domain.Interfaces.Services
{
    public interface IRequestorInfoService
    {
        public string Name { get; }
        public Email Email { get; }
        public UserType Type { get; }
    }
}
