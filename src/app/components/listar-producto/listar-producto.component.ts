import { Component, OnInit } from '@angular/core';
import { Producto } from '../../models/producto';
import { ProductService } from '../../services/producto.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listar-producto',
  templateUrl: './listar-producto.component.html',
  styleUrls: ['./listar-producto.component.css']
})
export class ListarProductoComponent implements OnInit {

  productsList: Producto[] = [];

  constructor(private _productService: ProductService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this._productService.getProducts().subscribe(data=>{
      console.log(data); 
      this.productsList = data;
    }, err=>{
      console.log(err);
    })

  }

  deleteProduct(id: any){
   this._productService.deleteProduct(id).subscribe(data=>{
    this.toastr.info("El producto se eliminó", "Prodcuto eliminado")
    this.getProducts();
   }, err=>{
     console.log(err);
   })
    
  }

 

}
