import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    private auth : AuthService,
    private router: Router,
    private toastr: ToastrService
  ){

  }

  user = {
    email: '',
    password: ''
  };

  onLogin() {
    let user = {
      email : this.user.email,
      contrasena : this.user.password
    }

    this.auth.login(user).subscribe(
      (data : any) => {
        if(data.resultado){
          console.log(data);
          
          localStorage.setItem('user', JSON.stringify(data.mensaje))
          this.router.navigate(['/users']);
        }else{
          this.toastr.error('Credenciales Incorrectas');
        }
        
      }
    )
  }
}
