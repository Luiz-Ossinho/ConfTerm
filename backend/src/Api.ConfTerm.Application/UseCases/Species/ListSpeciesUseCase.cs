using Api.ConfTerm.Application.Objects;
using Api.ConfTerm.Application.Objects.Abstract;
using Api.ConfTerm.Application.Objects.Requests.Species;
using Api.ConfTerm.Domain.Interfaces.Repositories;
using System.Threading;
using System.Threading.Tasks;

namespace Api.ConfTerm.Application.UseCases.Species
{
    public class ListSpeciesUseCase : IUseCase<ListSpeciesRequest>
    {
        private readonly IRepository<Domain.Entities.Species> _repository;
        public ListSpeciesUseCase(IRepository<Domain.Entities.Species> repository)
        {
            _repository = repository;
        }

        public async Task<ApplicationResponse> Handle(ListSpeciesRequest request, CancellationToken cancellationToken = default)
        {
            var response = ApplicationResponse.OfOk();

            var species = await _repository.GetAllAsync(cancellationToken);

            return response.WithData(new { Species = species });
        }
    }
}
