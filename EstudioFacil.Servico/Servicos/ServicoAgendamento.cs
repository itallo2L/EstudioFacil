using EstudioFacil.Dominio.Entidades;
using EstudioFacil.Dominio.Filtros;
using EstudioFacil.Dominio.InterfacesRepositorio;
using FluentValidation;
using System;
using System.Collections.Generic;

namespace EstudioFacil.Servico.Servicos
{
    public class ServicoAgendamento
    {
        private readonly IValidator<Agendamento> _validadorAgendamento;
        private readonly IRepositorioAgendamento _repositorioAgendamento;

        public ServicoAgendamento(IValidator<Agendamento> valiadorAgendamento, IRepositorioAgendamento repositorioAgendamento)
        {
            _validadorAgendamento = valiadorAgendamento;
            _repositorioAgendamento = repositorioAgendamento;
        }

        public void Adicionar(Agendamento agendamento)
        {
            try
            {
                _validadorAgendamento.ValidateAndThrow(agendamento);
                _repositorioAgendamento.Adicionar(agendamento);
            }
            catch (ValidationException va)
            {
                throw new ValidationException(va.Errors);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public void Atualizar(Agendamento agendamentoParaAtualizar)
        {
            try
            {
                _validadorAgendamento.ValidateAndThrow(agendamentoParaAtualizar);
                _repositorioAgendamento.Atualizar(agendamentoParaAtualizar);
            }
            catch (ValidationException va)
            {
                throw new ValidationException(va.Errors);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public void Deletar(int id)
        {
            try
            {
                _repositorioAgendamento.Deletar(id);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public Agendamento ObterPorId(int id)
        {
            try
            {
            return _repositorioAgendamento.ObterPorId(id);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public List<Agendamento> ObterTodos(FiltroAgendamento? filtro = null)
        {
            return _repositorioAgendamento.ObterTodos(filtro);
        }
    }
}