﻿using Api.ConfTerm.Domain.Interfaces.Services;
using Api.ConfTerm.Domain.ValueObjects;
using Microsoft.AspNetCore.Http;
using System.Linq;
using System.Security.Claims;

namespace Api.ConfTerm.Application.Services
{
    public class RequestorInfoService : IRequestorInfoService
    {
        private readonly ClaimsPrincipal user;
        public RequestorInfoService(IHttpContextAccessor contextAccessor)
        {
            user = contextAccessor.HttpContext.User;
        }
        public string Name => user.Identity.Name;
        public Email Email => new(GetFromClaims("Email"));
        public UserType Type => UserType.GetValid(int.Parse(GetFromClaims("Type")));
        private string GetFromClaims(string type)
        {
            return user.Claims.Where(c => c.Type == type).Select(c => c.Value).SingleOrDefault();
        }
    }
}
