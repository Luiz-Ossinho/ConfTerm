using ConfTerm.Application.Models;

namespace ConfTerm.Presentation.Helpers
{
    public class MapperHelper
    {
        public static IReadOnlyCollection<AbstractApplicationResultMapper> Mappers { get; } = new List<AbstractApplicationResultMapper>
        {
            new NotFoundApplicationResultMapper(),
            new UnauthorizedApplicationResultMapper(),
            new FailedApplicationResultMapper(),
            new SuccessfullApplicationResultMapper()
        };

        public static IResult MapToResult<TResultContent>(ApplicationResult<TResultContent> applicationResult)
        {
            var correctMapper = Mappers.First(m => m.CanMap(applicationResult));

            return correctMapper.Map(applicationResult);
        }


        private static object FromResult<TResultContent>(ApplicationResult<TResultContent> applicationResult)
        {
            if (applicationResult.Content is not null)
            {

                if (applicationResult.Errors.Count == 0)
                    return new { applicationResult.Content, Success = applicationResult.Succes };

                return new { applicationResult.Content, Success = applicationResult.Succes, Errors = FormatErrors(applicationResult.Errors) };
            }


            if (applicationResult.Errors.Count == 0)
                return new { Success = applicationResult.Succes };

            return new { Success = applicationResult.Succes, Errors = FormatErrors(applicationResult.Errors) };

        }

        private static object FormatErrors(IEnumerable<ApplicationError> errors)
        {
            if (errors is null || !errors.Any())
            {
                return Array.Empty<object>();
            }

            var errorList = new List<object>();

            foreach (var grouping in errors.Where(error => error.FieldName is not null).GroupBy(error => error.FieldName))
                errorList.Add(new { Field = grouping.Key, Messages = grouping.Select(error => error.Message) });

            foreach (var error in errors.Where(error => error.FieldName is null))
                errorList.Add(new { error.Message });

            if (errorList.Count == 1)
                return errorList[0];

            return errorList;
        }

        public abstract class AbstractApplicationResultMapper
        {
            public abstract bool CanMap<TResultContent>(ApplicationResult<TResultContent> applicationResult);
            public abstract IResult Map<TResultContent>(ApplicationResult<TResultContent> applicationResult);
        }

        #region Mappers
        public class NotFoundApplicationResultMapper : AbstractApplicationResultMapper
        {
            public override bool CanMap<TResultContent>(ApplicationResult<TResultContent> applicationResult)
            {
                return applicationResult.ResultCode == ApplicationResultCode.NotFound;
            }

            public override IResult Map<TResultContent>(ApplicationResult<TResultContent> applicationResult)
            {
                return Results.NotFound(FromResult(applicationResult));
            }
        }

        public class FailedApplicationResultMapper : AbstractApplicationResultMapper
        {
            public override bool CanMap<TResultContent>(ApplicationResult<TResultContent> applicationResult)
            {
                return applicationResult.ResultCode == ApplicationResultCode.ValidationFailure || applicationResult.ResultCode == ApplicationResultCode.Failure;
            }

            public override IResult Map<TResultContent>(ApplicationResult<TResultContent> applicationResult)
            {
                return Results.BadRequest(FromResult(applicationResult));
            }
        }

        public class UnauthorizedApplicationResultMapper : AbstractApplicationResultMapper
        {
            public override bool CanMap<TResultContent>(ApplicationResult<TResultContent> applicationResult)
            {
                return applicationResult.ResultCode == ApplicationResultCode.Unauthorized;
            }

            public override IResult Map<TResultContent>(ApplicationResult<TResultContent> applicationResult)
            {
                return Results.Unauthorized();
            }
        }

        public class SuccessfullApplicationResultMapper : AbstractApplicationResultMapper
        {
            public override bool CanMap<TResultContent>(ApplicationResult<TResultContent> applicationResult)
            {
                return applicationResult.ResultCode == ApplicationResultCode.Success;
            }

            public override IResult Map<TResultContent>(ApplicationResult<TResultContent> applicationResult)
            {
                return Results.Ok(FromResult(applicationResult));
            }
        }
        #endregion
    }
}
