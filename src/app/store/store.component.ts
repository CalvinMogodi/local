import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { StoreProvider } from '../providers/store';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  // color multi select
  public dropdownList = [];
  public selectedColors = [];
  public dropdownSettings = {};

  // category select
  public categorydropdownList = [];
  public selectedcategory = [];
  public categorydropdownSettings = {};

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
  public selectedStore = {
    Name: '',
    Description: '',
    UserId: 0,
    CreatedDate: '',
    Id: 0,
    Address: '',
    CellTellPhoneNumber: '',
    index: -1
  };
  public showDiscountError = false;
  public category: any;
  public colors: any;
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
  public store = {
    name: '',
    description: '',
    userId: 0,
    createdDate: '',
    address: '',
    cellTellPhoneNumber: '',
    id: 0
  };
  public product = {
    name: '',
    description: '',
    price: '',
    stockIsAvailable: false,
    category: '',
    colors: '',
    isOnSpecial: false,
    discount: '',
    imageName: '',
    imageName1: '',
    imageName2: '',
    imageName3: '',
    storeId: 0,
    createdDate: '',
    id: 0,
  };
  public selectedProduct = {
    Name: '',
    Description: '',
    Price: '',
    IsOnSpecial: 'false',
    StockIsAvailable: 'false',
    Category: '',
    Colors: '',
    Discount: '',
    ImageName: '',
    ImageName1: '',
    ImageName2: '',
    ImageName3: '',
    StoreId: 0,
    CreatedDate: '',
    Id: 0,
    index: -1
  }
  constructor(public formBuilder: FormBuilder, public storeProvider: StoreProvider, public router: Router) {

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
      discount: [this.product.discount],
      isOnSpecial: [this.product.isOnSpecial]
    });

    this.storeProvider.getStoreByUserId({ userId: this.currentUser.Id }).subscribe((response: any) => {
      this.stores = response;
    });
    // colors selction
    this.dropdownList = [
      { item_id: 1, item_text: 'Red' },
      { item_id: 2, item_text: 'Green' },
      { item_id: 3, item_text: 'Yellow' },
      { item_id: 4, item_text: 'Blue' },
      { item_id: 5, item_text: 'Orange' },
      { item_id: 6, item_text: 'Purple' },
      { item_id: 7, item_text: 'Cyan' },
      { item_id: 8, item_text: 'Magenta' },
      { item_id: 9, item_text: 'Lime' },
      { item_id: 10, item_text: 'Pink' },
      { item_id: 11, item_text: 'Teal' },
      { item_id: 12, item_text: 'Lavender' },
      { item_id: 13, item_text: 'Brown' },
      { item_id: 14, item_text: 'Beige' },
      { item_id: 15, item_text: 'Maroon' },
      { item_id: 16, item_text: 'Mint' },
      { item_id: 17, item_text: 'Olive' },
      { item_id: 18, item_text: 'Coral' },
      { item_id: 19, item_text: 'Navy' },
      { item_id: 20, item_text: 'Orange' },
      { item_id: 21, item_text: 'Red' },
      { item_id: 22, item_text: 'Grey' },
      { item_id: 23, item_text: 'White' },
      { item_id: 24, item_text: 'Black' }
    ];
    this.selectedColors = [];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    // category selection
    this.categorydropdownList = [
      { item_id: 1, item_text: 'TV & Video' },
      { item_id: 2, item_text: 'Home Audio & Theater' },
      { item_id: 3, item_text: 'Camera, Photo & Video' },
      { item_id: 4, item_text: 'Cell Phones & Accessories' },
      { item_id: 5, item_text: 'Headphones' },
      { item_id: 6, item_text: 'Video Games' },
      { item_id: 7, item_text: 'Bluetooth & Wireless Speakers' },
      { item_id: 8, item_text: 'Car Electronics' },
      { item_id: 9, item_text: 'Musical Instruments' },
      { item_id: 10, item_text: 'Wearable Technology' },
      { item_id: 11, item_text: 'Electronics Showcase' },
      { item_id: 12, item_text: 'Computers, Tablets, & PC Products' },
      { item_id: 13, item_text: 'Monitors' },
      { item_id: 14, item_text: 'Accessories' },
      { item_id: 15, item_text: 'Networking' },
      { item_id: 16, item_text: 'Drives & Storage' },
      { item_id: 17, item_text: 'Computer Parts & Components' },
      { item_id: 18, item_text: 'Software' },
      { item_id: 19, item_text: 'Printers & Ink' },
      { item_id: 20, item_text: 'Office & School Supplies' },
      { item_id: 21, item_text: 'Trade In Your Electronics' },
      { item_id: 22, item_text: 'Toys, Kids & Baby' },
      { item_id: 23, item_text: 'Toys & Games' },
      { item_id: 24, item_text: 'Baby' },
      { item_id: 25, item_text: 'Video Games for Kids' },
      { item_id: 26, item_text: 'Kids Birthdays' },
      { item_id: 27, item_text: 'For Girls' },
      { item_id: 28, item_text: 'For Boys' },
      { item_id: 29, item_text: 'For Baby' },
      { item_id: 30, item_text: 'Pet Profile' },
      { item_id: 31, item_text: 'Dog Supplies' },
      { item_id: 32, item_text: 'Dog Food' },
      { item_id: 33, item_text: 'Cat Supplies' },
      { item_id: 34, item_text: 'Cat Food' },
      { item_id: 35, item_text: 'Fish & Aquatic Pets' },
      { item_id: 36, item_text: 'Small Animals' },
      { item_id: 37, item_text: 'Birds' },
      { item_id: 38, item_text: 'Women' },
      { item_id: 39, item_text: 'Men' },
      { item_id: 40, item_text: 'Girls' },
      { item_id: 41, item_text: 'Boys' },
      { item_id: 42, item_text: 'Luggage' },
      { item_id: 43, item_text: 'Prime Wardrobe' },
      { item_id: 44, item_text: 'Automotive Parts & Accessories' },
      { item_id: 45, item_text: 'Automotive Tools & Equipment' },
      { item_id: 46, item_text: 'Car/Vehicle Electronics & GPS' },
      { item_id: 47, item_text: 'Tires & Wheels' },
      { item_id: 48, item_text: 'Motorcycle & Powersports' },
      { item_id: 49, item_text: 'Vehicles' },
      { item_id: 50, item_text: 'Your Garage' },
      { item_id: 51, item_text: 'Industrial Supplies' },
      { item_id: 52, item_text: 'Lab & Scientific' },
      { item_id: 53, item_text: 'Janitorial' },
      { item_id: 54, item_text: 'Safety' },
      { item_id: 55, item_text: 'Food Service' },
      { item_id: 56, item_text: 'Material Handling' },
      { item_id: 57, item_text: 'Kitchen & Dining' },
      { item_id: 58, item_text: 'Furniture' },
      { item_id: 59, item_text: 'Bed & Bath' },
      { item_id: 60, item_text: 'Appliances' },
      { item_id: 61, item_text: 'Garden & Outdoor' },
      { item_id: 62, item_text: 'Fine Art' },
      { item_id: 61, item_text: 'Arts, Crafts & Sewing' },
      { item_id: 62, item_text: 'Pet Supplies' },
      { item_id: 63, item_text: 'Wedding Registry' },
      { item_id: 64, item_text: 'Event & Party Supplies' },
      { item_id: 65, item_text: 'Home Improvement' },
      { item_id: 66, item_text: 'Power & Hand Tools' },
      { item_id: 67, item_text: 'Lamps & Light Fixtures' },
      { item_id: 68, item_text: 'Kitchen & Bath Fixtures' },
      { item_id: 69, item_text: 'Hardware' },
      { item_id: 70, item_text: 'Smart Home' },
      { item_id: 71, item_text: 'All Beauty' },
      { item_id: 72, item_text: 'Luxury Beauty' },
      { item_id: 73, item_text: 'Professional Skin Care' },
      { item_id: 74, item_text: 'Salon & Spa' },
      { item_id: 75, item_text: 'Men Grooming' },
      { item_id: 76, item_text: 'Health Household & Baby Care' },
      { item_id: 77, item_text: 'Vitamins & Dietary Supplements' },
      { item_id: 78, item_text: 'Vitamins & Dietary Supplements' },
      { item_id: 79, item_text: 'Subscribe & Save' },
      { item_id: 80, item_text: 'Prime Pantry' },
      { item_id: 81, item_text: 'Sample Boxes' },
      { item_id: 82, item_text: 'All Handmade' },
      { item_id: 83, item_text: 'Jewelry' },
      { item_id: 84, item_text: 'Handbags & Accessories' },
      { item_id: 85, item_text: 'Beauty & Grooming' },
      { item_id: 86, item_text: 'Home Decor' },
      { item_id: 87, item_text: 'Artwork' },
      { item_id: 88, item_text: 'Stationery & Party Supplies' },
      { item_id: 89, item_text: 'Kitchen & Dining' },
      { item_id: 90, item_text: 'Furniture' },
      { item_id: 91, item_text: 'Wedding' },
      { item_id: 92, item_text: 'Athletic Clothing' },
      { item_id: 93, item_text: 'Exercise & Fitness' },
      { item_id: 94, item_text: 'Hunting & Fishing' },
      { item_id: 95, item_text: 'Team Sports' },
      { item_id: 96, item_text: 'Fan Shop' },
      { item_id: 97, item_text: 'Golf' },
      { item_id: 98, item_text: 'Leisure Sports & Game Room' },
      { item_id: 99, item_text: 'Sports Collectibles' },
      { item_id: 100, item_text: 'All Sports & Fitness' },
      { item_id: 101, item_text: 'New Gear Innovations' },
      { item_id: 102, item_text: 'Camping & Hiking' },
      { item_id: 103, item_text: 'Cycling' },
      { item_id: 104, item_text: 'Outdoor Clothing' },
      { item_id: 105, item_text: 'Scooters, Skateboards & Skates' },
      { item_id: 106, item_text: 'Winter Sports' },
      { item_id: 107, item_text: 'Climbing' },
      { item_id: 108, item_text: 'Accessories' },
      { item_id: 109, item_text: 'All Outdoor Recreation' }
    ];
    this.selectedcategory = [];
    this.categorydropdownSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  oncategoryItemSelect(item: any) {
    this.product.category = item.item_text;
  }

  onItemSelect(item: any) {
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
      this.selectedStore = {
        Name: '',
        Description: '',
        UserId: 0,
        CreatedDate: '',
        Address: '',
        CellTellPhoneNumber: '',
        Id: 0,
        index: -1
      };
      this.store = {
        name: '',
        description: '',
        userId: 0,
        createdDate: '',
        address: '',
        cellTellPhoneNumber: '',
        id: 0
      };
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
    this.selectedcategory = [];
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
      this.categorydropdownList.forEach(element => {
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
      this.product = {
        name: '',
        description: '',
        price: '',
        stockIsAvailable: false,
        category: '',
        colors: '',
        isOnSpecial: false,
        discount: '',
        imageName: '',
        imageName1: '',
        imageName2: '',
        imageName3: '',
        storeId: 0,
        createdDate: '',
        id: 0,
      };
      this.selectedProduct = {
        Id: 0,
        Name: '',
        Description: '',
        Price: '',
        StockIsAvailable: 'false',
        Category: '',
        Colors: '',
        IsOnSpecial: '',
        Discount: '',
        ImageName: '',
        ImageName1: '',
        ImageName2: '',
        ImageName3: '',
        StoreId: 0,
        CreatedDate: '',
        index: -1
      }
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

    this.store = {
      name: '',
      description: '',
      userId: 0,
      createdDate: '',
      address: '',
      cellTellPhoneNumber: '',
      id: 0
    };
    this.product = {
      name: '',
      description: '',
      price: '',
      stockIsAvailable: false,
      category: '',
      colors: '',
      isOnSpecial: false,
      discount: '',
      imageName: '',
      imageName1: '',
      imageName2: '',
      imageName3: '',
      storeId: 0,
      createdDate: '',
      id: 0,
    };
  }

}