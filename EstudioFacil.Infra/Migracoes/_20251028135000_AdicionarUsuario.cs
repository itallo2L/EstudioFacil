using FluentMigrator;

namespace EstudioFacil.Infra.Migracoes
{
    [Migration(20251028135000)]
    public class _20251028135000_AdicionarUsuario : Migration
    {
        public override void Up()
        {
            Create.Table("Usuario")
                .WithColumn("Id").AsInt64().PrimaryKey().Identity()
                .WithColumn("EnderecoDeEmail").AsString()
                .WithColumn("HashDaSenha").AsString()
                .WithColumn("EhUsuarioMusico").AsString()
                .WithColumn("NomeFantasia").AsString()
                .WithColumn("RazaoSocial").AsString()
                .WithColumn("Endereco").AsString()
                .WithColumn("Telefone").AsString()
                .WithColumn("NomeDoResponsavel").AsString()
                .WithColumn("CPF").AsString()
                .WithColumn("CNPJ").AsString();
        }

        public override void Down()
        {
            Delete.Table("Usuario");
        }
    }
}