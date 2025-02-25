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
        public bool EstaAberto { get; set; }
    }
}