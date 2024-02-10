import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'; 
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {


  baseUrl: string = environment.baseUrl;

    constructor(private httpClient: HttpClient) { }

    addCustomer(data: any): Observable<any> {
        return this.httpClient.post(this.baseUrl + 'CustomerAppContext/Customer', data);
    }

    updateCustomer(id: number, data: any): Observable<any> {
        return this.httpClient.put(this.baseUrl + `CustomerAppContext/Customer`, data);
    }

    getCustomersList(): Observable<any> {
        return this.httpClient.get(this.baseUrl + 'CustomerAppContext/Customer');
    }

    deleteCustomer(id: number): Observable<any> {
        return this.httpClient.delete(this.baseUrl + `CustomerAppContext/Customer/DeleteCustomer/ ${ id }`);
    }
}
