using ConfTerm.Domain.Entities;

namespace ConfTerm.Services.Abstractions.Interfaces
{
    public interface ITokenService
    {
        public string GenerateTokenForUser(User user);
    }
}
