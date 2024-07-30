import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {
  @Input() isVisible: boolean = false;
  @Input() isEdit: boolean = false;
  @Input() @Input() product: any = { nombre: '', descripcion: '', precio: '', categoria_id: 0 };
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  closeModal() {
    this.isVisible = false;
    this.close.emit();
  }
  submitForm() {
    console.log(this.product);
    
    this.save.emit(this.product);
    this.closeModal();
  }
}
