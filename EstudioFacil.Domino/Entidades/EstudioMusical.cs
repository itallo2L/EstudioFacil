using LinqToDB.Mapping;

namespace EstudioFacil.Dominio.Entidades
{
    [Table("EstudioMusical")]
    public class EstudioMusical
    {
        [PrimaryKey, Identity]
        public int Id { get; set; }
        [Column]
        public string? Nome { get; set; }
        [Column]
        public bool EstaAberto { get; set; } = false;
        [Column]
        public int ValorDaHora { get; set; }
        [Column]
        public string Endereco { get; set; }
        [Column]
        public string Telefone { get; set; }
        [Column]
        public string Descricao { get; set; }
    }
}