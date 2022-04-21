import { by, element } from 'protractor';

export class NavbarPage {
    linkHome = element(by.xpath('/html/body/app-root/app-navbar/nav/a[1]'));
    linkArticulo = element(by.xpath('/html/body/app-root/app-navbar/nav/a[2]'));
    linkUsuario = element(by.xpath('/html/body/app-root/app-navbar/nav/a[4]'));

    async clickBotonArticulo() {
        await this.linkArticulo.click();
    }

    async clickBotonUsuario() {
        await this.linkUsuario.click();
    }
    
}
