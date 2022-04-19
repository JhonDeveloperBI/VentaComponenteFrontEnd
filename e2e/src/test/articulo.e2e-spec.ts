import { browser, logging } from 'protractor';
import { NavbarPage } from '../page/navbar/navbar.po';
import { AppPage } from '../app.po';
import { ArticuloPage } from '../page/articulo/articulo.po';

describe('workspace-project Producto', () => {
    let page: AppPage;
    let navBar: NavbarPage;
    let producto: ArticuloPage;

    beforeEach(() => {
        page = new AppPage();
        navBar = new NavbarPage();
        producto = new ArticuloPage();
    });

    it('Deberia crear articulo', () => {
        const ID_PRODUCTO = '001';
        const DESCRIPCION_PRODUCTO = 'articulo de pruebas';

        page.navigateTo();
        navBar.clickBotonArticulo();
        producto.clickBotonCrearArticulos();
        producto.ingresarId(ID_PRODUCTO);
        producto.ingresarDescripcion(DESCRIPCION_PRODUCTO);

        // Adicionamos las validaciones despues de la creación
        // expect(<>).toEqual(<>);
    });

    it('Deberia listar articulos', () => {
        page.navigateTo();
        navBar.clickBotonArticulo();
        producto.clickBotonListarArticulos();

        expect(4).toBe(producto.contarArticulos());
    });
});
