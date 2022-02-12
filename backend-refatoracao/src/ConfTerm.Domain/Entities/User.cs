using ConfTerm.Domain.ValueObjects;

namespace ConfTerm.Domain.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] Salt { get; set; }
        public UserType Type { get; set; }
        public Email Email { get; set; }
    }
}
