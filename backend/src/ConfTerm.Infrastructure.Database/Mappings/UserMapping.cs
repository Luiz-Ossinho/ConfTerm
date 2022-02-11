using ConfTerm.Infrastructure.Database.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ConfTerm.Infrastructure.Database.Mappings
{
    internal class UserMapping : IEntityTypeConfiguration<UserModel>
    {
        public void Configure(EntityTypeBuilder<UserModel> builder)
        {
            builder.ToTable("usuarios");
            builder.HasKey(user => user.Id);
            builder.Property(user => user.Id).HasColumnName("usuario_id");
            builder.Property(user => user.Name).HasColumnName("nome");
            builder.Property(user => user.PasswordHash).HasColumnName("hash_senha");
            builder.Property(user => user.Salt).HasColumnName("salt_senha");
            builder.Property(user => user.Email).HasColumnName("email");
            builder.Property(user => user.Type).HasColumnName("tipo");
        }
    }
}
