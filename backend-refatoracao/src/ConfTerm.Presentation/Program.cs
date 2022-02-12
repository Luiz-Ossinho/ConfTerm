using ConfTerm.Presentation;

var builder = WebApplication.CreateBuilder(args);

var setupInformation = builder.ConfigureServices();

var app = builder.Build();

await app.Configure(setupInformation);

//app.UseHttpsRedirection();

app.Run();