using Newtonsoft.Json;
using System.Text.Json.Serialization;

namespace Api.ConfTerm.Presentation.Objects.Comunication.Requests
{
    public record InsertAnimalProductionPresentationRequest(
        [property: JsonProperty("AlojamentoId")] int HousingId,
        [property: JsonProperty("EspecieId")] int SpeciesId,
        [property: JsonProperty("Nascimento")] string BirthDay,
        [property: JsonProperty("InicioMonitoramento")] string MonitoringStart,
        [property: JsonProperty("FimMonitoramento")] string MonitoringEnd,
        [property: JsonProperty("Equipamento")] string Equipament
    );
}
