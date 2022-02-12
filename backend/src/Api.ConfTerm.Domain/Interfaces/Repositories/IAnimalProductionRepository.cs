using Api.ConfTerm.Domain.Entities;
using System.Threading;
using System.Threading.Tasks;

namespace Api.ConfTerm.Domain.Interfaces.Repositories
{
    public interface IAnimalProductionRepository : IRepository<AnimalProduction>
    {
        public Task InactivateAnimalProductionAsync(int id, CancellationToken cancellationToken = default);
    }
}
