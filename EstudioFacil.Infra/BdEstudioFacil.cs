using EstudioFacil.Dominio.Entidades;
using LinqToDB;

namespace EstudioFacil.Infra
{
    public class BdEstudioFacil : LinqToDB.Data.DataConnection
    {
        public BdEstudioFacil(DataOptions<BdEstudioFacil> options) : base (options.Options) { }
        public ITable<Agendamento> Agendamento => this.GetTable<Agendamento>();
        public ITable<EstudioMusical> EstudioMusical => this.GetTable<EstudioMusical>();
    }
}