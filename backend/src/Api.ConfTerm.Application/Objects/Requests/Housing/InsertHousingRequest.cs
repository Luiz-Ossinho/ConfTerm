using Api.ConfTerm.Application.Objects.Abstract;

namespace Api.ConfTerm.Application.Objects.Requests.Housing
{
    public record InsertHousingRequest(string Identificantion) : IApplicationRequest;
}
