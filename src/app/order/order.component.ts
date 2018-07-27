import { Component, OnInit } from '@angular/core';
import { OrderProvider } from '../providers/order';
import { CommonService } from '../shared/common';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  public supplierOrders = [];
  public stores = [];
  public store: any;
  public currentUser = this.commonService.user;
  public serverImgurl = "http://localhost:7777/";
  constructor(public commonService: CommonService, public orderProvider: OrderProvider) { }

  ngOnInit() {
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (this.currentUser.UserType == 'Supplier') {
      this.stores = JSON.parse(sessionStorage.getItem('currentStore'));
      if(Array.isArray(this.stores)){
        this.stores.forEach(element => {
        this.orderProvider.getOrdersByStoreId({ storeId: element.Id}).subscribe((response: any) => {
          this.supplierOrders.push(response);
          this.supplierOrders.sort(function (a, b) {
            let f = Date.parse(b.createdDate);
            let s = Date.parse(a.createdDate);
            f = f / 1000;
            s = s / 1000;
            return s - f;
          })
        });
      });
    }else{
      this.store = this.stores;
        this.orderProvider.getOrdersByStoreId({ storeId: this.store.Id}).subscribe((response: any) => {
          this.supplierOrders = response;
          this.supplierOrders.sort(function (a, b) {
            let f = Date.parse(b.createdDate);
            let s = Date.parse(a.createdDate);
            f = f / 1000;
            s = s / 1000;
            return s - f;
          })
        });
      }
      
    }
  }

}
