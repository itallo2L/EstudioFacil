namespace EstudioFacil.Forms
{
    partial class FormCadastroDeAgendamento
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            groupBoxAgendamento = new GroupBox();
            textBoxNomeDoResponsavel = new TextBox();
            comboBoxEstiloMusical = new ComboBox();
            dataDeAgendamento = new DateTimePicker();
            comboBoxListaDeEstudioMusical = new ComboBox();
            maskedTextBoxCpfDoResponsavel = new MaskedTextBox();
            btnCancelarCadastro = new Button();
            btnSalvarCadastro = new Button();
            textBoxValorTotal = new TextBox();
            comboBoxHorarioFinal = new ComboBox();
            comboBoxHorarioInicial = new ComboBox();
            lblEstiloMusical = new Label();
            lblValorTotal = new Label();
            lblAteTalHorario = new Label();
            lblDeTalHorario = new Label();
            lblHorario = new Label();
            lblDataDoAgendamento = new Label();
            lblCpfDoResponsavel = new Label();
            lblNomeDoEstudioMusical = new Label();
            lblNomeDoResponsavel = new Label();
            groupBoxAgendamento.SuspendLayout();
            SuspendLayout();
            // 
            // groupBoxAgendamento
            // 
            groupBoxAgendamento.Controls.Add(textBoxNomeDoResponsavel);
            groupBoxAgendamento.Controls.Add(comboBoxEstiloMusical);
            groupBoxAgendamento.Controls.Add(dataDeAgendamento);
            groupBoxAgendamento.Controls.Add(comboBoxListaDeEstudioMusical);
            groupBoxAgendamento.Controls.Add(maskedTextBoxCpfDoResponsavel);
            groupBoxAgendamento.Controls.Add(btnCancelarCadastro);
            groupBoxAgendamento.Controls.Add(btnSalvarCadastro);
            groupBoxAgendamento.Controls.Add(textBoxValorTotal);
            groupBoxAgendamento.Controls.Add(comboBoxHorarioFinal);
            groupBoxAgendamento.Controls.Add(comboBoxHorarioInicial);
            groupBoxAgendamento.Controls.Add(lblEstiloMusical);
            groupBoxAgendamento.Controls.Add(lblValorTotal);
            groupBoxAgendamento.Controls.Add(lblAteTalHorario);
            groupBoxAgendamento.Controls.Add(lblDeTalHorario);
            groupBoxAgendamento.Controls.Add(lblHorario);
            groupBoxAgendamento.Controls.Add(lblDataDoAgendamento);
            groupBoxAgendamento.Controls.Add(lblCpfDoResponsavel);
            groupBoxAgendamento.Controls.Add(lblNomeDoEstudioMusical);
            groupBoxAgendamento.Controls.Add(lblNomeDoResponsavel);
            groupBoxAgendamento.Location = new Point(11, 12);
            groupBoxAgendamento.Name = "groupBoxAgendamento";
            groupBoxAgendamento.Size = new Size(242, 441);
            groupBoxAgendamento.TabIndex = 0;
            groupBoxAgendamento.TabStop = false;
            groupBoxAgendamento.Text = "Agendamento";
            // 
            // textBoxNomeDoResponsavel
            // 
            textBoxNomeDoResponsavel.Cursor = Cursors.IBeam;
            textBoxNomeDoResponsavel.Location = new Point(6, 92);
            textBoxNomeDoResponsavel.Name = "textBoxNomeDoResponsavel";
            textBoxNomeDoResponsavel.PlaceholderText = "Ex: Victor Samuel Rodrigues";
            textBoxNomeDoResponsavel.Size = new Size(230, 24);
            textBoxNomeDoResponsavel.TabIndex = 23;
            // 
            // comboBoxEstiloMusical
            // 
            comboBoxEstiloMusical.Cursor = Cursors.Hand;
            comboBoxEstiloMusical.FormattingEnabled = true;
            comboBoxEstiloMusical.Items.AddRange(new object[] { "Todos", "Blues", "Jazz", "Música Clássica", "Sertanejo", "Gospel", "Eletrônica", "Samba" });
            comboBoxEstiloMusical.Location = new Point(93, 360);
            comboBoxEstiloMusical.Name = "comboBoxEstiloMusical";
            comboBoxEstiloMusical.Size = new Size(143, 23);
            comboBoxEstiloMusical.TabIndex = 22;
            comboBoxEstiloMusical.SelectedIndexChanged += EventoDeComboBoxEstiloMusical;
            // 
            // dataDeAgendamento
            // 
            dataDeAgendamento.Cursor = Cursors.Hand;
            dataDeAgendamento.Font = new Font("Segoe UI", 9F, FontStyle.Regular, GraphicsUnit.Point);
            dataDeAgendamento.Format = DateTimePickerFormat.Short;
            dataDeAgendamento.Location = new Point(4, 212);
            dataDeAgendamento.MinDate = new DateTime(2000, 1, 1, 0, 0, 0, 0);
            dataDeAgendamento.Name = "dataDeAgendamento";
            dataDeAgendamento.Size = new Size(104, 23);
            dataDeAgendamento.TabIndex = 21;
            // 
            // comboBoxListaDeEstudioMusical
            // 
            comboBoxListaDeEstudioMusical.FormattingEnabled = true;
            comboBoxListaDeEstudioMusical.Location = new Point(6, 36);
            comboBoxListaDeEstudioMusical.Name = "comboBoxListaDeEstudioMusical";
            comboBoxListaDeEstudioMusical.Size = new Size(230, 23);
            comboBoxListaDeEstudioMusical.TabIndex = 20;
            comboBoxListaDeEstudioMusical.SelectedIndexChanged += EventoDaComboBoxNomeEstudio;
            // 
            // maskedTextBoxCpfDoResponsavel
            // 
            maskedTextBoxCpfDoResponsavel.Cursor = Cursors.IBeam;
            maskedTextBoxCpfDoResponsavel.Location = new Point(6, 151);
            maskedTextBoxCpfDoResponsavel.Mask = "000,000,000-00";
            maskedTextBoxCpfDoResponsavel.Name = "maskedTextBoxCpfDoResponsavel";
            maskedTextBoxCpfDoResponsavel.RightToLeft = RightToLeft.No;
            maskedTextBoxCpfDoResponsavel.Size = new Size(230, 24);
            maskedTextBoxCpfDoResponsavel.TabIndex = 19;
            // 
            // btnCancelarCadastro
            // 
            btnCancelarCadastro.Location = new Point(161, 411);
            btnCancelarCadastro.Name = "btnCancelarCadastro";
            btnCancelarCadastro.Size = new Size(75, 23);
            btnCancelarCadastro.TabIndex = 18;
            btnCancelarCadastro.Text = "Cancelar";
            btnCancelarCadastro.UseVisualStyleBackColor = true;
            btnCancelarCadastro.Click += EventoAoCancelarCadastro;
            // 
            // btnSalvarCadastro
            // 
            btnSalvarCadastro.Location = new Point(6, 411);
            btnSalvarCadastro.Name = "btnSalvarCadastro";
            btnSalvarCadastro.Size = new Size(75, 23);
            btnSalvarCadastro.TabIndex = 17;
            btnSalvarCadastro.Text = "Salvar";
            btnSalvarCadastro.UseVisualStyleBackColor = true;
            btnSalvarCadastro.Click += EventoAoSalvarAgendamento;
            // 
            // textBoxValorTotal
            // 
            textBoxValorTotal.Location = new Point(76, 316);
            textBoxValorTotal.Name = "textBoxValorTotal";
            textBoxValorTotal.ReadOnly = true;
            textBoxValorTotal.Size = new Size(82, 24);
            textBoxValorTotal.TabIndex = 16;
            // 
            // comboBoxHorarioFinal
            // 
            comboBoxHorarioFinal.FormattingEnabled = true;
            comboBoxHorarioFinal.Items.AddRange(new object[] { "", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00" });
            comboBoxHorarioFinal.Location = new Point(150, 278);
            comboBoxHorarioFinal.Name = "comboBoxHorarioFinal";
            comboBoxHorarioFinal.Size = new Size(86, 23);
            comboBoxHorarioFinal.TabIndex = 14;
            comboBoxHorarioFinal.SelectedIndexChanged += EventoDaComboBoxHoraFinal;
            // 
            // comboBoxHorarioInicial
            // 
            comboBoxHorarioInicial.FormattingEnabled = true;
            comboBoxHorarioInicial.Items.AddRange(new object[] { "", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00" });
            comboBoxHorarioInicial.Location = new Point(29, 278);
            comboBoxHorarioInicial.Name = "comboBoxHorarioInicial";
            comboBoxHorarioInicial.Size = new Size(86, 23);
            comboBoxHorarioInicial.TabIndex = 13;
            comboBoxHorarioInicial.SelectedIndexChanged += EventoDaComboBoxHoraInicial;
            // 
            // lblEstiloMusical
            // 
            lblEstiloMusical.AutoSize = true;
            lblEstiloMusical.Location = new Point(6, 363);
            lblEstiloMusical.Name = "lblEstiloMusical";
            lblEstiloMusical.Size = new Size(81, 15);
            lblEstiloMusical.TabIndex = 8;
            lblEstiloMusical.Text = "Estilo Musical:";
            // 
            // lblValorTotal
            // 
            lblValorTotal.AutoSize = true;
            lblValorTotal.Location = new Point(6, 319);
            lblValorTotal.Name = "lblValorTotal";
            lblValorTotal.Size = new Size(71, 15);
            lblValorTotal.TabIndex = 7;
            lblValorTotal.Text = "Valor Total:";
            // 
            // lblAteTalHorario
            // 
            lblAteTalHorario.AutoSize = true;
            lblAteTalHorario.Location = new Point(121, 281);
            lblAteTalHorario.Name = "lblAteTalHorario";
            lblAteTalHorario.Size = new Size(28, 15);
            lblAteTalHorario.TabIndex = 6;
            lblAteTalHorario.Text = "Até:";
            // 
            // lblDeTalHorario
            // 
            lblDeTalHorario.AutoSize = true;
            lblDeTalHorario.Location = new Point(4, 281);
            lblDeTalHorario.Name = "lblDeTalHorario";
            lblDeTalHorario.Size = new Size(25, 15);
            lblDeTalHorario.TabIndex = 5;
            lblDeTalHorario.Text = "De:";
            // 
            // lblHorario
            // 
            lblHorario.AutoSize = true;
            lblHorario.Location = new Point(6, 260);
            lblHorario.Name = "lblHorario";
            lblHorario.Size = new Size(53, 15);
            lblHorario.TabIndex = 4;
            lblHorario.Text = "Horário:";
            // 
            // lblDataDoAgendamento
            // 
            lblDataDoAgendamento.AutoSize = true;
            lblDataDoAgendamento.Location = new Point(4, 194);
            lblDataDoAgendamento.Name = "lblDataDoAgendamento";
            lblDataDoAgendamento.Size = new Size(37, 15);
            lblDataDoAgendamento.TabIndex = 3;
            lblDataDoAgendamento.Text = "Data:";
            // 
            // lblCpfDoResponsavel
            // 
            lblCpfDoResponsavel.AutoSize = true;
            lblCpfDoResponsavel.Location = new Point(4, 133);
            lblCpfDoResponsavel.Name = "lblCpfDoResponsavel";
            lblCpfDoResponsavel.Size = new Size(117, 15);
            lblCpfDoResponsavel.TabIndex = 2;
            lblCpfDoResponsavel.Text = "CPF do Responsável:";
            // 
            // lblNomeDoEstudioMusical
            // 
            lblNomeDoEstudioMusical.AutoSize = true;
            lblNomeDoEstudioMusical.Location = new Point(6, 18);
            lblNomeDoEstudioMusical.Name = "lblNomeDoEstudioMusical";
            lblNomeDoEstudioMusical.Size = new Size(102, 15);
            lblNomeDoEstudioMusical.TabIndex = 1;
            lblNomeDoEstudioMusical.Text = "Nome do Estúdio:";
            // 
            // lblNomeDoResponsavel
            // 
            lblNomeDoResponsavel.AutoSize = true;
            lblNomeDoResponsavel.Location = new Point(4, 74);
            lblNomeDoResponsavel.Name = "lblNomeDoResponsavel";
            lblNomeDoResponsavel.Size = new Size(129, 15);
            lblNomeDoResponsavel.TabIndex = 0;
            lblNomeDoResponsavel.Text = "Nome do Responsável:";
            // 
            // FormCadastroDeAgendamento
            // 
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            BackColor = SystemColors.Window;
            ClientSize = new Size(265, 464);
            Controls.Add(groupBoxAgendamento);
            Cursor = Cursors.Hand;
            Font = new Font("Segoe UI Semibold", 9F, FontStyle.Bold | FontStyle.Italic, GraphicsUnit.Point);
            MaximizeBox = false;
            Name = "FormCadastroDeAgendamento";
            StartPosition = FormStartPosition.CenterScreen;
            Text = "Agendamento";
            groupBoxAgendamento.ResumeLayout(false);
            groupBoxAgendamento.PerformLayout();
            ResumeLayout(false);
        }

        #endregion

        private GroupBox groupBoxAgendamento;
        private Label lblAteTalHorario;
        private Label lblDeTalHorario;
        private Label lblHorario;
        private Label lblDataDoAgendamento;
        private Label lblCpfDoResponsavel;
        private Label lblNomeDoEstudioMusical;
        private Label lblNomeDoResponsavel;
        private Label lblEstiloMusical;
        private Label lblValorTotal;
        private TextBox textBoxNomeDoResponsavel;
        private ComboBox comboBoxHorarioFinal;
        private ComboBox comboBoxHorarioInicial;
        private TextBox textBoxValorTotal;
        private Button btnCancelarCadastro;
        private Button btnSalvarCadastro;
        private MaskedTextBox maskedTextBoxCpfDoResponsavel;
        private ComboBox comboBoxListaDeEstudioMusical;
        private DateTimePicker dataDeAgendamento;
        private ComboBox comboBoxEstiloMusical;
        private TextBox textBoxNomeAoCadastrarEstudio;
    }
}