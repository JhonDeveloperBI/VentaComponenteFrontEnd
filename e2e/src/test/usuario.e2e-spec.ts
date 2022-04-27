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
        const NOMBRE_USUARIO = 'usuario 3';
        const CLAVE_USUARIO = '123_pass';

        page.navigateTo();
        navBar.clickBotonUsuario();
        usuario.clickBotonCrearUsuarios();
        usuario.ingresarNombreUsuario(NOMBRE_USUARIO);
        usuario.ingresarClaveUsuario(CLAVE_USUARIO);
        usuario.clickBotonGuardar();

        expect(usuario.mostroNotificacionInformativa()).toBe(true);
    });

    it('Deberia lanzar un error al ingresar un usuario ya registrado', () => {
        const NOMBRE_USUARIO = 'usuario 3';
        const CLAVE_USUARIO = '123_pass';

        page.navigateTo();
        navBar.clickBotonUsuario();
        usuario.clickBotonCrearUsuarios();

        usuario.ingresarNombreUsuario(NOMBRE_USUARIO);
        usuario.ingresarClaveUsuario(CLAVE_USUARIO);
        usuario.clickBotonGuardar();

        expect(usuario.mostroNotificacionError()).toBe(true);

    });



    it('Deberia listar usuarios', () => {
        page.navigateTo();
        navBar.clickBotonUsuario();
        usuario.clickBotonListarUsuarios();

        expect(usuario.contarUsuarios()).toBeGreaterThan(0);
    });

    it('Deberia actualizar un usuario', () => {
        const NOMBRE_USUARIO = 'usuario actualizado';
        const CLAVE_USUARIO = '123_pass';

        page.navigateTo();
        navBar.clickBotonUsuario();
        usuario.clickBotonListarUsuarios();
        usuario.clickBotonActualizar();
        usuario.limpiarInputNombreUsuario();
        usuario.limpiarInputClaveUsuario();

        usuario.ingresarNombreUsuario(NOMBRE_USUARIO);
        usuario.ingresarClaveUsuario(CLAVE_USUARIO);
        usuario.clickBotonActualizarUsuario();

        expect(usuario.mostroNotificacionInformativa()).toBe(true);
    });

    it('Deberia borrrar el usuario', () => {
        page.navigateTo();
        navBar.clickBotonUsuario();
        usuario.clickBotonListarUsuarios();

        usuario.clickBotonBorrar();
        usuario.clickBotonConfirmacionSi();
        expect(usuario.mostroNotificacionInformativa()).toBe(true);

    });

});

