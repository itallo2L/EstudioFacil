sap.ui.define([
    "sap/ui/test/opaQunit",
    "../pages/EditarEstudio",
], (opaTest) => {
    "use strict";

    QUnit.module("Editar Estúdio");

    opaTest("Deve carregar a tela de Editar Estúdio", function (Given, When, Then) {
        Given.iStartMyUIComponent({
            componentConfig: {
                name: "ui5.EstudioFacil"
            }
        });

        When
            .naPaginaListaEstudio
            .aoClicarEmEstudioUm("Estudio Um");

        When
            .naPaginaDetalhesEstudio
            .aoClicarEmEditar("sap.m.Button", "Editar", "O botão de Editar foi clicado", "Não foi possível clicar no botão de Editar");

        Then
            .naPaginaEditarEstudio
            .aPaginaDeEditarDeveCarregarCorretamente();
    });

    opaTest('Deve conter o nome "Estudio Um" no campo nome', function (Given, When, Then) {
        Then
            .naPaginaEditarEstudio
            .oNomeNoInputDeveSer("Estudio Um");
    });

    opaTest("O Estúdio deve estar aberto", function (Given, When, Then) {
        Then
            .naPaginaEditarEstudio
            .oEstudioDeveEstarAberto(true, "Aberto");
    });

    opaTest('Deve alterar o nome do Estudio para "Estúdio Editado" e fechado', function (Given, When, Then) {
        When
            .naPaginaEditarEstudio
            .aoClicarNoInputNome();

        When
            .naPaginaEditarEstudio
            .aoClicarNaCheckBox();

        When
            .naPaginaEditarEstudio
            .aoClicarNaCheckBoxNovamente();

        Then
            .naPaginaEditarEstudio
            .oNomeDeveSerEstudioUm("Estudio Um");

        Then
            .naPaginaEditarEstudio
            .aCheckBoxDeveEstarMarcada(true, "Aberto");
    });

    opaTest("Deve salvar as alterações e retornar para a tela de detalhes", function (Given, When, Then) {
        When
            .naPaginaEditarEstudio
            .aoClicarEmSalvar("Salvar");

        When
            .naPaginaEditarEstudio
            .aoClicarEmOKNaMessageBox("OK");

        Then
            .naPaginaDetalhesEstudio
            .aPaginaDeDetalhesDeveSerCarregada();
    });

    opaTest("Deve retornar para a tela de listagem", function (Given, When, Then) {
        When
            .naPaginaDetalhesEstudio
            .aoClicarEmRetornarParaListagem("O botão de retornar para listagem foi clicado", "Não foi possível clicar no botão de retornar para listagem");

        Then
            .naPaginaListaEstudio
            .oEstudioUmDeveSeChamar("Estudio Um");

        Then
            .naPaginaListaEstudio
            .oEstudioEditadoDeveEstarAberto("Aberto");

        Then
            .iTeardownMyApp();
    });
});