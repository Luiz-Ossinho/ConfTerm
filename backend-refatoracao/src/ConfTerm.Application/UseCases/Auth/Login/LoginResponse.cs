namespace ConfTerm.Application.UseCases.Auth.Login
{
    public record LoginResponse(string TokenJWT, string Username, bool IsAdmin);
}
