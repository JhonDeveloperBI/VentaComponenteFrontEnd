import { by, element } from 'protractor';

export class UsuarioPage {
    private linkCrearUsuario = element(by.id('linkCrearUsuario'));
    private linkListarArticulos = element(by.id('linkListarUsuario'));
    private inputNombreUsuario = element(by.name('nombre'));
    private inputClave = element(by.name('clave'));
    private listaUsuarios = element.all(by.css('ul.articulos li'));

    async mostroNotificacionInformativa(): Promise<Boolean> {
        return element(by.css('.swal2-popup.swal2-modal.swal2-icon-info')).isPresent();
    }

    async clickBotonCrearUsuarios() {
        await this.linkCrearUsuario.click();
    }

    async clickBotonListarUsuarios() {
        await this.linkListarArticulos.click();
    }

    async ingresarNombreUsuario(nombreUsuario) {
        await this.inputNombreUsuario.sendKeys(nombreUsuario);
    }

    async ingresarClaveUsuario(claveUsuario) {
        await this.inputClave.sendKeys(claveUsuario);
    }

    async contarArticulos() {
        return this.listaUsuarios.count();
    }

    async clickBotonGuardar() {
        await element(by.id('guardar')).click();
    }
}
