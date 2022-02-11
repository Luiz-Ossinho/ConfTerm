using Ardalis.SmartEnum;

namespace ConfTerm.Application.Models
{
    public class ApplicationResultCode : SmartEnum<ApplicationResultCode>
    {
        public static readonly ApplicationResultCode Unauthorized = new(nameof(Unauthorized), 1);
        public static readonly ApplicationResultCode Success = new(nameof(Success), 2);
        public static readonly ApplicationResultCode NotFound = new(nameof(NotFound), 3);
        public static readonly ApplicationResultCode Failure = new(nameof(Failure), 4);
        public static readonly ApplicationResultCode ValidationFailure = new(nameof(ValidationFailure), 5);
        public ApplicationResultCode(string name, int value) : base(name, value) { }
    }
}
