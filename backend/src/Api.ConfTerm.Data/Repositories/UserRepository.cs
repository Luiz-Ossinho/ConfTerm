using Api.ConfTerm.Data.Contexts;
using Api.ConfTerm.Domain.Entities;
using Api.ConfTerm.Domain.Interfaces.Repositories;
using Api.ConfTerm.Domain.ValueObjects;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Api.ConfTerm.Data.Repositories
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        public UserRepository(MeasurementContext measurementContext) : base(measurementContext) { }

        public async Task<IEnumerable<AnimalProduction>> GetAnimalProductionsFromUser(Email email, CancellationToken cancelletionToken = default)
            => await Task.Run(
                () => _set.Include(user => user.Housings)
                    .ThenInclude(housing => housing.AnimalProductions)
                    .ThenInclude(animalProduction => animalProduction.Species)
                    .Include(user => user.Housings)
                    .ThenInclude(housing => housing.AnimalProductions)
                    .ThenInclude(animalProduction => animalProduction.Housing)
                    .Where(user => user.Email.Value == email.Value)
                    .SelectMany(user => user.Housings.SelectMany(housing => housing.AnimalProductions))
                    .AsNoTracking()
                , cancelletionToken
            );

        public async Task<User> GetByEmailAsync(Email email, CancellationToken cancellationToken = default)
            => await _set.FirstOrDefaultAsync(user => user.Email.Value == email.Value, cancellationToken: cancellationToken);

        public async Task<IEnumerable<Housing>> GetHousingsFromUser(Email email, CancellationToken cancelletionToken = default)
            => await Task.Run(
                () => _set.Include(user => user.Housings)
                    .Where(user => user.Email.Value == email.Value)
                    .SelectMany(user => user.Housings)
                    .AsNoTracking()
                , cancelletionToken
            );
    }
}
