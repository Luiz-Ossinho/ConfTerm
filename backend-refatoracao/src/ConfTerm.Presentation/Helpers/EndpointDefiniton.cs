using ConfTerm.Application.Models;
using MediatR;

namespace ConfTerm.Presentation.Helpers
{
    public abstract class EndpointDefiniton<TMediatrRequest, TResultContent, TParam1, TParam2, TParam3> : EndpointDefiniton<TMediatrRequest, TResultContent>
        where TMediatrRequest : IRequest<ApplicationResult<TResultContent>>
    {
        protected EndpointDefiniton(string route, HttpMethod httpMethod) : base(route, httpMethod) { }
        public virtual async Task<IResult> MappingDelegate(TParam1 param1, TParam2 param2, TParam3 param3, ISender sender)
        {
            var mediatrRequest = MapToRequest(param1, param2, param3);
            return await Delegate(mediatrRequest, sender);
        }
        public override void Map(WebApplication app)
        {
            Map(app, MappingDelegate);
        }
        public abstract TMediatrRequest MapToRequest(TParam1 param1, TParam2 param2, TParam3 param3);
    }

    public abstract class EndpointDefiniton<TMediatrRequest, TResultContent, TParam1, TParam2> : EndpointDefiniton<TMediatrRequest, TResultContent>
        where TMediatrRequest : IRequest<ApplicationResult<TResultContent>>
    {
        protected EndpointDefiniton(string route, HttpMethod httpMethod) : base(route, httpMethod) { }
        public virtual async Task<IResult> MappingDelegate(TParam1 param1, TParam2 param2, ISender sender)
        {
            var mediatrRequest = MapToRequest(param1, param2);
            return await Delegate(mediatrRequest, sender);
        }
        public override void Map(WebApplication app)
        {
            Map(app, MappingDelegate);
        }
        public abstract TMediatrRequest MapToRequest(TParam1 param1, TParam2 param2);
    }

    public abstract class EndpointDefiniton<TMediatrRequest, TResultContent, TParam1> : EndpointDefiniton<TMediatrRequest, TResultContent>
        where TMediatrRequest : IRequest<ApplicationResult<TResultContent>>
    {
        protected EndpointDefiniton(string route, HttpMethod httpMethod) : base(route, httpMethod) { }
        public virtual async Task<IResult> MappingDelegate(TParam1 request1, ISender sender)
        {
            var mediatrRequest = MapToRequest(request1);
            return await Delegate(mediatrRequest, sender);
        }
        public override void Map(WebApplication app)
        {
            Map(app, MappingDelegate);
        }

        public abstract TMediatrRequest MapToRequest(TParam1 requestPart1);
    }

    public abstract class EndpointDefiniton<TMediatrRequest, TResultContent>
        where TMediatrRequest : IRequest<ApplicationResult<TResultContent>>
    {
        protected EndpointDefiniton(string route, HttpMethod httpMethod)
        {
            Route = route;
            HttpMethod = httpMethod;
        }

        public async Task<IResult> Delegate(TMediatrRequest request, ISender sender)
        {
            var applicationResult = await sender.Send(request);
            return MapperHelper.MapToResult(applicationResult);
        }

        public string Route { get; }
        public HttpMethod HttpMethod { get; }

        public virtual void Map(WebApplication app)
        {
            Map(app, Delegate);
        }

        public virtual void Map(WebApplication app, Delegate @delegate)
        {
            var routerBuilder = app.MapMethods(Route, new string[] { HttpMethod.Method }, @delegate);
            Decorate(routerBuilder);
        }

        public virtual RouteHandlerBuilder Decorate(RouteHandlerBuilder routeHandlerBuilder)
        {
            routeHandlerBuilder
                .Produces(200)
                .WithTags("Endpoints");

            return routeHandlerBuilder;
        }
    }
}
