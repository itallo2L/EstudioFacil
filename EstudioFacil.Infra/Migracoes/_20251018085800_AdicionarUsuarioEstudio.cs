using FluentMigrator;

namespace EstudioFacil.Infra.Migracoes
{
    [Migration(20251018085800)]
    public class _20251018085800_AdicionarUsuarioEstudio : Migration
    {
        public override void Up()
        {
            Create.Table("UsuarioEstudio")
                .WithColumn("Id").AsInt64().PrimaryKey().Identity()
                .WithColumn("NomeFantasia").AsString().NotNullable()
                .WithColumn("RazaoSocial").AsString().NotNullable()
                .WithColumn("Endereco").AsString().NotNullable()
                .WithColumn("Telefone").AsString().NotNullable()
                .WithColumn("CNPJ").AsString().NotNullable()
                .WithColumn("EnderecoDeEmail").AsString().NotNullable()
                .WithColumn("HashDaSenha").AsString().NotNullable()
                .WithColumn("IdDoUsuarioBase").AsInt64().ForeignKey("UsuarioBase", "Id").OnDeleteOrUpdate(System.Data.Rule.Cascade);
        }

        public override void Down()
        {
            Delete.Table("UsuarioEstudio");
        }
    }
}