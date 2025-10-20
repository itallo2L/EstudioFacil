using LinqToDB.Mapping;

namespace EstudioFacil.Dominio.Usuarios
{
    [Table("UsuarioBase")]
    public class UsuarioBase
    {
        [PrimaryKey, Identity]
        public int Id { get; set; }
        [Column]
        public string EnderecoDeEmail { get; set; } = string.Empty;
        [Column]
        public string HashDaSenha { get; set; } = string.Empty;
        [Column]
        public bool EhUsuarioMusico { get; set; }
    }
}