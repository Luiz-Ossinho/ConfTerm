using Ardalis.SmartEnum;

namespace ConfTerm.Domain.ValueObjects
{
    public sealed class UserType : SmartEnum<UserType>
    {
        public static readonly UserType Administrator = new(nameof(Administrator), 1);
        public static readonly UserType Normal = new(nameof(Normal), 2);
        public UserType(string name, int value) : base(name, value) { }
    }
}
