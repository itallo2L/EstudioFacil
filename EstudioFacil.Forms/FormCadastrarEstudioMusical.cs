using EstudioFacil.Dominio.Entidades;
using EstudioFacil.Dominio.Servicos;
using EstudioFacil.Servico.Servicos;
using FluentValidation;
using Microsoft.IdentityModel.Tokens;

namespace EstudioFacil.Forms
{
    public partial class FormCadastrarEstudioMusical : Form
    {
        private readonly ServicoAgendamento _servicoAgendamento;
        private readonly ServicoEstudioMusical _servicoEstudioMusical;
        private readonly EstudioMusical _estudioMusical;
        public FormCadastrarEstudioMusical(ServicoAgendamento servicoAgendamento, ServicoEstudioMusical servicoEstudioMusical, EstudioMusical? estudio = null)
        {
            _servicoAgendamento = servicoAgendamento;
            _servicoEstudioMusical = servicoEstudioMusical;
            _estudioMusical = estudio;

            InitializeComponent();

            if (_estudioMusical != null)
                PreencherDadosParaAtualizar();
        }

        private void EventoAoClicarEmSalvarEstudio(object sender, EventArgs e)
        {
            if (!ValidacaoDeTela())
            {
                return;
            }

            try
            {
                var estudioMusical = new EstudioMusical()
                {
                    Nome = textBoxNomeAoCadastrarEstudio.Text,
                    EstaAberto = checkBoxSimEstaAbertoAoCadastrarEstudio.Checked
                };

                if (_estudioMusical != null)
                {
                    estudioMusical.Id = _estudioMusical.Id;
                    _servicoEstudioMusical.Atualizar(estudioMusical);
                }
                else
                {
                    _servicoEstudioMusical.Adicionar(estudioMusical);
                }

                this.Close();
            }
            catch (ValidationException ve)
            {
                const string tituloDoErro = "Erro ao cadastrar";

                var listaDeErros = ve.Errors.ToList();
                var mensagemDeErro = "";
                listaDeErros.ForEach(erro => mensagemDeErro += erro.ToString() + "\n");

                MostrarMensagemErro(tituloDoErro, ve.Message);
            }
        }

        private void EventoAoClicarEmCancelarCadastro(object sender, EventArgs e)
        {
            DialogResult retorno = MessageBox.Show("Tem certeza que deseja cancelar?", "Cancelar Operação", MessageBoxButtons.YesNo, MessageBoxIcon.Question);
            if (retorno == DialogResult.Yes)
                this.Close();
        }

        private static void MostrarMensagemErro(string tituloDoErro, string mensagemDeErro)
        {
            MessageBox.Show(mensagemDeErro, tituloDoErro, MessageBoxButtons.OK, MessageBoxIcon.Error);
        }

        private bool ValidacaoDeTela()
        {
            const string tituloDoErro = "Erro de validação";
            var mensagemDeErro = "";

            if (textBoxNomeAoCadastrarEstudio.Text.IsNullOrEmpty())
                mensagemDeErro += "O campo nome do estúdio é obrigatório!";

            if (mensagemDeErro.IsNullOrEmpty())
                return true;
            MostrarMensagemErro(tituloDoErro, mensagemDeErro);
            return false;
        }

        private void PreencherDadosParaAtualizar()
        {
            textBoxNomeAoCadastrarEstudio.Text = _estudioMusical.Nome;
            checkBoxSimEstaAbertoAoCadastrarEstudio.Checked = _estudioMusical.EstaAberto;
        }
    }
}