using EstudioFacil.Dominio.Entidades;
using EstudioFacil.Dominio.Filtros;
using EstudioFacil.Dominio.Servicos;
using EstudioFacil.Infra.Singleton;
using EstudioFacil.Testes.InjecaoDeDependencia;
using Microsoft.Extensions.DependencyInjection;
using Xunit;

namespace EstudioFacil.Testes.Testes
{
    public class TestesEstudioMusical : TesteBase
    {
        private readonly ServicoEstudioMusical _repositorioEstudioMusical;
        public TestesEstudioMusical()
        {
            _repositorioEstudioMusical = ServiceProvider.GetService<ServicoEstudioMusical>()
                ?? throw new Exception($"Erro ao obter serviço {nameof(ServicoEstudioMusical)}");
            EstudioMusicalSingleton.InstanciaEstudioMusical.Clear();
        }

        [Fact]
        public void deve_comparar_o_metodo_criar_lista_com_o_obter_todos()
        {
            var listaEsperada = CriarLista();

            var listaDoObterTodos = _repositorioEstudioMusical.ObterTodos();

            Assert.Equivalent(listaDoObterTodos, listaEsperada);
        }

        [Fact]
        public void deve_verificar_o_tipo_da_lista()
        {
            var listaDoTipoEstudioMusical = _repositorioEstudioMusical.ObterTodos();

            Assert.IsType<List<EstudioMusical>>(listaDoTipoEstudioMusical);
        }

        [Fact]
        public void deve_retornar_o_objeto_pelo_id()
        {
            var idEsperado = 2;
            CriarLista();

            var estudioMusicalBuscado = _repositorioEstudioMusical.ObterPorId(idEsperado);

            Assert.Equal(idEsperado, estudioMusicalBuscado.Id);
        }

        [Fact]
        public void deve_adicionar_estudio_musical_no_repositorio_singleton()
        {
            var listaDeEstudioMusical = CriarLista();
            var estudioMusical = new EstudioMusical
            {
                Id = 5,
                Nome = "Claudio",
                EstaAberto = false
            };

            _repositorioEstudioMusical.Adicionar(estudioMusical);

            Assert.Contains(listaDeEstudioMusical, estudioMusical1 => estudioMusical1 == estudioMusical);
        }

        [Fact]
        public void deve_atualizar_a_lista_de_estudio_musical()
        {
            var elementoAtualizado = new EstudioMusical
            {
                Id = 3,
                Nome = "Samsungo",
                EstaAberto = true
            };
            CriarLista();

            _repositorioEstudioMusical.Atualizar(elementoAtualizado);
            var listaParaAtualizar = EstudioMusicalSingleton.InstanciaEstudioMusical
                .Where(estudioMusical => estudioMusical.Id == elementoAtualizado.Id).FirstOrDefault();

            Assert.Equivalent(elementoAtualizado, listaParaAtualizar);
        }

        [Fact]
        public void deve_conferir_se_a_validacao_de_nome_esta_correta_e_caso_esteja_adicionar()
        {
            var estudioSemNome = new EstudioMusical
            {
                Id = 6,
                EstaAberto = false
            };

            var mensagemDeErro = Assert.Throws<FluentValidation.ValidationException>(() => _repositorioEstudioMusical.Adicionar(estudioSemNome));

            Assert.Equal("O campo Nome do Estúdio é obrigatório, por favor insira o nome do estúdio.", mensagemDeErro.Errors.Single().ErrorMessage);
        }

        [Fact]
        public void deve_deletar_um_objeto_da_lista_de_estudio_musical()
        {
            var listaCompleta = CriarLista();
            var listaQueSeraDeletada = new EstudioMusical
            {
                Id = 2,
                Nome = "Queizy",
                EstaAberto = false
            };

            _repositorioEstudioMusical.Deletar(listaQueSeraDeletada.Id);

            Assert.DoesNotContain(listaCompleta, lista => lista == listaQueSeraDeletada);
        }

        [Fact]
        public void deve_retornar_uma_excecao_quando_o_id_for_inexistente()
        {
            CriarLista();

            var listaComIdInexistente = new EstudioMusical
            {
                Id = 10,
                Nome = "Estudio10",
                EstaAberto = true
            };

            Assert.Throws<Exception>(() => _repositorioEstudioMusical.Deletar(listaComIdInexistente.Id));
        }

        [Fact]
        public void deve_verificar_se_o_filtro_de_nome_esta_funcionando()
        {
            CriarLista();
            var listaEstudioMusical = new List<EstudioMusical>
            {
                new EstudioMusical
                {
                    Id = 1,
                    Nome = "Sliced",
                    EstaAberto = true
                }
            };
            var filtro = new FiltroEstudioMusical { Nome = "sl" };

            var listaDoObterTodos = _repositorioEstudioMusical.ObterTodos(filtro);

            Assert.Equivalent(listaEstudioMusical, listaDoObterTodos);
        }

        [Theory]
        [InlineData(true)]
        [InlineData(false)]
        public void deve_verificar_se_o_filtro_de_booleano_esta_funcionando(bool simOuNao)
        {
            CriarLista();
            var filtro = new FiltroEstudioMusical { EstaAberto = simOuNao };

            var listaDoObterTodos = _repositorioEstudioMusical.ObterTodos(filtro);

            Assert.Contains(listaDoObterTodos, lista => lista.EstaAberto == filtro.EstaAberto);
        }

        [Fact]
        public void deve_verificar_se_o_estudio_tem_nome_repetido()
        {
            CriarLista();
            var excecaoNomeRepetido = "Já existe um estúdio musical com esse nome.";
            var estudioComNomeRepetido = new EstudioMusical
            {
                Id = 4,
                Nome = "Sliced",
                EstaAberto = true
            };

            var mensagemDeErro = Assert.Throws<FluentValidation.ValidationException>(() => _repositorioEstudioMusical.Adicionar(estudioComNomeRepetido));

            Assert.Equal(excecaoNomeRepetido, mensagemDeErro.Errors.Single().ErrorMessage);
        }

        private List<EstudioMusical> CriarLista()
        {
            var listaDeEstudioMusicalSingleton = EstudioMusicalSingleton.InstanciaEstudioMusical;
            var listasDeEstudiosMusicais = new List<EstudioMusical>
            {
                new EstudioMusical
                {
                    Id = 1,
                    Nome = "Sliced",
                    EstaAberto = true
                },
                new EstudioMusical
                {
                    Id = 2,
                    Nome = "Queizy",
                    EstaAberto = false
                },
                new EstudioMusical
                {
                    Id = 3,
                    Nome = "Musik",
                    EstaAberto = true
                }
            };
            listaDeEstudioMusicalSingleton.AddRange(listasDeEstudiosMusicais);
            return listaDeEstudioMusicalSingleton;
        }
    }
}