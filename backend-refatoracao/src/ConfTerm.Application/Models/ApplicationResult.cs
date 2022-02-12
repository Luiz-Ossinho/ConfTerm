using FluentValidation.Results;
using MediatR;

namespace ConfTerm.Application.Models
{
    public interface IApplicationResult
    {
        public bool Succes { get; init; }
        public ApplicationResultCode ResultCode { get; init; }
        public ICollection<ApplicationError> Errors { get; init; }

        public R To<R>() where R : IApplicationResult, new();
        public ApplicationResult<TContent> As<TContent>();
        public ApplicationResult<TContent> WithContent<TContent>(TContent content);
    }

    public class ApplicationResult : IApplicationResult
    {
        public bool Succes { get; init; } = true;
        public ApplicationResultCode ResultCode { get; init; } = ApplicationResultCode.Success;
        public ICollection<ApplicationError> Errors { get; init; } = new List<ApplicationError>();

        public virtual R To<R>() where R : IApplicationResult, new()
        {
            var genericInheritor = new R()
            {
                Errors = Errors,
                Succes = Succes,
                ResultCode = ResultCode
            };

            return genericInheritor;
        }

        public ApplicationResult<TContent> WithContent<TContent>(TContent content)
        {
            return new ApplicationResult<TContent>
            {
                Succes = Succes,
                Content = content,
                Errors = Errors,
                ResultCode = ResultCode
            };
        }

        public ApplicationResult<TContent> As<TContent>()
        {
            return new ApplicationResult<TContent>
            {
                Succes = Succes,
                Content = default,
                Errors = Errors,
                ResultCode = ResultCode
            };
        }

        public static IApplicationResult Unauthorized()
        {
            var genericInheritor = new ApplicationResult()
            {
                Errors = new ApplicationError[] { ApplicationError.Of("Unauthorized!") }.ToList(),
                Succes = false,
                ResultCode = ApplicationResultCode.Unauthorized
            };

            return genericInheritor;
        }
        public static IApplicationResult NotFound(string objectName)
        {
            var genericInheritor = new ApplicationResult()
            {
                Errors = new ApplicationError[] { ApplicationError.OfNotFound(objectName) }.ToList(),
                Succes = false,
                ResultCode = ApplicationResultCode.NotFound
            };

            return genericInheritor;
        }

        public static ApplicationResult Success()
        {
            var result = new ApplicationResult
            {
                Errors = Array.Empty<ApplicationError>(),
                ResultCode = ApplicationResultCode.Success,
                Succes = true
            };

            return result;
        }

        public static ApplicationResult ValidationFailure(IEnumerable<ValidationFailure> validationFailures)
        {
            var errors = validationFailures.Select(validationFailure => ApplicationError.FromValidation(validationFailure));

            var result = new ApplicationResult
            {
                Succes = false,
                ResultCode = ApplicationResultCode.ValidationFailure,
                Errors = errors.ToList()
            };

            return result;
        }

        public static ApplicationResult Failure(ApplicationError? error = default)
        {
            var result = new ApplicationResult
            {
                Errors = error is not null ? new List<ApplicationError> { error } : new List<ApplicationError>(),
                Succes = false,
                ResultCode = ApplicationResultCode.Failure
            };

            return result;
        }
    }

    public class ApplicationResult<TContent> : ApplicationResult
    {
        public TContent? Content { get; init; }
    }
}