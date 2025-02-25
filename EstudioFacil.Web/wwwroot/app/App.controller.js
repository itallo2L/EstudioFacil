sap.ui.define([
   "./BaseController",
   "sap/ui/model/resource/ResourceModel"
], (BaseController, ResourceModel) => {
   "use strict";

   return BaseController.extend("ui5.EstudioFacil.app.App", {
      onInit: function () {
         const i18nModel = new ResourceModel({
            bundleName: "ui5.EstudioFacil.i18n.i18n"
         });
         this.getView().setModel(i18nModel, "i18n");
         const oBundle = this.getView().getModel("i18n").getResourceBundle();
         const sTitulo = oBundle.getText("tituloAgendamentoEmEstudio");
         document.title = sTitulo;
      }
   });
});