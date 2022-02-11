using ConfTerm.Application.Models;
using ConfTerm.Domain.ValueObjects;
using ConfTerm.Infrastructure.Database.Abstractions.Interfaces;
using ConfTerm.Services.Abstractions.Interfaces;
using MediatR;

namespace ConfTerm.Application.UseCases.Auth.Login
{
    public class LoginRequestHandler : IRequestHandler<LoginRequest, ApplicationResult<LoginResponse>>
    {
        private readonly IUserRepository userRepository;
        private readonly IHashingService hashingService;
        private readonly ITokenService tokenService;

        public LoginRequestHandler(IUserRepository userRepository, IHashingService hashingService, ITokenService tokenService)
        {
            this.userRepository = userRepository;
            this.hashingService = hashingService;
            this.tokenService = tokenService;
        }

        public async Task<ApplicationResult<LoginResponse>> Handle(LoginRequest request, CancellationToken cancellationToken)
        {
            (Email email, string password) = request;

            var user = await userRepository.GetByEmailAsync(email, cancellationToken);

            if (user is null)
                return ApplicationResult.NotFound(nameof(email)).As<LoginResponse>();

            var hashComparation = hashingService.Compare(password, user.PasswordHash, user.Salt);

            if (!hashComparation)
                return ApplicationResult.Unauthorized().As<LoginResponse>();

            var token = tokenService.GenerateTokenForUser(user);

            var response = new LoginResponse(token, user.Name, user.Type == UserType.Administrator);

            return ApplicationResult.Success().WithContent(response);
        }
    }
}
