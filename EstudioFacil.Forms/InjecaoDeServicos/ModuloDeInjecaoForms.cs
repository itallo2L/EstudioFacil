
using EstudioFacil.Dominio.Entidades;
using EstudioFacil.Dominio.InterfacesRepositorio;
using EstudioFacil.Dominio.Servicos;
using EstudioFacil.Infra;
using EstudioFacil.Infra.Repositorios;
using EstudioFacil.Servico.Servicos;
using EstudioFacil.Servico.Validacoes;
using FluentValidation;
using LinqToDB;
using LinqToDB.AspNet;
using Microsoft.Extensions.DependencyInjection;

namespace EstudioFacil.Forms.InjecaoDoBancoDeDados
{
    public static class ModuloDeInjecaoForms
    {
        public static void AdicionarDependenciasNoEscopo(this IServiceCollection servico)
        {
            const string nomeDaVariavelDeAmbiente = "ConexaoEstudioFacil";
            var stringDeConexao = Environment.GetEnvironmentVariable(nomeDaVariavelDeAmbiente)
                ?? throw new Exception($"A variável de ambiente [{nomeDaVariavelDeAmbiente}] não foi encontrada.");

            servico.AddLinqToDBContext<BdEstudioFacil>((provider, options) => options
            .UseSqlServer((stringDeConexao)));

            servico.AddScoped<ServicoEstudioMusical>();
            servico.AddScoped<ServicoAgendamento>();
            servico.AddScoped<IRepositorioAgendamento, RepositorioAgendamento>();
            servico.AddScoped<IRepositorioEstudioMusical, RepositorioEstudioMusical>();
            servico.AddScoped<IValidator<EstudioMusical>, ValidadorEstudioMusical>();
            servico.AddScoped<IValidator<Agendamento>, ValidadorAgendamento>();
        }
    }
}