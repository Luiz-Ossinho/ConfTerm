using ConfTerm.Application.Models;
using ConfTerm.Domain.ValueObjects;
using MediatR;

namespace ConfTerm.Application.UseCases.Auth.Login
{
    public record LoginRequest(Email Email, string Password) : IRequest<ApplicationResult<LoginResponse>>;
}
