using EstudioFacil.Dominio.Usuarios;

namespace EstudioFacil.Dominio.InterfacesRepositorio
{
    public interface IRepositorioUsuario
    {
        void AdicionarUsuarioEstudio(UsuarioEstudio usuario);
        void AtualizarUsuarioEstudio(UsuarioEstudio usuarioParaAtualizar);
        void DeletarUsuarioEstudio(int id);
        UsuarioEstudio ObterUsuarioEstudioPorId(int id);
        void AdicionarUsuarioMusico(UsuarioMusico usuario);
        void AtualizarUsuarioMusico(UsuarioMusico usuarioParaAtualizar);
        void DeletarUsuarioMusico(int id);
        UsuarioMusico ObterUsuarioMusicoPorId(int id);
    }
}