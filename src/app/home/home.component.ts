import { Component } from '@angular/core';
import { ProductProvider } from '../providers/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
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
  public serverImgurl = "http://localhost:7777/";
  public currentUser: any;
  constructor(public productProvider: ProductProvider) {
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
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
  }

  setSelectedImage(imageName){
    this.selectedImage = this.serverImgurl + imageName;
  }
}

