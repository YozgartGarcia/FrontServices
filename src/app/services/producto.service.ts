import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url = 'http://localhost:4000/api/products/';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get(this.url)
  }

  deleteProduct(id: any): Observable<any> {
    return this.http.delete(this.url+id)
  }

  saveProduct(product: Producto): Observable<any> {
    return this.http.post(this.url, product)
  }

  getProduct(id: any): Observable<any> {
    return this.http.get(this.url+id);
  }

  updateProduct(id: any, product: Producto): Observable<any> {
    return this.http.put(this.url+id, product)
  }
}

 