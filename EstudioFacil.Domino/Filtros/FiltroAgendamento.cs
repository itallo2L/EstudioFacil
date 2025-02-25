using EstudioFacil.Dominio.EnumEstiloMusical;
using System;

namespace EstudioFacil.Dominio.Filtros
{
    public class FiltroAgendamento
    {
        public string? NomeResponsavel { get; set; }
        public DateTime? DataMinima { get; set; }
        public DateTime? DataMaxima { get; set; }
        public decimal? ValorMinimo { get; set; }
        public decimal? ValorMaximo { get; set; }
        public EstiloMusical EstiloMusical { get; set; }
    }
}