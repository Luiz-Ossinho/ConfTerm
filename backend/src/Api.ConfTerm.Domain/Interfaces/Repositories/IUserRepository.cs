using Api.ConfTerm.Domain.Entities;
using Api.ConfTerm.Domain.ValueObjects;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Api.ConfTerm.Domain.Interfaces.Repositories
{
    public interface IUserRepository : IRepository<User>
    {
        public Task<User> GetByEmailAsync(Email email, CancellationToken cancelletionToken = default);
        public Task<IEnumerable<AnimalProduction>> GetAnimalProductionsFromUser(Email email, CancellationToken cancelletionToken = default);
        public Task<IEnumerable<Housing>> GetHousingsFromUser(Email email, CancellationToken cancelletionToken = default);
    }
}
