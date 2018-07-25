import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductProvider {
    public url: string = "http://localhost:7777/api";

    constructor(public http: HttpClient) {

    }

    getSpecialDeals() {
        return this.http.get(this.url + "/getSpecialDeals");
    }

    getProductsByCategory(parameters) {
        return this.http.post(this.url + "/getProductsByCategory", parameters);
    }

    getProductToApprove() {
        return this.http.get(this.url + "/getProductToApprove");
    }
}