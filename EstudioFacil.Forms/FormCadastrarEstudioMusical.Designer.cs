namespace EstudioFacil.Forms
{
    partial class FormCadastrarEstudioMusical
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
            groupBoxCadastraEstudio = new GroupBox();
            textBoxNomeAoCadastrarEstudio = new TextBox();
            btnCancelarAoCadastrarEstudio = new Button();
            btnSalvarCadastroDeEstudioMusical = new Button();
            checkBoxSimEstaAbertoAoCadastrarEstudio = new CheckBox();
            lblEstaAbertoAoCadastarEstudio = new Label();
            lblNomeAoCadastrarEstudio = new Label();
            groupBoxCadastraEstudio.SuspendLayout();
            SuspendLayout();
            // 
            // groupBoxCadastraEstudio
            // 
            groupBoxCadastraEstudio.Controls.Add(textBoxNomeAoCadastrarEstudio);
            groupBoxCadastraEstudio.Controls.Add(btnCancelarAoCadastrarEstudio);
            groupBoxCadastraEstudio.Controls.Add(btnSalvarCadastroDeEstudioMusical);
            groupBoxCadastraEstudio.Controls.Add(checkBoxSimEstaAbertoAoCadastrarEstudio);
            groupBoxCadastraEstudio.Controls.Add(lblEstaAbertoAoCadastarEstudio);
            groupBoxCadastraEstudio.Controls.Add(lblNomeAoCadastrarEstudio);
            groupBoxCadastraEstudio.Location = new Point(12, 12);
            groupBoxCadastraEstudio.Name = "groupBoxCadastraEstudio";
            groupBoxCadastraEstudio.Size = new Size(200, 246);
            groupBoxCadastraEstudio.TabIndex = 0;
            groupBoxCadastraEstudio.TabStop = false;
            groupBoxCadastraEstudio.Text = "Estúdio";
            // 
            // textBoxNomeAoCadastrarEstudio
            // 
            textBoxNomeAoCadastrarEstudio.Cursor = Cursors.IBeam;
            textBoxNomeAoCadastrarEstudio.Location = new Point(5, 58);
            textBoxNomeAoCadastrarEstudio.Name = "textBoxNomeAoCadastrarEstudio";
            textBoxNomeAoCadastrarEstudio.PlaceholderText = "Ex: Estúdio Musical";
            textBoxNomeAoCadastrarEstudio.Size = new Size(188, 24);
            textBoxNomeAoCadastrarEstudio.TabIndex = 5;
            // 
            // btnCancelarAoCadastrarEstudio
            // 
            btnCancelarAoCadastrarEstudio.Cursor = Cursors.Hand;
            btnCancelarAoCadastrarEstudio.Location = new Point(119, 217);
            btnCancelarAoCadastrarEstudio.Name = "btnCancelarAoCadastrarEstudio";
            btnCancelarAoCadastrarEstudio.Size = new Size(75, 23);
            btnCancelarAoCadastrarEstudio.TabIndex = 4;
            btnCancelarAoCadastrarEstudio.Text = "Cancelar";
            btnCancelarAoCadastrarEstudio.UseVisualStyleBackColor = true;
            btnCancelarAoCadastrarEstudio.Click += EventoAoClicarEmCancelarCadastro;
            // 
            // btnSalvarCadastroDeEstudioMusical
            // 
            btnSalvarCadastroDeEstudioMusical.Cursor = Cursors.Hand;
            btnSalvarCadastroDeEstudioMusical.Location = new Point(6, 217);
            btnSalvarCadastroDeEstudioMusical.Name = "btnSalvarCadastroDeEstudioMusical";
            btnSalvarCadastroDeEstudioMusical.Size = new Size(75, 23);
            btnSalvarCadastroDeEstudioMusical.TabIndex = 3;
            btnSalvarCadastroDeEstudioMusical.Text = "Salvar";
            btnSalvarCadastroDeEstudioMusical.UseVisualStyleBackColor = true;
            btnSalvarCadastroDeEstudioMusical.Click += EventoAoClicarEmSalvarEstudio;
            // 
            // checkBoxSimEstaAbertoAoCadastrarEstudio
            // 
            checkBoxSimEstaAbertoAoCadastrarEstudio.AutoSize = true;
            checkBoxSimEstaAbertoAoCadastrarEstudio.Cursor = Cursors.Hand;
            checkBoxSimEstaAbertoAoCadastrarEstudio.Location = new Point(7, 135);
            checkBoxSimEstaAbertoAoCadastrarEstudio.Name = "checkBoxSimEstaAbertoAoCadastrarEstudio";
            checkBoxSimEstaAbertoAoCadastrarEstudio.Size = new Size(46, 19);
            checkBoxSimEstaAbertoAoCadastrarEstudio.TabIndex = 2;
            checkBoxSimEstaAbertoAoCadastrarEstudio.Text = "Sim";
            checkBoxSimEstaAbertoAoCadastrarEstudio.UseVisualStyleBackColor = true;
            // 
            // lblEstaAbertoAoCadastarEstudio
            // 
            lblEstaAbertoAoCadastarEstudio.AutoSize = true;
            lblEstaAbertoAoCadastarEstudio.Location = new Point(5, 117);
            lblEstaAbertoAoCadastarEstudio.Name = "lblEstaAbertoAoCadastarEstudio";
            lblEstaAbertoAoCadastarEstudio.Size = new Size(74, 15);
            lblEstaAbertoAoCadastarEstudio.TabIndex = 1;
            lblEstaAbertoAoCadastarEstudio.Text = "Está Aberto?";
            // 
            // lblNomeAoCadastrarEstudio
            // 
            lblNomeAoCadastrarEstudio.AutoSize = true;
            lblNomeAoCadastrarEstudio.Location = new Point(7, 40);
            lblNomeAoCadastrarEstudio.Name = "lblNomeAoCadastrarEstudio";
            lblNomeAoCadastrarEstudio.Size = new Size(43, 15);
            lblNomeAoCadastrarEstudio.TabIndex = 0;
            lblNomeAoCadastrarEstudio.Text = "Nome:";
            // 
            // FormCadastrarEstudioMusical
            // 
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            BackColor = SystemColors.Window;
            ClientSize = new Size(225, 270);
            Controls.Add(groupBoxCadastraEstudio);
            Font = new Font("Segoe UI Semibold", 9F, FontStyle.Bold | FontStyle.Italic, GraphicsUnit.Point);
            MaximizeBox = false;
            Name = "FormCadastrarEstudioMusical";
            StartPosition = FormStartPosition.CenterScreen;
            Text = "Estúdio";
            groupBoxCadastraEstudio.ResumeLayout(false);
            groupBoxCadastraEstudio.PerformLayout();
            ResumeLayout(false);
        }

        #endregion

        private GroupBox groupBoxCadastraEstudio;
        private Label lblEstaAbertoAoCadastarEstudio;
        private Label lblNomeAoCadastrarEstudio;
        private TextBox textBoxNomeAoCadastrarEstudio;
        private Button btnCancelarAoCadastrarEstudio;
        private Button btnSalvarCadastroDeEstudioMusical;
        private CheckBox checkBoxSimEstaAbertoAoCadastrarEstudio;
    }
}