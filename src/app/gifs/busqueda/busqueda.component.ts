import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {

  //<!--Forma de extraer datos introducidos en el input por medio del teclado-->

  //esto busca en el html un elemento con el dato dado y lo asigna al elemento
  // el ! al frente de un : indica que el operador no es nulo, ya que typecript aveces aunque exista una variable no la reconoce
  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService) { }

  buscar() {
    const valor = this.txtBuscar.nativeElement.value;

    // con este if hago que al ingresar valores vacidos no se queden estos campos en el historial
    if ( valor.trim().length == 0){
      return;
    }
    

    this.gifsService.buscarGifs(valor);
    this.txtBuscar.nativeElement.value = '';
  }

}
