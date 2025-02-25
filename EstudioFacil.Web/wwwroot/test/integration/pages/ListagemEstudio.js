sap.ui.define([
	'sap/ui/test/Opa5',
	'sap/ui/test/matchers/AggregationLengthEquals',
	'sap/ui/test/matchers/I18NText',
	'sap/ui/test/matchers/Properties',
	'sap/ui/test/actions/Press',
	'sap/ui/test/actions/EnterText',
	'sap/ui/test/matchers/PropertyStrictEquals'
],
	function (Opa5, AggregationLengthEquals, I18NText, Properties, Press, EnterText, PropertyStrictEquals) {
		"use strict";

		const telaDeListagem = "listagemEstudio.ListagemEstudio";
		const idListaEstudio = "idListaEstudio";

		Opa5.createPageObjects({
			naPaginaListaEstudio: {
				actions: {
					aoClicarEmCarregarMaisEstudios: function () {
						this._carregarMaisEstudios();
					},

					aoCarregarMaisEstudios: function () {
						this._carregarMaisEstudios();
					},

					_carregarMaisEstudios: function () {
						return this.waitFor({
							viewName: telaDeListagem,
							id: "idListaEstudio",
							actions: new Press(),
							success: () => Opa5.assert.ok(true, "O botão de carregar mais foi acionado."),
							errorMessage: "A página não tem um botão para mostrar mais itens."
						});
					},

					_metodoPesquisarPor: function (nomeDoEstudio) {
						return this.waitFor({
							id: "idBarraDePesquisa",
							viewName: telaDeListagem,
							actions: new EnterText({
								text: nomeDoEstudio
							}),
							success: () => Opa5.assert.ok(true, "Pesquisa efetuada na barra de pesquisa."),
							errorMessage: "Nenhuma pesquisa foi efetuada na barra de pesquisa."
						});
					},

					aoPesquisarPor: function (nomeDoEstudio) {
						this._metodoPesquisarPor(nomeDoEstudio);
					},

					aoPesquisarEstudioInexistente: function (nomeDoEstudio) {
						this._metodoPesquisarPor(nomeDoEstudio);
					},

					aoLimparFiltroDePesquisa: function (nomeDoEstudio) {
						this._metodoPesquisarPor(nomeDoEstudio);
					},

					_metodoSelecionar: function (statusDoEstudio) {
						return this.waitFor({
							id: "idSelecionarEstaAbertoOuFechado",
							viewName: telaDeListagem,
							actions: new Press(),
							success: function () {
								this.waitFor({
									controlType: "sap.ui.core.Item",
									matchers: [
										new Properties({
											key: statusDoEstudio,
											enabled: true
										})
									],
									actions: new Press(),
									success: () => Opa5.assert.ok(true, `A opção "${statusDoEstudio}" foi selecionada.`),
									errorMessage: "Nenhuma opção foi selecionada."
								})
							},
						});
					},

					aoSelecionarEstudiosAbertos: function (statusDoEstudio) {
						this._metodoSelecionar(statusDoEstudio);
					},

					aoSelecionarEstudiosFechados: function (statusDoEstudio) {
						this._metodoSelecionar(statusDoEstudio);
					},

					aoSelecionarTodosOsEstudios(statusDoEstudio) {
						this._metodoSelecionar(statusDoEstudio);
					},

					aoClicarEmAdicionarEstudio: function () {
						return this.waitFor({
							viewName: telaDeListagem,
							id: "idBotaoAdicionar",
							actions: new Press(),
							success: () => Opa5.assert.ok(true, "O botão de adicionar estúdio foi acionado."),
							errorMessage: "O botão de adicionar estúdio não foi acionado."
						});
					},

					aoClicarEmUmEstudio: function (nomeEstudio) {
						this._metodoClicarEmUmEstudio(nomeEstudio);
					},

					aoClicarEmEstudioUm: function (nomeEstudio) {
						this._metodoClicarEmUmEstudio(nomeEstudio);
					},

					aoClicarNoEstudioVinteESeis: function (nomeEstudio) {
						this._metodoClicarEmUmEstudio(nomeEstudio);
					},

					_metodoClicarEmUmEstudio: function (nomeEstudio) {
						return this.waitFor({
							viewName: telaDeListagem,
							controlType: "sap.m.Title",
							matchers: new PropertyStrictEquals({
								name: "text",
								value: nomeEstudio
							}),
							actions: new Press(),
							success: () => Opa5.assert.ok(true, `"${nomeEstudio}" selecionado.`),
							errorMessage: `"${nomeEstudio}" não foi selecionado.`
						});
					},
				},
				assertions: {

					oEstudioUmDeveSeChamar: function (nomeEstudio) {
						return this.waitFor({
							viewName: telaDeListagem,
							controlType: "sap.m.Title",
							matchers: new PropertyStrictEquals({
								name: "text",
								value: nomeEstudio
							}),
							success: () => Opa5.assert.ok(true, "Estudio Um alterado para Estudio Um"),
							errorMessage: "Estudio Um não foi editado"
						});
					},

					oEstudioEditadoDeveEstarAberto: function (valor) {
						return this.waitFor({
							viewName: telaDeListagem,
							controlType: "sap.m.ObjectStatus",
							matchers: new PropertyStrictEquals({
								name: "text",
								value: valor
							}),
							success: () => Opa5.assert.ok(true, "O Estudio Um está Fechado"),
							errorMessage: "O Estudio Um não está Fechado"
						});
					},

					aTelaDeListagemDeveCarregarCorretamente: function (tipoDaTela) {
						this._carregarTela(tipoDaTela);
					},

					aPaginaDeListagemDeveCarregarCorretamente(tipoDaTela) {
						this._carregarTela(tipoDaTela);
					},

					aTelaDeListagemDoEstudioDeveCarregarCorretamente: function (tipoDaTela) {
						this._carregarTela(tipoDaTela)
					},

					_carregarTela: function (tipoDaTela) {
						return this.waitFor({
							viewName: telaDeListagem,
							success: () => Opa5.assert.ok(true, `A tela de ${tipoDaTela} carregou corretamente.`),
							errorMessage: `A tela de ${tipoDaTela} não carregou corretamente`
						});
					},

					aListaDeveConterVinteEstudios: function (quantidadeDeEstudios) {
						this._metodoQuantidadeDeEstudiosNaLista(quantidadeDeEstudios);
					},

					aListaDeveConterVinteECincoEstudios: function (quantidadeDeEstudios) {
						this._metodoQuantidadeDeEstudiosNaLista(quantidadeDeEstudios);
					},

					aListaDeveConterVinteESeisEstudios: function (quantidadeDeEstudios) {
						this._metodoQuantidadeDeEstudiosNoTitulo(quantidadeDeEstudios);
					},

					aListaDeveConterTrezeEstudios: function (quantidadeDeEstudios) {
						this._metodoQuantidadeDeEstudiosNoTitulo(quantidadeDeEstudios);
					},

					aListaDeveConterDozeEstudios: function (quantidadeDeEstudios) {
						this._metodoQuantidadeDeEstudiosNoTitulo(quantidadeDeEstudios);
					},

					aListaDeveConterZeroEstudios: function (quantidadeDeEstudios) {
						this._metodoQuantidadeDeEstudiosNoTitulo(quantidadeDeEstudios);
					},

					aListaDeveConterDozeEstudios(quantidadeDeEstudios) {
						this._metodoQuantidadeDeEstudiosNoTitulo(quantidadeDeEstudios);
					},

					aListaDeveConterTodosOsEstudios(quantidadeDeEstudios) {
						this._metodoQuantidadeDeEstudiosNoTitulo(quantidadeDeEstudios);
					},

					aListaDeveConterVinteECincoEstudiosNoTitulo: function (quantidadeDeEstudios) {
						this._metodoQuantidadeDeEstudiosNoTitulo(quantidadeDeEstudios);
					},

					aListaDeveConterTresEstudios: function () {
						return this.waitFor({
							id: idListaEstudio,
							viewName: telaDeListagem,
							matchers: new AggregationLengthEquals({
								name: "items",
								length: 3
							}),
							success: function () {
								Opa5.assert.ok(true, "A lista contém três estúdios.")
							},
							errorMessage: "A lista não contém três estúdios."
						});
					},

					_metodoQuantidadeDeEstudiosNoTitulo: function (quantidadeDeEstudios) {
						return this.waitFor({
							id: "idTituloBarraDeFerramentas",
							viewName: telaDeListagem,
							matchers: new I18NText({
								key: "tituloContadorDaBarraDeFerramentasEstudio",
								propertyName: "text",
								parameters: [quantidadeDeEstudios]
							}),
							success: () => Opa5.assert.ok(true, `O título da lista contém ${quantidadeDeEstudios} Estúdios.`),
							errorMessage: `O título da lista não contém ${quantidadeDeEstudios} Estúdios.`
						});
					},

					_metodoQuantidadeDeEstudiosNaLista: function (quantidadeDeEstudios) {
						return this.waitFor({
							id: idListaEstudio,
							viewName: telaDeListagem,
							matchers: new AggregationLengthEquals({
								name: "items",
								length: quantidadeDeEstudios
							}),
							success: function () {
								Opa5.assert.ok(true, `A lista contém ${quantidadeDeEstudios} estúdios.`);
							},
							errorMessage: `A lista não contém todos os ${quantidadeDeEstudios} estúdios.`
						});
					}
				}
			},
		});
	});