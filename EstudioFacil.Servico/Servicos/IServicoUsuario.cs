using EstudioFacil.Dominio.Usuarios;
using System.Threading.Tasks;

namespace EstudioFacil.Servico.Servicos
{
    public interface IServicoUsuario
    {
        Task CadastrarMusicoAsync(UsuarioMusico usuario, string senha);
        Task CadastrarEstudioAsync(UsuarioMusico usuario, string senha);
    }
}