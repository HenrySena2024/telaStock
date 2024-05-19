import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';

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

  deleteUser(user:any){
    console.log(user);
    
  }

  updateUser(user:any){
    console.log(user);
    
  }
}
