using EstudioFacil.Dominio.Entidades;
using EstudioFacil.Dominio.EnumEstiloMusical;
using EstudioFacil.Dominio.Filtros;
using EstudioFacil.Dominio.Servicos;
using EstudioFacil.Servico.Servicos;
using System.Data;
using System.Text.RegularExpressions;
using System.Xml;

namespace EstudioFacil.Forms
{
    public partial class FormAgendamentoEmEstudioMusical : Form
    {
        private readonly ServicoAgendamento _servicoAgendamento;
        private readonly ServicoEstudioMusical _servicoEstudioMusical;
        private readonly FiltroAgendamento _filtroAgendamento = new FiltroAgendamento();
        private readonly FiltroEstudioMusical _filtroEstudioMusical = new FiltroEstudioMusical();
        const int indiceId = 0;
        const int posicaoDaColunaNome = 1;
        const string erroAoDeletar = "Erro ao Deletar";
        const string erroAoAtualizar = "Erro ao Atualizar";

        public FormAgendamentoEmEstudioMusical(ServicoAgendamento servicoAgendamento, ServicoEstudioMusical servicoEstudioMusical)
        {
            _servicoAgendamento = servicoAgendamento;
            _servicoEstudioMusical = servicoEstudioMusical;

            InitializeComponent();
            ObterTodosGridEstudioMusical();
            ObterTodosGridAgendamento();
            GerarColunaParaFormatarDataGridAgendamento();

            cbEstiloMusical.SelectedIndex = (int)decimal.Zero;
        }

        private void ObterTodosGridEstudioMusical()
        {
            dataGridEstudioMusical.DataSource = _servicoEstudioMusical.ObterTodos(_filtroEstudioMusical);
        }

        private void ObterTodosGridAgendamento()
        {
            dataGridAgendamento.DataSource = _servicoAgendamento.ObterTodos(_filtroAgendamento);
        }

        private void EventoDeFiltroAoBuscarEstudioMusical(object sender, EventArgs e)
        {
            _filtroEstudioMusical.Nome = txtBuscarEstudio.Text;
            ObterTodosGridEstudioMusical();
        }

        private void EventoAoClicarNoBotaoDeLimparFiltroDeBuscaEEstaAberto(object sender, EventArgs e)
        {
            txtBuscarEstudio.Clear();
            checkBoxEstaAbertoSim.Checked = false;
            checkBoxNaoEstaAberto.Checked = false;
        }

        private void EventoDeCheckBoxEstaAbertoAoSelecionarSim(object sender, EventArgs e)
        {
            _filtroEstudioMusical.EstaAberto = GaranteQueSomenteUmaCheckBoxEstejaMarcada(checkBoxEstaAbertoSim, checkBoxNaoEstaAberto);
            ObterTodosGridEstudioMusical();
        }

        private void EventoDeCheckBoxEstaAbertoAoSelecionarNao(object sender, EventArgs e)
        {
            _filtroEstudioMusical.EstaFechado = GaranteQueSomenteUmaCheckBoxEstejaMarcada(checkBoxNaoEstaAberto, checkBoxEstaAbertoSim);
            ObterTodosGridEstudioMusical();
        }

        private void EventoAoClicarEmCadastrarEstudio(object sender, EventArgs e)
        {
            var cadastrarEstudioMusical = new FormCadastrarEstudioMusical(_servicoAgendamento, _servicoEstudioMusical);
            cadastrarEstudioMusical.ShowDialog();
            ObterTodosGridEstudioMusical();
        }

        private void EventoAoAtualizarEstudio(object sender, EventArgs e)
        {
            if (GaranteQueSomenteUmaLinhaSejaSelecionada(dataGridEstudioMusical, erroAoAtualizar))
                return;

            var idDoEstudio = (int)dataGridEstudioMusical.CurrentRow.Cells[indiceId].Value;
            var estudio = _servicoEstudioMusical.ObterPorId(idDoEstudio);

            var atualizarEstudioMusical = new FormCadastrarEstudioMusical(_servicoAgendamento, _servicoEstudioMusical, estudio);
            atualizarEstudioMusical.ShowDialog();
            ObterTodosGridEstudioMusical();
        }

        private void EventoAoDeletarEstudioMusical(object sender, EventArgs e)
        {
            if (GaranteQueSomenteUmaLinhaSejaSelecionada(dataGridEstudioMusical, erroAoDeletar))
                return;

            try
            {
                var idDoEstudio = (int)dataGridEstudioMusical.CurrentRow.Cells[indiceId].Value;
                var nomeDoEstudio = (string)dataGridEstudioMusical.CurrentRow.Cells[posicaoDaColunaNome].Value;
                
                DialogResult retorno = MessageBox.Show($"Todos os agendamentos relacionados a esse est�dio ser�o apagados!" +
                    $"\nTem certeza de que deseja deletar o est�dio {nomeDoEstudio}?", "Deletar est�dio", MessageBoxButtons.YesNo, MessageBoxIcon.Question);

                if (retorno == DialogResult.Yes)
                    _servicoEstudioMusical.Deletar(idDoEstudio);

                ObterTodosGridEstudioMusical();
                ObterTodosGridAgendamento();
            }
            catch (Exception ex)
            {
                MostrarMensagemDeErro(erroAoDeletar, ex.Message);
            }
        }

        private void EventoDeFiltroAoBuscarAgendamento(object sender, EventArgs e)
        {
            _filtroAgendamento.NomeResponsavel = txtBuscarAgendamento.Text;
            ObterTodosGridAgendamento();
        }

        private void EventoDaComboBoxAoFiltrarPeloEstiloMusical(object sender, EventArgs e)
        {
            _filtroAgendamento.EstiloMusical = (EstiloMusical)cbEstiloMusical.SelectedIndex;
            ObterTodosGridAgendamento();
        }

        private void EventoAoClicarNoBotaoDeLimparFiltroDeBuscaEDeEstiloMusical(object sender, EventArgs e)
        {
            txtBuscarAgendamento.Clear();
            cbEstiloMusical.SelectedIndex = (int)decimal.Zero;
        }

        private void EventoDeFiltroDaDataMinimaDoAgendamento(object sender, EventArgs e)
        {
            _filtroAgendamento.DataMinima = dataMinima.Value;
            ObterTodosGridAgendamento();
        }

        private void EventoDeFiltroDeDataMaximaDoAgendamento(object sender, EventArgs e)
        {
            _filtroAgendamento.DataMaxima = dataMaxima.Value;
            ObterTodosGridAgendamento();
        }

        private void EventoDeLimparFiltroDeData(object sender, EventArgs e)
        {
            dataMaxima.Value = DateTime.Now;
            dataMinima.Value = DateTime.Now;

            _filtroAgendamento.DataMinima = null;
            _filtroAgendamento.DataMaxima = null;

            ObterTodosGridAgendamento();
        }

        private void EventoDaCaixaNumericaValorMinimo(object sender, EventArgs e)
        {
            _filtroAgendamento.ValorMinimo = numericValorMinimo.Value;
            ObterTodosGridAgendamento();
        }

        private void EventoDaCaixaNumericaValorMaximo(object sender, EventArgs e)
        {
            _filtroAgendamento.ValorMaximo = numericValorMaximo.Value;
            ObterTodosGridAgendamento();
        }

        private void EventoAoClicarNoBotaoDeLimparFiltroDeValor(object sender, EventArgs e)
        {
            numericValorMaximo.Value = decimal.Zero;
            numericValorMinimo.Value = decimal.Zero;
        }

        private void EventoAoClicarEmCadastrarAgendamento(object sender, EventArgs e)
        {
            var cadastrarAgendamento = new FormCadastroDeAgendamento(_servicoAgendamento, _servicoEstudioMusical);
            cadastrarAgendamento.ShowDialog();
            ObterTodosGridAgendamento();
        }

        private void EventoAoAtualizarAgendamento(object sender, EventArgs e)
        {
            if (GaranteQueSomenteUmaLinhaSejaSelecionada(dataGridAgendamento, erroAoDeletar))
                return;

            var idDoAgendamento = (int)dataGridAgendamento.CurrentRow.Cells[indiceId].Value;
            var agendamento = _servicoAgendamento.ObterPorId(idDoAgendamento);

            var atualizarAgendamento = new FormCadastroDeAgendamento(_servicoAgendamento, _servicoEstudioMusical, agendamento);
            atualizarAgendamento.ShowDialog();
            ObterTodosGridAgendamento();
        }

        private void EventoAoDeletarAgendamento(object sender, EventArgs e)
        {
            if (GaranteQueSomenteUmaLinhaSejaSelecionada(dataGridAgendamento, erroAoDeletar))
                return;

            try
            {
                var idDoAgendamento = (int)dataGridAgendamento.CurrentRow.Cells[indiceId].Value;
                var nomeDoResponsavelDoAgendamento = (string)dataGridAgendamento.CurrentRow.Cells[posicaoDaColunaNome].Value;

                DialogResult retorno = MessageBox.Show($"Tem certeza de que deseja deletar o agendamento do {nomeDoResponsavelDoAgendamento}?", 
                    "Deletar agendamento", MessageBoxButtons.YesNo, MessageBoxIcon.Question);

                if (retorno == DialogResult.Yes)
                    _servicoAgendamento.Deletar(idDoAgendamento);

                ObterTodosGridAgendamento();
            }
            catch (Exception ex)
            {
                MostrarMensagemDeErro(erroAoDeletar, ex.Message);
            }
        }

        private bool GaranteQueSomenteUmaCheckBoxEstejaMarcada(CheckBox marcada, CheckBox desmarcada)
        {
            if (marcada.CheckState is CheckState.Checked)
                if (desmarcada.CheckState is CheckState.Checked)
                {
                    desmarcada.Checked = false;
                }
            return marcada.Checked;
        }

        private void GerarColunaParaFormatarDataGridAgendamento()
        {
            dataGridAgendamento.AutoGenerateColumns = false;
            dataGridAgendamento.CellFormatting += EventoDeFormatacaoDoDataGridAgendamento;
        }

        private void EventoDeFormatacaoDoDataGridAgendamento(object sender, DataGridViewCellFormattingEventArgs e)
        {
            var nomeDaColuna = "Est�dio";
            if (dataGridAgendamento.Columns[e.ColumnIndex].HeaderText == nomeDaColuna)
            {
                var agendamento = dataGridAgendamento.Rows[e.RowIndex].DataBoundItem as Agendamento;
                if (agendamento != null)
                {
                    var estudioMusical = _servicoEstudioMusical.ObterPorId(agendamento.IdEstudio);
                    if (estudioMusical != null)
                    {
                        e.Value = estudioMusical.Nome;
                    }
                }
            }

            nomeDaColuna = "CPF do Respons�vel";
            if (dataGridAgendamento.Columns[e.ColumnIndex].HeaderText == nomeDaColuna)
            {
                var linhaDoAgendamento = dataGridAgendamento.Rows[e.RowIndex].DataBoundItem as Agendamento;
                if (linhaDoAgendamento != null)
                {
                    var agendamento = _servicoAgendamento.ObterPorId(linhaDoAgendamento.Id);
                    if (agendamento != null)
                    {
                        e.Value = Regex.Replace(agendamento.CpfResponsavel, "(\\d{3})(\\d{3})(\\d{3})(\\d{2})", "$1.$2.$3-$4");
                    }
                }
            }
        }

        private static void MostrarMensagemDeErro(string tituloDoErro, string mensagemDeErro)
        {
            MessageBox.Show(mensagemDeErro, tituloDoErro, MessageBoxButtons.OK, MessageBoxIcon.Error);
        }

        private bool GaranteQueSomenteUmaLinhaSejaSelecionada(DataGridView dataGrid, string tituloDoErro)
        {
            var quantidadeDeLinhasSelecionadas = 1;
            if (dataGrid.SelectedRows.Count != quantidadeDeLinhasSelecionadas)
            {
                MostrarMensagemDeErro(tituloDoErro, "Voc� selecionou mais de uma linha.");
                return true;
            }
            return false;
        }
    }
}