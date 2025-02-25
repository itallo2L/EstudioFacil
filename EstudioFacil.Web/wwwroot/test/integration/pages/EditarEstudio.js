sap.ui.define([
    'sap/ui/test/Opa5',
    'sap/ui/test/matchers/PropertyStrictEquals',
    'sap/ui/test/actions/Press',
    'sap/ui/test/matchers/Properties',
    'sap/ui/test/actions/EnterText'
],
    function (Opa5, PropertyStrictEquals, Press, Properties, EnterText) {
        "use strict";

        const telaDeEditar = "adicionarEstudio.AdicionarEstudio";

        Opa5.createPageObjects({
            naPaginaEditarEstudio: {
                actions: {
                    aoClicarNoInputNome: function () {
                        return this.waitFor({
                            viewName: telaDeEditar,
                            controlType: "sap.m.InputBase",
                            actions: new EnterText({
                                text: "Estudio Um"
                            }),
                            success: () => Opa5.assert.ok(true, '"Estudio Um" editado para "Estudio Um"'),
                            errorMessage: 'Não foi possível editar o "Estudio Um"'
                        });
                    },

                    aoClicarNaCheckBox: function () {
                        return this.waitFor({
                            viewName: telaDeEditar,
                            controlType: "sap.m.CheckBox",
                            actions: new Press(),
                            success: () => Opa5.assert.ok(true, "O estúdio está fechado."),
                            errorMessage: "O estúdio continua aberto."
                        })
                    },

                    aoClicarNaCheckBoxNovamente: function () {
                        return this.waitFor({
                            viewName: telaDeEditar,
                            controlType: "sap.m.CheckBox",
                            actions: new Press(),
                            success: () => Opa5.assert.ok(true, "O estúdio está aberto."),
                            errorMessage: "O estúdio continua fechado."
                        })
                    },

                    aoClicarEmSalvar: function (valorBotao) {
                        this._clicarEmBotao(valorBotao);
                    },

                    aoClicarEmOKNaMessageBox: function (valorBotao) {
                        this._clicarEmBotao(valorBotao);
                    },

                    _clicarEmBotao: function (valorBotao) {
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
                    aPaginaDeEditarDeveCarregarCorretamente: function () {
                        return this.waitFor({
                            viewName: telaDeEditar,
                            success: () => Opa5.assert.ok(true, `A tela de editar carregou corretamente.`),
                            errorMessage: `A tela de editar não carregou corretamente`
                        });
                    },

                    oNomeNoInputDeveSer: function (nomeEstudio) {
                        this._metodoNomeDoInput(nomeEstudio);
                    },

                    oNomeDeveSerEstudioUm: function (nomeEstudio) {
                        this._metodoNomeDoInput(nomeEstudio);
                    },

                    _metodoNomeDoInput: function (nomeEstudio) {
                        return this.waitFor({
                            viewName: telaDeEditar,
                            controlType: "sap.m.InputBase",
                            matchers:
                                new Properties({
                                    value: nomeEstudio
                                }),
                            success: () => Opa5.assert.ok(true, `O nome no input é "${nomeEstudio}"`),
                            errorMessage: `O nome no input não é "${nomeEstudio}"`
                        });
                    },

                    aCheckBoxDeveEstarMarcada: function (estado, textoDoEstado) {
                        this._colocaValorNaCheckBox(estado, textoDoEstado);
                    },

                    oEstudioDeveEstarAberto: function (estado, textoDoEstado) {
                        this._colocaValorNaCheckBox(estado, textoDoEstado);
                    },

                    _colocaValorNaCheckBox: function (estado, textoDoEstado) {
                        return this.waitFor({
                            viewName: telaDeEditar,
                            controlType: "sap.m.CheckBox",
                            matchers: new Properties({
                                selected: estado
                            }),
                            success: () => Opa5.assert.ok(true, `O estúdio está ${textoDoEstado}.`),
                            errorMessage: `O estúdio não está ${textoDoEstado}.`
                        });
                    }
                }
            }
        });
    });