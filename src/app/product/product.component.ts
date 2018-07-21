import { Component, OnInit } from '@angular/core';
import { ProductProvider } from '../providers/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  public searchedProduct: any;
  public products = [];
  public serverImgurl = "http://localhost:7777/";
  public selectedImage = '';
  public colors = [];
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
  public currentUser: any;
  constructor(public productProvider: ProductProvider) {

  }

  ngOnInit() {
    this.searchedProduct = JSON.parse(sessionStorage.getItem('searchedProduct'));
    this.productProvider.getProductsByCategory({ category: this.searchedProduct.product }).subscribe((response: any) => {
      this.products = response;
    });
  }

  setProductToView(product) {
    this.productToView = product;
    this.selectedImage = this.serverImgurl + this.productToView.ImageName;
    this.colors = product.Colors.split(",");
  }

  setSelectedImage(imageName) {
    this.selectedImage = this.serverImgurl + imageName;
  }
}