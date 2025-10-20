using LinqToDB.Mapping;

namespace EstudioFacil.Dominio.Usuarios
{
    [Table("UsuarioMusico")]
    public class UsuarioMusico
    {
        [PrimaryKey, Identity]
        public int? Id { get; set; }
        [Column]
        public string NomeDoResponsavel { get; set; } = string.Empty;
        [Column]
        public string NumeroDeTelefone { get; set; } = string.Empty;
        [Column]
        public string CPF { get; set; } = string.Empty;
        [Column]
        public string EnderecoDeEmail { get; set; } = string.Empty;
        [Column]
        public string HashDaSenha { get; set; } = string.Empty;
        [Column]
        public int IdDoUsuarioBase { get; set; }
    }
}