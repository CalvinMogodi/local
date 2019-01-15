import { Component } from '@angular/core';
import { ProductProvider } from '../providers/product';
import { CommonService } from '../shared/common';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  itemValue = '';
  items: Observable<any[]>;
  title = 'app';
  public products = [];
  public selectedImage = '';
  public productToView = {
    Name: '',
    Description: '',
    Price: '',
    IsOnSpecial: 'false',
    Discount: '',
    ImageName: '',
    ImageName1: '',
    ImageName2: '',
    ImageName3: '',
    StoreId: 0,
    CreatedDate: '',
    Id: 0,
  };
  public colors = [];
  public sizes = [];
  public cartList = [];
  public serverImgurl = this.commonService.serverImgurl;
  public currentUser: any;
  constructor(public productProvider: ProductProvider, public commonService: CommonService, public db: AngularFireDatabase, public dbStorage: AngularFireStorage) {
    //sessionStorage.setItem('cartList', JSON.stringify(this.cartList));
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.items = db.list('products').valueChanges();
    this.productProvider.getSpecialDeals().subscribe((response: any) => {
      this.products = response;
      this.products.sort(function (a, b) {
        let f = Date.parse(b.CreatedDate);
        let s = Date.parse(a.CreatedDate);
        f = f / 1000;
        s = s / 1000;
        return s - f;
      })
    });
  }

  setProductToView(product) {
    this.productToView = product;
    this.selectedImage = this.serverImgurl + this.productToView.ImageName;
    this.colors = product.Colors.split(",");
    // this.colors = product.Sizes.split(",");
  }

  setSelectedImage(imageName) {
    this.selectedImage = this.serverImgurl + imageName;
  }

  addProductToCart(product) {
    this.cartList = JSON.parse(sessionStorage.getItem('cartList'));
    let addProduct = true;
    if (this.cartList != null) {
      for (let cartProduct of this.cartList) {
        if (cartProduct.Id == product.Id) {
          addProduct = false;
          break;
        }
      }
    }else
      this.cartList = [];

    if (addProduct) {
      this.cartList.push(product);
      this.commonService.cartList = this.cartList; // this change will broadcast to every subscriber like below component
      sessionStorage.setItem('cartList', JSON.stringify(this.cartList));
    }
  }
}

