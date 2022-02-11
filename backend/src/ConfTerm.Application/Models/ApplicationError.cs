using FluentValidation.Results;

namespace ConfTerm.Application.Models
{
    public class ApplicationError
    {
        private ApplicationError(string errorMessage, string? fieldName = null)
        {
            Message = errorMessage;
            FieldName = fieldName;
        }
        public string Message { get; init; }
        public string? FieldName { get; init; }
        //public string Value { get => FieldName != default ? $"Error in the field {FieldName}: Value {Error}" : Error; }

        public static ApplicationError Of(string error)
            => new(error);

        public static ApplicationError FromValidation(ValidationFailure validationFailure)
            => new(validationFailure.ErrorMessage, validationFailure.PropertyName);

        public static ApplicationError OfNotFound(string objectName)
            => new($"{objectName} was Not Found");

        public static ApplicationError Of(string error, string fieldName)
            => new(error, fieldName);
    }
}
