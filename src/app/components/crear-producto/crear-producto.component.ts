import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Producto} from "../../models/producto";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import { ProductService } from '../../services/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {

  productForm: FormGroup;
  title: string = "Crear Producto :D";
  id: String | null;

  constructor(private fb: FormBuilder, 
              private router: Router, 
              private toastr: ToastrService,
              private _productService: ProductService,
              private aRoute: ActivatedRoute) {
    this.productForm = this.fb.group({
      producto: ['', Validators.required],
      categoria: ['', Validators.required],
      ubicacion: ['', Validators.required],
      precio: ['', Validators.required]
    });

    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.isEditable();
  }

  agregarProducto(){

    const PRODUCTO: Producto = {
      nombre : this.productForm.get('producto')?.value,
      categoria : this.productForm.get('categoria')?.value,
      precio : this.productForm.get('precio')?.value,
      ubicacion : this.productForm.get('ubicacion')?.value
    };


    if (this.id!==null){
      this.title="Actualizar Producto";
      this._productService.updateProduct(this.id,PRODUCTO).subscribe(data =>{
        this.toastr.success("El producto se actualizó correctamente", "Producto actualizado")
        this.router.navigate(['/']);
      }, err=>{
        console.log(err);
        this.productForm.reset();
        this.toastr.error("Ocurrió un error al actualizar el producto", "Error al actualizar")
      });

    }else{
      //Alta de producto
      this._productService.saveProduct(PRODUCTO).subscribe(data => {
        this.toastr.success("El producto se registro correctamente", "Producto registrado")
        this.router.navigate(['/']);
      }, err => {
        console.log(err);
        this.productForm.reset();
        this.toastr.error("Ocurrió un error al registrar un producto", "Error al registrar")
      });
    }



  }
  isEditable(){
    if(this.id !==null){
      this.title = "Actualizar producto";
      this._productService.getProduct(this.id).subscribe(data =>{
        this.productForm.setValue({
          producto: data.nombre,
          categoria: data.categoria,
          precio: data.precio,
          ubicacion: data.ubicacion
        });
      });
    }
  }

}
