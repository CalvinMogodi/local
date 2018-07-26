import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

declare var require: any
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

    addOrderProduct(parameters) {
        return this.http.post(this.url + "/insertOrderProduct", parameters);
    }

    addOrderAudit(parameters) {
        return this.http.post(this.url + "/addOrderAudit", parameters);
    }

    setProductActive(parameters) {
        return this.http.post(this.url + "/setProductActive", parameters);
    }

    getOrderById(parameters) {
        return this.http.post(this.url + "/getOrderById", parameters);
    }

    //Payment
    startPayment(parameters) {
        return this.http.post(this.url + "/startPayment", parameters);
    }

    makePaymet(parameters) {
        return this.http.post(this.url + "/makePaymet", parameters);
    }

    getPaymentStatus(parameters) {
        return this.http.post(this.url + "/getPaymentStatus", parameters);
    }

}