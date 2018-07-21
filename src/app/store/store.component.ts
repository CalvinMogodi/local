import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { StoreProvider } from '../providers/store';
import { CommonService } from '../shared/common';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  // color multi select
  public colorList = [];
  public selectedColors = [];
  public colorSettings = {};

  // Size Category
  public sizeCategoryList = [];
  public selectedSizeCategory = [];
  public sizeCategorySettings = {};

  // Size
  public sizeList = [];
  public selectedSizes = [];
  public sizesSettings = {};

  // product category
  public productCategoryList = [];
  public selectedproductCategory= [];
  public productCategorySettings = {};

  public currentUser: any;
  public image1Uploaded = false;
  public image2Uploaded = false;
  public image3Uploaded = false;
  public uploadImage1 = false;
  public uploadImage2 = false;
  public uploadImage3 = false;
  public base64Image = '';
  public base64Image1 = '';
  public base64Image2 = '';
  public base64Image3 = '';
  public serverImgurl = '';
  public serverImgurl1 = '';
  public serverImgurl2 = '';
  public serverImgurl3 = '';  
  public showDiscountError = false;
  public category: any;
  public colors: any;
  public sizeCategory: any;
  public sizes:any;
  public storeForm: FormGroup;
  public productForm: FormGroup;
  public submitStoreAttempt: boolean = false;
  public submitProductAttempt: boolean = false;
  public showStoreError: boolean = false;
  public storeError = '';
  public showProductError: boolean = false;
  public productError = '';
  public storeHeader = 'Add Store';
  public productHeader = 'Add Product';
  public showProducts: boolean = false;
  public stores = [];
  public colorsArray = [];
  public products = [];
  public store = this.commonService.store;;
  public product = this.commonService.product;
  public selectedStore = this.commonService.dbStore;
  public selectedProduct = this.commonService.dbProduct;
  constructor(public formBuilder: FormBuilder, public storeProvider: StoreProvider, public router: Router, public commonService: CommonService) {

  }

  ngOnInit() {
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.storeForm = this.formBuilder.group({
      name: [this.store.name, Validators.compose([Validators.required])],
      description: [this.store.description, Validators.compose([Validators.required])],
      address: [this.store.address, Validators.compose([Validators.required])],
      cellTellPhoneNumber: [this.store.cellTellPhoneNumber, Validators.compose([Validators.required])],
    });

    this.productForm = this.formBuilder.group({
      name: [this.product.name, Validators.compose([Validators.required])],
      description: [this.product.description, Validators.compose([Validators.required])],
      price: [this.product.price, Validators.compose([Validators.required])],
      stockIsAvailable: [this.product.stockIsAvailable, Validators.compose([Validators.required])],
      category: [this.product.category, Validators.compose([Validators.required])],
      colors: [this.product.colors],
      sizeCategory: [],
      sizes: [],
      discount: [this.product.discount],
      isOnSpecial: [this.product.isOnSpecial]
    });

    this.storeProvider.getStoreByUserId({ userId: this.currentUser.Id }).subscribe((response: any) => {
      this.stores = response;
    });

    // Colors multiselect/ typeahaed settings
    this.colorList = this.commonService.colors;
    this.colorSettings = this.commonService.colorSettings;

    // Size category multiselect/ typeahaed settings
    this.sizeCategoryList =  this.commonService.sizeCategories; 
    this.sizeCategorySettings = this.commonService.sizeCategorySettings;

    // Product category  multiselect/ typeahaed settings
    this.productCategoryList = this.commonService.productCategories; 
    this.productCategorySettings = this.commonService.productCategorySettings; 
  }

  oncategoryItemSelect(item: any) {
    this.product.category = item.item_text;
  }

  onSizeCategoryItemSelect(item: any) {
    this.sizes = undefined;
      this.sizeList = [];
      this.selectedSizes = [];
      this.sizesSettings = this.commonService.sizeSettings;

      switch(item.item_id){
        case 1:{
          this.sizeList = this.commonService.generalSizes;
          break;
        }
        case 2:{
          this.sizeList = this.commonService.shoesSizes;
          break;
        }
        case 3:{
          this.sizeList = this.commonService.pantsSizes;
          break;
        }
        case 4:{
          this.sizeList = this.commonService.topsSizes;
          break;
        }
      }
  }

  onSelectAll(items: any) {
  }

  onFileChange(event) {
    this.serverImgurl = '';
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      let reader = new FileReader();
      var thisThis = this;
      reader.readAsDataURL(file);
      reader.onload = (function (file) {
        thisThis.base64Image = reader.result;
      });
      reader.readAsText(file);
    }
  }

  onFileChange1(event) {
    this.serverImgurl1 = '';
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      let reader = new FileReader();
      var thisThis = this;
      reader.readAsDataURL(file);
      reader.onload = (function (file) {
        thisThis.base64Image1 = reader.result;
        thisThis.uploadImage1 = true;
      });
      reader.readAsText(file);
    }
  }

  onFileChange2(event) {
    this.serverImgurl2 = '';
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      let reader = new FileReader();
      var thisThis = this;
      reader.readAsDataURL(file);
      reader.onload = (function (file) {
        thisThis.base64Image2 = reader.result;
        thisThis.uploadImage2 = true;
      });
      reader.readAsText(file);
    }
  }

  onFileChange3(event) {
    this.serverImgurl3 = '';
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      let reader = new FileReader();
      var thisThis = this;
      reader.readAsDataURL(file);
      reader.onload = (function (file) {
        thisThis.base64Image3 = reader.result;
        thisThis.uploadImage3 = true;
      });
      reader.readAsText(file);
    }
  }

  addStore() {
    this.submitStoreAttempt = true;
    this.showStoreError = false;
    this.storeError = '';

    if (this.storeForm.valid) {
      this.store.userId = this.currentUser.Id;
      this.store.createdDate = new Date().toString();
      this.storeProvider.addStore(this.store).subscribe((response: any) => {
        if (response.result && response.errorMessage == null) {
          let element: HTMLElement = document.getElementById('closeStoreModal') as HTMLElement;
          element.click();
          this.storeProvider.getStoreByUserId({ userId: this.currentUser.Id }).subscribe((response: any) => {
            this.stores = response;
          });
          this.clear();
        } else if (response.errorMessage != null) {
          this.showStoreError = true;
          this.storeError = response.errorMessage;
        } else {
          this.showStoreError = true;
          this.storeError = 'We are unable to add your store right now, Please try again later.';
        }
      })
    }
  }

  setStore(store, index) {
    this.storeHeader = 'Add Store';
    if (store != undefined) {
      this.selectedStore = store;
      this.selectedStore.index = index;
      this.store.name = store.Name;
      this.store.description = store.Description;
      this.store.address = store.Address;
      this.store.cellTellPhoneNumber = store.CellTellPhoneNumber;
      this.store.id = store.Id;
      this.storeHeader = 'Edit Store';
    }
    else {
      this.selectedStore = this.commonService.dbStore;
      this.store = this.commonService.store;
    }

  }

  setProduct(product, index) {
    this.serverImgurl = '';
    this.serverImgurl1 = '';
    this.serverImgurl2 = '';
    this.serverImgurl3 = '';
    this.productHeader = 'Add Product';
    this.base64Image = this.storeProvider.getNoImageBase64();
    this.base64Image1 = this.storeProvider.getNoImageBase64();
    this.base64Image2 = this.storeProvider.getNoImageBase64();
    this.base64Image3 = this.storeProvider.getNoImageBase64();
    this.uploadImage1 = false;
    this.uploadImage1 = false;
    this.uploadImage1 = false;
    this.selectedproductCategory = [];
    if (product != undefined) {
      this.serverImgurl = "http://localhost:7777/" + product.ImageName;
      this.serverImgurl1 = "http://localhost:7777/" + product.ImageName1;
      this.serverImgurl2 = "http://localhost:7777/" + product.ImageName2;
      this.serverImgurl3 = "http://localhost:7777/" + product.ImageName3;
      this.selectedProduct = product;
      this.selectedProduct.index = index;
      this.product.name = product.Name;
      this.product.description = product.Description;
      this.product.price = product.Price;
      this.colors = [];
      this.colorsArray = [];
      this.selectedColors = [];
      if (product.Colors != null) {
        if (product.Colors != '') {
          this.product.colors = product.Colors;
          this.colorsArray = product.Colors.split(",");
          this.selectedColors = product.Colors.split(",");
          this.colors = [];
          this.colors = this.selectedColors;
        }
      }
      if (product.IsOnSpecial == 1)
        this.product.isOnSpecial = true;
      else
        this.product.isOnSpecial = false;

      if (product.StockIsAvailable == 1)
        this.product.stockIsAvailable = true;
      else
        this.product.stockIsAvailable = false;
      this.product.discount = product.Discount;
      this.product.id = product.Id;
      this.product.imageName = product.ImageName;
      this.product.imageName1 = product.ImageName1;
      this.product.imageName2 = product.ImageName2;
      this.product.imageName3 = product.ImageName3;
      this.productCategoryList.forEach(element => {
        if (element.item_text == product.Category) {
          this.product.category = element.item_text;
          this.category = [];
          this.category.push(element);
          return false;
        }
      });

      this.productHeader = 'Edit Product';
    }
    else {
      this.product = this.commonService.product;
      this.selectedProduct = this.commonService.dbProduct;
    }

  }

  viewStoreProducts(store) {
    this.products = [];
    this.showProducts = true;
    this.selectedStore = store;

    this.storeProvider.getProductsStoreById({ storeId: store.Id }).subscribe((response: any) => {
      this.products = response;
    });
  }

  deleteProduct() {
    this.storeProvider.deleteProduct({ id: this.selectedProduct.Id }).subscribe((response: any) => {
      this.products.splice(this.selectedProduct.index, 1);
    });
  }

  updateStore() {
    this.submitStoreAttempt = true;
    this.showStoreError = false;
    this.storeError = '';

    if (this.store.name != '' && this.store.description != '' && this.store.cellTellPhoneNumber != '' && this.store.address != '') {
      this.store.userId = this.currentUser.Id;
      this.store.createdDate = new Date().toString();
      this.storeProvider.updateStore(this.store).subscribe((response: any) => {
        if (response.result && response.errorMessage == null) {
          let element: HTMLElement = document.getElementById('closeStoreModal') as HTMLElement;
          element.click();
          this.storeProvider.getStoreByUserId({ userId: this.currentUser.Id }).subscribe((response: any) => {
            this.stores = response;
          });
          this.clear();
        } else if (response.errorMessage != null) {
          this.showStoreError = true;
          this.storeError = response.errorMessage;
        } else {
          this.showStoreError = true;
          this.storeError = 'We are unable to update your store right now, Please try again later.';
        }
      })
    }
  }

  addProduct() {
    this.submitProductAttempt = true;
    this.showProductError = false;
    this.productError = '';
    this.showDiscountError = false;

    if (this.productForm.valid) {
      this.colors.forEach(element => {
        this.colorsArray.push(element.item_text);
      });
      this.product.colors = this.colorsArray.toString();
      if (this.product.isOnSpecial) {
        if (Number(this.product.discount) >= Number(this.product.price)) {
          this.showDiscountError = true;
          return false;
        }
      }
      this.storeProvider.productisDuplicate({ storeId: this.selectedStore.Id, name: this.product.name }).subscribe((response: any) => {
        if (!response.result) {
          this.storeProvider.uploadProductImage(this.base64Image).subscribe((response: any) => {
            this.product.imageName = response;
            if (this.uploadImage1) {
              this.storeProvider.uploadProductImage(this.base64Image1).subscribe((response: any) => {
                this.product.imageName1 = response;
                if (this.uploadImage2) {
                  this.storeProvider.uploadProductImage(this.base64Image2).subscribe((response: any) => {
                    this.product.imageName2 = response;
                    if (this.uploadImage3) {
                      this.storeProvider.uploadProductImage(this.base64Image3).subscribe((response: any) => {
                        this.product.imageName3 = response;
                        this.productAdd();
                      })
                    } else {
                      this.image3Uploaded = true;
                      this.productAdd();
                    }
                  })
                } else {
                  this.image2Uploaded = true;
                  if (this.uploadImage3) {
                    this.storeProvider.uploadProductImage(this.base64Image3).subscribe((response: any) => {
                      this.product.imageName3 = response;
                      this.productAdd();
                    })
                  } else {
                    this.image3Uploaded = true;
                    this.productAdd();
                  }
                }
              })
            } else {
              this.image1Uploaded = true;
              if (this.uploadImage2) {
                this.storeProvider.uploadProductImage(this.base64Image2).subscribe((response: any) => {
                  this.product.imageName2 = response;
                  if (this.uploadImage3) {
                    this.storeProvider.uploadProductImage(this.base64Image3).subscribe((response: any) => {
                      this.product.imageName3 = response;
                      this.productAdd();
                    })
                  } else {
                    this.image3Uploaded = true;
                    this.productAdd();
                  }
                })
              } else {
                this.image2Uploaded = true;
                if (this.uploadImage3) {
                  this.storeProvider.uploadProductImage(this.base64Image3).subscribe((response: any) => {
                    this.product.imageName3 = response;
                    this.productAdd();
                  })
                } else {
                  this.image3Uploaded = true;
                  this.productAdd();
                }
              }
            }

          })
        } else {
          this.productError = 'Product already exists.';
          this.showProductError = true;
        }
      });
    }
  }

  updateProduct() {
    this.submitProductAttempt = true;
    this.showProductError = false;
    this.productError = '';
    this.showDiscountError = false;
    if (this.product.name != '' && this.product.description != '' && this.product.price != ''&& this.product.category != '') {
      this.colors.forEach(element => {
        this.colorsArray.push(element.item_text);
      });
      this.product.colors = this.colorsArray.toString();
      if (this.product.isOnSpecial) {
        if (Number(this.product.discount) >= Number(this.product.price)) {
          this.showDiscountError = true;
          return false;
        }
      }
      this.product.createdDate = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate();
      if (this.serverImgurl == '') {
        this.storeProvider.uploadProductImage(this.base64Image).subscribe((response: any) => {
          this.product.imageName = response;
          if (this.uploadImage1) {
            this.storeProvider.uploadProductImage(this.base64Image1).subscribe((response: any) => {
              this.product.imageName1 = response;
              if (this.uploadImage2) {
                this.storeProvider.uploadProductImage(this.base64Image2).subscribe((response: any) => {
                  this.product.imageName2 = response;
                  if (this.uploadImage3) {
                    this.storeProvider.uploadProductImage(this.base64Image3).subscribe((response: any) => {
                      this.product.imageName3 = response;
                      this.productUpdate();
                    })
                  } else {
                    this.image3Uploaded = true;
                  }
                })
              } else {
                this.image2Uploaded = true;
                if (this.uploadImage3) {
                  this.storeProvider.uploadProductImage(this.base64Image3).subscribe((response: any) => {
                    this.product.imageName3 = response;
                    this.productUpdate();
                  })
                } else {
                  this.image3Uploaded = true;
                  this.productUpdate();
                }
              }
            })
          } else {
            this.image1Uploaded = true;
            if (this.uploadImage2) {
              this.storeProvider.uploadProductImage(this.base64Image2).subscribe((response: any) => {
                this.product.imageName2 = response;
                if (this.uploadImage3) {
                  this.storeProvider.uploadProductImage(this.base64Image3).subscribe((response: any) => {
                    this.product.imageName3 = response;
                    this.productUpdate();
                  })
                } else {
                  this.image3Uploaded = true;
                  this.productUpdate();
                }
              })
            } else {
              this.image2Uploaded = true;
              if (this.uploadImage3) {
                this.storeProvider.uploadProductImage(this.base64Image3).subscribe((response: any) => {
                  this.product.imageName3 = response;
                  this.productUpdate();
                })
              } else {
                this.image3Uploaded = true;
                this.productUpdate();
              }
            }
          }
        })
      } else {
        if (this.uploadImage1) {
          this.storeProvider.uploadProductImage(this.base64Image1).subscribe((response: any) => {
            this.product.imageName1 = response;
            if (this.uploadImage2) {
              this.storeProvider.uploadProductImage(this.base64Image2).subscribe((response: any) => {
                this.product.imageName2 = response;
                if (this.uploadImage3) {
                  this.storeProvider.uploadProductImage(this.base64Image3).subscribe((response: any) => {
                    this.product.imageName3 = response;
                    this.productUpdate();
                  })
                } else {
                  this.image3Uploaded = true;
                  this.productUpdate();
                }
              })
            } else {
              this.image2Uploaded = true;
              if (this.uploadImage3) {
                this.storeProvider.uploadProductImage(this.base64Image3).subscribe((response: any) => {
                  this.product.imageName3 = response;
                  this.productUpdate();
                })
              } else {
                this.image3Uploaded = true;
                this.productUpdate();
              }
            }
          })
        } else {
          this.image1Uploaded = true;
          if (this.uploadImage2) {
            this.storeProvider.uploadProductImage(this.base64Image2).subscribe((response: any) => {
              this.product.imageName2 = response;
              if (this.uploadImage3) {
                this.storeProvider.uploadProductImage(this.base64Image3).subscribe((response: any) => {
                  this.product.imageName3 = response;
                  this.productUpdate();
                })
              } else {
                this.image3Uploaded = true;
                this.productUpdate();
              }
            })
          } else {
            this.image2Uploaded = true;
            if (this.uploadImage3) {
              this.storeProvider.uploadProductImage(this.base64Image).subscribe((response: any) => {
                this.product.imageName3 = response;
                this.productUpdate();
              })
            } else {
              this.image3Uploaded = true;
              this.productUpdate();
            }
          }
        }
      }
    }
  }

  productAdd() {
    this.product.createdDate = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate();
    this.product.storeId = this.selectedStore.Id;
    this.storeProvider.addProduct(this.product).subscribe((response: any) => {
      if (response.result && response.errorMessage == null) {
        let element: HTMLElement = document.getElementById('closeProductModal') as HTMLElement;
        element.click();
        this.clear();
        this.viewStoreProducts(this.selectedStore)
      } else {
        this.showProductError = true;
        this.productError = 'We are unable to add your product right now, Please try again later.';
      }
    })
  }

  productUpdate() {
    this.storeProvider.updateProduct(this.product).subscribe((response: any) => {
      if (response.result && response.errorMessage == null) {
        let element: HTMLElement = document.getElementById('closeProductModal') as HTMLElement;
        element.click();
        this.clear();
        this.viewStoreProducts(this.selectedStore)
      } else {
        this.showProductError = true;
        this.productError = 'We are unable to update your product right now, Please try again later.';
      }
    })
  }

  clear() {
    this.submitStoreAttempt = false;
    this.submitProductAttempt = false;
    this.showStoreError = false;
    this.storeError = '';
    this.showProductError = false;
    this.productError = '';
    this.storeHeader = 'Add Store';
    this.productHeader = 'Add Product';
    this.uploadImage1 = false;
    this.uploadImage1 = false;
    this.uploadImage1 = false;
    this.image1Uploaded = false;
    this.image2Uploaded = false;
    this.image3Uploaded = false;
    this.selectedColors = [];
    this.base64Image = this.storeProvider.getNoImageBase64();
    this.store = this.commonService.store;
    this.product = this.commonService.product;
  }

}