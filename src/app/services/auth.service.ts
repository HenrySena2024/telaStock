import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _url: string;

  constructor(private router: Router,
  private http: HttpClient
  ) {
    this._url = environment.urlApi + environment.loginController
  }

  login(user: any) {
    return this.http.post(this._url + 'login.php', user)
  }

  isLoggedIn(): boolean {
    return false;
  }

  logout(): void {
    this.router.navigate(['/login']);
  }
}
