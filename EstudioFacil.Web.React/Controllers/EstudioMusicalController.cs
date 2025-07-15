using EstudioFacil.Dominio.Entidades;
using EstudioFacil.Dominio.Filtros;
using EstudioFacil.Dominio.Servicos;
using Microsoft.AspNetCore.Mvc;

namespace EstudioFacil.Web.React.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EstudioMusicalController : ControllerBase
    {
        private readonly ServicoEstudioMusical _servicoEstudioMusical;

        public EstudioMusicalController(ServicoEstudioMusical servicoEstudioMusical)
        {
            _servicoEstudioMusical = servicoEstudioMusical;
        }

        [HttpGet]
        public IActionResult ObterTodos([FromQuery] FiltroEstudioMusical filtro)
        {
            return Ok(_servicoEstudioMusical.ObterTodos(filtro));
        }

        [HttpGet("{id}")]
        public IActionResult ObterPorId(int id)
        {
            return Ok(_servicoEstudioMusical.ObterPorId(id));
        }

        [HttpPost]
        public IActionResult Adicionar([FromBody] EstudioMusical estudioMusical)
        {
            _servicoEstudioMusical.Adicionar(estudioMusical);
            return Ok(estudioMusical);
        }

        [HttpPatch]
        public IActionResult Atualizar([FromBody] EstudioMusical estudioMusical)
        {
            _servicoEstudioMusical.Atualizar(estudioMusical);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Deletar(int id)
        {
            _servicoEstudioMusical.Deletar(id);
            return NoContent();
        }
    }
}