import { NavbarPage } from '../page/navbar/navbar.po';
import { AppPage } from '../app.po';
import { ArticuloPage } from '../page/articulo/articulo.po';

describe('workspace-project Articulo', () => {
    let page: AppPage;
    let navBar: NavbarPage;
    let articulo: ArticuloPage;

    beforeEach(() => {
        page = new AppPage();
        navBar = new NavbarPage();
        articulo = new ArticuloPage();
    });

    it('Deberia crear un artículo', () => {
        const DESCRIPCION_ARTICULO = 'articulo de pruebas';
        const UNIDADES_ARTICULO = 10;
        const PRECIO_ARTICULO = 1000;

        page.navigateTo();
        navBar.clickBotonArticulo();
        navBar.clickBotonCrearArticulo();
        articulo.ingresarNombreArticulo(DESCRIPCION_ARTICULO);
        articulo.ingresarUnidadesArticulo(UNIDADES_ARTICULO);
        articulo.ingresarPrecioArticulo(PRECIO_ARTICULO);
        articulo.clickBotonGuardarArticulo();
       
        expect(articulo.mostroNotificacionInformativa()).toBe(true);

    });



    
    it('Deberia lanzar un error al ingresar un artículo ya registrado', () => {
        const DESCRIPCION_ARTICULO = 'articulo de pruebas';
        const UNIDADES_ARTICULO = 10;
        const PRECIO_ARTICULO = 1000;

        page.navigateTo();
        navBar.clickBotonArticulo();
        navBar.clickBotonCrearArticulo();
        articulo.ingresarNombreArticulo(DESCRIPCION_ARTICULO);
        articulo.ingresarUnidadesArticulo(UNIDADES_ARTICULO);
        articulo.ingresarPrecioArticulo(PRECIO_ARTICULO);
        articulo.clickBotonGuardarArticulo();
       
        expect(articulo.mostroNotificacionError()).toBe(true);

    });


    it('Deberia listar artículos', () => {
        page.navigateTo();
        navBar.clickBotonArticulo();
        articulo.clickBotonListarArticulos();

        expect(articulo.contarArticulos()).toBeGreaterThan(0);
    });

    it('Deberia actualizar un artículo',() => {

        const DESCRIPCION_ARTICULO = 'articuloactualizado';
        const UNIDADES_ARTICULO = 10;
        const PRECIO_ARTICULO = 1000;

        page.navigateTo();
        navBar.clickBotonArticulo();
        articulo.clickBotonListarArticulos();
        articulo.clickBotonActualizar();
        articulo.limpiarInputNombreArticulo();
        articulo.limpiarInputUnidadesArticulo();
        articulo.limpiarInputPrecioArticulo();
        
        articulo.ingresarNombreArticulo(DESCRIPCION_ARTICULO);
        articulo.ingresarUnidadesArticulo(UNIDADES_ARTICULO);
        articulo.ingresarPrecioArticulo(PRECIO_ARTICULO);
        articulo.clickBotonActualizarArticulo();
       
        expect(articulo.mostroNotificacionInformativa()).toBe(true);
    });

    it('Deberia crear una venta de un artículo',() =>{

        page.navigateTo();
        navBar.clickBotonArticulo();
        articulo.clickBotonListarArticulos();

        articulo.clickBotonCrearVenta();
        articulo.ingresarUnidadVenta(1);

        articulo.clickBotonGuardarVenta();

        expect(articulo.mostroNotificacionInformativa()).toBe(true);     
    

    });

    it('Deberia borrrar el artículo', () => {
        page.navigateTo();
        navBar.clickBotonArticulo();
        articulo.clickBotonListarArticulos();

        articulo.clickBotonBorrar();
        articulo.clickBotonConfirmacion();

        expect(articulo.mostroNotificacionInformativa()).toBe(true);

    });


    

});

