using ConfTerm.Application.Attributes;
using ConfTerm.Application.Models;
using ConfTerm.Infrastructure.Database.Abstractions.Interfaces;
using ConfTerm.Services.Abstractions.Interfaces;
using MediatR;
using System.Reflection;

namespace ConfTerm.Application.Behaviours
{
    public class AuthorizationBehaviour<RRequest, RResponse> : IPipelineBehavior<RRequest, RResponse>
        where RResponse : IApplicationResult, new()
        where RRequest : IRequest<RResponse>
    {
        private readonly IUserRepository userRepository;
        private readonly IRequesterService requesterService;

        public AuthorizationBehaviour(IUserRepository userRepository, IRequesterService requesterService)
        {
            this.userRepository = userRepository;
            this.requesterService = requesterService;
        }

        public async Task<RResponse> Handle(RRequest request, CancellationToken cancellationToken, RequestHandlerDelegate<RResponse> next)
        {
            var authorizeAttribute = request.GetType().GetCustomAttribute<ApplicationAuthorizeAttribute>();

            if (authorizeAttribute is not null)
            {
                if (requesterService.Email is null)
                    return ApplicationResult.Unauthorized().To<RResponse>();

                var user = await userRepository.GetByEmailAsync(requesterService.Email, cancellationToken);

                if (user.Type != requesterService.UserType)
                    return ApplicationResult.Unauthorized().To<RResponse>();

                if (!authorizeAttribute.AllowedTypes.Contains(user.Type))
                    return ApplicationResult.Unauthorized().To<RResponse>();
            }

            return await next();
        }
    }
}
