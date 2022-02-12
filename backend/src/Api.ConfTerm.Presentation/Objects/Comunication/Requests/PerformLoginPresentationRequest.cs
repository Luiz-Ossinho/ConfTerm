using Newtonsoft.Json;
using System.Text.Json.Serialization;

namespace Api.ConfTerm.Presentation.Objects.Comunication.Requests
{
    public record PerformLoginPresentationRequest(
        string Email,
        [property: JsonProperty("Senha")] string Password
    );
}
