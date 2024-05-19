import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private _url: string;

  constructor(private router: Router,
  private http: HttpClient
  ) {
    this._url = environment.urlApi + environment.usuariosController
  }

  getList(){
    return this.http.get(this._url + 'usuarios_listar.php')
  }

  createUser(user: any): Observable<any> {
    return this.http.post<any>(this._url + 'usuarios_crear.php', user);
  }

  updateUser(user: any): Observable<any> {
    return this.http.post<any>(this._url + 'usuarios_editar.php', user);
  }
}
