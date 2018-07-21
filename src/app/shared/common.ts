import { Injectable } from '@angular/core';

@Injectable()
export class CommonService {
    public user: any;
    public productSearch: any;

    constructor() {
    } 

    assginUser(user: {}): any {
        this.user = user;
    }

    getUser(): any {
        return this.user;
    }

    assginProductSearch(productSearch: {}): any {
        this.productSearch = productSearch;
    }

    getProductSearch(): any {
        return this.productSearch;
    }
}