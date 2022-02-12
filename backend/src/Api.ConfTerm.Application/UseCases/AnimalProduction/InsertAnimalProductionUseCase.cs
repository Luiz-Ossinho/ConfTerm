using Api.ConfTerm.Application.Objects;
using Api.ConfTerm.Application.Objects.Abstract;
using Api.ConfTerm.Domain.Interfaces.Repositories;
using Api.ConfTerm.Domain.Interfaces.Services;
using System.Threading;
using System.Threading.Tasks;
using Api.ConfTerm.Application.Objects.Requests.AnimalProduction;

namespace Api.ConfTerm.Application.UseCases.AnimalProduction
{
    public class InsertAnimalProductionUseCase : IUseCase<InsertAnimalProductionRequest>
    {
        private readonly IAnimalProductionRepository _animalProductionRepository;
        private readonly IHousingRepository _housingRepository;
        private readonly IRepository<Domain.Entities.Species> _speciesRepository;
        private readonly IRequestorInfoService _requestorInfo;
        private readonly IUnitOfWork _unitOfWork;
        public InsertAnimalProductionUseCase(IAnimalProductionRepository animalProductionRepository, IUnitOfWork unitOfWork, IHousingRepository housingRepository,
            IRepository<Domain.Entities.Species> speciesRepository, IRequestorInfoService requestorInfo)
        {
            _unitOfWork = unitOfWork;
            _animalProductionRepository = animalProductionRepository;
            _housingRepository = housingRepository;
            _speciesRepository = speciesRepository;
            _requestorInfo = requestorInfo;
        }

        public async Task<ApplicationResponse> Handle(InsertAnimalProductionRequest request, CancellationToken cancellationToken = default)
        {
            var response = ApplicationResponse.OfOk();

            var housing = await _housingRepository.GetByIdIncludeOwnerAsync(request.HousingId, cancellationToken);

            if (housing == default)
                return response.WithNotFound(ApplicationError.OfNotFound(nameof(housing)));

            if (housing.Owner.Email != _requestorInfo.Email)
                return response.WithForbidden(ApplicationError.Of("Specified housing does not belong to the user"));

            int animalProductionId = await PersistAnimalProduction(request, housing, cancellationToken);

            return response.WithCreated(new { AnimalProductionId = animalProductionId });
        }

        private async Task<int> PersistAnimalProduction(InsertAnimalProductionRequest request, Domain.Entities.Housing housing, CancellationToken cancellationToken)
        {
            var animalProduction = new Domain.Entities.AnimalProduction
            {
                Housing = housing,
                Birthday = request.BirthDay,
                Equipament = request.Equipament,
                MonitoringStart = request.MonitoringStart,
                MonitoringEnd = request.MonitoringEnd
            };

            var species = await _speciesRepository.GetByIdAsync(request.SpeciesId, cancellationToken);
            if (species != default)
                animalProduction.Species = species;

            await _animalProductionRepository.InsertAsync(animalProduction, cancellationToken);
            await _unitOfWork.SaveChangesAsync(cancellationToken);

            return animalProduction.Id;
        }
    }
}
