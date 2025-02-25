sap.ui.define([
    "../BaseController",
    "../servico/validacao",
    "ui5/EstudioFacil/model/formatter"
], (BaseController, validacao, formatter) => {
    "use strict";

    const idInputEstudio = "idInputEstudio";
    const idCheckBoxEstaAberto = "idCheckBoxEstaAberto";
    const nenhum = "None";
    var idEditarEstudio;
    var estudio = {};


    return BaseController.extend("ui5.EstudioFacil.app.adicionarEstudio.AdicionarEstudio", {
        validacao: validacao,
        formatter: formatter,

        onInit: function () {
            const rotaTelaDeAdicionarEstudio = "appAdicionarEstudio";

            this.getRouter().getRoute(rotaTelaDeAdicionarEstudio).attachMatched(this._aoCoicidirRota, this);
        },

        _aoCoicidirRota: function (oEvent) {
            this.getView().byId(idInputEstudio).setValueState(nenhum);
            this.getView().byId(idInputEstudio).setValue("");

            this.getView().byId(idCheckBoxEstaAberto).setSelected(false);
            idEditarEstudio = this._obterIdEstudio(oEvent);

            let i18n = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            this.getView().byId("idTituloAdicionarEditar").setText(i18n.getText("adicionarEstudio.titulo"));

            if (idEditarEstudio)
                this._obterEstudioParaEditar();
        },

        _obterEstudioParaEditar: function () {
            let i18n = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            this.getView().byId("idTituloAdicionarEditar").setText(i18n.getText("editarEstudio.titulo"));

            const view = this.getView();
            const url = `/api/EstudioMusical/${idEditarEstudio}`;
            this.obterEstudioEditar(url, view);
        },

        _colocarValoresNosCampos: function (estudioQueSeraAtualizado) {
            this.getView().byId(idInputEstudio).setValue(estudioQueSeraAtualizado.nome);
            this.getView().byId(idCheckBoxEstaAberto).setSelected(estudioQueSeraAtualizado.estaAberto);
        },

        _obterIdEstudio: function (oEvent) {
            let estudioId = oEvent.getParameters().arguments.estudioId;
            return estudioId;
        },

        aoClicarSalvarEstudio: function () {
            estudio.nome = this.getView().byId(idInputEstudio).getValue();

            estudio.estaAberto = this.getView().byId(idCheckBoxEstaAberto).getSelected();

            this.validacao.aoValidarEntrada(estudio.nome, this.getView());

            let urlEstudio = '/api/EstudioMusical';

            let tipoDaRequisicao = 'Post';
            let mensagemDeSucesso = 'adicionado';

            if (idEditarEstudio) {
                tipoDaRequisicao = 'Patch';
                mensagemDeSucesso = 'atualizado';
                estudio.id = idEditarEstudio;
            }
            this.requisicaoPostOuPatch(tipoDaRequisicao, urlEstudio, estudio, mensagemDeSucesso, idEditarEstudio);
        },

        aoClicarCancelarEstudio: function () {
            let mensagemDeAviso = "Tem certeza que deseja cancelar a operação?"
            this.mensagemAoCancelarAdicaoOuEdicao(mensagemDeAviso, idEditarEstudio);
        }
    });
});