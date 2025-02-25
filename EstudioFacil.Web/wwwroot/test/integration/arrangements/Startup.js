sap.ui.define([
    "sap/ui/test/Opa5",
], function (Opa5) {
    "use strict";

    return Opa5.extend("ui5.EstudioFacil.test.integration.arrangements.Startup", {
        iniciarApp: function (parametroOpcoes) {
            const nomeApp = "ui5.EstudioFacil";
            var opcoes = parametroOpcoes || {};

            opcoes.delay = opcoes.delay || 1;

            this.iStartMyUIComponent({
                componentConfig: {
                    name: nomeApp,
                    manifest: true
                },
                hash: opcoes.hash,
                autoWait: opcoes.autoWait
            });
        }
    })
});