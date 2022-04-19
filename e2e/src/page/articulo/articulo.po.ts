import { by, element } from 'protractor';

export class ArticuloPage {
    private linkCrearArticulo = element(by.id('linkCrearArticulo'));
    private linkListarArticulos = element(by.id('linkListarArticulo'));
    private inputIdArticulo = element(by.id('idArticulo'));
    private inputDescripcionArticulo = element(by.id('descripcionArticulo'));
    private listaArticulos = element.all(by.css('ul.articulos li'));

    async clickBotonCrearArticulos() {
        await this.linkCrearArticulo.click();
    }

    async clickBotonListarArticulos() {
        await this.linkListarArticulos.click();
    }

    async ingresarId(idArticulo) {
        await this.inputIdArticulo.sendKeys(idArticulo);
    }

    async ingresarDescripcion(descripcionArticulo) {
        await this.inputDescripcionArticulo.sendKeys(descripcionArticulo);
    }

    async contarArticulos() {
        return this.listaArticulos.count();
    }
}
