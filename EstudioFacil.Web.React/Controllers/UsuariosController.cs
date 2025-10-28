using EstudioFacil.Dominio.Usuarios;
using EstudioFacil.Servico.Servicos;
using Microsoft.AspNetCore.Mvc;

namespace EstudioFacil.Web.React.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly ServicoDeUsuarios _servicoDeUsuarios;

        public UsuariosController(ServicoDeUsuarios servicoDeUsuarios)
        {
            _servicoDeUsuarios = servicoDeUsuarios;
        }

        [HttpGet("obter-usuario")]
        public IActionResult ObterUsuario([FromQuery] string email, [FromQuery] string hashDaSenha)
        {
            var usuario = _servicoDeUsuarios.ObterUsuario(email, hashDaSenha);
            return Ok(usuario);
        }

        [HttpGet("obter-usuario-por-id/{id}")]
        public IActionResult ObterUsuarioPorId(int id)
        {
            return Ok(_servicoDeUsuarios.ObterUsuarioPorId(id));
        }

        [HttpPost("adicionar-usuario")]
        public IActionResult AdicionarUsuario([FromBody] Usuario usuario)
        {
          _servicoDeUsuarios.AdicionarUsuario(usuario);
            return Ok(usuario);
        }

        [HttpPatch("atualizar-usuario")]
        public IActionResult AtualizarUsuario([FromBody] Usuario usuario)
        {
            _servicoDeUsuarios.AtualizarUsuario(usuario);
            return NoContent();
        }

        [HttpDelete("deletar-usuario/{id}")]
        public IActionResult DeletarUsuario(int id)
        {
            _servicoDeUsuarios.DeletarUsuario(id);
            return NoContent();
        }
    }
}