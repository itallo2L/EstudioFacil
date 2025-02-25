using FluentMigrator;

namespace EstudioFacil.Infra.Migracoes
{
    [Migration(20240715092000)]
    public class _20240715092000_AdicionarEstudioMusical : Migration
    {
        public override void Up()
        {
            Create.Table("EstudioMusical")
                .WithColumn("Id").AsInt64().PrimaryKey().Identity()
                .WithColumn("Nome").AsString().NotNullable()
                .WithColumn("EstaAberto").AsBoolean().NotNullable();
        }

        public override void Down()
        {
            Delete.Table("EstudioMusical");
        }
    }
}