using EstudioFacil.Dominio.InterfacesRepositorio;
using EstudioFacil.Dominio.Usuarios;
using FluentValidation;
using System;

namespace EstudioFacil.Servico.Servicos
{
    public class ServicoUsuario
    {
        private readonly IValidator<UsuarioEstudio> _validadorUsuarioEstudio;
        private readonly IValidator<UsuarioMusico> _validadorUsuarioMusico;
        private readonly IRepositorioUsuario _repositorioUsuario;

        public ServicoUsuario(IRepositorioUsuario repositorioUsuario)
        {
            _repositorioUsuario = repositorioUsuario;
        }

        public void AdicionarUsuarioEstudio(UsuarioEstudio usuario)
        {
            try
            {
                _validadorUsuarioEstudio.ValidateAndThrow(usuario);
                _repositorioUsuario.AdicionarUsuarioEstudio(usuario);
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

        public void AtualizarUsuarioEstudio(UsuarioEstudio usuarioParaAtualizar)
        {
            try
            {
                _validadorUsuarioEstudio.ValidateAndThrow(usuarioParaAtualizar);
                _repositorioUsuario.AtualizarUsuarioEstudio(usuarioParaAtualizar);
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

        public void DeletarUsuarioEstudio(int id)
        {
            try
            {
                _repositorioUsuario.DeletarUsuarioEstudio(id);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public UsuarioEstudio ObterUsuarioEstudioPorId(int id)
        {
            try
            {
                return _repositorioUsuario.ObterUsuarioEstudioPorId(id);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public void AdicionarUsuarioMusico(UsuarioMusico usuario)
        {
            try
            {
                _validadorUsuarioMusico.ValidateAndThrow(usuario);
                _repositorioUsuario.AdicionarUsuarioMusico(usuario);
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

        public void AtualizarUsuarioMusico(UsuarioMusico usuarioParaAtualizar)
        {
            try
            {
                _validadorUsuarioMusico.ValidateAndThrow(usuarioParaAtualizar);
                _repositorioUsuario.AtualizarUsuarioMusico(usuarioParaAtualizar);
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

        public void DeletarUsuarioMusico(int id)
        {
            try
            {
                _repositorioUsuario.DeletarUsuarioMusico(id);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public UsuarioMusico ObterUsuarioMusicoPorId(int id)
        {
            try
            {
                return _repositorioUsuario.ObterUsuarioMusicoPorId(id);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}