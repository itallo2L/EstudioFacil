sap.ui.define([
    "sap/ui/test/opaQunit",
    "../pages/AdicionarEstudio"
], (opaTest) => {
    "use strict";

    QUnit.module("Adicionar Estúdio");

    opaTest("Deve carregar a tela de Adicionar Estúdio", function (Given, When, Then) {
        Given.iniciarApp({
            hash: "/AdicionarEstudio"
        });

        Then
            .naPaginaAdicionarEstudio
            .aTelaDeAdicionarDeveCarregarCorretamente("adicionar");
    });

    opaTest("Deve acusar erro de input com nome vazio", function (Given, When, Then) {
        When
            .naPaginaAdicionarEstudio
            .aoClicarEmSalvarSemDigitarNome("idBotaoSalvarEstudio", "adicionar");

        Then
            .naPaginaAdicionarEstudio
            .aValidacaoDeNomeDoEstudioObrigatorioDeveAparecer("Fechar",
                "A MessageBox com a validação acusando falta de nome no estúdio apareceu.",
                "A MessageBox com a validação acusando falta de nome no estúdio não apareceu.");

        Then
            .naPaginaAdicionarEstudio
            .oInputDeveTerValueStateDeErro("Error");
    });

    opaTest("Deve continuar na página de adicionar ao clicar em Cancelar -> Não", function (Given, When, Then) {
        When
            .naPaginaAdicionarEstudio
            .aoClicarEmCancelar("idBotaoCancelarAdicaoEstudio", "cancelar");

        When
            .naPaginaAdicionarEstudio
            .aoClicarEmNao("Não");

        Then
            .naPaginaAdicionarEstudio
            .aPaginaDevePermanecerNaTelaDeAdicionar("adicionar");
    });

    opaTest("Deve ir para a tela de listagem ao cancelar adição do estúdio", function (Given, When, Then) {
        When
            .naPaginaAdicionarEstudio
            .aoClicarEmCancelarAdicaoDoEstudio("idBotaoCancelarAdicaoEstudio", "cancelar");

        When
            .naPaginaAdicionarEstudio
            .aoClicarEmSim("Sim");

        Then
            .naPaginaListaEstudio
            .aPaginaDeListagemDeveCarregarCorretamente("listagemEstudio.ListagemEstudio", "listagem");
    });

    opaTest("Deve ir para a tela de adicionar", function (Given, When, Then) {
        When
            .naPaginaListaEstudio
            .aoClicarEmAdicionarEstudio();

        Then
            .naPaginaAdicionarEstudio
            .aPaginaDevePermanecerNaTelaDeAdicionar("adicionar");
    });

    opaTest("Deve salvar estúdio e carregar a página de detalhes", function (Given, When, Then) {
        When
            .naPaginaAdicionarEstudio
            .aoDigitarNomeDoEstudio("Estudio Vinte e Seis");

        When
            .naPaginaAdicionarEstudio
            .aoClicarEmSalvar("idBotaoSalvarEstudio", "adicionar");

        When
            .naPaginaAdicionarEstudio
            .aoClicarEmOk("OK");

        Then
            .naPaginaDetalhesEstudio
            .aPaginaDeDetalhesDeveCarregar();
    });

    opaTest("O estúdio deve ter sido deletado", function (Given, When, Then) {
        When
            .naPaginaDetalhesEstudio
            .aoClicarEmRetornarParaListagem("O botão de retornar para listagem foi clicado", "Não foi possível clicar no botão de retornar para listagem");

        Then
            .naPaginaListaEstudio
            .aListaDeveConterVinteESeisEstudios(26);

        Then
            .iTeardownMyApp();
    });
});