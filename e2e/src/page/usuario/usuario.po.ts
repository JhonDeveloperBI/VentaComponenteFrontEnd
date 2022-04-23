import { by, element } from 'protractor';

export class UsuarioPage {
    private linkCrearUsuario = element(by.xpath('//*[@id="linkCrearUsuario"]'));
    private linkListarUsuarios = element(by.xpath('//*[@id="linkListarUsuario"]'));
    private inputNombreUsuario = element(by.name('nombre'));
    private inputClave = element(by.name('clave'));
    private listaUsuarios = element.all(by.className('btn '));
    private botonBorrar = element(by.xpath('//*[@id="123_pass"]'))
    private botonConfirmacion = element(by.xpath('/html/body/div/div/div[7]/button[1]'))
    private botonActualizar = element(by.xpath('/html/body/app-root/app-usuario/app-listar-usuario/div/table/tbody/tr/td[3]/button'))
    private botonActualizarUsuario = element(by.xpath('//*[@id="actualizar"]'));

    async mostroNotificacionInformativa(): Promise<Boolean> {
        return element(by.css('.swal2-popup.swal2-toast.swal2-icon-success.swal2-show')).isPresent();
    }

    async mostroNotificacionError():Promise<Boolean>{
        return element(by.css('.swal2-icon.swal2-error.swal2-icon-show')).isPresent();
    }

    async clickBotonCrearUsuarios() {
        await this.linkCrearUsuario.click();
    }

    async clickBotonListarUsuarios() {
        await this.linkListarUsuarios.click();
    }

    async ingresarNombreUsuario(nombreUsuario) {
        await this.inputNombreUsuario.sendKeys(nombreUsuario);
    }

    async ingresarClaveUsuario(claveUsuario) {
        await this.inputClave.sendKeys(claveUsuario);
    }

    async limpiarInputNombreUsuario(){
        await this.inputNombreUsuario.clear();
    }

    async limpiarInputClaveUsuario(){
        await this.inputClave.clear();
    }
    
    async contarUsuarios() {
        return this.listaUsuarios.count();
    }

    async clickBotonBorrar(){
        await this.botonBorrar.click();
    }

    async clickBotonActualizar(){
        await this.botonActualizar.click();
    }

    async clickBotonActualizarUsuario(){
         await this.botonActualizarUsuario.click();
    }

    async clickBotonConfirmacion(){
        await this.botonConfirmacion.click()
    }

    async clickBotonGuardar() {
        await element(by.id('guardar')).click();
    }

    
}
