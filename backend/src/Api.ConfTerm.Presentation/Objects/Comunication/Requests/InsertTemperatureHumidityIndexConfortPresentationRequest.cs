﻿using Newtonsoft.Json;
using System.Text.Json.Serialization;

namespace Api.ConfTerm.Presentation.Objects.Comunication.Requests
{
    public record InsertTemperatureHumidityIndexConfortPresentationRequest(
        int SpeciesId,
        int MinimunAge,
        int MaximunAge,
        PresentationConfortLevel Level,
        [property: JsonProperty("ItuMinimo")] float MinimunTHI,
        [property: JsonProperty("ItuMaximo")] float MaximunTHI
    ) : InsertConfortAbstractPresentationRequest(SpeciesId, MinimunAge, MaximunAge, Level);
}
