sap.ui.define([], () => {
	"use strict";

	return {
		formatarEstaAberto: function (estaAberto) {
			const pacotesDeRecurso = this.getOwnerComponent().getModel("i18n").getResourceBundle();
			if (estaAberto == true) {
				return pacotesDeRecurso.getText("estaAberto");
			}
			return pacotesDeRecurso.getText("estaFechado");
		},
		formatarStatusEstaAberto: function (estaAberto) {
			const pacotesDeRecurso = this.getOwnerComponent().getModel("i18n").getResourceBundle();
			if (estaAberto == true) {
				return pacotesDeRecurso.getText("statusDeSucesso");
			}
			return pacotesDeRecurso.getText("statusDeErro");
		}
	};
});