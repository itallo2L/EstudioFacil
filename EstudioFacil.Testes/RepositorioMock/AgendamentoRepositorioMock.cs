using EstudioFacil.Dominio.Entidades;
using EstudioFacil.Dominio.Filtros;
using EstudioFacil.Dominio.InterfacesRepositorio;
using EstudioFacil.Infra.Singleton;

namespace EstudioFacil.Testes.RepositorioMock
{
    public class AgendamentoRepositorioMock : IRepositorioAgendamento
    {
        private AgendamentoSingleton _instanciaAgendamento;

        public AgendamentoRepositorioMock()
        {
            _instanciaAgendamento = AgendamentoSingleton.InstanciaAgendamento;
        }

        public void Adicionar(Agendamento agendamento)
        {
            _instanciaAgendamento.Add(agendamento);
        }

        public void Atualizar(Agendamento agendamentoParaAtualizar)
        {
            var verificarSeOIdExiste = _instanciaAgendamento.Find(lista => lista.Id == agendamentoParaAtualizar.Id)
                ?? throw new Exception($"Não foi possível encontrar o agendamento com o ID: {agendamentoParaAtualizar.Id}");
            var indice = _instanciaAgendamento.IndexOf(verificarSeOIdExiste);
            _instanciaAgendamento[indice] = agendamentoParaAtualizar;
        }

        public Agendamento ObterPorId(int id)
        {
            var objetoRetornado = _instanciaAgendamento.Find(x => x.Id == id)
                ?? throw new Exception($"Erro ao obter o objeto, o ID: {id} é inexistente!");
            return objetoRetornado;
        }

        public void Deletar(int id)
        {
            var objetoQueSeraRemovido = _instanciaAgendamento.Find(agendamento => agendamento.Id == id)
                ?? throw new Exception($"Não foi possível encontrar o ID: {id}");
            _instanciaAgendamento.Remove(objetoQueSeraRemovido);
        }

        public List<Agendamento> ObterTodos(FiltroAgendamento? filtro = null)
        {
            var listaAgendamento = _instanciaAgendamento.ToList();

            if (!string.IsNullOrEmpty(filtro?.NomeResponsavel))
            {
                listaAgendamento = listaAgendamento.FindAll(agendamento => agendamento.NomeResponsavel.Contains(filtro?.NomeResponsavel, StringComparison.OrdinalIgnoreCase));
            }
            if ((filtro?.DataMinima).HasValue)
            {
                listaAgendamento = listaAgendamento.FindAll(agendamento => agendamento.DataEHoraDeEntrada == filtro?.DataMinima);
            }
            if ((filtro?.ValorMinimo).HasValue)
            {
                listaAgendamento = listaAgendamento.FindAll(agendamento => agendamento.ValorTotal == filtro?.ValorMinimo);
            }
            return listaAgendamento;
        }
    }
}