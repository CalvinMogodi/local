import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'; 

@Injectable()
export class CommonService {
    itemValue = new Subject();
    // Objects
    public user: any;
    public productSearch: any;    
    public payment = {
        cardcvv: '',
        cardHolder: '',
        cardExpiry: '',
        cardNumber: '',
        brand: '',
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
    public store = {
        name: '',
        description: '',
        userId: 0,
        createdDate: '',
        address: '',
        cellTellPhoneNumber: '',
        id: 0
    };
    public dbStore = {
        Name: '',
        Description: '',
        UserId: 0,
        CreatedDate: '',
        Id: 0,
        Address: '',
        CellTellPhoneNumber: '',
        index: -1
    };

    public dbProduct = {
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
     public orderAudit = {
        Id: 0,
        penddingPayment:false,
        penddingPaymentDate: new Date(),
        paymentComplete:false,
        paymentCompleteDate: new Date(),
        supplierIsPreparing:false,
        supplierIsPreparingDate: new Date(),
        supplierComplete:false,
        supplierCompleteDate: new Date(),
        waitingForCourier:false,
        waitingForCourierDate: new Date(),
        withCourier:false,
        withCourierDate: new Date(),
        complete:false,
        completeDate: new Date(),       
    };

    public orderProduct:{
        id:0,
        productId : 0
        product: any,
        orderid: 0,
        quantity: 0,
        totalPrice: 0,
        size: '',
        color: ''        
    };
    public order = {
        id: 0,
        storeId: '',
        store: this.store,
        products: [],
        createdDate: '',
        userId: 0,
        user: this.user,
        orderNumber: '',        
        totalQuantity: 0,
        pickUpAddress: '',
        dropAddress: '',
        supplierContactDeatils:'',
        userContactDeatils:'',
        orderAudit: this.orderAudit,
        auditId: 0,
        wayBill:'',
        courierName: '',
        courierId:'',
        transactionId: ''        
    };  

    // Settings
    public colorSettings = {
        singleSelection: false,
        idField: 'item_id',
        textField: 'item_text',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 5,
        allowSearchFilter: true
    };

    public productCategorySettings = {
        singleSelection: true,
        idField: 'item_id',
        textField: 'item_text',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 1,
        allowSearchFilter: true
    };

    public sizeCategorySettings = {
        singleSelection: true,
        idField: 'item_id',
        textField: 'item_text',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 1,
        allowSearchFilter: true
    };

    public sizeSettings = {
        singleSelection: false,
        idField: 'item_id',
        textField: 'item_text',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 3,
        allowSearchFilter: true
    };

    // List
    public colors = [
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
    public productCategories = [
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
    public sizeCategories = [
        { item_id: 1, item_text: 'General Sizes' },
        { item_id: 2, item_text: 'Shoes Sizes' },
        { item_id: 3, item_text: 'Pants Sizes' },
        { item_id: 4, item_text: 'Tops Sizes' },

    ];
    public generalSizes = [
        { item_id: 1, item_text: 'X-Small' },
        { item_id: 2, item_text: 'Small' },
        { item_id: 3, item_text: 'Medium' },
        { item_id: 4, item_text: 'Large' },
        { item_id: 4, item_text: 'X-Large' },
        { item_id: 4, item_text: 'XX-Large' },
    ];
    public shoesSizes = [
        { item_id: 1, item_text: 'New Born' },
        { item_id: 2, item_text: '0-1 Month' },
        { item_id: 3, item_text: '1-2 Months' },
        { item_id: 4, item_text: '2-4 Months' },
        { item_id: 5, item_text: '4-6 Months' },
        { item_id: 6, item_text: '6-9 Months' },
        { item_id: 7, item_text: '9-12 Months' },
        { item_id: 8, item_text: '12-18 Months' },
        { item_id: 9, item_text: '15-24 Months' },
        { item_id: 10, item_text: '2-3 Years' },
        { item_id: 11, item_text: '3-4 Years' },
        { item_id: 12, item_text: '4-5 Years' },
        { item_id: 13, item_text: '5-6 Years' },
        { item_id: 14, item_text: '6-7 Years' },
        { item_id: 15, item_text: '7-8 Years' },
        { item_id: 16, item_text: '8-9 Years' },
        { item_id: 17, item_text: '9-10 Years' },
        { item_id: 18, item_text: '10-11 Years' },
        { item_id: 19, item_text: '11-12 Years' },
        { item_id: 20, item_text: '12-13 Years' },
        { item_id: 21, item_text: '13-14 Years' },
        { item_id: 22, item_text: '14-15 Years' },
        { item_id: 23, item_text: '12.5 UK Size' },
        { item_id: 24, item_text: '13 UK Size' },
        { item_id: 25, item_text: '1 UK Size' },
        { item_id: 26, item_text: '1.5 UK Size' },
        { item_id: 27, item_text: '2 UK Size' },
        { item_id: 28, item_text: '2.5 UK Size' },
        { item_id: 29, item_text: '3 UK Size' },
        { item_id: 30, item_text: '3.5 UK Size' },
        { item_id: 31, item_text: '4 UK Size' },
        { item_id: 32, item_text: '4.5 UK Size' },
        { item_id: 33, item_text: '5 UK Size' },
        { item_id: 34, item_text: '5.5 UK Size' },
        { item_id: 35, item_text: '6 UK Size' },
        { item_id: 36, item_text: '6.5 UK Size' },
        { item_id: 37, item_text: '7 UK Size' },
        { item_id: 38, item_text: '7.5 UK Size' },
        { item_id: 39, item_text: '8 UK Size' },
        { item_id: 40, item_text: '8.5 UK Size' },
        { item_id: 41, item_text: '9 UK Size' },
        { item_id: 42, item_text: '9.5 UK Size' },
        { item_id: 43, item_text: '10 UK Size' },
        { item_id: 44, item_text: '10.5 UK Size' },
        { item_id: 45, item_text: '11 UK Size' },
        { item_id: 46, item_text: '11.5 UK Size' },
        { item_id: 47, item_text: '12 UK Size' },
        { item_id: 48, item_text: '12.5 UK Size' },
        { item_id: 49, item_text: '13 UK Size' },
        { item_id: 50, item_text: '13.5 UK Size' },
        { item_id: 51, item_text: '14 UK Size' },
        { item_id: 52, item_text: '14.5 UK Size' },
        { item_id: 53, item_text: '15 UK Size' },
        { item_id: 54, item_text: '15.5 UK Size' },
    ];
    public pantsSizes = [
        { item_id: 1, item_text: 'New Born' },
        { item_id: 2, item_text: '0-1 Month' },
        { item_id: 3, item_text: '1-2 Months' },
        { item_id: 4, item_text: '2-4 Months' },
        { item_id: 5, item_text: '4-6 Months' },
        { item_id: 6, item_text: '6-9 Months' },
        { item_id: 7, item_text: '9-12 Months' },
        { item_id: 8, item_text: '12-18 Months' },
        { item_id: 9, item_text: '15-24 Months' },
        { item_id: 10, item_text: '2-3 Years' },
        { item_id: 11, item_text: '3-4 Years' },
        { item_id: 12, item_text: '4-5 Years' },
        { item_id: 13, item_text: '5-6 Years' },
        { item_id: 14, item_text: '6-7 Years' },
        { item_id: 15, item_text: '7-8 Years' },
        { item_id: 16, item_text: '8-9 Years' },
        { item_id: 17, item_text: '9-10 Years' },
        { item_id: 18, item_text: '10-11 Years' },
        { item_id: 19, item_text: '11-12 Years' },
        { item_id: 20, item_text: '12-13 Years' },
        { item_id: 21, item_text: '13-14 Years' },
        { item_id: 22, item_text: '14-15 Years' },
        { item_id: 23, item_text: '28' },
        { item_id: 24, item_text: '30' },
        { item_id: 25, item_text: '32' },
        { item_id: 26, item_text: '34' },
        { item_id: 27, item_text: '36' },
        { item_id: 28, item_text: '38' },
        { item_id: 29, item_text: '40' },
        { item_id: 30, item_text: '42' },
        { item_id: 31, item_text: '44' },
        { item_id: 32, item_text: '46' },
        { item_id: 33, item_text: '48' },
        { item_id: 34, item_text: '50' },
        { item_id: 35, item_text: '52' }
    ];
    public topsSizes = [
        { item_id: 1, item_text: 'New Born' },
        { item_id: 2, item_text: '0-1 Month' },
        { item_id: 3, item_text: '1-2 Months' },
        { item_id: 4, item_text: '2-4 Months' },
        { item_id: 5, item_text: '4-6 Months' },
        { item_id: 6, item_text: '6-9 Months' },
        { item_id: 7, item_text: '9-12 Months' },
        { item_id: 8, item_text: '12-18 Months' },
        { item_id: 9, item_text: '15-24 Months' },
        { item_id: 10, item_text: '2-3 Years' },
        { item_id: 11, item_text: '3-4 Years' },
        { item_id: 12, item_text: '4-5 Years' },
        { item_id: 13, item_text: '5-6 Years' },
        { item_id: 14, item_text: '6-7 Years' },
        { item_id: 15, item_text: '7-8 Years' },
        { item_id: 16, item_text: '8-9 Years' },
        { item_id: 17, item_text: '9-10 Years' },
        { item_id: 18, item_text: '10-11 Years' },
        { item_id: 19, item_text: '11-12 Years' },
        { item_id: 20, item_text: '12-13 Years' },
        { item_id: 21, item_text: '13-14 Years' },
        { item_id: 22, item_text: '14-15 Years' },
        { item_id: 23, item_text: 'X-Small' },
        { item_id: 24, item_text: 'Small' },
        { item_id: 25, item_text: 'Medium' },
        { item_id: 26, item_text: 'Large' },
        { item_id: 27, item_text: 'X-Large' },
        { item_id: 28, item_text: 'XX-Large' },
    ];

    constructor() {
    }

    // Object 
    set cartList(value:any) {
   this.itemValue.next(value); // this will make sure to tell every subscriber about the change.
   sessionStorage.setItem('cartList', value);
 }

 get cartList() {
   return sessionStorage.getItem('cartList');
 }

    assginUser(user: {}): any {
        this.user = user;
    }

    getUser(): any {
        return this.user;
    }

    assginProductSearch(productSearch: {}): any {
        this.productSearch = productSearch;
    }

    getProductSearch(): any {
        return this.productSearch;
    }
}