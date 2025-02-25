using EstudioFacil.Dominio.Entidades;
using EstudioFacil.Dominio.Filtros;
using EstudioFacil.Dominio.InterfacesRepositorio;
using FluentValidation;
using System;
using System.Collections.Generic;

namespace EstudioFacil.Dominio.Servicos
{
    public class ServicoEstudioMusical
    {
        private readonly IValidator<EstudioMusical> _validadorEstudioMusical;
        private readonly IRepositorioEstudioMusical _repositorioEstudioMusical;

        public ServicoEstudioMusical(IValidator<EstudioMusical> estudioMusical, IRepositorioEstudioMusical repositorioEstudioMusical)
        {
            _validadorEstudioMusical = estudioMusical;
            _repositorioEstudioMusical = repositorioEstudioMusical;
        }

        public void Adicionar(EstudioMusical estudioMusical)
        {
            try
            {
                _validadorEstudioMusical.ValidateAndThrow(estudioMusical);
                _repositorioEstudioMusical.Adicionar(estudioMusical);
            }
            catch (ValidationException ve)
            {
                throw new ValidationException(ve.Errors);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public void Atualizar(EstudioMusical estudioParaAtualizar)
        {
            try
            {
                _validadorEstudioMusical.ValidateAndThrow(estudioParaAtualizar);
                _repositorioEstudioMusical.Atualizar(estudioParaAtualizar);
            }
            catch (ValidationException ve)
            {
                throw new ValidationException(ve.Errors);
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
                _repositorioEstudioMusical.Deletar(id);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public EstudioMusical ObterPorId(int id)
        {
            try
            {
            return _repositorioEstudioMusical.ObterPorId(id);
            } 
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public List<EstudioMusical> ObterTodos(FiltroEstudioMusical? filtro = null)
        {
            return _repositorioEstudioMusical.ObterTodos(filtro);
        }
    }
}