using ConfTerm.Domain.Entities;
using ConfTerm.Domain.ValueObjects;
using ConfTerm.Infrastructure.Database.Abstractions.Interfaces;
using ConfTerm.Infrastructure.Database.Models;
using Microsoft.EntityFrameworkCore;

namespace ConfTerm.Infrastructure.Database.Repositories
{
    public class UserRepository : IUserRepository
    {
        protected readonly DbSet<UserModel> _set;
        public UserRepository(ConfTermContext confTermContext)
        {
            _set = confTermContext.Set<UserModel>();
        }
        public async Task<User> GetByEmailAsync(Email email, CancellationToken cancelletionToken = default)
        {
            var userModel = await _set.FirstOrDefaultAsync(user => user.Email == email.Value, cancellationToken: cancelletionToken);
            return userModel.ToEntity();
        }
    }
}
