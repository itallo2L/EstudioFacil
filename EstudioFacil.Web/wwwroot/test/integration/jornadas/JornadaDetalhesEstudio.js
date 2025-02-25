sap.ui.define([
    "sap/ui/test/opaQunit",
    "../pages/DetalhesEstudio"
], (opaTest) => {
    "use strict";

    QUnit.module("Detalhes do Estúdio");

    opaTest("Deve carregar a tela de Detalhes do Estúdio", function (Given, When, Then) {
        Given.iStartMyUIComponent({
            componentConfig: {
                name: "ui5.EstudioFacil"
            }
        });

        When
            .naPaginaListaEstudio
            .aoClicarEmUmEstudio("Estudio Um");

        Then
            .naPaginaDetalhesEstudio
            .aPaginaDeDetalhesDeveCarregarCorretamente();
    });

    opaTest(`Deve mostrar o nome do estúdio como "Estudio Um"`, function (Given, When, Then) {
        Then
            .naPaginaDetalhesEstudio
            .oNomeDoEstudioDeveSerEstudioUm("sap.m.Title", "Estudio Um",
                "O nome do estúdio (Estudio Um) está correto.",
                "O nome do estúdio (Estudio Um) não está correto.");
    });

    opaTest(`Deve mostrar "Aberto" na tela de detalhes do Estudio Um`, function (Given, When, Then) {
        Then
            .naPaginaDetalhesEstudio
            .oEstudioDeveAparecerComoAberto("sap.m.ObjectStatus", "Aberto",
                "O Estúdio Um está aberto", "O Estúdio Um está fechado");
    });

    opaTest("Deve retornar para a tela de listagem", function (Gicen, When, Then) {
        When
            .naPaginaDetalhesEstudio
            .aoClicarEmRetornarParaAPaginaAnterior();

        Then
            .naPaginaListaEstudio
            .aTelaDeListagemDoEstudioDeveCarregarCorretamente("listagem");

        Then
            .iTeardownMyApp();
    });
});