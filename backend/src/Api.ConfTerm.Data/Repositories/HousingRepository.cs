using Api.ConfTerm.Data.Contexts;
using Api.ConfTerm.Domain.Entities;
using Api.ConfTerm.Domain.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace Api.ConfTerm.Data.Repositories
{
    public class HousingRepository : Repository<Housing>, IHousingRepository
    {
        public HousingRepository(MeasurementContext measurementContext) : base(measurementContext)
        {
        }

        public async Task<Housing> GetByIdIncludeOwnerAsync(int id, CancellationToken cancellationToken = default)
            => await _set.Include(housing => housing.Owner)
                .FirstOrDefaultAsync(housing => housing.Id == id, cancellationToken);
    }
}
