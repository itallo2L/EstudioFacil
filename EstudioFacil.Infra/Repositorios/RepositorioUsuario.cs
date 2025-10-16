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

        public void AdicionarUsuarioEstudio(UsuarioEstudio usuario)
        {
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
            _bd.Insert(usuario);
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
    }
}