using EstudioFacil.Dominio.InterfacesRepositorio;
using EstudioFacil.Dominio.Usuarios;
using FluentValidation;
using System;

namespace EstudioFacil.Servico.Servicos
{
    public class ServicoDeUsuarios
    {
        private readonly IRepositorioUsuario _repositorioUsuario;

        public ServicoDeUsuarios(IRepositorioUsuario repositorioUsuario)
        {
            _repositorioUsuario = repositorioUsuario;
        }

        public void AdicionarUsuario(Usuario usuario)
        {
            try
            {
                _repositorioUsuario.AdicionarUsuario(usuario);
            }
            catch (ValidationException ve)
            {
                throw new ValidationException(ve.Errors);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            };
        }

        public void AtualizarUsuario(Usuario usuarioParaAtualizar)
        {
            try
            {
                _repositorioUsuario.AtualizarUsuario(usuarioParaAtualizar);
            }
            catch (ValidationException ve)
            {
                throw new ValidationException(ve.Errors);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            };
        }

        public void DeletarUsuario(int id)
        {
            try
            {
                _repositorioUsuario.DeletarUsuario(id);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            };
        }

        public Usuario ObterUsuarioPorId(int id)
        {
            try
            {
                return _repositorioUsuario.ObterUsuarioPorId(id);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            };
        }

        public Usuario ObterUsuario(string email, string hashDaSenha)
        {
            try
            {
                return _repositorioUsuario.ObterUsuario(email, hashDaSenha);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            };
        }
    }
}