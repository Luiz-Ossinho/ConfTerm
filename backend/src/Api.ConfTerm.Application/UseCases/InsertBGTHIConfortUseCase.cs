using Api.ConfTerm.Application.Objects;
using Api.ConfTerm.Application.Objects.Abstract;
using Api.ConfTerm.Application.Objects.Requests;
using Api.ConfTerm.Domain.Entities;
using Api.ConfTerm.Domain.Interfaces.Repositories;
using Api.ConfTerm.Domain.Interfaces.Services;
using System.Threading;
using System.Threading.Tasks;

namespace Api.ConfTerm.Application.UseCases
{
    public class InsertBGTHIConfortUseCase : IUseCase<InsertBlackGlobeTemparuteHumidityIndexConfortRequest>
    {
        private readonly IRepository<BlackGlobeTemparuteHumidityIndexConfort> _bgthiRepository;
        private readonly IRepository<Domain.Entities.Species> _speciesRepository;
        private readonly IUnitOfWork _unitOfWork;

        public InsertBGTHIConfortUseCase(IRepository<BlackGlobeTemparuteHumidityIndexConfort> bgthiRepository,
            IUnitOfWork unitOfWork, IRepository<Domain.Entities.Species> speciesRepository)
        {
            _bgthiRepository = bgthiRepository;
            _unitOfWork = unitOfWork;
            _speciesRepository = speciesRepository;
        }

        public async Task<ApplicationResponse> Handle(InsertBlackGlobeTemparuteHumidityIndexConfortRequest request, CancellationToken cancellationToken = default)
        {
            var response = ApplicationResponse.OfOk();

            var species = await _speciesRepository.GetByIdAsync(request.SpeciesId, cancellationToken);

            if (species == default)
                return response.WithNotFound(ApplicationError.OfNotFound(nameof(species)));

            await PersistBlackGlobeTemperatureHumidityIndexConfort(request, species, cancellationToken);

            return response.WithCreated();
        }

        private async Task PersistBlackGlobeTemperatureHumidityIndexConfort(InsertBlackGlobeTemparuteHumidityIndexConfortRequest request, Domain.Entities.Species species, CancellationToken cancellationToken = default)
        {
            var confort = new BlackGlobeTemparuteHumidityIndexConfort
            {
                Level = request.Level,
                MaximunAge = request.MaximunAge,
                MinimunAge = request.MinimunAge,
                Species = species,
                MaximunBlackGlobeTemperatureHumidityIndex = request.MaximunBGTHI,
                MinimunBlackGlobeTemperatureHumidityIndex = request.MinimunBGTHI
            };

            await _bgthiRepository.InsertAsync(confort, cancellationToken);
            await _unitOfWork.SaveChangesAsync(cancellationToken);
        }
    }
}
