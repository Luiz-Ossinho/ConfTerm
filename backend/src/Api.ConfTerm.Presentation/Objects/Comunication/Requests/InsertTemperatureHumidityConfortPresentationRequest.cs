using Newtonsoft.Json;
using System.Text.Json.Serialization;

namespace Api.ConfTerm.Presentation.Objects.Comunication.Requests
{
    public record InsertTemperatureHumidityConfortPresentationRequest(
        int SpeciesId,
        int MinimunAge,
        int MaximunAge,
        PresentationConfortLevel Level,
        [property: JsonProperty("TemperaturaMinima")] float MinimunTemperature,
        [property: JsonProperty("TemperaturaMaxima")] float MaximunTemperature,
        [property: JsonProperty("UmidadeMinima")] float MinimunHumidity,
        [property: JsonProperty("UmidadeMaxima")] float MaximunHumidity
    ) : InsertConfortAbstractPresentationRequest(SpeciesId, MinimunAge, MaximunAge, Level);
}
