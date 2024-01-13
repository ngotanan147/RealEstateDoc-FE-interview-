import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { IProduct } from 'src/models/IProduct';

@Injectable({
  providedIn: 'root',
})
export class MockApiService {
  apiUrl = 'http://localhost:3000/products';
  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get(this.apiUrl).pipe(map((data) => <IProduct[]>data));
  }

  getProductById(id: string) {
    return this.http
      .get(this.apiUrl + `?id=${id}`)
      .pipe(map((data) => <IProduct>data));
  }

  createProduct(createData: IProduct) {
    return this.http
      .post(this.apiUrl, createData)
      .pipe(map((data) => <IProduct>data));
  }

  updateProduct(updateData: IProduct) {
    return this.http
      .put(this.apiUrl + `/${updateData.id}`, updateData)
      .pipe(map((data) => <IProduct>data));
  }

  deleteProduct(id: string) {
    return this.http.delete(this.apiUrl + `/${id}`);
  }
}
