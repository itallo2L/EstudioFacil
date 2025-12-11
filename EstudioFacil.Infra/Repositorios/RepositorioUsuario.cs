using EstudioFacil.Dominio.Entidades;
using EstudioFacil.Dominio.InterfacesRepositorio;
using EstudioFacil.Dominio.Servicos;
using EstudioFacil.Dominio.Usuarios;
using LinqToDB;
using System.Linq;

namespace EstudioFacil.Infra.Repositorios
{
    public class RepositorioUsuario : IRepositorioUsuario
    {
        private readonly BdEstudioFacil _bd;
        private readonly ServicoEstudioMusical _servicoEstudioMusical;

        public RepositorioUsuario(BdEstudioFacil bdEstudioFacil, ServicoEstudioMusical servicoEstudioMusical)
        {
            servicoEstudioMusical = _servicoEstudioMusical;
            _bd = bdEstudioFacil;
        }

        public void AdicionarUsuario(Usuario usuario)
        {
            if (usuario.EhUsuarioMusico)
            {
                _bd.Insert(usuario);
                return;
            };

            var estudio = new EstudioMusical()
            {
                Nome = usuario.RazaoSocial,
                EstaAberto = false,
                ValorDaHora = 0,
                Endereco = usuario.Endereco,
                Telefone = usuario.Telefone,
                Descricao = string.Empty
            };

            usuario.IdDoEstudio = _bd.InsertWithInt32Identity(estudio);
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