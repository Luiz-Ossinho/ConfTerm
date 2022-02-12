using Newtonsoft.Json;
using System.Text.Json.Serialization;

namespace Api.ConfTerm.Presentation.Objects.Comunication.Requests
{
    public record InsertMeasurementPresentationRequest(
        [property: JsonProperty("ProducaoAnimalId")] int AnimalProductionId,
        [property: JsonProperty("data")] string Date,
        [property: JsonProperty("horario")] string Time,
        [property: JsonProperty("itu")] float TemperatureHumidityIndex,
        [property: JsonProperty("itgu")] float BlackGlobeHumidityIndex,
        [property: JsonProperty("orvalho")] float DewPointTemperature,
        [property: JsonProperty("tbs")] float DryBulbTemperature,
        [property: JsonProperty("BulboUmido")] float WetBulbTemperature,
        [property: JsonProperty("umidade")] float Humidity,
        [property: JsonProperty("tg")] float BlackGlobeTemperature
    );
}
