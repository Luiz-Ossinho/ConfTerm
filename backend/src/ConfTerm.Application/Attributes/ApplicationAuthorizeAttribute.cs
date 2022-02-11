using ConfTerm.Domain.ValueObjects;

namespace ConfTerm.Application.Attributes
{
    [AttributeUsage(AttributeTargets.Class, AllowMultiple = false, Inherited = true)]
    public class ApplicationAuthorizeAttribute : Attribute
    {
        public IEnumerable<UserType> AllowedTypes { get; private set; }
        public IEnumerable<string> RequiredPermissions { get; private set; }
        public ApplicationAuthorizeAttribute(params UserType[] allowedTypes)
        {
            if (allowedTypes.Length == 0)
                AllowedTypes = UserType.List;
            else
                AllowedTypes = allowedTypes;
        }
    }
}
