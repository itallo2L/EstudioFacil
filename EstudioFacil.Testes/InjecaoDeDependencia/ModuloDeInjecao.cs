using EstudioFacil.Dominio.Entidades;
using EstudioFacil.Dominio.InterfacesRepositorio;
using EstudioFacil.Dominio.Servicos;
using EstudioFacil.Servico.Servicos;
using EstudioFacil.Servico.Validacoes;
using EstudioFacil.Testes.RepositorioMock;
using FluentValidation;
using Microsoft.Extensions.DependencyInjection;

namespace EstudioFacil.Testes.InjecaoDeDependencia
{
    public static class ModuloDeInjecao
    {
        public static void AdicionarDependeciasNoEscopo(ServiceCollection servico)
        {
            servico.AddScoped<ServicoEstudioMusical>();
            servico.AddScoped<ServicoAgendamento>();
            servico.AddScoped<IRepositorioAgendamento, AgendamentoRepositorioMock>();
            servico.AddScoped<IRepositorioEstudioMusical, EstudioMusicalRepositorioMock>();
            servico.AddScoped<IValidator<EstudioMusical>, ValidadorEstudioMusical>();
            servico.AddScoped<IValidator<Agendamento>, ValidadorAgendamento>();
        }
    }
}