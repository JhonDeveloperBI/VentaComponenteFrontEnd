import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { VentaService } from '@venta/shared/service/venta.service';
import { UsuarioService } from '@usuario/shared/service/usuario.service';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-crear-venta-articulo',
  templateUrl: './crear-venta-articulo.component.html'
})
export class CrearVentaArticuloComponent implements OnInit {
  getIdArticulo: number;

  ventaForm: FormGroup;
  constructor(protected ventaServices: VentaService, private activeRouter: ActivatedRoute, protected usuarioService: UsuarioService, private router: Router) {
    this.getIdArticulo =Number( this.activeRouter.snapshot.paramMap.get('id'));  
   }

  notificacion = Swal.mixin({
    toast: true,
    position: 'center'
  });


  ngOnInit() {
    this.construirFormularioVenta();
    this.ventaForm.controls['idArticulo'].setValue(this.getIdArticulo);

    this.usuarioService.consultar().subscribe(
      res =>{
        this.ventaForm.controls['idUsuario'].setValue(res[0]?.id);
        this.ventaForm.controls['nombreUsuario'].setValue(res[0]?.nombre);   
      }
    );     
  }

  crear() {
  
    this.ventaServices.guardar(this.ventaForm.value).subscribe(
      data => {if (data){
        this.success();
        this.ventaForm.reset();
        this.router.navigateByUrl('/');
      }},
      error => this.mostrarError(error.error.mensaje)
    );
  }

  private construirFormularioVenta() {
    this.ventaForm = new FormGroup({
      idUsuario: new FormControl('', [Validators.required]),
      unidadVenta: new FormControl('', [Validators.required]),
      idArticulo: new FormControl('', [Validators.required]),
      nombreUsuario: new FormControl('', [Validators.required]), 
    });
  }

  success(){
    this.notificacion.fire({
      title: 'Éxito',
      text: 'Se ha creado una venta',
      icon: 'success'
    });
  }

    mostrarError(mensaje){
      this.notificacion.fire({
        title: 'Error',
        text: mensaje,
        icon: 'error'
      });
    }

}