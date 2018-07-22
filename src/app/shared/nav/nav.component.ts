import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../../shared/common';

declare const $: any;
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  public showlogout: boolean = false;
  public activeMenuTab: number = 0;
  public cartList = [];
  public cartTotalPrice = '0.00';

  constructor(public router: Router, public commonService: CommonService) {
 
    commonService.itemValue.subscribe((nextValue) => {
      this.cartList = [];
      for (let key in nextValue) {
        if (nextValue.hasOwnProperty(key)) {
          this.cartList.push(nextValue[key]);
        }
      }
      this.cartTotalPrice = '0.00';
      this.cartList.forEach(element => {
        if (element.IsOnSpecial == '1')
          this.cartTotalPrice = Number(Number(this.cartTotalPrice) + Number(element.Discount)).toFixed(2);
        else
          this.cartTotalPrice = Number(Number(this.cartTotalPrice) + Number(element.Price)).toFixed(2);
      });
    })

    router.events.subscribe((url: any) => {
      let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
      this.cartList = JSON.parse(sessionStorage.getItem('cartList'));
      if (this.cartList != null) {
        this.cartTotalPrice = '0.00';
        this.cartList.forEach(element => {
          if (element.IsOnSpecial == '1')
            this.cartTotalPrice = Number(Number(this.cartTotalPrice) + Number(element.Discount)).toFixed(2);
          else
            this.cartTotalPrice = Number(Number(this.cartTotalPrice) + Number(element.Price)).toFixed(2);
        });
      } else {
        this.cartList = [];
      }
      if (currentUser == null) {
        this.showlogout = false;
      } else {
        this.showlogout = true;
      }
      switch (url.url) {
        case "/": {
          this.activeMenuTab = 0;
          break;
        }
        case "/store": {
          this.activeMenuTab = 1;
          break;
        }
        case "/product": {
          this.activeMenuTab = 2;
          break;
        }
        case "/order": {
          this.activeMenuTab = 3;
          break;
        }
        case "/courier": {
          this.activeMenuTab = 4;
          break;
        }
        case "/checkout": {
          this.activeMenuTab = 5;
          break;
        }
      }
    });
  }

  ngOnInit() {
  }

  Navigate(gategory, product) {
    this.commonService.assginProductSearch({ gategory: gategory, product: product, });
    sessionStorage.setItem('searchedProduct', JSON.stringify({ gategory: gategory, product: product, }));
    this.router.navigate(['/product']);
  }
  NavigateTo(url) {
    this.router.navigate([url]);
  }

  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };

  logout() {
    sessionStorage.setItem('currentUser', JSON.stringify(null));
    this.showlogout = false;
    this.router.navigate(['home']);
  }

}
