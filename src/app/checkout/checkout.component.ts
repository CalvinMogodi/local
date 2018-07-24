import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderProvider } from '../providers/order';
import { StoreProvider } from '../providers/store';
import { CommonService } from '../shared/common';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

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
  public checkoutId: string = '';
  public firstForm: FormGroup;
  public secondForm: FormGroup;
  public order = this.commonService.order;
  public payment = this.commonService.payment;
  public step = 1;
  public firstFormAttempt = false;
  public secondFormAttempt = false;
  public paymentError = '';
  public totalQuantity = 0;

  constructor(public formBuilder: FormBuilder, public router: Router, public orderService: OrderProvider, public commonService: CommonService, public storeProvider: StoreProvider) {
    this.firstForm = this.formBuilder.group({
      dropAddress: [this.order.dropAddress, Validators.compose([Validators.required])],
      userContactDeatils: [this.order.userContactDeatils, Validators.compose([Validators.required])]
    });
    this.secondForm = this.formBuilder.group({
      cardcvv: [this.payment.cardcvv, Validators.compose([Validators.required])],
      cardHolder: [this.payment.cardHolder, Validators.compose([Validators.required])],
      cardExpiry: [this.payment.cardExpiry, Validators.compose([Validators.required])],
      cardNumber: [this.payment.cardNumber, Validators.compose([Validators.required])],
      brand: ['MASTER', Validators.compose([Validators.required])],
    });
  }

  ngOnInit() {
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.cartList = JSON.parse(sessionStorage.getItem('cartList'));
    if (this.cartList != null) {
      this.cartTotalPrice = '0.00';
      this.totalQuantity = this.totalQuantity;
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

  processed() {
    let cartHasError = false;
    this.cartList.forEach(element => {
      if (element.quantity == 0) {
        element.quantityError = true;
        cartHasError = true;
      }
    });

    if (cartHasError) {
      return false;
    }
    this.cartList.forEach(element => {
      this.totalQuantity = Number(this.totalQuantity + Number(element.quantity));
    });

    //this.orderService.startPayment({ amount: this.cartTotalPrice }).subscribe((response: any) => {
    //  this.checkoutId = response.id;
    //  this.createOrder()
    //});
  }

  createOrder() {
    this.storeProvider.getStoreById({ id: this.cartList[0].StoreId }).subscribe((response: any) => {
      this.order.createdDate = new Date().getFullYear() + '-' + Number(new Date().getMonth() + 1) + '-' + new Date().getDate();
      this.order.userId = this.currentUser.Id;
      this.order.totalQuantity = 0;
      this.order.storeId = response.Id;
      this.order.pickUpAddress = response.Address;
      this.order.supplierContactDeatils = response.CellTellPhoneNumber;
      this.orderService.makePaymet({ amount: this.cartTotalPrice }).subscribe((response: any) => {
        this.order.transactionId = response.id;
        this.orderService.placeOrder(this.order).subscribe((response: any) => {
          this.cartList.forEach(element => {
            let totalPrice = Number(Number(element.Price) * Number(element.quantity));
            if(element.color == undefined)
              element.color = null;
            if(element.size == undefined)
              element.size = null;
            this.orderService.addOrderProduct({ productId: element.Id, orderid: response, quantity: element.quantity, totalPrice: totalPrice, size: element.size, color: element.color }).subscribe((response: any) => {
              var itworked = true;
            });
          });
        });
      });
    });
  }

  removeProductFromBasket(product, index) {
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

  continueShopping() {
    this.router.navigate(['product']);
  }

  payNow() {
    this.secondFormAttempt = true;
    this.paymentError = '';
    if (this.secondForm.valid) {
      this.createOrder();
    }

  }

  processedToNextStep() {
    this.firstFormAttempt = true;
    if (this.firstForm.valid) {
      this.step = 2;
    }

  }

  back() {
    this.step = 1;
  }

}