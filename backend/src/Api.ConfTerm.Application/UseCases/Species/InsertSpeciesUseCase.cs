using Api.ConfTerm.Application.Objects;
using Api.ConfTerm.Application.Objects.Abstract;
using Api.ConfTerm.Application.Objects.Requests.Species;
using Api.ConfTerm.Domain.Interfaces.Repositories;
using Api.ConfTerm.Domain.Interfaces.Services;
using System.Threading;
using System.Threading.Tasks;

namespace Api.ConfTerm.Application.UseCases.Species
{
    public class InsertSpeciesUseCase : IUseCase<InsertSpeciesRequest>
    {
        private readonly IRepository<Domain.Entities.Species> _repository;
        private readonly IUnitOfWork _unitOfWork;
        public InsertSpeciesUseCase(IRepository<Domain.Entities.Species> repository, IUnitOfWork unitOfWork)
        {
            _repository = repository;
            _unitOfWork = unitOfWork;
        }

        public async Task<ApplicationResponse> Handle(InsertSpeciesRequest request, CancellationToken cancelletionToken = default)
        {
            var response = ApplicationResponse.OfOk();

            var speciesId = await PersistSpecies(request, cancelletionToken);

            return response.WithCreated(new { SpeciesId = speciesId });
        }

        private async Task<int> PersistSpecies(InsertSpeciesRequest request, CancellationToken cancelletionToken)
        {
            var species = new Domain.Entities.Species
            {
                Name = request.Name
            };

            await _repository.InsertAsync(species, cancelletionToken);
            await _unitOfWork.SaveChangesAsync(cancelletionToken);

            return species.Id;
        }
    }
}
