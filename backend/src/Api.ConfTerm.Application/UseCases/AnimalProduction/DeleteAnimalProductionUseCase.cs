using Api.ConfTerm.Application.Objects;
using Api.ConfTerm.Application.Objects.Abstract;
using Api.ConfTerm.Application.Objects.Requests.AnimalProduction;
using Api.ConfTerm.Domain.Interfaces.Repositories;
using Api.ConfTerm.Domain.Interfaces.Services;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Api.ConfTerm.Application.UseCases.AnimalProduction
{
    public class DeleteAnimalProductionUseCase : IUseCase<DeleteAnimalProductionRequest>
    {
        private readonly IAnimalProductionRepository _animalProductionRepository;
        private readonly IUserRepository _userRepository;
        private readonly IRequestorInfoService _requestorInfo;
        private readonly IUnitOfWork _unitOfWork;
        public DeleteAnimalProductionUseCase(IAnimalProductionRepository animalProductionRepository, IUserRepository userRepository, IUnitOfWork unitOfWork, IRequestorInfoService requestorInfo)
        {
            _unitOfWork = unitOfWork;
            _animalProductionRepository = animalProductionRepository;
            _requestorInfo = requestorInfo;
            _userRepository = userRepository;
        }

        public async Task<ApplicationResponse> Handle(DeleteAnimalProductionRequest request, CancellationToken cancellationToken = default)
        {
            var response = ApplicationResponse.OfOk();

            var requestorAnimalProductions = await _userRepository.GetAnimalProductionsFromUser(_requestorInfo.Email, cancellationToken);

            if (!requestorAnimalProductions.Any(animalProduction => animalProduction.Id == request.IdToBeDeleted))
                return response.WithForbidden(ApplicationError.Of("Specified Animal Production does not belong to the user"));

            await _animalProductionRepository.InactivateAnimalProductionAsync(request.IdToBeDeleted, cancellationToken);

            await _unitOfWork.SaveChangesAsync(cancellationToken);

            return response;
        }
    }
}
