import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderProvider } from '../providers/order';
import { CommonService } from '../shared/common';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  title = 'app';
  public cartList = [];
  public cartTotalPrice = '0.00';
  public serverImgurl = "http://localhost:7777/";
  public currentUser: any;
  public shopperResultUrl: any;
  public checkoutId : string = '';

  constructor(public router: Router, public orderService: OrderProvider, public commonService: CommonService) {
  }

  ngOnInit() {
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.cartList = JSON.parse(sessionStorage.getItem('cartList'));
    if (this.cartList != null) {
      this.cartTotalPrice = '0.00';
      this.cartList.forEach(element => {
        element.quantity = 1;
        element.quantityError = false;
        if (element.IsOnSpecial == '1')
          this.cartTotalPrice = Number(Number(this.cartTotalPrice) + Number(element.Discount)).toFixed(2);
        else
          this.cartTotalPrice = Number(Number(this.cartTotalPrice) + Number(element.Price)).toFixed(2);
      });
    } else {
      this.cartList = [];
    }
  }

  processed(){
    let cartHasError = false;
     this.cartList.forEach(element => {
        if(element.quantity == 0){
          element.quantityError = true;
          cartHasError = true;
        }
      });

      if(cartHasError){
        return false;
      }

      this.orderService.startPayment({ amount: this.cartTotalPrice }).subscribe((response: any) => {
        this.shopperResultUrl = response;
        this.checkoutId = response.id;
      });
  }

  removeProductFromBasket(product, index){
    this.cartList.splice(index, 1);
    this.cartTotalPrice = '0.00';
     this.cartList.forEach(element => {
        if (element.IsOnSpecial == '1')
          this.cartTotalPrice = Number(Number(this.cartTotalPrice) + Number(element.Discount)).toFixed(2);
        else
          this.cartTotalPrice = Number(Number(this.cartTotalPrice) + Number(element.Price)).toFixed(2);
      });
    this.commonService.cartList = this.cartList; 
    sessionStorage.setItem('cartList', JSON.stringify(this.cartList));
  }

  continueShopping(){
    this.router.navigate(['product']);    
  }

  payNow(){
    this.orderService.makePaymet({ amount: this.cartTotalPrice }).subscribe((response: any) => {
      this.shopperResultUrl = response;
        this.checkoutId = response.id;
        this.orderService.getPaymentStatus({ paymentId: response.id }).subscribe((response: any) => {
        this.shopperResultUrl = response;
        this.checkoutId = response.id;
      });
      });
  }

}