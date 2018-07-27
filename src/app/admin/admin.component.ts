import { Component, OnInit } from '@angular/core';
import { ProductProvider } from '../providers/product';
import { OrderProvider } from '../providers/order';
import { CommonService } from '../shared/common';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public products = [];
  public product = this.commonService.product;
  public orders = [];
  public index = -1;
  public showReasonError = false;
  public selectedButton = 3;
  public serverImgurl = "http://localhost:7777/";
  constructor(public productProvider: ProductProvider, public commonService: CommonService, public orderProvider: OrderProvider) { 

  }

  ngOnInit() {
    this.productProvider.getProductToApprove().subscribe((response: any) => {
      this.products = response;
      this.products.sort(function (a, b) {
        let f = Date.parse(b.CreatedDate);
        let s = Date.parse(a.CreatedDate);
        f = f / 1000;
        s = s / 1000;
        return s - f;
      })
    });

    let element: HTMLElement = document.getElementById('approveProduct') as HTMLElement;
    element.click();

    this.orderProvider.getOrdersToAssginToCourier().subscribe((response: any) => {
      this.orders = response;
      this.orders.sort(function (a, b) {
        let f = Date.parse(b.CreatedDate);
        let s = Date.parse(a.CreatedDate);
        f = f / 1000;
        s = s / 1000;
        return s - f;
      })
    });

    
  }

  viewProduct(product, index){
    this.product = product;
    this.index = index;
  }

  submit(){
    this.showReasonError = false;
    if(this.selectedButton == 1 && (this.product.rejectReason == '' || this.product.rejectReason == null))
    {
       this.showReasonError = true;
       return false;
    }   
  }

}
