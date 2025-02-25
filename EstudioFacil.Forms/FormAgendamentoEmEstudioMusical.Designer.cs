namespace EstudioFacil.Forms
{
    partial class FormAgendamentoEmEstudioMusical
    {
        /// <summary>
        ///  Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        ///  Clean up any resources being used.
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
        ///  Required method for Designer support - do not modify
        ///  the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            components = new System.ComponentModel.Container();
            DataGridViewCellStyle dataGridViewCellStyle1 = new DataGridViewCellStyle();
            btnAdicionarEstudioMusical = new Button();
            btnAtualizarEstudioMusical = new Button();
            txtBuscarEstudio = new TextBox();
            tabAgendamentoEmEstudioMusical = new TabControl();
            tabEstudioMusical = new TabPage();
            lblEstudioMusicalEstaAberto = new Label();
            btnLimparFiltrosDeBuscaDeEstudioEEstaAberto = new Button();
            checkBoxNaoEstaAberto = new CheckBox();
            checkBoxEstaAbertoSim = new CheckBox();
            dataGridEstudioMusical = new DataGridView();
            idDataGridViewTextBoxColumn = new DataGridViewTextBoxColumn();
            nomeDataGridViewTextBoxColumn = new DataGridViewTextBoxColumn();
            estaAbertoDataGridViewCheckBoxColumn = new DataGridViewCheckBoxColumn();
            estudioMusicalBindingSource = new BindingSource(components);
            btnDeletarEstudioMusical = new Button();
            tabAgendamento = new TabPage();
            lblDeTalData = new Label();
            btnLimparFiltroDeData = new Button();
            btnLimparPesquisaAgendamento = new Button();
            btnLimparFiltro = new Button();
            numericValorMaximo = new NumericUpDown();
            numericValorMinimo = new NumericUpDown();
            lblFiltrarPorValor = new Label();
            lblValorMaximo = new Label();
            lblValorMinimo = new Label();
            lblFiltrarPorData = new Label();
            lblAteTalData = new Label();
            dataMaxima = new DateTimePicker();
            dataMinima = new DateTimePicker();
            label1 = new Label();
            cbEstiloMusical = new ComboBox();
            txtBuscarAgendamento = new TextBox();
            btnDeletarAgendamento = new Button();
            btnAtualizarAgendamento = new Button();
            btnAdicionarAgendamento = new Button();
            dataGridAgendamento = new DataGridView();
            idDataGridViewTextBoxColumn1 = new DataGridViewTextBoxColumn();
            nomeResponsavelDataGridViewTextBoxColumn = new DataGridViewTextBoxColumn();
            cpfResponsavelDataGridViewTextBoxColumn = new DataGridViewTextBoxColumn();
            dataEHoraDeEntradaDataGridViewTextBoxColumn = new DataGridViewTextBoxColumn();
            dataEHoraDeSaidaDataGridViewTextBoxColumn = new DataGridViewTextBoxColumn();
            valorTotalDataGridViewTextBoxColumn = new DataGridViewTextBoxColumn();
            estiloMusicalDataGridViewTextBoxColumn = new DataGridViewTextBoxColumn();
            idEstudioDataGridViewTextBoxColumn = new DataGridViewTextBoxColumn();
            agendamentoBindingSource = new BindingSource(components);
            bdEstudioFacilBindingSource = new BindingSource(components);
            tabAgendamentoEmEstudioMusical.SuspendLayout();
            tabEstudioMusical.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)dataGridEstudioMusical).BeginInit();
            ((System.ComponentModel.ISupportInitialize)estudioMusicalBindingSource).BeginInit();
            tabAgendamento.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)numericValorMaximo).BeginInit();
            ((System.ComponentModel.ISupportInitialize)numericValorMinimo).BeginInit();
            ((System.ComponentModel.ISupportInitialize)dataGridAgendamento).BeginInit();
            ((System.ComponentModel.ISupportInitialize)agendamentoBindingSource).BeginInit();
            ((System.ComponentModel.ISupportInitialize)bdEstudioFacilBindingSource).BeginInit();
            SuspendLayout();
            // 
            // btnAdicionarEstudioMusical
            // 
            btnAdicionarEstudioMusical.Anchor = AnchorStyles.Bottom | AnchorStyles.Right;
            btnAdicionarEstudioMusical.Cursor = Cursors.Hand;
            btnAdicionarEstudioMusical.Font = new Font("Segoe UI Semibold", 9F, FontStyle.Bold | FontStyle.Italic, GraphicsUnit.Point);
            btnAdicionarEstudioMusical.Location = new Point(1007, 391);
            btnAdicionarEstudioMusical.Name = "btnAdicionarEstudioMusical";
            btnAdicionarEstudioMusical.Size = new Size(75, 23);
            btnAdicionarEstudioMusical.TabIndex = 0;
            btnAdicionarEstudioMusical.Text = "Adicionar";
            btnAdicionarEstudioMusical.UseVisualStyleBackColor = true;
            btnAdicionarEstudioMusical.Click += EventoAoClicarEmCadastrarEstudio;
            // 
            // btnAtualizarEstudioMusical
            // 
            btnAtualizarEstudioMusical.Anchor = AnchorStyles.Bottom | AnchorStyles.Right;
            btnAtualizarEstudioMusical.Cursor = Cursors.Hand;
            btnAtualizarEstudioMusical.Font = new Font("Segoe UI Semibold", 9F, FontStyle.Bold | FontStyle.Italic, GraphicsUnit.Point);
            btnAtualizarEstudioMusical.Location = new Point(1088, 391);
            btnAtualizarEstudioMusical.Name = "btnAtualizarEstudioMusical";
            btnAtualizarEstudioMusical.Size = new Size(75, 23);
            btnAtualizarEstudioMusical.TabIndex = 1;
            btnAtualizarEstudioMusical.Text = "Atualizar";
            btnAtualizarEstudioMusical.UseVisualStyleBackColor = true;
            btnAtualizarEstudioMusical.Click += EventoAoAtualizarEstudio;
            // 
            // txtBuscarEstudio
            // 
            txtBuscarEstudio.AcceptsReturn = true;
            txtBuscarEstudio.Cursor = Cursors.IBeam;
            txtBuscarEstudio.Location = new Point(8, 50);
            txtBuscarEstudio.Name = "txtBuscarEstudio";
            txtBuscarEstudio.PlaceholderText = "Digite o nome do estúdio";
            txtBuscarEstudio.Size = new Size(213, 23);
            txtBuscarEstudio.TabIndex = 3;
            txtBuscarEstudio.TextChanged += EventoDeFiltroAoBuscarEstudioMusical;
            // 
            // tabAgendamentoEmEstudioMusical
            // 
            tabAgendamentoEmEstudioMusical.Controls.Add(tabEstudioMusical);
            tabAgendamentoEmEstudioMusical.Controls.Add(tabAgendamento);
            tabAgendamentoEmEstudioMusical.Dock = DockStyle.Fill;
            tabAgendamentoEmEstudioMusical.Font = new Font("Segoe UI", 9F, FontStyle.Italic, GraphicsUnit.Point);
            tabAgendamentoEmEstudioMusical.Location = new Point(0, 0);
            tabAgendamentoEmEstudioMusical.Name = "tabAgendamentoEmEstudioMusical";
            tabAgendamentoEmEstudioMusical.SelectedIndex = 0;
            tabAgendamentoEmEstudioMusical.Size = new Size(1262, 450);
            tabAgendamentoEmEstudioMusical.TabIndex = 5;
            // 
            // tabEstudioMusical
            // 
            tabEstudioMusical.Controls.Add(lblEstudioMusicalEstaAberto);
            tabEstudioMusical.Controls.Add(btnLimparFiltrosDeBuscaDeEstudioEEstaAberto);
            tabEstudioMusical.Controls.Add(checkBoxNaoEstaAberto);
            tabEstudioMusical.Controls.Add(checkBoxEstaAbertoSim);
            tabEstudioMusical.Controls.Add(dataGridEstudioMusical);
            tabEstudioMusical.Controls.Add(btnDeletarEstudioMusical);
            tabEstudioMusical.Controls.Add(txtBuscarEstudio);
            tabEstudioMusical.Controls.Add(btnAtualizarEstudioMusical);
            tabEstudioMusical.Controls.Add(btnAdicionarEstudioMusical);
            tabEstudioMusical.Location = new Point(4, 24);
            tabEstudioMusical.Name = "tabEstudioMusical";
            tabEstudioMusical.Padding = new Padding(3);
            tabEstudioMusical.Size = new Size(1254, 422);
            tabEstudioMusical.TabIndex = 0;
            tabEstudioMusical.Text = "Estúdio Musical";
            tabEstudioMusical.UseVisualStyleBackColor = true;
            // 
            // lblEstudioMusicalEstaAberto
            // 
            lblEstudioMusicalEstaAberto.AutoSize = true;
            lblEstudioMusicalEstaAberto.Font = new Font("Segoe UI Semibold", 11.25F, FontStyle.Bold | FontStyle.Italic, GraphicsUnit.Point);
            lblEstudioMusicalEstaAberto.Location = new Point(282, 27);
            lblEstudioMusicalEstaAberto.Name = "lblEstudioMusicalEstaAberto";
            lblEstudioMusicalEstaAberto.Size = new Size(94, 20);
            lblEstudioMusicalEstaAberto.TabIndex = 21;
            lblEstudioMusicalEstaAberto.Text = "Está Aberto?";
            // 
            // btnLimparFiltrosDeBuscaDeEstudioEEstaAberto
            // 
            btnLimparFiltrosDeBuscaDeEstudioEEstaAberto.Cursor = Cursors.Hand;
            btnLimparFiltrosDeBuscaDeEstudioEEstaAberto.Font = new Font("Segoe UI Semibold", 9F, FontStyle.Bold | FontStyle.Italic, GraphicsUnit.Point);
            btnLimparFiltrosDeBuscaDeEstudioEEstaAberto.ImageAlign = ContentAlignment.MiddleLeft;
            btnLimparFiltrosDeBuscaDeEstudioEEstaAberto.Location = new Point(286, 84);
            btnLimparFiltrosDeBuscaDeEstudioEEstaAberto.Name = "btnLimparFiltrosDeBuscaDeEstudioEEstaAberto";
            btnLimparFiltrosDeBuscaDeEstudioEEstaAberto.Size = new Size(90, 23);
            btnLimparFiltrosDeBuscaDeEstudioEEstaAberto.TabIndex = 13;
            btnLimparFiltrosDeBuscaDeEstudioEEstaAberto.Text = "Limpar Filtros";
            btnLimparFiltrosDeBuscaDeEstudioEEstaAberto.TextAlign = ContentAlignment.TopLeft;
            btnLimparFiltrosDeBuscaDeEstudioEEstaAberto.UseVisualStyleBackColor = true;
            btnLimparFiltrosDeBuscaDeEstudioEEstaAberto.Click += EventoAoClicarNoBotaoDeLimparFiltroDeBuscaEEstaAberto;
            // 
            // checkBoxNaoEstaAberto
            // 
            checkBoxNaoEstaAberto.AutoSize = true;
            checkBoxNaoEstaAberto.Cursor = Cursors.Hand;
            checkBoxNaoEstaAberto.Location = new Point(329, 59);
            checkBoxNaoEstaAberto.Name = "checkBoxNaoEstaAberto";
            checkBoxNaoEstaAberto.Size = new Size(48, 19);
            checkBoxNaoEstaAberto.TabIndex = 12;
            checkBoxNaoEstaAberto.Text = "Não";
            checkBoxNaoEstaAberto.UseVisualStyleBackColor = true;
            checkBoxNaoEstaAberto.CheckedChanged += EventoDeCheckBoxEstaAbertoAoSelecionarNao;
            // 
            // checkBoxEstaAbertoSim
            // 
            checkBoxEstaAbertoSim.AutoSize = true;
            checkBoxEstaAbertoSim.Cursor = Cursors.Hand;
            checkBoxEstaAbertoSim.Location = new Point(286, 59);
            checkBoxEstaAbertoSim.Name = "checkBoxEstaAbertoSim";
            checkBoxEstaAbertoSim.Size = new Size(45, 19);
            checkBoxEstaAbertoSim.TabIndex = 11;
            checkBoxEstaAbertoSim.Text = "Sim";
            checkBoxEstaAbertoSim.UseVisualStyleBackColor = true;
            checkBoxEstaAbertoSim.CheckedChanged += EventoDeCheckBoxEstaAbertoAoSelecionarSim;
            // 
            // dataGridEstudioMusical
            // 
            dataGridEstudioMusical.AllowUserToAddRows = false;
            dataGridEstudioMusical.AllowUserToDeleteRows = false;
            dataGridEstudioMusical.AllowUserToResizeColumns = false;
            dataGridEstudioMusical.AllowUserToResizeRows = false;
            dataGridEstudioMusical.Anchor = AnchorStyles.Top | AnchorStyles.Bottom | AnchorStyles.Left | AnchorStyles.Right;
            dataGridEstudioMusical.AutoGenerateColumns = false;
            dataGridEstudioMusical.AutoSizeColumnsMode = DataGridViewAutoSizeColumnsMode.Fill;
            dataGridEstudioMusical.BackgroundColor = SystemColors.Control;
            dataGridEstudioMusical.ColumnHeadersHeightSizeMode = DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            dataGridEstudioMusical.Columns.AddRange(new DataGridViewColumn[] { idDataGridViewTextBoxColumn, nomeDataGridViewTextBoxColumn, estaAbertoDataGridViewCheckBoxColumn });
            dataGridEstudioMusical.DataSource = estudioMusicalBindingSource;
            dataGridEstudioMusical.GridColor = Color.Black;
            dataGridEstudioMusical.Location = new Point(6, 128);
            dataGridEstudioMusical.Name = "dataGridEstudioMusical";
            dataGridEstudioMusical.ReadOnly = true;
            dataGridEstudioMusical.RowHeadersVisible = false;
            dataGridEstudioMusical.RowTemplate.Height = 25;
            dataGridEstudioMusical.SelectionMode = DataGridViewSelectionMode.FullRowSelect;
            dataGridEstudioMusical.Size = new Size(1240, 199);
            dataGridEstudioMusical.TabIndex = 6;
            // 
            // idDataGridViewTextBoxColumn
            // 
            idDataGridViewTextBoxColumn.DataPropertyName = "Id";
            idDataGridViewTextBoxColumn.HeaderText = "ID";
            idDataGridViewTextBoxColumn.Name = "idDataGridViewTextBoxColumn";
            idDataGridViewTextBoxColumn.ReadOnly = true;
            // 
            // nomeDataGridViewTextBoxColumn
            // 
            nomeDataGridViewTextBoxColumn.DataPropertyName = "Nome";
            nomeDataGridViewTextBoxColumn.HeaderText = "Nome";
            nomeDataGridViewTextBoxColumn.Name = "nomeDataGridViewTextBoxColumn";
            nomeDataGridViewTextBoxColumn.ReadOnly = true;
            // 
            // estaAbertoDataGridViewCheckBoxColumn
            // 
            estaAbertoDataGridViewCheckBoxColumn.DataPropertyName = "EstaAberto";
            estaAbertoDataGridViewCheckBoxColumn.HeaderText = "Está Aberto?";
            estaAbertoDataGridViewCheckBoxColumn.Name = "estaAbertoDataGridViewCheckBoxColumn";
            estaAbertoDataGridViewCheckBoxColumn.ReadOnly = true;
            estaAbertoDataGridViewCheckBoxColumn.Resizable = DataGridViewTriState.True;
            // 
            // estudioMusicalBindingSource
            // 
            estudioMusicalBindingSource.DataSource = typeof(Dominio.Entidades.EstudioMusical);
            // 
            // btnDeletarEstudioMusical
            // 
            btnDeletarEstudioMusical.Anchor = AnchorStyles.Bottom | AnchorStyles.Right;
            btnDeletarEstudioMusical.Cursor = Cursors.Hand;
            btnDeletarEstudioMusical.Font = new Font("Segoe UI Semibold", 9F, FontStyle.Bold | FontStyle.Italic, GraphicsUnit.Point);
            btnDeletarEstudioMusical.Location = new Point(1169, 391);
            btnDeletarEstudioMusical.Name = "btnDeletarEstudioMusical";
            btnDeletarEstudioMusical.Size = new Size(75, 23);
            btnDeletarEstudioMusical.TabIndex = 5;
            btnDeletarEstudioMusical.Text = "Deletar";
            btnDeletarEstudioMusical.UseVisualStyleBackColor = true;
            btnDeletarEstudioMusical.Click += EventoAoDeletarEstudioMusical;
            // 
            // tabAgendamento
            // 
            tabAgendamento.BackColor = Color.White;
            tabAgendamento.Controls.Add(lblDeTalData);
            tabAgendamento.Controls.Add(btnLimparFiltroDeData);
            tabAgendamento.Controls.Add(btnLimparPesquisaAgendamento);
            tabAgendamento.Controls.Add(btnLimparFiltro);
            tabAgendamento.Controls.Add(numericValorMaximo);
            tabAgendamento.Controls.Add(numericValorMinimo);
            tabAgendamento.Controls.Add(lblFiltrarPorValor);
            tabAgendamento.Controls.Add(lblValorMaximo);
            tabAgendamento.Controls.Add(lblValorMinimo);
            tabAgendamento.Controls.Add(lblFiltrarPorData);
            tabAgendamento.Controls.Add(lblAteTalData);
            tabAgendamento.Controls.Add(dataMaxima);
            tabAgendamento.Controls.Add(dataMinima);
            tabAgendamento.Controls.Add(label1);
            tabAgendamento.Controls.Add(cbEstiloMusical);
            tabAgendamento.Controls.Add(txtBuscarAgendamento);
            tabAgendamento.Controls.Add(btnDeletarAgendamento);
            tabAgendamento.Controls.Add(btnAtualizarAgendamento);
            tabAgendamento.Controls.Add(btnAdicionarAgendamento);
            tabAgendamento.Controls.Add(dataGridAgendamento);
            tabAgendamento.Location = new Point(4, 24);
            tabAgendamento.Name = "tabAgendamento";
            tabAgendamento.Padding = new Padding(3);
            tabAgendamento.Size = new Size(1254, 422);
            tabAgendamento.TabIndex = 1;
            tabAgendamento.Text = "Agendamento";
            // 
            // lblDeTalData
            // 
            lblDeTalData.AutoSize = true;
            lblDeTalData.Location = new Point(752, 54);
            lblDeTalData.Name = "lblDeTalData";
            lblDeTalData.Size = new Size(25, 15);
            lblDeTalData.TabIndex = 31;
            lblDeTalData.Text = "De:";
            // 
            // btnLimparFiltroDeData
            // 
            btnLimparFiltroDeData.Cursor = Cursors.Hand;
            btnLimparFiltroDeData.Font = new Font("Segoe UI Semibold", 9F, FontStyle.Bold | FontStyle.Italic, GraphicsUnit.Point);
            btnLimparFiltroDeData.Location = new Point(896, 80);
            btnLimparFiltroDeData.Name = "btnLimparFiltroDeData";
            btnLimparFiltroDeData.Size = new Size(138, 23);
            btnLimparFiltroDeData.TabIndex = 30;
            btnLimparFiltroDeData.Text = "Limpar Filtro de Data";
            btnLimparFiltroDeData.UseVisualStyleBackColor = true;
            btnLimparFiltroDeData.Click += EventoDeLimparFiltroDeData;
            // 
            // btnLimparPesquisaAgendamento
            // 
            btnLimparPesquisaAgendamento.Cursor = Cursors.Hand;
            btnLimparPesquisaAgendamento.Font = new Font("Segoe UI Semibold", 9F, FontStyle.Bold | FontStyle.Italic, GraphicsUnit.Point);
            btnLimparPesquisaAgendamento.Location = new Point(301, 79);
            btnLimparPesquisaAgendamento.Name = "btnLimparPesquisaAgendamento";
            btnLimparPesquisaAgendamento.Size = new Size(92, 23);
            btnLimparPesquisaAgendamento.TabIndex = 29;
            btnLimparPesquisaAgendamento.Text = "Limpar Filtros";
            btnLimparPesquisaAgendamento.UseVisualStyleBackColor = true;
            btnLimparPesquisaAgendamento.Click += EventoAoClicarNoBotaoDeLimparFiltroDeBuscaEDeEstiloMusical;
            // 
            // btnLimparFiltro
            // 
            btnLimparFiltro.Cursor = Cursors.Hand;
            btnLimparFiltro.Font = new Font("Segoe UI Semibold", 9F, FontStyle.Bold | FontStyle.Italic, GraphicsUnit.Point);
            btnLimparFiltro.Location = new Point(1111, 79);
            btnLimparFiltro.Name = "btnLimparFiltro";
            btnLimparFiltro.Size = new Size(136, 23);
            btnLimparFiltro.TabIndex = 28;
            btnLimparFiltro.Text = "Limpar Filtro de Valor";
            btnLimparFiltro.UseVisualStyleBackColor = true;
            btnLimparFiltro.Click += EventoAoClicarNoBotaoDeLimparFiltroDeValor;
            // 
            // numericValorMaximo
            // 
            numericValorMaximo.Location = new Point(1166, 50);
            numericValorMaximo.Maximum = new decimal(new int[] { 10000, 0, 0, 0 });
            numericValorMaximo.Name = "numericValorMaximo";
            numericValorMaximo.Size = new Size(81, 23);
            numericValorMaximo.TabIndex = 27;
            numericValorMaximo.ValueChanged += EventoDaCaixaNumericaValorMaximo;
            // 
            // numericValorMinimo
            // 
            numericValorMinimo.Location = new Point(1067, 50);
            numericValorMinimo.Maximum = new decimal(new int[] { 10000, 0, 0, 0 });
            numericValorMinimo.Name = "numericValorMinimo";
            numericValorMinimo.Size = new Size(81, 23);
            numericValorMinimo.TabIndex = 26;
            numericValorMinimo.ValueChanged += EventoDaCaixaNumericaValorMinimo;
            // 
            // lblFiltrarPorValor
            // 
            lblFiltrarPorValor.AutoSize = true;
            lblFiltrarPorValor.Font = new Font("Segoe UI Semibold", 11.25F, FontStyle.Bold | FontStyle.Italic, GraphicsUnit.Point);
            lblFiltrarPorValor.Location = new Point(1095, 12);
            lblFiltrarPorValor.Name = "lblFiltrarPorValor";
            lblFiltrarPorValor.Size = new Size(123, 20);
            lblFiltrarPorValor.TabIndex = 25;
            lblFiltrarPorValor.Text = "Filtrar por Valor:";
            // 
            // lblValorMaximo
            // 
            lblValorMaximo.AutoSize = true;
            lblValorMaximo.Location = new Point(1166, 32);
            lblValorMaximo.Name = "lblValorMaximo";
            lblValorMaximo.Size = new Size(82, 15);
            lblValorMaximo.TabIndex = 23;
            lblValorMaximo.Text = "Valor Máximo:";
            // 
            // lblValorMinimo
            // 
            lblValorMinimo.AutoSize = true;
            lblValorMinimo.Location = new Point(1067, 32);
            lblValorMinimo.Name = "lblValorMinimo";
            lblValorMinimo.Size = new Size(80, 15);
            lblValorMinimo.TabIndex = 22;
            lblValorMinimo.Text = "Valor Mínimo:";
            // 
            // lblFiltrarPorData
            // 
            lblFiltrarPorData.AutoSize = true;
            lblFiltrarPorData.Font = new Font("Segoe UI Semibold", 11.25F, FontStyle.Bold | FontStyle.Italic, GraphicsUnit.Point);
            lblFiltrarPorData.Location = new Point(851, 13);
            lblFiltrarPorData.Name = "lblFiltrarPorData";
            lblFiltrarPorData.Size = new Size(120, 20);
            lblFiltrarPorData.TabIndex = 20;
            lblFiltrarPorData.Text = "Filtrar por Data:";
            // 
            // lblAteTalData
            // 
            lblAteTalData.AutoSize = true;
            lblAteTalData.Location = new Point(896, 55);
            lblAteTalData.Name = "lblAteTalData";
            lblAteTalData.Size = new Size(28, 15);
            lblAteTalData.TabIndex = 18;
            lblAteTalData.Text = "Até:";
            // 
            // dataMaxima
            // 
            dataMaxima.Cursor = Cursors.Hand;
            dataMaxima.CustomFormat = "dd/m/yyyy 00:00";
            dataMaxima.Font = new Font("Segoe UI", 9F, FontStyle.Regular, GraphicsUnit.Point);
            dataMaxima.Format = DateTimePickerFormat.Short;
            dataMaxima.Location = new Point(930, 51);
            dataMaxima.MinDate = new DateTime(2000, 1, 1, 0, 0, 0, 0);
            dataMaxima.Name = "dataMaxima";
            dataMaxima.RightToLeft = RightToLeft.Yes;
            dataMaxima.Size = new Size(104, 23);
            dataMaxima.TabIndex = 17;
            dataMaxima.ValueChanged += EventoDeFiltroDeDataMaximaDoAgendamento;
            // 
            // dataMinima
            // 
            dataMinima.Cursor = Cursors.Hand;
            dataMinima.Font = new Font("Segoe UI", 9F, FontStyle.Regular, GraphicsUnit.Point);
            dataMinima.Format = DateTimePickerFormat.Short;
            dataMinima.Location = new Point(786, 50);
            dataMinima.MinDate = new DateTime(2000, 1, 1, 0, 0, 0, 0);
            dataMinima.Name = "dataMinima";
            dataMinima.Size = new Size(104, 23);
            dataMinima.TabIndex = 16;
            dataMinima.ValueChanged += EventoDeFiltroDaDataMinimaDoAgendamento;
            // 
            // label1
            // 
            label1.AutoSize = true;
            label1.Font = new Font("Segoe UI", 9.75F, FontStyle.Bold | FontStyle.Italic, GraphicsUnit.Point);
            label1.Location = new Point(256, 16);
            label1.Name = "label1";
            label1.Size = new Size(158, 17);
            label1.TabIndex = 14;
            label1.Text = "Filtrar por Estilo Musical";
            // 
            // cbEstiloMusical
            // 
            cbEstiloMusical.Cursor = Cursors.Hand;
            cbEstiloMusical.FormattingEnabled = true;
            cbEstiloMusical.Items.AddRange(new object[] { "Todos", "Blues", "Jazz", "Música Clássica", "Sertanejo", "Gospel", "Eletrônica", "Samba" });
            cbEstiloMusical.Location = new Point(272, 50);
            cbEstiloMusical.Name = "cbEstiloMusical";
            cbEstiloMusical.Size = new Size(121, 23);
            cbEstiloMusical.TabIndex = 12;
            cbEstiloMusical.SelectedIndexChanged += EventoDaComboBoxAoFiltrarPeloEstiloMusical;
            // 
            // txtBuscarAgendamento
            // 
            txtBuscarAgendamento.Cursor = Cursors.IBeam;
            txtBuscarAgendamento.Location = new Point(6, 50);
            txtBuscarAgendamento.Name = "txtBuscarAgendamento";
            txtBuscarAgendamento.PlaceholderText = "Digite o nome do responsável";
            txtBuscarAgendamento.Size = new Size(239, 23);
            txtBuscarAgendamento.TabIndex = 10;
            txtBuscarAgendamento.TextChanged += EventoDeFiltroAoBuscarAgendamento;
            // 
            // btnDeletarAgendamento
            // 
            btnDeletarAgendamento.Anchor = AnchorStyles.Bottom | AnchorStyles.Right;
            btnDeletarAgendamento.Cursor = Cursors.Hand;
            btnDeletarAgendamento.Font = new Font("Segoe UI Semibold", 9F, FontStyle.Bold | FontStyle.Italic, GraphicsUnit.Point);
            btnDeletarAgendamento.Location = new Point(1170, 391);
            btnDeletarAgendamento.Name = "btnDeletarAgendamento";
            btnDeletarAgendamento.Size = new Size(75, 23);
            btnDeletarAgendamento.TabIndex = 8;
            btnDeletarAgendamento.Text = "Deletar";
            btnDeletarAgendamento.UseVisualStyleBackColor = true;
            btnDeletarAgendamento.Click += EventoAoDeletarAgendamento;
            // 
            // btnAtualizarAgendamento
            // 
            btnAtualizarAgendamento.Anchor = AnchorStyles.Bottom | AnchorStyles.Right;
            btnAtualizarAgendamento.Cursor = Cursors.Hand;
            btnAtualizarAgendamento.Font = new Font("Segoe UI Semibold", 9F, FontStyle.Bold | FontStyle.Italic, GraphicsUnit.Point);
            btnAtualizarAgendamento.Location = new Point(1089, 391);
            btnAtualizarAgendamento.Name = "btnAtualizarAgendamento";
            btnAtualizarAgendamento.Size = new Size(75, 23);
            btnAtualizarAgendamento.TabIndex = 7;
            btnAtualizarAgendamento.Text = "Atualizar";
            btnAtualizarAgendamento.UseVisualStyleBackColor = true;
            btnAtualizarAgendamento.Click += EventoAoAtualizarAgendamento;
            // 
            // btnAdicionarAgendamento
            // 
            btnAdicionarAgendamento.Anchor = AnchorStyles.Bottom | AnchorStyles.Right;
            btnAdicionarAgendamento.Cursor = Cursors.Hand;
            btnAdicionarAgendamento.Font = new Font("Segoe UI Semibold", 9F, FontStyle.Bold | FontStyle.Italic, GraphicsUnit.Point);
            btnAdicionarAgendamento.Location = new Point(1008, 391);
            btnAdicionarAgendamento.Name = "btnAdicionarAgendamento";
            btnAdicionarAgendamento.Size = new Size(75, 23);
            btnAdicionarAgendamento.TabIndex = 6;
            btnAdicionarAgendamento.Text = "Adicionar";
            btnAdicionarAgendamento.UseVisualStyleBackColor = true;
            btnAdicionarAgendamento.Click += EventoAoClicarEmCadastrarAgendamento;
            // 
            // dataGridAgendamento
            // 
            dataGridAgendamento.AllowUserToAddRows = false;
            dataGridAgendamento.AllowUserToDeleteRows = false;
            dataGridAgendamento.AllowUserToResizeColumns = false;
            dataGridAgendamento.AllowUserToResizeRows = false;
            dataGridAgendamento.Anchor = AnchorStyles.Top | AnchorStyles.Bottom | AnchorStyles.Left | AnchorStyles.Right;
            dataGridAgendamento.AutoGenerateColumns = false;
            dataGridAgendamento.AutoSizeColumnsMode = DataGridViewAutoSizeColumnsMode.Fill;
            dataGridAgendamento.BackgroundColor = SystemColors.Control;
            dataGridAgendamento.ColumnHeadersBorderStyle = DataGridViewHeaderBorderStyle.Single;
            dataGridAgendamento.ColumnHeadersHeightSizeMode = DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            dataGridAgendamento.Columns.AddRange(new DataGridViewColumn[] { idDataGridViewTextBoxColumn1, nomeResponsavelDataGridViewTextBoxColumn, cpfResponsavelDataGridViewTextBoxColumn, dataEHoraDeEntradaDataGridViewTextBoxColumn, dataEHoraDeSaidaDataGridViewTextBoxColumn, valorTotalDataGridViewTextBoxColumn, estiloMusicalDataGridViewTextBoxColumn, idEstudioDataGridViewTextBoxColumn });
            dataGridAgendamento.DataSource = agendamentoBindingSource;
            dataGridAgendamento.GridColor = Color.Black;
            dataGridAgendamento.Location = new Point(6, 128);
            dataGridAgendamento.Name = "dataGridAgendamento";
            dataGridAgendamento.ReadOnly = true;
            dataGridAgendamento.RowHeadersVisible = false;
            dataGridAgendamento.RowTemplate.Height = 25;
            dataGridAgendamento.SelectionMode = DataGridViewSelectionMode.FullRowSelect;
            dataGridAgendamento.Size = new Size(1242, 199);
            dataGridAgendamento.TabIndex = 0;
            dataGridAgendamento.CellFormatting += EventoDeFormatacaoDoDataGridAgendamento;
            // 
            // idDataGridViewTextBoxColumn1
            // 
            idDataGridViewTextBoxColumn1.DataPropertyName = "Id";
            idDataGridViewTextBoxColumn1.HeaderText = "ID";
            idDataGridViewTextBoxColumn1.Name = "idDataGridViewTextBoxColumn1";
            idDataGridViewTextBoxColumn1.ReadOnly = true;
            idDataGridViewTextBoxColumn1.Visible = false;
            // 
            // nomeResponsavelDataGridViewTextBoxColumn
            // 
            nomeResponsavelDataGridViewTextBoxColumn.DataPropertyName = "NomeResponsavel";
            nomeResponsavelDataGridViewTextBoxColumn.HeaderText = "Nome do Responsável";
            nomeResponsavelDataGridViewTextBoxColumn.Name = "nomeResponsavelDataGridViewTextBoxColumn";
            nomeResponsavelDataGridViewTextBoxColumn.ReadOnly = true;
            // 
            // cpfResponsavelDataGridViewTextBoxColumn
            // 
            cpfResponsavelDataGridViewTextBoxColumn.DataPropertyName = "CpfResponsavel";
            cpfResponsavelDataGridViewTextBoxColumn.HeaderText = "CPF do Responsável";
            cpfResponsavelDataGridViewTextBoxColumn.Name = "cpfResponsavelDataGridViewTextBoxColumn";
            cpfResponsavelDataGridViewTextBoxColumn.ReadOnly = true;
            // 
            // dataEHoraDeEntradaDataGridViewTextBoxColumn
            // 
            dataEHoraDeEntradaDataGridViewTextBoxColumn.DataPropertyName = "DataEHoraDeEntrada";
            dataEHoraDeEntradaDataGridViewTextBoxColumn.HeaderText = "Data e Hora de Entrada";
            dataEHoraDeEntradaDataGridViewTextBoxColumn.Name = "dataEHoraDeEntradaDataGridViewTextBoxColumn";
            dataEHoraDeEntradaDataGridViewTextBoxColumn.ReadOnly = true;
            // 
            // dataEHoraDeSaidaDataGridViewTextBoxColumn
            // 
            dataEHoraDeSaidaDataGridViewTextBoxColumn.DataPropertyName = "DataEHoraDeSaida";
            dataEHoraDeSaidaDataGridViewTextBoxColumn.HeaderText = "Data e Hora de Saída";
            dataEHoraDeSaidaDataGridViewTextBoxColumn.Name = "dataEHoraDeSaidaDataGridViewTextBoxColumn";
            dataEHoraDeSaidaDataGridViewTextBoxColumn.ReadOnly = true;
            // 
            // valorTotalDataGridViewTextBoxColumn
            // 
            valorTotalDataGridViewTextBoxColumn.DataPropertyName = "ValorTotal";
            dataGridViewCellStyle1.Format = "C2";
            dataGridViewCellStyle1.NullValue = "R$";
            valorTotalDataGridViewTextBoxColumn.DefaultCellStyle = dataGridViewCellStyle1;
            valorTotalDataGridViewTextBoxColumn.HeaderText = "Valor Total";
            valorTotalDataGridViewTextBoxColumn.Name = "valorTotalDataGridViewTextBoxColumn";
            valorTotalDataGridViewTextBoxColumn.ReadOnly = true;
            // 
            // estiloMusicalDataGridViewTextBoxColumn
            // 
            estiloMusicalDataGridViewTextBoxColumn.DataPropertyName = "EstiloMusical";
            estiloMusicalDataGridViewTextBoxColumn.HeaderText = "Estilo Musical";
            estiloMusicalDataGridViewTextBoxColumn.Name = "estiloMusicalDataGridViewTextBoxColumn";
            estiloMusicalDataGridViewTextBoxColumn.ReadOnly = true;
            // 
            // idEstudioDataGridViewTextBoxColumn
            // 
            idEstudioDataGridViewTextBoxColumn.AutoSizeMode = DataGridViewAutoSizeColumnMode.AllCells;
            idEstudioDataGridViewTextBoxColumn.DataPropertyName = "IdEstudio";
            idEstudioDataGridViewTextBoxColumn.HeaderText = "Estúdio";
            idEstudioDataGridViewTextBoxColumn.Name = "idEstudioDataGridViewTextBoxColumn";
            idEstudioDataGridViewTextBoxColumn.ReadOnly = true;
            idEstudioDataGridViewTextBoxColumn.Width = 70;
            // 
            // agendamentoBindingSource
            // 
            agendamentoBindingSource.DataSource = typeof(Dominio.Entidades.Agendamento);
            // 
            // bdEstudioFacilBindingSource
            // 
            bdEstudioFacilBindingSource.DataSource = typeof(Infra.BdEstudioFacil);
            // 
            // FormAgendamentoEmEstudioMusical
            // 
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(1262, 450);
            Controls.Add(tabAgendamentoEmEstudioMusical);
            Name = "FormAgendamentoEmEstudioMusical";
            Text = "Agendamento em Estúdio Musical";
            tabAgendamentoEmEstudioMusical.ResumeLayout(false);
            tabEstudioMusical.ResumeLayout(false);
            tabEstudioMusical.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)dataGridEstudioMusical).EndInit();
            ((System.ComponentModel.ISupportInitialize)estudioMusicalBindingSource).EndInit();
            tabAgendamento.ResumeLayout(false);
            tabAgendamento.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)numericValorMaximo).EndInit();
            ((System.ComponentModel.ISupportInitialize)numericValorMinimo).EndInit();
            ((System.ComponentModel.ISupportInitialize)dataGridAgendamento).EndInit();
            ((System.ComponentModel.ISupportInitialize)agendamentoBindingSource).EndInit();
            ((System.ComponentModel.ISupportInitialize)bdEstudioFacilBindingSource).EndInit();
            ResumeLayout(false);
        }

        #endregion

        private Button btnAdicionarEstudioMusical;
        private Button btnAtualizarEstudioMusical;
        private TextBox txtBuscarEstudio;
        private TabControl tabAgendamentoEmEstudioMusical;
        private TabPage tabEstudioMusical;
        private TabPage tabAgendamento;
        private Button btnDeletarEstudioMusical;
        private DataGridView dataGridEstudioMusical;
        private BindingSource bdEstudioFacilBindingSource;
        private BindingSource estudioMusicalBindingSource;
        private DataGridView dataGridAgendamento;
        private BindingSource agendamentoBindingSource;
        private Button btnDeletarAgendamento;
        private Button btnAtualizarAgendamento;
        private Button btnAdicionarAgendamento;
        private Label lblEstaAberto;
        private TextBox txtBuscarAgendamento;
        private ComboBox cbEstiloMusical;
        private Label label1;
        private Label lblFiltrarPorData;
        private Label lblAteTalData;
        private DateTimePicker dataMaxima;
        private DateTimePicker dataMinima;
        private Label lblValorMaximo;
        private Label lblValorMinimo;
        private Label lblFiltrarPorValor;
        private DataGridViewTextBoxColumn idDataGridViewTextBoxColumn;
        private DataGridViewTextBoxColumn nomeDataGridViewTextBoxColumn;
        private DataGridViewCheckBoxColumn estaAbertoDataGridViewCheckBoxColumn;
        private CheckBox checkBoxEstaAbertoSim;
        private CheckBox checkBoxNaoEstaAberto;
        private NumericUpDown numericValorMaximo;
        private NumericUpDown numericValorMinimo;
        private Button btnLimparFiltro;
        private Button btnLimparPesquisaAgendamento;
        private Button btnLimparFiltrosDeBuscaDeEstudioEEstaAberto;
        private Button btnLimparFiltroDeData;
        private Label lblDeTalData;
        private DataGridViewTextBoxColumn idDataGridViewTextBoxColumn1;
        private DataGridViewTextBoxColumn nomeResponsavelDataGridViewTextBoxColumn;
        private DataGridViewTextBoxColumn cpfResponsavelDataGridViewTextBoxColumn;
        private DataGridViewTextBoxColumn dataEHoraDeEntradaDataGridViewTextBoxColumn;
        private DataGridViewTextBoxColumn dataEHoraDeSaidaDataGridViewTextBoxColumn;
        private DataGridViewTextBoxColumn valorTotalDataGridViewTextBoxColumn;
        private DataGridViewTextBoxColumn estiloMusicalDataGridViewTextBoxColumn;
        private DataGridViewTextBoxColumn idEstudioDataGridViewTextBoxColumn;
        private Label lblEstudioMusicalEstaAberto;
    }
}
