using EstudioFacil.Dominio.Entidades;
using EstudioFacil.Dominio.Filtros;
using System.Collections.Generic;

namespace EstudioFacil.Dominio.InterfacesRepositorio
{
    public interface IRepositorioAgendamento
    {
        List<Agendamento> ObterTodos(FiltroAgendamento? filtro = null);
        void Adicionar(Agendamento agendamento);
        void Atualizar(Agendamento agendamentoParaAtualizar);
        void Deletar(int id);
        Agendamento ObterPorId(int id);
    }
}