using EstudioFacil.Dominio.Entidades;
using EstudioFacil.Dominio.EnumEstiloMusical;
using EstudioFacil.Dominio.Filtros;
using EstudioFacil.Infra.Singleton;
using EstudioFacil.Servico.Servicos;
using EstudioFacil.Testes.InjecaoDeDependencia;
using Microsoft.Extensions.DependencyInjection;
using Xunit;

namespace EstudioFacil.Testes.Testes
{
    public class TestesAgendamento : TesteBase
    {
        private readonly ServicoAgendamento _repositorioAgendamento;
        public TestesAgendamento()
        {
            _repositorioAgendamento = ServiceProvider.GetService<ServicoAgendamento>()
                ?? throw new Exception($"Erro ao obter o serviço {nameof(ServicoAgendamento)}");
            AgendamentoSingleton.InstanciaAgendamento.Clear();
        }

        [Fact]
        public void deve_comparar_o_metodo_obter_todos_com_o_criar_lista()
        {
            var listaEsperada = CriarLista();

            var listaDoObterTodos = _repositorioAgendamento.ObterTodos();

            Assert.Equivalent(listaDoObterTodos, listaEsperada);
        }

        [Fact]
        public void deve_verificar_o_tipo_da_lista()
        {
            var listaDoTipoAgendamento = _repositorioAgendamento.ObterTodos();

            Assert.IsType<List<Agendamento>>(listaDoTipoAgendamento);
        }

        [Theory]
        [InlineData(2)]
        [InlineData(1)]
        [InlineData(3)]
        public void deve_retornar_um_objeto_pelo_id(int id)
        {
            var idEsperado = id;
            CriarLista();

            var agendamentoBuscado = _repositorioAgendamento.ObterPorId(idEsperado);

            Assert.Equal(idEsperado, agendamentoBuscado.Id);
        }

        [Fact]
        public void deve_adicionar_agendamento_no_repositorio_singleton()
        {
            CriarLista();
            var agendamento = new Agendamento
            {
                Id = 4,
                NomeResponsavel = "Lucas",
                CpfResponsavel = "104.243.860-97",
                DataEHoraDeEntrada = DateTime.Parse("30/06/2026 09:00:00"),
                DataEHoraDeSaida = DateTime.Parse("30/06/2026 10:00:00"),
                ValorTotal = 200.00m,
                EstiloMusical = EstiloMusical.Eletronica,
                IdEstudio = 5
            };

            _repositorioAgendamento.Adicionar(agendamento);

            Assert.Contains(AgendamentoSingleton.InstanciaAgendamento, agendamento1 => agendamento1 == agendamento);
        }

        [Fact]
        public void deve_atualizar_a_lista_de_agendamento()
        {
            CriarLista();
            var listaComOElementoAtualizado = new Agendamento
            {
                Id = 2,
                NomeResponsavel = "Samuel",
                CpfResponsavel = "566.503.970-59",
                DataEHoraDeEntrada = DateTime.Parse("28/06/2025 17:00:00"),
                DataEHoraDeSaida = DateTime.Parse("28/06/2025 20:00:00"),
                ValorTotal = 300.00m,
                EstiloMusical = EstiloMusical.Gospel,
                IdEstudio = 2
            };

            _repositorioAgendamento.Atualizar(listaComOElementoAtualizado);
            var listaParaAtualizar = AgendamentoSingleton.InstanciaAgendamento
                .Where(agendamento => agendamento.Id == listaComOElementoAtualizado.Id).FirstOrDefault();

            Assert.Equivalent(listaComOElementoAtualizado, listaParaAtualizar);
        }

        [Fact]
        public void deve_deletar_um_objeto_da_lista_de_agendamento()
        {
            var listaCompleta = CriarLista();
            var listaQueSeraDeletada = new Agendamento
            {
                Id = 1,
                NomeResponsavel = "Paulo",
                CpfResponsavel = "03237852811",
                DataEHoraDeEntrada = DateTime.Parse("30/06/2024 12:00:00"),
                DataEHoraDeSaida = DateTime.Parse("30/06/2024 14:00:00"),
                ValorTotal = 200m,
                EstiloMusical = EstiloMusical.Blues,
                IdEstudio = 1
            };

            _repositorioAgendamento.Deletar(listaQueSeraDeletada.Id);

            Assert.DoesNotContain(listaCompleta, lista => lista == listaQueSeraDeletada);
        }

        [Fact]
        public void deve_retornar_a_excecao_de_id_inexistente()
        {
            CriarLista();

            var listaComIdInexistente = new Agendamento
            {
                Id = 10,
                NomeResponsavel = "Rodrigo",
                CpfResponsavel = "03238202811",
                DataEHoraDeEntrada = DateTime.Parse("30/06/2025 12:00:00"),
                DataEHoraDeSaida = DateTime.Parse("30/06/2025 14:00:00"),
                ValorTotal = 200m,
                EstiloMusical = EstiloMusical.Sertanejo,
                IdEstudio = 10
            };

            Assert.Throws<Exception>(() => _repositorioAgendamento.Deletar(listaComIdInexistente.Id));
        }

        [Fact]
        public void deve_retornar_a_excecao_de_nome_vazio()
        {
            CriarLista();
            var excecaoDeNomeVazio = "O campo nome do responsável é obrigatório, por favor digite o nome do responsável pelo agendamento.";
            var listaTeste = new Agendamento
            {
                Id = 8,
                NomeResponsavel = "",
                CpfResponsavel = "147.289.330-16",
                DataEHoraDeEntrada = DateTime.Parse("30/06/2050 12:00:00"),
                DataEHoraDeSaida = DateTime.Parse("30/06/2050 14:00:00"),
                ValorTotal = 200m,
                EstiloMusical = EstiloMusical.Blues,
                IdEstudio = 3
            };

            var mensagemDeErro = Assert.Throws<FluentValidation.ValidationException>(() => _repositorioAgendamento.Adicionar(listaTeste));

            Assert.Equal(excecaoDeNomeVazio, mensagemDeErro.Errors.Single().ErrorMessage);
        }

        [Fact]
        public void deve_retornar_a_excecao_de_nome_maior_que_trinta_caracteres()
        {
            CriarLista();
            var excecaoDeNomeMaiorQueTrintaCaracteres = "O nome do responsável excedeu o limite de 30 caracteres, digite um nome menor.";
            var listaNomeMaiorQueOEsperado = new Agendamento
            {
                Id = 3,
                NomeResponsavel = "João Ribeiro Da Silva Morais Junior",
                CpfResponsavel = "886.374.530-74",
                DataEHoraDeEntrada = DateTime.Parse("30/06/2050 12:00:00"),
                DataEHoraDeSaida = DateTime.Parse("30/06/2050 14:00:00"),
                ValorTotal = 200m,
                EstiloMusical = EstiloMusical.Blues,
                IdEstudio = 3
            };

            var mensagemDeErro = Assert.Throws<FluentValidation.ValidationException>(() => _repositorioAgendamento.Atualizar(listaNomeMaiorQueOEsperado));

            Assert.Equal(excecaoDeNomeMaiorQueTrintaCaracteres, mensagemDeErro.Errors.Single().ErrorMessage);
        }

        [Fact]
        public void deve_retornar_a_excecao_de_cpf_vazio()
        {
            CriarLista();
            var excecaoDeCpfVazio = new List<String>
            {
                "O campo CPF é obrigatório, por favor digite o CPF do responsável pelo agendamento.",
                "CPF inválido."
            };
            var listaComOCpfVazio = new Agendamento
            {
                Id = 9,
                NomeResponsavel = "Josué",
                CpfResponsavel = "",
                DataEHoraDeEntrada = DateTime.Parse("30/06/2050 14:00:00"),
                DataEHoraDeSaida = DateTime.Parse("30/06/2050 15:00:00"),
                ValorTotal = 100,
                EstiloMusical = EstiloMusical.Samba,
                IdEstudio = 3
            };

            var mensagemDeErro = Assert.Throws<FluentValidation.ValidationException>(() => _repositorioAgendamento.Adicionar(listaComOCpfVazio));

            var listaDeErros = mensagemDeErro.Errors.Select(x => x.ErrorMessage).ToList();

            Assert.Equivalent(excecaoDeCpfVazio, listaDeErros);
        }

        [Fact]

        public void deve_retornar_a_execao_de_cpf_invalido_e_estilo_musical_indefinido()
        {
            CriarLista();
            var excecaoDeCpfInvalido = new List<String>
            {
            "CPF inválido.",
            "Estilo Musical indefinido, por favor defina o Estilo Musical."
            };
            var listaComCpfInvalido = new Agendamento
            {
                Id = 1,
                NomeResponsavel = "Yudi",
                CpfResponsavel = "40028922",
                DataEHoraDeEntrada = DateTime.Parse("30/06/2026 12:00:00"),
                DataEHoraDeSaida = DateTime.Parse("30/06/2026 14:00:00"),
                ValorTotal = 200m,
                EstiloMusical = EstiloMusical.EnumIndefinido,
                IdEstudio = 1
            };

            var mensagemDeErro = Assert.Throws<FluentValidation.ValidationException>(() => _repositorioAgendamento.Atualizar(listaComCpfInvalido));

            var listaDeErros = mensagemDeErro.Errors.Select(x => x.ErrorMessage).ToList();

            Assert.Equivalent(excecaoDeCpfInvalido, listaDeErros);
        }

        [Fact]
        public void deve_retornar_as_excecao_de_data_e_hora_de_entrada()
        {
            CriarLista();
            var excecaoDaDataEHoraDeEntrada = new List<String>
            {
                "O campo data e hora de entrada é obrigatório, por favor digite uma data e hora de entrada.",
                "A data inserida é menor do que a data atual, por favor digite uma data válida.",
                "A hora de entrada inserida é menor ou igual ao horário atual, por favor digite um horário de entrada válido."
            };

            var listaSemDataEHoraDeEntrada = new Agendamento
            {
                Id = 10,
                NomeResponsavel = "Josué",
                CpfResponsavel = "074.122.550-61",
                DataEHoraDeSaida = DateTime.Parse("30/06/2026 15:00:00"),
                ValorTotal = 100,
                EstiloMusical = EstiloMusical.Samba,
                IdEstudio = 3
            };

            var mensagemDeErro = Assert.Throws<FluentValidation.ValidationException>(() => _repositorioAgendamento.Adicionar(listaSemDataEHoraDeEntrada));

            var listaDeErros = mensagemDeErro.Errors.Select(x => x.ErrorMessage).ToList();

            Assert.Equivalent(excecaoDaDataEHoraDeEntrada, listaDeErros);
        }

        [Fact]
        public void deve_retornar_a_excecao_da_data_de_entrada_menor_do_que_a_data_de_hoje_e_de_horario_minimo()
        {
            CriarLista();
            var excecaoDaDataDeEntradaMenorDoQueADataDeHoje = new List<String>
            {
                "A data inserida é menor do que a data atual, por favor digite uma data válida.",
                "A hora de entrada inserida é menor ou igual ao horário atual, por favor digite um horário de entrada válido.",
                "A data de saída inserida é menor do que a data atual, por favor digite uma data de saída válida.",
                "A hora de saída inserida é menor ou igual ao horário atual, por favor digite um horário de saída válido."
            };
            var listaComDataMenorDoQueADataDeHoje = new Agendamento
            {
                Id = 1,
                NomeResponsavel = "Paulo",
                CpfResponsavel = "924.262.440-38",
                DataEHoraDeEntrada = DateTime.Parse("09/06/2024"),
                DataEHoraDeSaida = DateTime.Parse("09/06/2024 14:00:00"),
                ValorTotal = 200m,
                EstiloMusical = EstiloMusical.Blues,
                IdEstudio = 1
            };

            var mensagemDeErro = Assert.Throws<FluentValidation.ValidationException>(() => _repositorioAgendamento.Atualizar(listaComDataMenorDoQueADataDeHoje));

            var listaDeErros = mensagemDeErro.Errors.Select(x => x.ErrorMessage).ToList();

            Assert.Equivalent(excecaoDaDataDeEntradaMenorDoQueADataDeHoje, listaDeErros);
        }

        [Fact]
        public void deve_retornar_uma_excecao_quando_a_data_for_hoje_e_a_hora_for_menor_ou_igual_a_hora_atual()
        {
            CriarLista();
            var excecaoDeHoraDeEntradaMenorQueHoraAtualDoDiaAtual = new List<String>
            {
                "A hora de entrada inserida é menor ou igual ao horário atual, por favor digite um horário de entrada válido.",
                "A quantidade de tempo mínima para agendamento é de uma hora."
            };

            var listaComADataDeHojeEHoraMenorQueAHoraAtual = new Agendamento
            {
                Id = 1,
                NomeResponsavel = "Paulo",
                CpfResponsavel = "852.679.670-41",
                DataEHoraDeEntrada = DateTime.Today,
                DataEHoraDeSaida = DateTime.Parse("30/06/2024 14:00:00"),
                ValorTotal = 200m,
                EstiloMusical = EstiloMusical.Blues,
                IdEstudio = 1
            };

            var mensagemDeErro = Assert.Throws<FluentValidation.ValidationException>(() => _repositorioAgendamento.Atualizar(listaComADataDeHojeEHoraMenorQueAHoraAtual));

            var listaDeErros = mensagemDeErro.Errors.Select(x => x.ErrorMessage).ToList();

            Assert.Equivalent(excecaoDeHoraDeEntradaMenorQueHoraAtualDoDiaAtual, listaDeErros);
        }

        [Fact]
        public void deve_retornar_a_excecao_da_data_e_hora_de_saida_igual_a_data_e_hora_de_entrada()
        {
            CriarLista();


            var excecaoDaDataEHoraDeSaidaIgualADataEHoraDeSaida = new List<String>
            {
                "O horário de saída não pode ser igual ao horário de entrada.",
                "A quantidade de tempo mínima para agendamento é de uma hora."
            };
            var listaComDataEHoraDeEntradaIgualADataEHoraDeSaida = new Agendamento
            {
                Id = 11,
                NomeResponsavel = "Rafaela",
                CpfResponsavel = "074.122.550-61",
                DataEHoraDeEntrada = DateTime.Parse("30/07/2026 10:00:00"),
                DataEHoraDeSaida = DateTime.Parse("30/07/2026 10:00:00"),
                ValorTotal = 300m,
                EstiloMusical = EstiloMusical.MusicaClassica,
                IdEstudio = 2
            };

            var mensagemDeErro = Assert.Throws<FluentValidation.ValidationException>(() => _repositorioAgendamento.Adicionar(listaComDataEHoraDeEntradaIgualADataEHoraDeSaida));

            var listaDeErros = mensagemDeErro.Errors.Select(x => x.ErrorMessage).ToList();

            Assert.Equivalent(excecaoDaDataEHoraDeSaidaIgualADataEHoraDeSaida, listaDeErros);
        }

        [Fact]
        public void deve_retornar_a_excecao_de_quantidade_de_hora_do_agendamento_menor_que_uma_hora()
        {
            CriarLista();
            var excecaoDeHorarioMenorQueUmaHora = "A quantidade de tempo mínima para agendamento é de uma hora.";
            var listaComHorarioDeAgendamentoMenorDoQueUmaHora = new Agendamento
            {
                Id = 2,
                NomeResponsavel = "Rafael",
                CpfResponsavel = "968.807.910-34",
                DataEHoraDeEntrada = DateTime.Parse("26/06/2028 17:00:00"),
                DataEHoraDeSaida = DateTime.Parse("26/06/2028 17:30:00"),
                ValorTotal = 300m,
                EstiloMusical = EstiloMusical.Jazz,
                IdEstudio = 2
            };

            var mensagemDeErro = Assert.Throws<FluentValidation.ValidationException>(() => _repositorioAgendamento.Atualizar(listaComHorarioDeAgendamentoMenorDoQueUmaHora));

            Assert.Equal(excecaoDeHorarioMenorQueUmaHora, mensagemDeErro.Errors.Single().ErrorMessage);
        }

        [Fact]
        public void deve_retornar_a_excecao_do_valor_total_maior_que_cinco_algarismos_e_duas_casas_decimais()
        {
            CriarLista();
            var excecaoDoValorTotalMaiorQueCincoAlgarismosEDuasCasasDecimais = "O Valor Total excedeu o limite de 6 algarismos totais com duas casas decimais, por favor digite no formato exigido.";
            var listaComValortotalMaiorQueCincoAlgarismosEDuasCasasDecimais = new Agendamento
            {
                Id = 12,
                NomeResponsavel = "Cirlaneide",
                CpfResponsavel = "295.902.500-84",
                DataEHoraDeEntrada = DateTime.Parse("01/12/2024 14:00:00"),
                DataEHoraDeSaida = DateTime.Parse("01/12/2024 15:00:00"),
                ValorTotal = 10000.00m,
                EstiloMusical = EstiloMusical.Gospel,
                IdEstudio = 3
            };

            var mensagemDeErro = Assert.Throws<FluentValidation.ValidationException>(() => _repositorioAgendamento.Adicionar(listaComValortotalMaiorQueCincoAlgarismosEDuasCasasDecimais));

            Assert.Equal(excecaoDoValorTotalMaiorQueCincoAlgarismosEDuasCasasDecimais, mensagemDeErro.Errors.Single().ErrorMessage);
        }

        [Fact]
        public void deve_retornar_a_excecao_de_estilo_musical_inexistente()
        {
            CriarLista();
            var excecaoDeEnumInexistente = "O Estilo Musical não foi encontrado, digite um Estilo Musical válido.";
            var listaComEnumInexistente = new Agendamento
            {
                Id = 3,
                NomeResponsavel = "Cleber Da Silva Rodrigues",
                CpfResponsavel = "717.613.990-39",
                DataEHoraDeEntrada = DateTime.Parse("30/06/2050 14:00:00"),
                DataEHoraDeSaida = DateTime.Parse("30/06/2050 15:00:00"),
                EstiloMusical = (EstiloMusical)8,
                ValorTotal = 100m,
                IdEstudio = 3
            };

            var mensagemDeErro = Assert.Throws<FluentValidation.ValidationException>(() => _repositorioAgendamento.Atualizar(listaComEnumInexistente));

            Assert.Equal(excecaoDeEnumInexistente, mensagemDeErro.Errors.Single().ErrorMessage);
        }

        [Fact]
        public void deve_retornar_a_excecao_de_estilo_musical_indefinido()
        {
            CriarLista();
            var excecaoDeEnumIndefinido = "Estilo Musical indefinido, por favor defina o Estilo Musical.";
            var listaComEnumIndefinido = new Agendamento
            {
                Id = 1,
                NomeResponsavel = "Paulo",
                CpfResponsavel = "563.456.190-60",
                DataEHoraDeEntrada = DateTime.Parse("30/06/2026 12:00:00"),
                DataEHoraDeSaida = DateTime.Parse("30/06/2026 14:00:00"),
                ValorTotal = 200m,
                EstiloMusical = EstiloMusical.EnumIndefinido,
                IdEstudio = 1
            };

            var mensagemDeErro = Assert.Throws<FluentValidation.ValidationException>(() => _repositorioAgendamento.Adicionar(listaComEnumIndefinido));

            Assert.Equal(excecaoDeEnumIndefinido, mensagemDeErro.Errors.Single().ErrorMessage);
        }

        [Fact]
        public void deve_verificar_se_o_filtro_de_nome_funciona()
        {
            CriarLista();
            var listaEsperada = new List<Agendamento>
            {
                new Agendamento
                {
                    Id = 2,
                    NomeResponsavel = "Rafael",
                    CpfResponsavel = "52273122515",
                    DataEHoraDeEntrada = DateTime.Parse("26/06/2024 17:00:00"),
                    DataEHoraDeSaida = DateTime.Parse("26/06/2024 20:00:00"),
                    ValorTotal = 300m,
                    EstiloMusical = EstiloMusical.Jazz,
                    IdEstudio = 2
                }
            };
            var filtroNome = new FiltroAgendamento { NomeResponsavel = "e" };

            var listaDoObterTodos = _repositorioAgendamento.ObterTodos(filtroNome);

            Assert.Equivalent(listaEsperada, listaDoObterTodos);
        }

        [Fact]
        public void deve_verificar_se_o_filtro_de_valor_total_funciona()
        {
            CriarLista();
            var listaEsperada = new List<Agendamento>
            {
                new Agendamento
                {
                    Id = 2,
                    NomeResponsavel = "Rafael",
                    CpfResponsavel = "52273122515",
                    DataEHoraDeEntrada = DateTime.Parse("26/06/2024 17:00:00"),
                    DataEHoraDeSaida = DateTime.Parse("26/06/2024 20:00:00"),
                    ValorTotal = 300m,
                    EstiloMusical = EstiloMusical.Jazz,
                    IdEstudio = 2
                }
            };
            var filtroValorTotal = new FiltroAgendamento { ValorMinimo = 300m };

            var listaDoObterTodos = _repositorioAgendamento.ObterTodos(filtroValorTotal);

            Assert.Equivalent(listaEsperada, listaDoObterTodos);
        }

        [Fact]
        public void deve_verificar_se_o_filtro_de_data_e_hora_de_entrada_esta_funcionando()
        {
            CriarLista();
            var filtroDataEHora = new FiltroAgendamento { DataMinima = DateTime.Parse("26/06/2024 17:00:00") };

            var listaDoObterTodos = _repositorioAgendamento.ObterTodos(filtroDataEHora);

            Assert.Contains(listaDoObterTodos, lista => lista.DataEHoraDeEntrada == filtroDataEHora.DataMinima);
        }

        public List<Agendamento> CriarLista()
        {
            var listaDeAgendamentoSingleton = AgendamentoSingleton.InstanciaAgendamento;

            var listasDeAgendamentos = new List<Agendamento>
            {
                new Agendamento
                {
                    Id = 1,
                    NomeResponsavel = "Paulo",
                    CpfResponsavel = "03237852811",
                    DataEHoraDeEntrada = DateTime.Parse("30/06/2024 12:00:00"),
                    DataEHoraDeSaida = DateTime.Parse("30/06/2024 14:00:00"),
                    ValorTotal = 200m,
                    EstiloMusical = EstiloMusical.Blues,
                    IdEstudio = 1
                },
                new Agendamento
                {
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
                    Id = 3,
                    NomeResponsavel = "Josué",
                    CpfResponsavel = "09631009047",
                    DataEHoraDeEntrada = DateTime.Parse("30/06/2024 14:00:00"),
                    DataEHoraDeSaida = DateTime.Parse("30/06/2024 15:00:00"),
                    ValorTotal = 100m,
                    EstiloMusical = EstiloMusical.Samba,
                    IdEstudio = 3
                }
            };
            listaDeAgendamentoSingleton.AddRange(listasDeAgendamentos);
            return listaDeAgendamentoSingleton;
        }
    }
}