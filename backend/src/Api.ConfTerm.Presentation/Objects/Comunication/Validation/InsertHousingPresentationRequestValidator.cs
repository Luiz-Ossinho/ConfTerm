using Api.ConfTerm.Presentation.Objects.Comunication.Requests;
using FluentValidation;

namespace Api.ConfTerm.Presentation.Objects.Comunication.Validation
{
    public class InsertHousingPresentationRequestValidator : AbstractValidator<InsertHousingPresentationRequest>
    {
        public InsertHousingPresentationRequestValidator()
        {
            RuleFor(r => r.Identificantion)
                .NotEmpty()
                .MaximumLength(255);
        }
    }
}
