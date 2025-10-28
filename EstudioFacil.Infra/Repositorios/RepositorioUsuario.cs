using EstudioFacil.Dominio.InterfacesRepositorio;
using EstudioFacil.Dominio.Usuarios;
using LinqToDB;
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

        public void AdicionarUsuario(Usuario usuario)
        {
            _bd.Insert(usuario);
        }

        public void AtualizarUsuario(Usuario usuarioParaAtualizar)
        {
            _bd.Update(usuarioParaAtualizar);
        }

        public void DeletarUsuario(int id)
        {
            _bd.Usuario.Delete(usuario => usuario.Id == id);
        }

        public Usuario ObterUsuarioPorId(int id)
        {
            return _bd
                .GetTable<Usuario>()
                .FirstOrDefault(usuario => usuario.Id == id);
        }

        public Usuario ObterUsuario(string email, string hashDaSenha)
        {
            var usuarioComEmail = _bd
                .GetTable<Usuario>()
                .Where(u => u.EnderecoDeEmail == email)
                ?.ToList() 
                ?? throw new System.Exception("E-mail ou senha incorretos!");

            var usuarioObtido = usuarioComEmail
                .Find(u => u.HashDaSenha == hashDaSenha)
                ?? throw new System.Exception("E-mail ou senha incorretos!");

            return usuarioObtido;
        }
    }
}