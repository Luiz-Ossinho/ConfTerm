using Api.ConfTerm.Application.Objects;
using Api.ConfTerm.Application.Objects.Abstract;
using Api.ConfTerm.Application.Objects.Requests.Housing;
using Api.ConfTerm.Domain.Entities;
using Api.ConfTerm.Domain.Interfaces.Repositories;
using Api.ConfTerm.Domain.Interfaces.Services;
using System.Threading;
using System.Threading.Tasks;

namespace Api.ConfTerm.Application.UseCases.Housing
{
    public class InsertHousingUseCase : IUseCase<InsertHousingRequest>
    {
        private readonly IUserRepository _userRepository;
        private readonly IHousingRepository _housingRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRequestorInfoService _requestorInfo;
        public InsertHousingUseCase(IUserRepository userRepository, IRequestorInfoService requestorInfo, IHousingRepository housingRepository, IUnitOfWork unitOfWork)
        {
            _userRepository = userRepository;
            _housingRepository = housingRepository;
            _unitOfWork = unitOfWork;
            _requestorInfo = requestorInfo;
        }

        public async Task<ApplicationResponse> Handle(InsertHousingRequest request, CancellationToken cancellationToken = default)
        {
            var response = ApplicationResponse.OfOk();

            var owner = await _userRepository.GetByEmailAsync(_requestorInfo.Email, cancellationToken);

            if (owner == default)
                return response.WithNotFound(ApplicationError.OfNotFound(nameof(owner)));

            int housingId = await PersistHousing(request, owner, cancellationToken);

            return response.WithCreated(new { HousingId = housingId });
        }

        private async Task<int> PersistHousing(InsertHousingRequest request, User owner, CancellationToken cancellationToken)
        {
            var hosuing = new Domain.Entities.Housing
            {
                Identification = request.Identificantion,
                Owner = owner
            };

            await _housingRepository.InsertAsync(hosuing, cancellationToken);
            await _unitOfWork.SaveChangesAsync(cancellationToken);

            var housingId = hosuing.Id;
            return housingId;
        }
    }
}
