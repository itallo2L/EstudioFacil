sap.ui.define([
    "sap/m/MessageBox"
], (MessageBox) => {
    "use strict";

    return {
        aoValidarEntrada: function (estudio, view) {
            let nomeEstudioVazio = "";
            let idInputEstudio = "idInputEstudio";
            let erro = "Error";
            let nenhum = "None";

            estudio === nomeEstudioVazio
                ? view.byId(idInputEstudio).setValueState(erro)
                : view.byId(idInputEstudio).setValueState(nenhum)
        },

        mostrarErroDeValidacao: function (erro, view) {
            const erroDeValidacao = "Erro de validação";
            const tituloMensagem = "Erro";
            const detalhesMensagem = "Detalhes:";
            const detalhesStackTrace = "StackTrace:";
            const statusMensagem = "Status:";

            if (erro.Title === erroDeValidacao) {
                const mensagensDeErro = Object.values(erro.Extensions.ErroDeValidacao).join("\r \n");

                MessageBox.error(`${erro.Title}`, {
                    title: tituloMensagem,
                    id: "idMessageBoxErroValidacao",
                    details:
                        `<p><strong>${statusMensagem} ${erro.Status}</strong></p>` +
                        `<p><strong> ${detalhesMensagem} </strong></p>` +
                        "<ul>" +
                        `<li>${mensagensDeErro}</li>` +
                        "</ul>" +
                        `<p><strong> ${detalhesStackTrace} </strong></p>` +
                        "<ul>" +
                        `<li>${erro.Detail}</li>` +
                        "</ul>",
                    styleClass: "sResponsivePaddingClasses",
                    dependentOn: view
                });
            } else {
                MessageBox.error(`${erro.Title}`, {
                    title: tituloMensagem,
                    id: "idMessageBoxErro",
                    details:
                        `<p><strong>${statusMensagem} ${erro.Status}</strong></p>` +
                        `<p><strong> ${detalhesMensagem} </strong></p>` +
                        "<ul>" +
                        `<li>${erro.Detail}</li>` +
                        "</ul>",
                    styleClass: "sResponsivePaddingClasses",
                    dependentOn: view
                });
            }
        }
    };
});