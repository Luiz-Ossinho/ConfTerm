using Newtonsoft.Json;
using System.Text.Json.Serialization;

namespace Api.ConfTerm.Presentation.Objects.Comunication.Requests
{
    public record InsertHousingPresentationRequest(
        [property: JsonProperty("Indentificao")] string Identificantion
    );
}
 