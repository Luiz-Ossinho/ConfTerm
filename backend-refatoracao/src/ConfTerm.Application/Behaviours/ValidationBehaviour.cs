using ConfTerm.Application.Models;
using FluentValidation;
using MediatR;

namespace ConfTerm.Application.Behaviours
{
    public class ValidationBehaviour<RRequest, RResponse> : IPipelineBehavior<RRequest, RResponse>
        where RResponse : IApplicationResult, new()
        where RRequest : IRequest<RResponse>
    {
        private readonly IEnumerable<IValidator<RRequest>> _validators;
        public ValidationBehaviour(IEnumerable<IValidator<RRequest>> validators)
        {
            _validators = validators;
        }

        public async Task<RResponse> Handle(RRequest request, CancellationToken cancellationToken, RequestHandlerDelegate<RResponse> next)
        {
            if (_validators.Any())
            {
                var context = new ValidationContext<RRequest>(request);

                var validationResults = await Task.WhenAll(_validators.Select(v => v.ValidateAsync(context, cancellationToken)));

                var failures = validationResults.SelectMany(r => r.Errors).Where(f => f != null).ToList();

                if (failures.Count != 0)
                    return ApplicationResult.ValidationFailure(failures).To<RResponse>();
            }

            return await next();
        }
    }
}
