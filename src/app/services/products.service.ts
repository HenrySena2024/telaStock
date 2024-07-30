import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private _url: string;

  constructor(private router: Router,
    private http: HttpClient
  ) {
    this._url = environment.urlApi + environment.productosController
  }
  getList(){
    return this.http.get(this._url + 'productos_listar.php')
  }
  deleteProducts(id : number): Observable<any> {
    return this.http.post<any>(this._url + 'productos_eliminar.php', {producto_id: id});
  }
  createProducts(producto: any): Observable<any> {
    return this.http.post<any>(this._url + 'productos_crear.php', producto);
  }

  updateProducts(producto: any): Observable<any> {
    return this.http.post<any>(this._url + 'productos_editar.php', producto);
  }
  

}

