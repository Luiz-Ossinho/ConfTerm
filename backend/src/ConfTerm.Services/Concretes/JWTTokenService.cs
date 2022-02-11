using ConfTerm.Domain.Entities;
using ConfTerm.Services.Abstractions.Interfaces;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace ConfTerm.Services.Concretes
{
    public class JWTTokenService : ITokenService
    {
        private readonly ISecretReader secretReader;

        public JWTTokenService(ISecretReader secretReader)
        {
            this.secretReader = secretReader;
        }

        public string GenerateTokenForUser(User user)
        {
            var claims = new List<Claim> {
                new Claim(ClaimTypes.Name, user.Name),
                new Claim(ClaimTypes.Role, user.Type.Name),
                new Claim(nameof(user.Email),user.Email.Value),
                new Claim(nameof(user.Type), user.Type.Value.ToString())
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(2),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(secretReader.TokenKey), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}
