using FluentMigrator;

namespace EstudioFacil.Infra.Migracoes
{
    [Migration(20251209140500)]
    public class _20251209140500_AdicionarAgendamento : Migration
    {
        public override void Up()
        {
            Create.Table("Agendamento")
                .WithColumn("Id").AsInt64().PrimaryKey().Identity()
                .WithColumn("NomeResponsavel").AsString().NotNullable()
                .WithColumn("CpfResponsavel").AsString().NotNullable()
                .WithColumn("DataEHoraDeEntrada").AsDateTime().NotNullable()
                .WithColumn("DataEHoraDeSaida").AsDateTime().NotNullable()
                .WithColumn("ValorTotal").AsDecimal().NotNullable()
                .WithColumn("EstiloMusical").AsInt32().Nullable()
                .WithColumn("Telefone").AsString().Nullable()
                .WithColumn("Endereco").AsString().Nullable()
                .WithColumn("IdEstudio").AsInt64().ForeignKey("EstudioMusical", "Id").OnDeleteOrUpdate(System.Data.Rule.Cascade);
        }

        public override void Down()
        {
            Delete.Table("Agendamento");
        }
    }
}