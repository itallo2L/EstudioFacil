using EstudioFacil.Dominio.EnumEstiloMusical;
using LinqToDB.Mapping;
using System;

namespace EstudioFacil.Dominio.Entidades
{
    [Table("Agendamento")]
    public class Agendamento
    {
        [PrimaryKey, Identity]
        public int Id { get; set; }
        [Column]
        public string? NomeResponsavel { get; set; }
        [Column]
        public string? CpfResponsavel { get; set; }
        [Column]
        public DateTime DataEHoraDeEntrada { get; set; }
        [Column]
        public DateTime DataEHoraDeSaida { get; set; }
        [Column]
        public decimal ValorTotal { get; set; }
        [Column]
        public EstiloMusical EstiloMusical { get; set; }
        [Column]
        public int IdEstudio { get; set; }
    }
}