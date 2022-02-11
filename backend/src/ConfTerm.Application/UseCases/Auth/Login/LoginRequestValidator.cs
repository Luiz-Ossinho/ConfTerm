using ConfTerm.Domain.ValueObjects;
using FluentValidation;

namespace ConfTerm.Application.UseCases.Auth.Login
{
    public class LoginRequestValidator : AbstractValidator<LoginRequest>
    {
        public LoginRequestValidator()
        {
            RuleFor(request => request.Email)
                .Must(email => Email.IsValid(email));

            RuleFor(request => request.Password)
                .NotEmpty();
        }
    }
}
