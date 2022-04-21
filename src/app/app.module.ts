import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from '@home/home.component';
import { ArticuloModule } from 'src/app/feature/articulo/articulo.module';
import { UsuarioModule } from '@usuario/usuario.module';
import { VentaModule } from '@venta/venta.module';
import { CoreModule } from '@core/core.module';
import { CookieService } from 'ngx-cookie-service';
import { TrmComponent } from './feature/trm/components/trm.component';
import { TrmService } from './feature/trm/service/trm.service';
import { DatePipe } from '@angular/common';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TrmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ArticuloModule,
    UsuarioModule,
    VentaModule,
    CoreModule
  ],
  providers: [TrmService, CookieService, DatePipe],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
