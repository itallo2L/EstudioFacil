using FluentMigrator;

namespace EstudioFacil.Infra.Migracoes
{
    [Migration(20251018085700)]
    public class _20251018085700_AdicionarUsuarioBase : Migration
    {
        public override void Up()
        {
            Create.Table("UsuarioBase")
                .WithColumn("Id").AsInt64().PrimaryKey().Identity()
                .WithColumn("EnderecoDeEmail").AsString().NotNullable()
                .WithColumn("HashDaSenha").AsString().NotNullable()
                .WithColumn("EhUsuarioMusico").AsString().NotNullable();
        }

        public override void Down()
        {
            Delete.Table("UsuarioBase");
        }
    }
}