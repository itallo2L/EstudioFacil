namespace EstudioFacil.Dominio.Usuarios
{
    public class UsuarioMusico
    {
        public int? Id { get; set; }
        public string NomeDoResponsavel { get; set; } = string.Empty;
        public string NumeroDeTelefone { get; set; } = string.Empty;
        public string CPF { get; set; } = string.Empty;
        public string EnderecoDeEmail { get; set; } = string.Empty;
        public string HashDaSenha { get; set; } = string.Empty;
    }
}