using EstudioFacil.Dominio.Usuarios;

namespace EstudioFacil.Dominio.InterfacesRepositorio
{
    public interface IRepositorioUsuario
    {
        void AdicionarUsuario(Usuario usuario);
        void AtualizarUsuario(Usuario usuarioParaAtualizar);
        void DeletarUsuario(int id);
        Usuario ObterUsuarioPorId(int id);
        Usuario ObterUsuario(string email, string hashDaSenha);
    }
}