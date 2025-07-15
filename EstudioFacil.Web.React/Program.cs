using EstudioFacil.Infra.Repositorios;
using EstudioFacil.Web.React.DetalhesDoProblema;
using EstudioFacil.Web.React.InjecaoDeDependencia;
using FluentMigrator.Runner;
using Microsoft.Extensions.FileProviders;

const string testeBancoDeDados = "TesteBancoDeDados";

var construtor = WebApplication.CreateBuilder(args);

if (args.FirstOrDefault() == testeBancoDeDados)
{
    ConnectionString.StringDeConexao = "ConexaoEstudioFacilBancoDeTestes";
}

construtor.AdicionarDependenciasNoEscopo();

construtor.Services.AddCors(options =>
{
    options.AddPolicy("ReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();
    });
});

var loggerFactory = new LoggerFactory();

var servicos = new ServiceCollection();

var app = construtor.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.ManipuladorDetalhesDoProblema(app.Services.GetRequiredService<ILoggerFactory>());

using (var scope = app.Services.CreateScope())
{
    var runner = scope.ServiceProvider.GetRequiredService<IMigrationRunner>();
    runner.MigrateUp();
}

app.UseHttpsRedirection();

app.UseCors("ReactApp");

app.UseStaticFiles(new StaticFileOptions { ServeUnknownFileTypes = true });

app.UseFileServer(new FileServerOptions
{
    FileProvider = new PhysicalFileProvider(
           Path.Combine(construtor.Environment.ContentRootPath, "frontend-react")),
    EnableDirectoryBrowsing = true
});

app.UseAuthorization();

app.MapControllers();

app.Run();