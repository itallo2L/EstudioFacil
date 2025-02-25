using EstudioFacil.Dominio.Entidades;
using EstudioFacil.Dominio.EnumEstiloMusical;
using EstudioFacil.Infra.Singleton;
using EstudioFacil.Servico.Servicos;
using EstudioFacil.Testes.InjecaoDeDependencia;
using Microsoft.Extensions.DependencyInjection;
using System.Diagnostics;
using Xunit;
using static LinqToDB.Common.Configuration;

namespace EstudioFacil.Testes.Testes
{
    public class TesteServicoAgendamento : TesteBase
    {
        private readonly ServicoAgendamento _servicoAgendamento;
        public TesteServicoAgendamento()
        {
            _servicoAgendamento = ServiceProvider.GetService<ServicoAgendamento>()
            ?? throw new Exception($"Erro ao obter o serviço {nameof(ServicoAgendamento)}");
        }

        [Fact]
        public void deve_certificar_se_o_agendamento_adicionado_esta_no_banco()
        {
            string data = AdicionarDias();
            var estudio = new EstudioMusical
            {
                EstaAberto = true,
                Nome = "Samuel Aarag",
                Id = 15
            };

            EstudioMusicalSingleton.InstanciaEstudioMusical.Add(estudio);

            var agendamento = new Agendamento
            {
                Id = 1,
                NomeResponsavel = "Paulo",
                CpfResponsavel = "424.977.200-45",
                DataEHoraDeEntrada = DateTime.Parse($"{data} 09:00:00"),
                DataEHoraDeSaida = DateTime.Parse($"{data} 10:00:00"),
                ValorTotal = 200m,
                EstiloMusical = EstiloMusical.Blues,
                IdEstudio = 15
            };

            _servicoAgendamento.Adicionar(agendamento);

            var itemSalvoNoBanco = _servicoAgendamento.ObterPorId(agendamento.Id);

            Assert.Equal(agendamento.NomeResponsavel, itemSalvoNoBanco.NomeResponsavel);
        }

        [Fact]
        public void deve_retornar_erro_de_validacao_quando_ha_um_cadastro_no_mesmo_estudio_com_mesma_data_e_hora()
        {
            var estudio = new EstudioMusical
            {
                EstaAberto = true,
                Nome = "Samuel Aarag",
                Id = 15
            };

            EstudioMusicalSingleton.InstanciaEstudioMusical.Add(estudio);

            var lista = CriarLista();
            var excecaoDeAgendamentoExistente = "Já há um agendamento para esse estúdio.";
            AgendamentoSingleton.InstanciaAgendamento.AddRange(lista);

            var agendamento = new Agendamento
            {
                Id = 1,
                NomeResponsavel = "Paulo",
                CpfResponsavel = "424.977.200-45",
                DataEHoraDeEntrada = DateTime.Parse($"30/07/2050 12:00:00"),
                DataEHoraDeSaida = DateTime.Parse($"30/07/2050 15:00:00"),
                ValorTotal = 200m,
                EstiloMusical = EstiloMusical.Blues,
                IdEstudio = 15
            };

            var mensagemDeErro = Assert.Throws<FluentValidation.ValidationException>(() => _servicoAgendamento.Adicionar(agendamento));

            Assert.Equal(excecaoDeAgendamentoExistente, mensagemDeErro.Errors.Single().ErrorMessage);
        }

        [Fact]
        public void deve_comparar_a_lista_obter_todos_com_a_lista_de_comparacao()
        {
            string data = AdicionarDias();
            var listaDeComparacao = new List<Agendamento>
            {
                new Agendamento
                {
                    Id = 1,
                    NomeResponsavel = "Paulo",
                    CpfResponsavel = "424.977.200-45",
                    DataEHoraDeEntrada = DateTime.Parse($"{data} 12:00:00"),
                    DataEHoraDeSaida = DateTime.Parse($"{data} 14:00:00"),
                    ValorTotal = 200m,
                    EstiloMusical = EstiloMusical.Blues,
                    IdEstudio = 1 
                },
                new Agendamento {
                    Id = 2,
                    NomeResponsavel = "Rafael",
                    CpfResponsavel = "52273122515",
                    DataEHoraDeEntrada = DateTime.Parse("26/06/2024 17:00:00"),
                    DataEHoraDeSaida = DateTime.Parse("26/06/2024 20:00:00"),
                    ValorTotal = 300m,
                    EstiloMusical = EstiloMusical.Jazz,
                    IdEstudio = 2
                },
                new Agendamento
                {
                    Id = 1,
                    NomeResponsavel = "Josué",
                    CpfResponsavel = "09631009047",
                    DataEHoraDeEntrada = DateTime.Parse("30/06/2024 14:00:00"),
                    DataEHoraDeSaida = DateTime.Parse("30/06/2024 15:00:00"),
                    ValorTotal = 100,
                    EstiloMusical = EstiloMusical.Samba,
                    IdEstudio = 3
                }
            };

            var listaEsperada = CriarLista();

            Assert.Equivalent(listaDeComparacao, listaEsperada);
        }

        [Fact]
        public void deve_conferir_se_a_lista_e_do_tipo_agendamento_singleton()
        {
            var listaDoTipoAgendamento = CriarLista();

            Assert.IsType<List<Agendamento>>(listaDoTipoAgendamento);
        }

        public List<Agendamento> CriarLista()
        {
            string data = AdicionarDias();
            var listasDeAgendamentos = new List<Agendamento>
            {
                new Agendamento
                {
                    Id = 1,
                    NomeResponsavel = "Paulo",
                    CpfResponsavel = "424.977.200-45",
                    DataEHoraDeEntrada = DateTime.Parse($"{data} 12:00:00"),
                    DataEHoraDeSaida = DateTime.Parse($"{data} 14:00:00"),
                    ValorTotal = 200m,
                    EstiloMusical = EstiloMusical.Blues,
                    IdEstudio = 1
                },
                new Agendamento {
                    Id = 2,
                    NomeResponsavel = "Rafael",
                    CpfResponsavel = "52273122515",
                    DataEHoraDeEntrada = DateTime.Parse("26/06/2024 17:00:00"),
                    DataEHoraDeSaida = DateTime.Parse("26/06/2024 20:00:00"),
                    ValorTotal = 300m,
                    EstiloMusical = EstiloMusical.Jazz,
                    IdEstudio = 2
                },
                new Agendamento
                {
                    Id = 1,
                    NomeResponsavel = "Josué",
                    CpfResponsavel = "09631009047",
                    DataEHoraDeEntrada = DateTime.Parse("30/06/2024 14:00:00"),
                    DataEHoraDeSaida = DateTime.Parse("30/06/2024 15:00:00"),
                    ValorTotal = 100,
                    EstiloMusical = EstiloMusical.Samba,
                    IdEstudio = 3
                },
                new Agendamento
                {
                    Id = 1,
                    NomeResponsavel = "Sam",
                    CpfResponsavel = "09631009047",
                    DataEHoraDeEntrada = DateTime.Parse("30/07/2050 12:00:00"),
                    DataEHoraDeSaida = DateTime.Parse("30/07/2050 15:00:00"),
                    ValorTotal = 100,
                    EstiloMusical = EstiloMusical.Samba,
                    IdEstudio = 15
                },
            };
            return listasDeAgendamentos;
        }

        public string AdicionarDias()
        {
            DateTime dataAtual = DateTime.Today.AddDays(30);
            return dataAtual.ToString("dd/MM/yyyy");
        }
    }
}