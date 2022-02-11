using ConfTerm.Domain.ValueObjects;
using ConfTerm.Services.Abstractions.Interfaces;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace ConfTerm.Services.Concretes
{
    internal class HttpRequesterService : IRequesterService
    {
        private readonly IHttpContextAccessor httpContextAccessor;

        public HttpRequesterService(IHttpContextAccessor httpContextAccessor)
        {
            this.httpContextAccessor = httpContextAccessor;
        }

        private Claim GetClaim(string type)
        {
            return httpContextAccessor.HttpContext.User.Claims.Where(c => c.Type == type).SingleOrDefault()
                ?? throw new ArgumentException("No claim with such name");
        }

        public Email Email => new(GetClaim(nameof(Email)).Value);

        public UserType UserType => UserType.FromValue(int.Parse(GetClaim(nameof(UserType)).Value));
    }
}
