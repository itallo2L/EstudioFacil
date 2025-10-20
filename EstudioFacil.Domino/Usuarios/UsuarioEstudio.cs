using LinqToDB.Mapping;

namespace EstudioFacil.Dominio.Usuarios
{
    [Table("UsuarioEstudio")]
    public class UsuarioEstudio
    {
        [PrimaryKey, Identity]
        public int? Id { get; set; } 
        [Column]
        public string NomeFantasia { get; set; } = string.Empty;
        [Column]
        public string RazaoSocial { get; set; } = string.Empty;
        [Column]
        public string Endereco { get; set; } = string.Empty;
        [Column]
        public string Telefone { get; set; } = string.Empty;
        [Column]
        public string CNPJ { get; set; } = string.Empty;
        [Column]
        public string EnderecoDeEmail { get; set; } = string.Empty;
        [Column]
        public string HashDaSenha { get; set; } = string.Empty;
        [Column]
        public int IdDoUsuarioBase { get; set; }
    }
}