using EstudioFacil.Dominio.Entidades;
using EstudioFacil.Dominio.Filtros;
using EstudioFacil.Dominio.InterfacesRepositorio;
using LinqToDB;
using System;
using System.Collections.Generic;
using System.Linq;

namespace EstudioFacil.Infra.Repositorios
{
    public class RepositorioAgendamento : IRepositorioAgendamento
    {
        private readonly BdEstudioFacil _bd;

        public RepositorioAgendamento(BdEstudioFacil bdEstudioFacil)
        {
            _bd = bdEstudioFacil;
        }

        public void Adicionar(Agendamento agendamento)
        {
            _bd.Insert(agendamento);
        }

        public void Atualizar(Agendamento agendamentoParaAtualizar)
        {
            _bd.Update(agendamentoParaAtualizar);
        }

        public void Deletar(int id)
        {
            _bd.Agendamento
                .Delete(agendamento => agendamento.Id == id);
        }

        public Agendamento ObterPorId(int id)
        {
            var listaObtida = _bd.GetTable<Agendamento>().FirstOrDefault(agendamento => agendamento.Id == id);
            return listaObtida;
        }

        public List<Agendamento> ObterTodos(FiltroAgendamento? filtro = null)
        {
            var listaAgendamento = _bd.GetTable<Agendamento>().AsQueryable();

            if (!string.IsNullOrEmpty(filtro?.NomeResponsavel))
                listaAgendamento = listaAgendamento.Where(agendamento => agendamento.NomeResponsavel.Contains(filtro.NomeResponsavel, StringComparison.OrdinalIgnoreCase));

            if (filtro?.DataMinima != null)
                listaAgendamento = listaAgendamento.Where(agendamento => agendamento.DataEHoraDeEntrada >= filtro.DataMinima);

            if (filtro?.DataMaxima != null)
                listaAgendamento = listaAgendamento.Where(agendamento => agendamento.DataEHoraDeEntrada <= filtro.DataMaxima);

            const int naoPodeSerNegativo = 0;
            if (filtro?.ValorMinimo != null && filtro?.ValorMinimo != naoPodeSerNegativo)
                listaAgendamento = listaAgendamento.Where(agendamento => agendamento.ValorTotal >= filtro.ValorMinimo);

            if (filtro?.ValorMaximo != null && filtro?.ValorMaximo != naoPodeSerNegativo)
                listaAgendamento = listaAgendamento.Where(agendamento => agendamento.ValorTotal <= filtro.ValorMaximo);

            const int indexDoEnumIndefinido = 0;
            if (filtro?.EstiloMusical != null && filtro?.EstiloMusical > indexDoEnumIndefinido)
                listaAgendamento = listaAgendamento.Where(agendamento => agendamento.EstiloMusical == filtro.EstiloMusical);

            return listaAgendamento.ToList();
        }
    }
}