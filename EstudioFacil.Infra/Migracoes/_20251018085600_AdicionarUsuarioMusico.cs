using FluentMigrator;

namespace EstudioFacil.Infra.Migracoes
{
    [Migration(20251018085600)]
    public class _20251018085600_AdicionarUsuarioMusico : Migration
    {
        public override void Up()
        {
            Create.Table("UsuarioMusico")
                .WithColumn("Id").AsInt64().PrimaryKey().Identity()
                .WithColumn("NomeDoResponsavel").AsString().NotNullable()
                .WithColumn("NumeroDeTelefone").AsString().NotNullable()
                .WithColumn("CPF").AsString().NotNullable()
                .WithColumn("EnderecoDeEmail").AsString().NotNullable()
                .WithColumn("HashDaSenha").AsString().NotNullable()
                .WithColumn("IdDoUsuarioBase").AsInt64().ForeignKey("UsuarioBase", "Id").OnDeleteOrUpdate(System.Data.Rule.Cascade);
        }

        public override void Down()
        {
            Delete.Table("UsuarioMusico");
        }
    }
}