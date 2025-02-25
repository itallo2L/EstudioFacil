sap.ui.define([
	"sap/ui/test/opaQunit",
	"../pages/ListagemEstudio"
], (opaTest) => {
	"use strict";

	QUnit.module("Lista Estúdio");

	opaTest("Deve carregar a tela de listagem do Estúdio", function (Given, When, Then) {
		Given.iStartMyUIComponent({
			componentConfig: {
				name: "ui5.EstudioFacil"
			}
		});

		Then
			.naPaginaListaEstudio
			.aTelaDeListagemDeveCarregarCorretamente("listagemEstudio.ListagemEstudio", "listagem");
	});

	opaTest("Deve mostrar 20 Estúdios listados na view do Estúdio", function (Given, When, Then) {
		Then
			.naPaginaListaEstudio
			.aListaDeveConterVinteEstudios(20);
	});

	opaTest("Deve carregar mais Estúdios", function (Given, When, Then) {
		When
			.naPaginaListaEstudio
			.aoClicarEmCarregarMaisEstudios();

		Then
			.naPaginaListaEstudio
			.aListaDeveConterVinteECincoEstudios(25);
	});

	opaTest("Deve filtrar por Estúdios abertos", function (Given, When, Then) {
		When
			.naPaginaListaEstudio
			.aoSelecionarEstudiosAbertos("aberto");

		Then
			.naPaginaListaEstudio
			.aListaDeveConterTrezeEstudios(13);
	});

	opaTest("Deve filtrar por Estúdios fechados", function (Given, When, Then) {
		When
			.naPaginaListaEstudio
			.aoSelecionarEstudiosFechados("fechado");

		Then
			.naPaginaListaEstudio
			.aListaDeveConterDozeEstudios(12);
	});

	opaTest("Deve pesquisar por três Estúdios", function (Given, When, Then) {
		When
			.naPaginaListaEstudio
			.aoPesquisarPor("Estudio Vinte");

		Then
			.naPaginaListaEstudio
			.aListaDeveConterTresEstudios();
	});

	opaTest("Deve pesquisar por um Estúdio inexistente", function (Given, When, Then) {
		When
			.naPaginaListaEstudio
			.aoPesquisarEstudioInexistente("Inexistente");

		Then
			.naPaginaListaEstudio
			.aListaDeveConterZeroEstudios(0);
	});

	opaTest("Deve limpar o filtro de pesquisa", function (Given, When, Then) {
		When
			.naPaginaListaEstudio
			.aoLimparFiltroDePesquisa("");

		Then
			.naPaginaListaEstudio
			.aListaDeveConterDozeEstudios(12);
	});

	opaTest("Deve limpar o filtro de está aberto", function (Given, When, Then) {
		When
			.naPaginaListaEstudio
			.aoSelecionarTodosOsEstudios("todos");

		Then
			.naPaginaListaEstudio
			.aListaDeveConterTodosOsEstudios(25);
	});

	opaTest("Deve ir para a tela de Adicionar Estúdio", function (Given, When, Then) {
		When
			.naPaginaListaEstudio
			.aoClicarEmAdicionarEstudio();

		Then
			.naPaginaAdicionarEstudio
			.aTelaDeAdicionarDeveCarregarCorretamente("adicionarEstudio.AdicionarEstudio", "adicionar");
	});

	opaTest("Deve retornar para a tela de listagem", function (Given, When, Then) {
		When
			.naPaginaAdicionarEstudio
			.aoClicarEmRetornarParaTelaDeListagem("idRetornarParaPaginaAnterior", "retornar para a tela de listagem");

		Then
			.naPaginaListaEstudio
			.aTelaDeListagemDeveCarregarCorretamente("listagemEstudio.ListagemEstudio", "listagem");

		Then
			.iTeardownMyApp();
	});
});