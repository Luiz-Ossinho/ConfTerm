using Api.ConfTerm.Application.Objects.Requests.AnimalProduction;
using Api.ConfTerm.Presentation.Objects.Comunication.Requests;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading;
using System.Threading.Tasks;

namespace Api.ConfTerm.Presentation.Controllers.Api
{
    public class ProducaoAnimalController : BaseController
    {
        public ProducaoAnimalController(IMediator mediator, IMapper mapper) : base(mediator, mapper) { }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> InsertAnimalProduction([FromBody] InsertAnimalProductionPresentationRequest presentationRequest, CancellationToken cancellationToken = default)
        {
            var appRequest = _mapper.Map<InsertAnimalProductionRequest>(presentationRequest);
            var appResponse = await _mediator.Send(appRequest, cancellationToken);
            return ActionResultOf(appResponse);
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> ListAnimalProductions(CancellationToken cancellationToken = default)
        {
            var appRequest = new ListAnimalProductionsRequest();
            var appResponse = await _mediator.Send(appRequest, cancellationToken);
            return ActionResultOf(appResponse);
        }

        [HttpDelete]
        [Route("{idToBeDeleted:int}")]
        [Authorize]
        public async Task<IActionResult> InactivateAnimalProduction([FromRoute] int idToBeDeleted, CancellationToken cancellationToken = default)
        {
            var appRequest = new DeleteAnimalProductionRequest(idToBeDeleted);
            var appResponse = await _mediator.Send(appRequest, cancellationToken);
            return ActionResultOf(appResponse);
        }
    }
}
