import { NavbarPage } from '../page/navbar/navbar.po';
import { AppPage } from '../app.po';
import { VentaPage } from '../page/venta/venta.po';

describe('workspace-project Venta', () => {
    let page: AppPage;
    let navBar: NavbarPage;
    let venta: VentaPage;

    beforeEach(() => {
        page = new AppPage();
        navBar = new NavbarPage();
        venta = new VentaPage();
    });

    it('Deberia listar ventas de artículos', () => {
        page.navigateTo();
        navBar.clickLinkVenta();
        venta.clickBotonListarVentas();

        expect(venta.mostroTabla()).toBe(true);
    });


    it('Deberia crear una venta de un artículo', () => {
        page.navigateTo();
        navBar.clickBotonArticulo();
        venta.clickBotonListarArticulos();
        venta.clickBotonCrearVenta();
        venta.ingresarUnidadVenta(1);
        venta.clickBotonGuardarVenta();

        expect(venta.mostroNotificacionInformativa()).toBe(true);
    });

});

