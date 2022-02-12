using Api.ConfTerm.Application.Objects.Abstract;

namespace Api.ConfTerm.Application.Objects.Requests.AnimalProduction
{
    public record DeleteAnimalProductionRequest(int IdToBeDeleted): IApplicationRequest;
}
