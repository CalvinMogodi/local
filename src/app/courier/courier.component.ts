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

  public storeForm: FormGroup;
  constructor(public formBuilder: FormBuilder, public orderProvider: OrderProvider, public router: Router, public commonService: CommonService) {}

  ngOnInit() {
  }

}
