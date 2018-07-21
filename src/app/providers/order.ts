import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class OrderProvider {
    public url: string = "http://localhost:7777/api";

    constructor(public http: HttpClient) {

    }

    placeOrder(parameters) {
        return this.http.post(this.url + "/placeOrder", parameters);
    }

    getOrderByOrderNumber(parameters) {
        return this.http.post(this.url + "/getOrderByOrderNumber", parameters);
    }

    getOrdersByUserId(parameters) {
        return this.http.post(this.url + "/getOrdersByUserId", parameters);
    }

    getOrdersByStoreId(parameters) {
        return this.http.post(this.url + "/getOrdersByStoreId", parameters);
    }
}