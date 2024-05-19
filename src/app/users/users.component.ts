import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import Swal from 'sweetalert2';

interface User {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  contrasena: string; 
  rol_id: number;
}
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  constructor(
    private usersService : UsersService
  ){}

  users:any
  isModalVisible: boolean = false;
  isEdit: boolean = false;
  selectedUser: any = {};

  ngOnInit(): void {
    this.getlist()
  }

  getlist(){
    this.usersService.getList().subscribe(
      (data) =>{
        console.log(data);
        this.users = data;
      }
    )
  }

  openCreateModal() {
    this.isEdit = false;
    this.selectedUser = { nombre: '', apellido: '', email: '', contrasena: '', rol_id: 0 };
    this.isModalVisible = true;
  }

  openEditModal(user: any) {
    this.isEdit = true;
    this.selectedUser = { ...user };
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false;
  }

  saveUser(user: any) {
    if (this.isEdit) {
      this.usersService.updateUser(user).subscribe(
        (data) => {
          this.getlist()
          console.log(data);
        }
      )
      console.log('Usuario creado', user);
    } else {
      this.usersService.createUser(user).subscribe(
        (data) => {
          this.getlist()
          console.log(data);
        }
      )
      console.log('Usuario creado', user);
    }
    this.closeModal();
  }

  deleteUser(user: User) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Estás a punto de eliminar a ${user.nombre} ${user.apellido}. Esta acción no se puede deshacer.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Aquí va la lógica para eliminar el usuario, por ejemplo, una llamada al servicio
        
        this.usersService.deleteUser(user.id).subscribe(
          response => {
            this.getlist()
            Swal.fire(
              '¡Eliminado!',
              'El usuario ha sido eliminado.',
              'success'
            );
          },
          error => {
            Swal.fire(
              'Error',
              'Hubo un problema al eliminar el usuario.',
              'error'
            );
          }
        );
      }
    });
  }
}
