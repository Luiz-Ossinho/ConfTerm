using Api.ConfTerm.Application.Objects;
using Api.ConfTerm.Application.Objects.Abstract;
using Api.ConfTerm.Application.Objects.Requests.Housing;
using Api.ConfTerm.Domain.Interfaces.Repositories;
using Api.ConfTerm.Domain.Interfaces.Services;
using System.Threading;
using System.Threading.Tasks;

namespace Api.ConfTerm.Application.UseCases.AnimalProduction.Housing
{
    public class ListHousingUseCase : IUseCase<ListHousingRequest>
    {
        private readonly IUserRepository _userRepository;
        private readonly IRequestorInfoService _requestorInfo;
        public ListHousingUseCase(IUserRepository userRepository, IRequestorInfoService userInfoService)
        {
            _requestorInfo = userInfoService;
            _userRepository = userRepository;
        }

        public async Task<ApplicationResponse> Handle(ListHousingRequest request, CancellationToken cancellationToken = default)
        {
            var response = ApplicationResponse.OfOk();

            var housings = await _userRepository.GetHousingsFromUser(_requestorInfo.Email, cancellationToken);

            return response.WithData(new { Housings = housings });
        }
    }
}
