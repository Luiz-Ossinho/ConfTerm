﻿using Api.ConfTerm.Application.Objects.Abstract;

namespace Api.ConfTerm.Application.Objects.Requests.Species
{
    public record InsertSpeciesRequest(string Name) : IApplicationRequest;
}
