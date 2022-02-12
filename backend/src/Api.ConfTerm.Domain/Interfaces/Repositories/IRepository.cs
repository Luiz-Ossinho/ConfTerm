﻿using Api.ConfTerm.Domain.Entities.Abstract;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Api.ConfTerm.Domain.Interfaces.Repositories
{
    public interface IRepository<TEntity> where TEntity : IdentifiableEntity
    {
        public Task<IEnumerable<TEntity>> GetAllAsync(CancellationToken cancellationToken = default);
        public Task<TEntity> GetByIdAsync(int id, CancellationToken cancellationToken = default);
        public Task InsertAsync(TEntity entity, CancellationToken cancellationToken = default);
        public Task DeleteByIdAsync(int id, CancellationToken cancellationToken = default);
    }
}
