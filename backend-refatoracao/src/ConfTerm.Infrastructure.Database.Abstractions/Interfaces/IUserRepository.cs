using ConfTerm.Domain.Entities;
using ConfTerm.Domain.ValueObjects;

namespace ConfTerm.Infrastructure.Database.Abstractions.Interfaces
{
    public interface IUserRepository
    {
        public Task<User> GetByEmailAsync(Email email, CancellationToken cancelletionToken = default);
    }
}
