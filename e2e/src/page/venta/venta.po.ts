import { by, element } from 'protractor';

export class VentaPage {
private linkListarVentas = element(by.xpath('//*[@id="linkListarVenta"]'));
private listaVentas = element(by.className('table'));

async clickBotonListarVentas(){
    await this.linkListarVentas.click();
}

async mostroTabla(): Promise<boolean>{
    return (this.listaVentas).isPresent();
}

}
