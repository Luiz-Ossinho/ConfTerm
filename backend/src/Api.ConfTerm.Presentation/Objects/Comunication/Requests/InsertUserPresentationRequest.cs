using Api.ConfTerm.Application.Objects.Requests;
using Api.ConfTerm.Domain.ValueObjects;
using Newtonsoft.Json;
using System.Text.Json.Serialization;

namespace Api.ConfTerm.Presentation.Objects.Comunication.Requests
{
    public record InsertUserPresentationRequest(
        string Email,
        [property: JsonProperty("Nome")] string Name,
        [property: JsonProperty("Senha")] string Password,
        [property: JsonProperty("Tipo")] PresentationUserType Type
    );
}
