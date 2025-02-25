sap.ui.define([
    'sap/ui/test/Opa5',
    './arrangements/Startup',
    './jornadas/JornadaListagemEstudio',
    './jornadas/JornadaAdicionarEstudio',
    './jornadas/JornadaDetalhesEstudio',
    './jornadas/JornadaEditarEstudio',
    './jornadas/JornadaDeletarEstudio',
], function (Opa5, Startup) {
    'use strict';

    Opa5.extendConfig({
        arrangements: new Startup(),
        viewNamespace: "ui5.EstudioFacil.app",
        autoWait: true
    });
});