using EstudioFacil.Dominio.InterfacesRepositorio;
using EstudioFacil.Dominio.Usuarios;
using LinqToDB;
using System;
using System.Linq;

namespace EstudioFacil.Infra.Repositorios
{
    public class RepositorioUsuario : IRepositorioUsuario
    {
        private readonly BdEstudioFacil _bd;

        public RepositorioUsuario(BdEstudioFacil bdEstudioFacil)
        {
            _bd = bdEstudioFacil;
        }

        public void AdicionarUsuarioEstudio(UsuarioEstudio usuario)
        {
            var usuarioBase = new UsuarioBase()
            {
                EnderecoDeEmail = usuario.EnderecoDeEmail,
                HashDaSenha = usuario.HashDaSenha,
                EhUsuarioMusico = true
            };

            _bd.Insert(usuarioBase);

            usuario.IdDoUsuarioBase = usuarioBase.Id;

            _bd.Insert(usuario);
        }

        public void AtualizarUsuarioEstudio(UsuarioEstudio usuarioParaAtualizar)
        {
            _bd.Update(usuarioParaAtualizar);
        }

        public void DeletarUsuarioEstudio(int id)
        {
            _bd.UsuarioEstudio.Delete(usuario => usuario.Id == id);
        }

        public UsuarioEstudio ObterUsuarioEstudioPorId(int id)
        {
            return _bd
                .GetTable<UsuarioEstudio>()
                .FirstOrDefault(usuario => usuario.Id == id);
        }

        public void AdicionarUsuarioMusico(UsuarioMusico usuario)
        {
            var usuarioBase = new UsuarioBase()
            {
                EnderecoDeEmail = usuario.EnderecoDeEmail,
                HashDaSenha = usuario.HashDaSenha,
                EhUsuarioMusico = true
            };

            var idDoUsuarioBase = _bd.InsertWithIdentity(usuarioBase);

            usuario.IdDoUsuarioBase = Convert.ToInt32(idDoUsuarioBase);

            var teste = _bd.Insert(usuario);
        }

        public void AtualizarUsuarioMusico(UsuarioMusico usuarioParaAtualizar)
        {
            _bd.Update(usuarioParaAtualizar);
        }

        public void DeletarUsuarioMusico(int id)
        {
            _bd.UsuarioMusico.Delete(usuario => usuario.Id == id);
        }

        public UsuarioMusico ObterUsuarioMusicoPorId(int id)
        {
            return _bd
                .GetTable<UsuarioMusico>()
                .FirstOrDefault(usuario => usuario.Id == id);
        }

        public UsuarioBase ObterUsuarioBase(string email, string hashDaSenha)
        {
            var usuarioComEmail = _bd
                .GetTable<UsuarioBase>()
                .Where(u => u.EnderecoDeEmail == email)
                ?.ToList() 
                ?? throw new System.Exception("E-mail ou senha incorretos!");

            var usuarioObtido = usuarioComEmail
                .Find(u => u.HashDaSenha == hashDaSenha)
                ?? throw new System.Exception("E-mail ou senha incorretos!");

            return usuarioObtido;
        }

        public UsuarioEstudio ObterUsuarioEstudioPorIdDoUsuarioBase(int id)
        {
            var usuarioEstudio = _bd
                .GetTable<UsuarioEstudio>()
                .Where(u => u.IdDoUsuarioBase == id)
                ?.FirstOrDefault()
                ?? throw new System.Exception("Não foi possível encontrar usuário do tipo Estúdio!");

            return usuarioEstudio;
        }

        public UsuarioMusico ObterUsuarioMusicoPorIdDoUsuarioBase(int id)
        {
            var usuarioMusico = _bd
                .GetTable<UsuarioMusico>()
                .Where(u => u.IdDoUsuarioBase == id)
                ?.FirstOrDefault()
                ?? throw new System.Exception("Não foi possível encontrar usuário do tipo Músico!");

            return usuarioMusico;
        }
    }
}