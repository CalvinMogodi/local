import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { CommonService } from '../shared/common';
import { OrderProvider } from '../providers/order';

@Component({
  selector: 'app-courier',
  templateUrl: './courier.component.html',
  styleUrls: ['./courier.component.css']
})
export class CourierComponent implements OnInit {
  public orderNumber: Number;
  public order = this.commonService.order;
  public storeForm: FormGroup;
  public orderNumberError: boolean = false;
  public serverImgurl = this.commonService.serverImgurl;
  constructor(public formBuilder: FormBuilder, public orderProvider: OrderProvider, public router: Router, public commonService: CommonService) {}

   ngOnInit() {
    
  }

  search(){

   // this.orderHasData = false;
    if(this.orderNumber == undefined || this.orderNumber == 0){
      this.orderNumberError = true;
      return false
    }

    this.orderProvider.getOrderById({id: this.orderNumber}).subscribe((response: any) => {
      this.order = response;
    });      
  }

}
