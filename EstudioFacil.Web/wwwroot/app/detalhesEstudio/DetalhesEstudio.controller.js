sap.ui.define([
  "../BaseController",
  "ui5/EstudioFacil/model/formatter",
  "sap/m/MessageBox",
  "sap/m/library",
], (BaseController, formatter, MessageBox, library) => {
  "use strict";

  var estudioId;
  var urlObterPorId;
  const detalhesEstudio = "detalhesEstudio";

  return BaseController.extend("ui5.EstudioFacil.app.detalhesEstudio.DetalhesEstudio", {
    formatter: formatter,

    onInit: function () {
      const rotaTelaDeDetalhesEstudio = "appDetalhesEstudio";
      this.getRouter().getRoute(rotaTelaDeDetalhesEstudio).attachMatched(this._obterDetalhes, this);
    },

    _obterDetalhes: function (evento) {
      estudioId = evento.getParameters().arguments.estudioId;
      urlObterPorId = `/api/EstudioMusical/${estudioId}`;
      const view = this.getView();
      this.requisicaoGet(urlObterPorId, detalhesEstudio, view);
    },

    aoClicarEmEditar: function () {
      this.getRouter().navTo("appAdicionarEstudio", { estudioId: estudioId }, true);
    },

    aoClicarEmDeletar: function () {
      let nomeEstudio = this.getView().byId("idNomeEstudio").getText();
      let mensagemDeAviso = `Tem certeza que deseja deletar o estúdio "${nomeEstudio}"?`
      this.mensagemAoCancelarRemocao(mensagemDeAviso, nomeEstudio, urlObterPorId);
    }
  });
});