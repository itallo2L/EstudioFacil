sap.ui.define([
    'sap/ui/test/Opa5',
    'sap/ui/test/matchers/PropertyStrictEquals',
    'sap/ui/test/actions/Press'
],
    function (Opa5, PropertyStrictEquals, Press) {
        "use strict";

        const telaDeDetahes = "detalhesEstudio.DetalhesEstudio";

        Opa5.createPageObjects({
            naPaginaDetalhesEstudio: {
                actions: {
                    aoClicarEmRetornarParaAPaginaAnterior: function () {
                        return this.waitFor({
                            viewName: telaDeDetahes,
                            id: "idRetornarParaTelaDeListagem",
                            actions: new Press(),
                            success: () => Opa5.assert.ok(true, `O botão de retornar para a tela de listagem foi acionado.`),
                            errorMessage: `O botão de retornar para a tela de listagem não foi acionado.`
                        });
                    },

                    aoClicarEmEditar: function (tipo, texto, mensagemDeSucesso, mensagemFracasso) {
                        this._clicarEmBotao(tipo, texto, mensagemDeSucesso, mensagemFracasso);
                    },

                    aoClicarEmDeletar: function (tipo, texto, mensagemDeSucesso, mensagemFracasso) {
                        this._clicarEmBotao(tipo, texto, mensagemDeSucesso, mensagemFracasso);
                    },

                    aoClicarEmRetornarParaListagem: function (mensagemDeSucesso, mensagemFracasso) {
                        this._clicarEmBotaoPeloId(mensagemDeSucesso, mensagemFracasso);
                    },

                    _clicarEmBotao: function (tipo, texto, mensagemDeSucesso, mensagemFracasso) {
                        return this.waitFor({
                            viewName: telaDeDetahes,
                            controlType: tipo,
                            matchers: new PropertyStrictEquals({
                                name: "text",
                                value: texto
                            }),
                            actions: new Press(),
                            success: () => Opa5.assert.ok(true, mensagemDeSucesso),
                            errorMessage: mensagemFracasso
                        });
                    },

                    _clicarEmBotaoPeloId: function (mensagemDeSucesso, mensagemFracasso) {
                        return this.waitFor({
                            viewName: telaDeDetahes,
                            id: "idRetornarParaTelaDeListagem",
                            actions: new Press(),
                            success: () => Opa5.assert.ok(true, mensagemDeSucesso),
                            errorMessage: mensagemFracasso
                        });
                    },

                    aoClicarEmSimNaMessageBox: function (valorBotao) {
                        this._clicarEmBotaoMessageBox(valorBotao);
                    },

                    aoClicarEmOKNaMessageBox: function (valorBotao) {
                        this._clicarEmBotaoMessageBox(valorBotao);
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
                },
                assertions: {
                    aPaginaDeDetalhesDeveCarregarCorretamente: function () {
                        this._carregarPaginaDeDetalhes();
                    },

                    aPaginaDeDetalhesDeveCarregar() {
                        this._carregarPaginaDeDetalhes();
                    },

                    aPaginaDeDetalhesDeveSerCarregada() {
                        this._carregarPaginaDeDetalhes();
                    },

                    _carregarPaginaDeDetalhes: function () {
                        return this.waitFor({
                            viewName: telaDeDetahes,
                            success: () => Opa5.assert.ok(true, `A tela de detalhes carregou corretamente.`),
                            errorMessage: `A tela de detalhes não carregou corretamente`
                        });
                    },

                    oNomeDoEstudioDeveSerEstudioUm: function (tipo, nomeDoEstudio, mensagemDeSucesso, mensagemFracasso) {
                        this._verificaTextoNaTela(tipo, nomeDoEstudio, mensagemDeSucesso, mensagemFracasso);
                    },

                    oEstudioDeveAparecerComoAberto: function (tipo, aberto, mensagemDeSucesso, mensagemFracasso) {
                        this._verificaTextoNaTela(tipo, aberto, mensagemDeSucesso, mensagemFracasso);
                    },

                    _verificaTextoNaTela: function (tipo, texto, mensagemSucesso, mensagemFracasso) {
                        return this.waitFor({
                            viewName: telaDeDetahes,
                            controlType: tipo,
                            matchers: new PropertyStrictEquals({
                                name: "text",
                                value: texto
                            }),
                            success: () => Opa5.assert.ok(true, mensagemSucesso),
                            errorMessage: mensagemFracasso
                        });
                    }
                }
            }
        });
    });