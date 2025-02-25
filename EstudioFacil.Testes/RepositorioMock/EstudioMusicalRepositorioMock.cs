using EstudioFacil.Dominio.Entidades;
using EstudioFacil.Dominio.Filtros;
using EstudioFacil.Dominio.InterfacesRepositorio;
using EstudioFacil.Infra.Singleton;

namespace EstudioFacil.Testes.RepositorioMock
{
    public class EstudioMusicalRepositorioMock : IRepositorioEstudioMusical
    {
        private EstudioMusicalSingleton _instanciaEstudioMusical;

        public EstudioMusicalRepositorioMock()
        {
            _instanciaEstudioMusical = EstudioMusicalSingleton.InstanciaEstudioMusical;
        }
        public void Adicionar(EstudioMusical estudioMusical)
        {
            _instanciaEstudioMusical.Add(estudioMusical);
        }

        public void Atualizar(EstudioMusical estudioParaAtualizar)
        {
            var verificaSeOIdExiste = _instanciaEstudioMusical.Find(lista => lista.Id == estudioParaAtualizar.Id)
                ?? throw new Exception($"Não foi possível encontrar o Estúdio com o ID: {estudioParaAtualizar.Id}");
            var indice = _instanciaEstudioMusical.IndexOf(verificaSeOIdExiste);
            _instanciaEstudioMusical[indice] = estudioParaAtualizar;
        }

        public EstudioMusical ObterPorId(int id)
        {
            var objetoRetornado = _instanciaEstudioMusical.Find(x => x.Id == id)
                ?? throw new Exception($"Erro ao obter o objeto, o ID: {id} é inexistente!");
            return objetoRetornado;
        }

        public void Deletar(int id)
        {
            var objetoQueSeraRemovido = _instanciaEstudioMusical.Find(estudio => estudio.Id == id)
                ?? throw new Exception($"Não foi possível encontrar o estúdio com o ID: {id}");
            _instanciaEstudioMusical.Remove(objetoQueSeraRemovido);
        }

        public List<EstudioMusical> ObterTodos(FiltroEstudioMusical? filtro = null)
        {
            var listaEstudioMusical = _instanciaEstudioMusical.ToList();

            if (filtro?.EstaAberto != null)
            {
                listaEstudioMusical = listaEstudioMusical.FindAll(estudioMusical => estudioMusical.EstaAberto == filtro?.EstaAberto);
            }
            if (!string.IsNullOrEmpty(filtro?.Nome))
            {
                listaEstudioMusical = listaEstudioMusical.FindAll(estudioMusical => estudioMusical.Nome.Contains(filtro?.Nome, StringComparison.OrdinalIgnoreCase));
            }

            return listaEstudioMusical;
        }

        public bool VerificaSeEstudioTemNomeRepetido(EstudioMusical estudioMusical)
        {
            var estudioRepetido = !_instanciaEstudioMusical
                .Exists(estudio => estudio.Nome == estudioMusical.Nome && estudio.Id != estudioMusical.Id);
            return estudioRepetido;
        }
    }
}