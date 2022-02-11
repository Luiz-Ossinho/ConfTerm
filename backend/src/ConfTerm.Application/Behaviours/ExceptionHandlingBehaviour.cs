using ConfTerm.Application.Models;
using ConfTerm.Services.Abstractions.Interfaces;
using MediatR;
using Microsoft.Extensions.Hosting;

namespace ConfTerm.Application.Behaviours
{
    public class ExceptionHandlingBehaviour<RRequest, RResponse> : IPipelineBehavior<RRequest, RResponse>
        where RResponse : IApplicationResult, new()
        where RRequest : IRequest<RResponse>
    {
        private readonly ISetupInformationContext setupInformationContext;

        public ExceptionHandlingBehaviour(ISetupInformationContext setupInformationContext)
        {
            this.setupInformationContext = setupInformationContext;
        }

        public async Task<RResponse> Handle(RRequest request, CancellationToken cancellationToken, RequestHandlerDelegate<RResponse> next)
        {
            try
            {
                return await next();
            }
            catch (Exception ex)
            {
                if (setupInformationContext.Environment.IsDevelopment())
                    return ApplicationResult.Failure(ApplicationError.Of(ex.Message)).To<RResponse>();

                return ApplicationResult.Failure(ApplicationError.Of("Unkown!")).To<RResponse>();
            }
        }
    }
}
