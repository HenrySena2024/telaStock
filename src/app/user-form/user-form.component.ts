import { Component, EventEmitter, Input, Output } from '@angular/core';

interface User {
  nombre: string;
  apellido: string;
  email: string;
  contrasena: string; 
  rol_id: number;
}

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})




export class UserFormComponent {
  @Input() isVisible: boolean = false;
  @Input() isEdit: boolean = false;
  @Input() @Input() user: User = { nombre: '', apellido: '', email: '', contrasena: '', rol_id: 0 };
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  closeModal() {
    this.isVisible = false;
    this.close.emit();
  }

  submitForm() {
    this.save.emit(this.user);
    this.closeModal();
  }
}
