using LinqToDB.Mapping;

namespace EstudioFacil.Dominio.Usuarios
{
    [Table("Usuario")]
    public class Usuario
    {
        [PrimaryKey, Identity]
        public int Id { get; set; }
        [Column]
        public string EnderecoDeEmail { get; set; } = string.Empty;
        [Column]
        public string HashDaSenha { get; set; } = string.Empty;
        [Column]
        public bool EhUsuarioMusico { get; set; }
        [Column]
        public string NomeFantasia { get; set; } = string.Empty;
        [Column]
        public string RazaoSocial { get; set; } = string.Empty;
        [Column]
        public string Endereco { get; set; } = string.Empty;
        [Column]
        public string Telefone { get; set; } = string.Empty;
        [Column]
        public string NomeDoResponsavel { get; set; } = string.Empty;
        [Column]
        public string CPF { get; set; } = string.Empty;
        [Column]
        public string CNPJ { get; set; } = string.Empty;
    }
}