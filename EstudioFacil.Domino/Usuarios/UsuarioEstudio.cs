namespace EstudioFacil.Dominio.Usuarios
{
    public class UsuarioEstudio
    {
        public int? Id { get; set; }
        public string NomeFantasia { get; set; } = string.Empty;
        public string RazaoSocial { get; set; } = string.Empty;
        public string Endereco { get; set; } = string.Empty;
        public string Telefone { get; set; } = string.Empty;
        public string CNPJ { get; set; } = string.Empty;
        public string HashDaSenha { get; set; } = string.Empty;
    }
}