using ConfTerm.Application.UseCases.Auth.Login;
using ConfTerm.Presentation.Helpers;

namespace ConfTerm.Presentation.Endpoints
{
    public class LoginEndpointRequest
    {
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }

    public class LoginEndpoint : EndpointDefiniton<LoginRequest, LoginResponse, LoginEndpointRequest>
    {
        public static string RouteTemplate { get; } = "/auth/login";
        public static HttpMethod Method { get; } = HttpMethod.Post;
        public LoginEndpoint() : base(RouteTemplate, Method) { }

        public override LoginRequest MapToRequest(LoginEndpointRequest requestPart1)
        {
            return new LoginRequest(new Domain.ValueObjects.Email(requestPart1.Email), requestPart1.Password);
        }
    }
}
