using FluentMigrator;

namespace EstudioFacil.Infra.Migracoes
{
    [Migration(20251209140300)]
    public class _20251209140300_AdicionarEstudioMusical : Migration
    {
        public override void Up()
        {
            Create.Table("EstudioMusical")
                .WithColumn("Id").AsInt64().PrimaryKey().Identity()
                .WithColumn("Nome").AsString().NotNullable()
                .WithColumn("EstaAberto").AsBoolean().NotNullable()
                .WithColumn("ValorDaHora").AsString().Nullable()
                .WithColumn("Endereco").AsString().Nullable()
                .WithColumn("Telefone").AsString().Nullable()
                .WithColumn("Descricao").AsString().Nullable();
        }

        public override void Down()
        {
            Delete.Table("EstudioMusical");
        }
    }
}