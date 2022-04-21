
import { NavbarPage } from '../page/navbar/navbar.po';
import { AppPage } from '../app.po';
import { UsuarioPage } from '../page/usuario/usuario.po';

describe('workspace-project Usuario', () => {
    let page: AppPage;
    let navBar: NavbarPage;
    let usuario: UsuarioPage;

    beforeEach(() => {
        page = new AppPage();
        navBar = new NavbarPage();
        usuario = new UsuarioPage();
    });

    it('Deberia crear usuario', () => {
        const NOMBRE_USUARIO = 'usuario 1';
        const CLAVE_USUARIO = '123 pass';

        page.navigateTo();
        navBar.clickBotonUsuario();
        usuario.clickBotonCrearUsuarios();
        
        usuario.ingresarNombreUsuario(NOMBRE_USUARIO);
        usuario.ingresarClaveUsuario(CLAVE_USUARIO);
        usuario.clickBotonGuardar();
       
        expect(usuario.mostroNotificacionInformativa).toBe(true);

    });

    it('Deberia listar articulos', () => {
        page.navigateTo();
        navBar.clickBotonArticulo();
        usuario.clickBotonListarUsuarios();

        expect(1).toBe(usuario.contarArticulos());
    });
});