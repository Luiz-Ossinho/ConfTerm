using Api.ConfTerm.Data.Contexts;
using Api.ConfTerm.Domain.Entities;
using Api.ConfTerm.Domain.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace Api.ConfTerm.Data.Repositories
{
    public class AnimalProductionRepository : Repository<AnimalProduction>, IAnimalProductionRepository
    {
        public AnimalProductionRepository(MeasurementContext measurementContext) : base(measurementContext)
        {
        }

        public async Task InactivateAnimalProductionAsync(int id, CancellationToken cancellationToken = default)
        {
            var animalProduction = await GetByIdAsync(id, cancellationToken);
            animalProduction.IsActive = false;
        }
    }
}
