using Api.ConfTerm.Application.Objects;
using Api.ConfTerm.Application.Objects.Abstract;
using Api.ConfTerm.Application.Objects.Requests.AnimalProduction;
using Api.ConfTerm.Domain.Interfaces.Repositories;
using Api.ConfTerm.Domain.Interfaces.Services;
using System.Threading;
using System.Threading.Tasks;

namespace Api.ConfTerm.Application.UseCases.AnimalProduction
{
    public class ListAnimalProductionUseCase : IUseCase<ListAnimalProductionsRequest>
    {
        private readonly IUserRepository _userRepository;
        private readonly IRequestorInfoService _requestorInfo;
        public ListAnimalProductionUseCase(IUserRepository userRepository, IRequestorInfoService userInfoService)
        {
            _requestorInfo = userInfoService;
            _userRepository = userRepository;
        }
        public async Task<ApplicationResponse> Handle(ListAnimalProductionsRequest request, CancellationToken cancellationToken = default)
        {
            var response = ApplicationResponse.OfOk();

            var animalProductions = await _userRepository.GetAnimalProductionsFromUser(_requestorInfo.Email, cancellationToken);

            return response.WithData(new { AnimalProductions = animalProductions });
        }
    }
}
