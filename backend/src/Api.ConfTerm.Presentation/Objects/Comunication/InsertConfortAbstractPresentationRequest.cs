using Newtonsoft.Json;
using System.Text.Json.Serialization;

namespace Api.ConfTerm.Presentation.Objects.Comunication
{
    public abstract record InsertConfortAbstractPresentationRequest(
        [property: JsonProperty("EspecieId")] int SpeciesId,
        [property: JsonProperty("IdadeMinima")] int MinimunAge,
        [property: JsonProperty("IdadeMaxima")] int MaximunAge,
        [property: JsonProperty("Nivel")] PresentationConfortLevel Level
    );
}
