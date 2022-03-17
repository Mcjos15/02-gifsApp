import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'lqK6VcD3mBmCdTKbZSfpb1Vrk04v9waB';
  private servicioURL: string ='https://api.giphy.com/v1/gifs';

  private _historial: string[] = [];

  public resultados: Gif[] = [];

  get historial() {



    return [...this._historial];
  }

  constructor(private http: HttpClient) {
    //Ya cons esto puedo hacver peticiones http en base a
    //obserevadores


    //tengo la ifnroamción cargada en el navegador y así la llamo cuando se inicia la app
    if (localStorage.getItem('historial')) {

      //El ! en este caso hace que se ignore el error que marca angular de indicar que puede venir en null
      //Se le dicd a angualr que se sabe lo que se está haciendo
      this._historial = JSON.parse(localStorage.getItem('historial')!);


    }
    if (localStorage.getItem('resultados')) {
      this.resultados = JSON.parse(localStorage.getItem('resultados')!);
    }
  }

  buscarGifs(query: string = '') {

    query = query.trim().toLowerCase();
    //con este codigo verificamos que no haya un item repetido
    if (!this._historial.includes(query)) {

      this._historial.unshift(query);

      // con esto limito la cantidad de items en el hsitorial
      this._historial = this._historial.splice(0, 5);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limits', '10')
      .set('q', query);
    //al poner el backtips se puede poner la intrapolación de Strings.
    this.http.get<SearchGifsResponse>(`${this.servicioURL}/search`,{params})
      .subscribe((resp) => {
        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      });
    //estas peticiones obtorgan observadores, con esto se puede añadir funcionalidades a la petición.

  }

}
