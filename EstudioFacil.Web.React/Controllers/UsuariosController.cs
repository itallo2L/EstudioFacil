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
            var usuarioBase = _servicoDeUsuarios.ObterUsuarioBase(email, hashDaSenha);

            if (usuarioBase.EhUsuarioMusico)
            {
                var usuarioMusico = _servicoDeUsuarios.ObterUsuarioMusicoPorIdDoUsuarioBase(usuarioBase.Id);
                return Ok(usuarioMusico);
            }
            ;

            var usuarioEstudio = _servicoDeUsuarios.ObterUsuarioEstudioPorIdDoUsuarioBase(usuarioBase.Id);
            return Ok(usuarioEstudio);
        }

        [HttpGet("obter-usuario-estudio-por-id/{id}")]
        public IActionResult ObterUsuarioEstudioPorId(int id)
        {
            return Ok(_servicoDeUsuarios.ObterUsuarioEstudioPorId(id));
        }

        [HttpPost("adicionar-usuario-estudio")]
        public IActionResult AdicionarUsuarioEstudio([FromBody] UsuarioEstudio usuario)
        {
            _servicoDeUsuarios.AdicionarUsuarioEstudio(usuario);
            return Ok(usuario);
        }

        [HttpPatch("atualizar-usuario-estudio")]
        public IActionResult AtualizarUsuarioEstudio([FromBody] UsuarioEstudio usuario)
        {
            _servicoDeUsuarios.AtualizarUsuarioEstudio(usuario);
            return NoContent();
        }

        [HttpDelete("deletar-usuario-estudio/{id}")]
        public IActionResult DeletarUsuarioEstudio(int id)
        {
            _servicoDeUsuarios.DeletarUsuarioEstudio(id);
            return NoContent();
        }

        [HttpGet("obter-usuario-musico-por-id/{id}")]
        public IActionResult ObterUsuarioMusicoPorId(int id)
        {
            return Ok(_servicoDeUsuarios.ObterUsuarioMusicoPorId(id));
        }

        [HttpPost("adicionar-usuario-musico")]
        public IActionResult AdicionarUsuarioMusico([FromBody] UsuarioMusico usuario)
        {
            _servicoDeUsuarios.AdicionarUsuarioMusico(usuario);
            return Ok();
        }

        [HttpPatch("atualizar-usuario-musico")]
        public IActionResult AtualizarUsuarioMusico([FromBody] UsuarioMusico usuario)
        {
            _servicoDeUsuarios.AtualizarUsuarioMusico(usuario);
            return NoContent();
        }

        [HttpDelete("deletar-usuario-musico/{id}")]
        public IActionResult DeletarUsuarioMusico(int id)
        {
            _servicoDeUsuarios.DeletarUsuarioMusico(id);
            return NoContent();
        }
    }
}