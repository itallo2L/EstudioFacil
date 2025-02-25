using EstudioFacil.Dominio.Entidades;
using EstudioFacil.Dominio.Servicos;
using EstudioFacil.Testes.InjecaoDeDependencia;
using Microsoft.Extensions.DependencyInjection;
using Xunit;

namespace EstudioFacil.Testes
{
    public class TestandoServicos : TesteBase
    {
        private readonly ServicoEstudioMusical _servicoEstudioMusical;
        public TestandoServicos()
        {
            _servicoEstudioMusical = ServiceProvider.GetService<ServicoEstudioMusical>()
            ?? throw new Exception($"Erro ao obter o serviço {nameof(ServicoEstudioMusical)}");
        }

        [Fact]
        public void deve_comparar_a_lista_obter_todos_com_a_lista_de_comparacao()
        {
            var listaDeComparacao = new List<EstudioMusical>
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

            var listaEsperada = CriarLista();

            Assert.Equivalent(listaDeComparacao, listaEsperada);
        }

        [Fact]
        public void deve_conferir_se_a_lista_e_do_tipo_estudio_musical_singleton()
        {
            var listaDoTipoEstudioMusical = CriarLista();

            Assert.IsType<List<EstudioMusical>>(listaDoTipoEstudioMusical);
        }

        public List<EstudioMusical> CriarLista()
        {
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
            return listasDeEstudiosMusicais;
        }
    }
}