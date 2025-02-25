sap.ui.define([
    "sap/ui/test/opaQunit",
    "../pages/DetalhesEstudio"
], (opaTest) => {
    "use strict";

    QUnit.module("Deletar Estúdio");

    opaTest(`Deve carregar a tela de Detalhes do Estúdio no "Estudio Vinte e Seis"`, function (Given, When, Then) {
        Given.iniciarApp({
            hash: ""
        });

        When
            .naPaginaListaEstudio
            .aoCarregarMaisEstudios();

        When
            .naPaginaListaEstudio
            .aoClicarNoEstudioVinteESeis("Estudio Vinte e Seis");

        Then
            .naPaginaDetalhesEstudio
            .aPaginaDeDetalhesDeveCarregarCorretamente();
    });

    opaTest(`Deve clicar no botão de deletar e selecionar "sim" e "OK" nas messageBox`, function (Given, When, Then) {
        When
            .naPaginaDetalhesEstudio
            .aoClicarEmDeletar("sap.m.Button", "Deletar", "O botão de Deletar foi clicado", "Não foi possível clicar no botão de Deletar");

        When
            .naPaginaDetalhesEstudio
            .aoClicarEmSimNaMessageBox("Sim");

        When
            .naPaginaDetalhesEstudio
            .aoClicarEmOKNaMessageBox("OK");
    })

    opaTest(`O "Estudio Vinte e Seis" deve ter sido deletado`, function (Given, When, Then) {
        Then
            .naPaginaListaEstudio
            .aListaDeveConterVinteECincoEstudiosNoTitulo(25);

        Then
            .iTeardownMyApp();
    })
});