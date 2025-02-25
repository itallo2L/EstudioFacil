using EstudioFacil.Dominio.Servicos;
using EstudioFacil.Forms.InjecaoDoBancoDeDados;
using EstudioFacil.Infra.Migracoes;
using EstudioFacil.Servico.Servicos;
using FluentMigrator.Runner;
using Microsoft.Extensions.DependencyInjection;

namespace EstudioFacil.Forms
{
    public static class Program
    {
        [STAThread]
        static void Main()
        {
            using (var serviceProvider = CriarServicos())
            using (var scope = serviceProvider.CreateScope())
            {
                AtualizarBD(scope.ServiceProvider);
            }

            ServiceProvider = ExecutarInjecao();
            ApplicationConfiguration.Initialize();
            var servicoAgendamento = ServiceProvider.GetRequiredService<ServicoAgendamento>();
            var servicoEstudioMusical = ServiceProvider.GetRequiredService<ServicoEstudioMusical>();
            Application.Run(new FormAgendamentoEmEstudioMusical(servicoAgendamento, servicoEstudioMusical));
        }
        public static IServiceProvider ServiceProvider { get; private set; }

        private static ServiceProvider CriarServicos()
        {
            const string nomeDaVariavelDeAmbiente = "ConexaoEstudioFacil";
            var stringDeConexao = Environment.GetEnvironmentVariable(nomeDaVariavelDeAmbiente);

            return new ServiceCollection()
                .AddFluentMigratorCore().ConfigureRunner(rb => rb
                .AddSqlServer()
                .WithGlobalConnectionString(stringDeConexao)
                .ScanIn(typeof(_20240715092000_AdicionarEstudioMusical).Assembly).For.Migrations())
                .AddLogging(lb => lb.AddFluentMigratorConsole())
                .BuildServiceProvider(false);
        }

        private static void AtualizarBD(IServiceProvider serviceProvider)
        {
            var runner = serviceProvider.GetRequiredService<IMigrationRunner>();

            runner.MigrateUp();
        }

        public static IServiceProvider ExecutarInjecao()
        {
            var servicos = new ServiceCollection();
            servicos.AdicionarDependenciasNoEscopo();
            return servicos.BuildServiceProvider();
        }
    }
}