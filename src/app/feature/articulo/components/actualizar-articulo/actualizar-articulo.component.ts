import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ArticuloService } from '@articulo/shared/service/articulo.service';



@Component({
  selector: 'app-actualizar-articulo',
  templateUrl: './actualizar-articulo.component.html'
})
export class ActualizarArticuloComponent implements OnInit {

  getIdArticulo: any; //NOSONAR
  articulos : any = []; //NOSONAR 

  notificacion = Swal.mixin({
    toast: true,
    position: 'center'
  });

  articuloForm: FormGroup;
  constructor(protected articuloService: ArticuloService, private activeRouter: ActivatedRoute, private router: Router) {
    this.getIdArticulo = this.activeRouter.snapshot.paramMap.get('id');  
   }

  ngOnInit(): void {
    this.articuloService.consultar().subscribe(
      (data : any) =>{ //NOSONAR
         this.articulos = data.map(u => u);
         const articuloFilter = this.articulos.filter(u => u.id = this.getIdArticulo );
         this.articuloForm.controls['nombreArticulo'].setValue(articuloFilter[0]?.nombreArticulo);
         this.articuloForm.controls['precio'].setValue(articuloFilter[0]?.precio);
         this.articuloForm.controls['unidades'].setValue(articuloFilter[0]?.unidades);
      }
    ); 
    this.construirFormularioArticulo();
  }

  private construirFormularioArticulo() {
    this.articuloForm = new FormGroup({
      nombreArticulo: new FormControl('', [Validators.required]),
      precio:new FormControl('', [Validators.required]),
      unidades: new FormControl('', [Validators.required])
    });
  }

  actualizarArticulo(){
    this.articuloService.actualizar(this.getIdArticulo,this.articuloForm.value).subscribe(
      data => {if (data){ //NOSONAR
      }},
      error => this.mostrarError(error.error.mensaje)
    );
    this.success();
    this.router.navigateByUrl('/articulo/listar');
  
  }

  success(){
    this.notificacion.fire({
      title: 'Éxito',
      text: 'Se ha actualizado el artículo',
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
