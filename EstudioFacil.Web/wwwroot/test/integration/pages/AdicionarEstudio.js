sap.ui.define([
	'sap/ui/test/Opa5',
	'sap/ui/test/actions/Press',
	'sap/ui/core/library',
	'sap/ui/test/actions/EnterText',
	'sap/ui/test/matchers/PropertyStrictEquals'
],
	function (Opa5, Press, library, EnterText, PropertyStrictEquals) {
		"use strict";

		const telaDeAdicionar = "adicionarEstudio.AdicionarEstudio";

		Opa5.createPageObjects({
			naPaginaAdicionarEstudio: {
				actions: {
					aoClicarEmRetornarParaTelaDeListagem: function (idBotao, mensagem) {
						this._clicarEmBotao(idBotao, mensagem);
					},

					aoClicarEmSalvarSemDigitarNome: function (idBotao, mensagem) {
						this._clicarEmBotao(idBotao, mensagem);
					},

					aoClicarEmSalvar: function (idBotao, mensagem) {
						this._clicarEmBotao(idBotao, mensagem);
					},

					aoClicarEmCancelar: function (idBotao, mensagem) {
						this._clicarEmBotao(idBotao, mensagem);
					},

					aoClicarEmCancelarAdicaoDoEstudio: function (idBotao, mensagem) {
						this._clicarEmBotao(idBotao, mensagem)
					},

					aoClicarEmNao: function (valorBotao) {
						this._clicarEmBotaoMessageBox(valorBotao);
					},

					aoClicarEmSim: function (valorBotao) {
						this._clicarEmBotaoMessageBox(valorBotao);
					},

					aoClicarEmOk: function (valorBotao) {
						this._clicarEmBotaoMessageBox(valorBotao);
					},

					aoDigitarNomeDoEstudio: function (nomeDoEstudio) {
						return this.waitFor({
							id: "idInputEstudio",
							viewName: telaDeAdicionar,
							actions: new EnterText({
								text: nomeDoEstudio
							}),
							success: () => Opa5.assert.ok(true, "Nome do novo estúdio digitado no input nome"),
							errorMessage: "Não foi possível digitar o nome do novo estúdio no input nome"
						});
					},

					_clicarEmBotaoMessageBox: function (valorBotao) {
						return this.waitFor({
							controlType: "sap.m.Button",
							matchers: new PropertyStrictEquals({
								name: "text",
								value: valorBotao
							}),
							actions: new Press(),
							success: () => Opa5.assert.ok(true, `Opção "${valorBotao}" selecionada na MessageBox`),
							errorMessage: `Não foi possível selecionar a opção "${valorBotao}" na MessageBox`
						});
					},

					_clicarEmBotao: function (idBotao, funcaoDoBotao) {
						return this.waitFor({
							viewName: telaDeAdicionar,
							id: idBotao,
							actions: new Press(),
							success: () => Opa5.assert.ok(true, `O botão de ${funcaoDoBotao} foi acionado.`),
							errorMessage: `O botão de ${funcaoDoBotao} não foi acionado.`
						});
					},
				},
				assertions: {
					aTelaDeAdicionarDeveCarregarCorretamente: function (tipoDaTela) {
						this._aTelaDeveCarregarCorretamente(tipoDaTela);
					},

					aPaginaDevePermanecerNaTelaDeAdicionar: function (tipoDaTela) {
						this._aTelaDeveCarregarCorretamente(tipoDaTela);
					},

					aPaginaDeAdicionarDeveCarregarCorretamente: function (tipoDaTela) {
						this._aTelaDeveCarregarCorretamente(tipoDaTela);
					},

					_aTelaDeveCarregarCorretamente: function (tipoDaTela) {
						return this.waitFor({
							viewName: telaDeAdicionar,
							success: () => Opa5.assert.ok(true, `A tela de ${tipoDaTela} carregou corretamente.`),
							errorMessage: `A tela de ${tipoDaTela} não carregou corretamente`
						});
					},

					aValidacaoDeNomeDoEstudioObrigatorioDeveAparecer: function (valorBotao, mensagemSucesso, mensagemFracasso) {
						this._clicarEmBotaoMessageBox(valorBotao, mensagemSucesso, mensagemFracasso)
					},

					_clicarEmBotaoMessageBox: function (valorBotao, mensagemSucesso, mensagemFracasso) {
						return this.waitFor({
							viewName: telaDeAdicionar,
							controlType: "sap.m.Button",
							matchers: new PropertyStrictEquals({
								name: "text",
								value: valorBotao
							}),
							actions: new Press(),
							success: () => Opa5.assert.ok(true, mensagemSucesso),
							errorMessage: mensagemFracasso
						});
					},

					oInputDeveTerValueStateDeErro: function (erro) {
						return this.waitFor({
							id: "idInputEstudio",
							viewName: telaDeAdicionar,
							check: function (input) {
								return input.getValueState() === erro;
							},
							success: () => Opa5.assert.ok(true, "O input do nome está com valueState de erro."),
							errorMessage: "O input de nome está com valueState none."
						});
					}
				}
			}
		});
	});