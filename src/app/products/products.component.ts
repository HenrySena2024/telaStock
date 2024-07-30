import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(
    private productsService: ProductsService
  ) { }
  products: any
  isModalVisible: boolean = false;
  isEdit: boolean = false;
  selectedProduct: any = {};
  ngOnInit(): void {
    this.getlist()
  }
  getlist() {
    this.productsService.getList().subscribe(
      (data) => {
        console.log(data);
        this.products = data;

      }
    )
  }
  deleteProducts(productos: any) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Estás a punto de eliminar  ${productos.nombre}. Esta acción no se puede deshacer.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Aquí va la lógica para eliminar el usuario, por ejemplo, una llamada al servicio

        this.productsService.deleteProducts(productos.producto_id).subscribe(
          response => {
            this.getlist()
            Swal.fire(
              '¡Eliminado!',
              'El producto ha sido eliminado.',
              'success'
            );
          },
          error => {
            Swal.fire(
              'Error',
              'Hubo un problema al eliminar el producto.',
              'error'
            );
          }
        );
      }
    });
  }
  openCreateModal() {
    this.isEdit = false;
    this.selectedProduct = { nombre: '', apellido: '', email: '', contrasena: '', rol_id: 0 };
    this.isModalVisible = true;
  }

  openEditModal(product: any) {
    this.isEdit = true;
    this.selectedProduct = { ...product };
    this.isModalVisible = true;
  }

  saveProduct(product: any) {
    if (this.isEdit) {
      this.productsService.updateProducts(product).subscribe(
        (data) => {
          this.getlist()
          console.log(data);
        }
      )
    } else {

      this.productsService.createProducts(product).subscribe(
        (data) => {
          this.getlist()
          console.log(data);
        }
      )
      console.log('Usuario creado', product);
    }
    this.closeModal();
  }

  closeModal() {
    this.isModalVisible = false;
  }

}
