import { by, element } from 'protractor';

export class NavbarPage {
    linkHome = element(by.xpath('/html/body/app-root/app-navbar/nav/a[1]'));
    linkArticulo = element(by.xpath('/html/body/app-root/app-navbar/nav/div/ul/a[2]'));
    linkUsuario = element(by.xpath('/html/body/app-root/app-navbar/nav/div/ul/a[4]'));
    linkCrearArticulo = element(by.xpath('//*[@id="linkCrearArticulo"]'));
    linkVenta = element(by.xpath('/html/body/app-root/app-navbar/nav/div/ul/a[3]'));

    async clickBotonArticulo() {
        await this.linkArticulo.click();
    }

    async clickBotonCrearArticulo(){
        await this.linkCrearArticulo.click();
    }

    async clickBotonUsuario() {
        await this.linkUsuario.click();
    }

    async clickLinkVenta(){
        await this.linkVenta.click();
    }
}
