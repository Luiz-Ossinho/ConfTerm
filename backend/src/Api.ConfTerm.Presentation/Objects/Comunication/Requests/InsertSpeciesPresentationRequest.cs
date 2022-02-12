using Newtonsoft.Json;
using System.Text.Json.Serialization;

namespace Api.ConfTerm.Presentation.Objects.Comunication.Requests
{
    public record InsertSpeciesPresentationRequest(
        [property: JsonProperty("Nome")] string Name
    );
}
