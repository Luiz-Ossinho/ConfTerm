using ConfTerm.Domain.Entities;
using ConfTerm.Domain.ValueObjects;

namespace ConfTerm.Infrastructure.Database.Models
{
    public class UserModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] Salt { get; set; }
        public int Type { get; set; }
        public string Email { get; set; }

        public User ToEntity()
        {

            return new User
            {
                Id = Id,
                Email = new Email(Email),
                Name = Name,
                PasswordHash = PasswordHash,
                Salt = Salt,
                Type = UserType.FromValue(Type)
            };
        }
    }
}
