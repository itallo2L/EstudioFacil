using EstudioFacil.Dominio.Entidades;
using EstudioFacil.Dominio.InterfacesRepositorio;
using EstudioFacil.Dominio.Servicos;
using EstudioFacil.Infra;
using EstudioFacil.Infra.Migracoes;
using EstudioFacil.Infra.Repositorios;
using EstudioFacil.Servico.Servicos;
using EstudioFacil.Servico.Validacoes;
using FluentMigrator.Runner;
using FluentValidation;
using LinqToDB;
using LinqToDB.AspNet;

namespace EstudioFacil.Web.InjecaoDeDependencia
{
    public static class ModuloDeInjecao
    {
        public static void AdicionarDependenciasNoEscopo(this WebApplicationBuilder construtor)
        {
            var nomeDaVariavelDeAmbiente = ConnectionString.StringDeConexao;
            var stringDeConexao = Environment.GetEnvironmentVariable(nomeDaVariavelDeAmbiente)
                ?? throw new Exception($"A variável de ambiente [{nomeDaVariavelDeAmbiente}] não foi encontrada.");

            construtor.Services.AddFluentMigratorCore()
                .AddFluentMigratorCore().ConfigureRunner(rb => rb
                .AddSqlServer()
                .WithGlobalConnectionString(stringDeConexao)
                .ScanIn(typeof(_20240715092000_AdicionarEstudioMusical).Assembly).For.Migrations())
                .AddLogging(lb => lb.AddFluentMigratorConsole())
                .BuildServiceProvider(false);

            construtor.Services.AddLinqToDBContext<BdEstudioFacil>((provider, options) => options
            .UseSqlServer((stringDeConexao)));

            construtor.Services.AddScoped<ServicoEstudioMusical>();
            construtor.Services.AddScoped<ServicoAgendamento>();
            construtor.Services.AddScoped<IRepositorioAgendamento, RepositorioAgendamento>();
            construtor.Services.AddScoped<IRepositorioEstudioMusical, RepositorioEstudioMusical>();
            construtor.Services.AddScoped<IValidator<EstudioMusical>, ValidadorEstudioMusical>();
            construtor.Services.AddScoped<IValidator<Agendamento>, ValidadorAgendamento>();

            construtor.Services.AddControllers();
            construtor.Services.AddEndpointsApiExplorer();
            construtor.Services.AddSwaggerGen();

            construtor.Services.AddCors(p => p.AddPolicy("SAPApp", builder =>
            {
                builder.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
            }));
        }
    }
}