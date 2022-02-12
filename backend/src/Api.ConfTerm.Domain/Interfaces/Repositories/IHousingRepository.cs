using Api.ConfTerm.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Api.ConfTerm.Domain.Interfaces.Repositories
{
    public interface IHousingRepository : IRepository<Housing>
    {
        public Task<Housing> GetByIdIncludeOwnerAsync(int id, CancellationToken cancellationToken = default);
    }
}
