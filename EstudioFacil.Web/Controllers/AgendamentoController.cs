using EstudioFacil.Dominio.Entidades;
using EstudioFacil.Dominio.Filtros;
using EstudioFacil.Servico.Servicos;
using Microsoft.AspNetCore.Mvc;

namespace EstudioFacil.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AgendamentoController : ControllerBase
    {
        private readonly ServicoAgendamento _servicoAgendamento;

        public AgendamentoController(ServicoAgendamento servicoAgendamento)
        {
            _servicoAgendamento = servicoAgendamento;
        }

        [HttpGet]
        public IActionResult ObterTodos([FromQuery] FiltroAgendamento filtro)
        {
            return Ok(_servicoAgendamento.ObterTodos(filtro));
        }

        [HttpGet("{id}")]
        public IActionResult ObtertPorId(int id)
        {
            return Ok(_servicoAgendamento.ObterPorId(id));
        }

        [HttpPut]
        public IActionResult Adicionar([FromBody] Agendamento agendamento)
        {
            _servicoAgendamento.Adicionar(agendamento);
            return Ok();
        }

        [HttpPatch]
        public IActionResult Atualizar([FromBody] Agendamento agendamento)
        {
            _servicoAgendamento.Atualizar(agendamento);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Deletar(int id)
        {
            _servicoAgendamento.Deletar(id);
            return NoContent();
        }
    }
}