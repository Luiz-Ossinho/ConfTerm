using System.ComponentModel.DataAnnotations;

namespace ConfTerm.Domain.ValueObjects
{
    public record Email(string Value)
    {
        private static readonly EmailAddressAttribute emailAddressAttribute = new();

        public static bool IsValid(Email email)
            => emailAddressAttribute.IsValid(email?.Value ?? "");
    }
}
