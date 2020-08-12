var app = (function (exports) {
    'use strict';

    class Grid {
        constructor(panel, frameTemplate) {
            this.panel = panel;
            this.frameTemplate = frameTemplate;
        }
    }

    class Vehicle {
        constructor(img, name, price) {
            this.img = img;
            this.name = name;
            this.price = price;
        }
    }

    class ElementListener {
        constructor(field, name, boundCallback) {
            this.field = field;
            this.name = name;
            this.boundCallback = boundCallback;
        }
        listen() {
            this.field.addEventListener(this.name, this.boundCallback);
        }
        removeListener() {
            this.field.removeEventListener(this.name, this.boundCallback);
        }
    }

    function numberifyPrice(price) {
        return +price.replace(/[.$]/g, '');
    }
    function stringifyPrice(price) {
        return `${price}`.split(/(?=(?:...)*$)/).join('.') + '$';
    }

    class ShoppingItem {
        constructor(shopValues, image, name, price, removeButton, domElement) {
            this.shopValues = shopValues;
            this.image = image;
            this.name = name;
            this.price = price;
            this.removeButton = removeButton;
            this.domElement = domElement;
            this.listeners = [
                new ElementListener(this.removeButton, 'click', this.removeItem.bind(this)),
            ];
            this.listeners.forEach(el => el.listen());
        }
        static of(element, shopValues) {
            return new ShoppingItem(shopValues, element.querySelector('.cart-item-image'), element.querySelector('.cart-item-name'), element.querySelector('.cart-item-price'), element.querySelector('.remove'), element.querySelector('.cart-item'));
        }
        removeItem() {
            this.listeners.forEach(el => el.removeListener());
            this.domElement.remove();
            this.shopValues.decreaseValues(numberifyPrice(this.price.textContent || ''));
        }
    }

    class Shop {
        constructor(shoppingWindow, cartItemTemplate, shopValues) {
            this.shoppingWindow = shoppingWindow;
            this.cartItemTemplate = cartItemTemplate;
            this.shopValues = shopValues;
            this.items = [];
            this.shoppingWindowItemsContainer = this.shoppingWindow.querySelector('#items');
        }
        addVehicleToCart(item) {
            this.shopValues.increaseValues(item.price);
            this.addShoppingWindowItem(item);
        }
        clearAllItems() {
            this.items.forEach(item => item.removeItem());
            this.shopValues.nullifyValues();
        }
        toggleShoppingList() {
            this.shoppingWindow.classList.toggle('move-x');
        }
        addShoppingWindowItem(item) {
            const newItem = this.cartItemTemplate.content.cloneNode(true);
            const shoppingItem = ShoppingItem.of(newItem, this.shopValues);
            shoppingItem.image.src = item.img;
            shoppingItem.name.textContent = item.name;
            shoppingItem.price.textContent = stringifyPrice(item.price);
            this.items.push(shoppingItem);
            this.shoppingWindowItemsContainer.appendChild(newItem);
        }
    }
    Shop.cars = [
        new Vehicle('../resources/vehicles/car1.jpg', 'Ferrari', 500000),
        new Vehicle('../resources/vehicles/car2.jpg', 'Lamborghini', 499000)
    ];
    Shop.bikes = [
        new Vehicle('../resources/vehicles/bike1.jpg', 'Kawasaki', 100000),
        new Vehicle('../resources/vehicles/bike2.jpg', 'Samurai', 99000)
    ];
    Shop.bicycles = [
        new Vehicle('../resources/vehicles/bicycle1.jpg', 'Gucci', 5000),
        new Vehicle('../resources/vehicles/bicycle2.jpg', 'Tesla', 10000)
    ];
    Shop.planes = [
        new Vehicle('../resources/vehicles/plane1.jpg', 'Boeing', 1000000),
        new Vehicle('../resources/vehicles/plane2.jpg', 'S7', 900000)
    ];
    Shop.allVehicles = [
        ...Shop.cars,
        ...Shop.bikes,
        ...Shop.bicycles,
        ...Shop.planes
    ];

    class Card {
        constructor(img, name, price, shopIcon) {
            this.img = img;
            this.name = name;
            this.price = price;
            this.shopIcon = shopIcon;
        }
    }

    class Page {
        constructor(shop, grid) {
            this.shop = shop;
            this.grid = grid;
        }
        setCards() {
            Shop.allVehicles
                .map((vehicle) => {
                const clone = this.grid.frameTemplate.content.cloneNode(true);
                const card = new Card(clone.querySelector('.frame-image'), clone.querySelector('.name'), clone.querySelector('.price'), clone.querySelector('.shop-icon'));
                card.img.src = vehicle.img;
                card.name.textContent = vehicle.name;
                card.price.textContent = stringifyPrice(vehicle.price);
                card.shopIcon.addEventListener('click', () => {
                    this.shop.addVehicleToCart(vehicle);
                });
                return clone;
            })
                .forEach(card => this.grid.panel.appendChild(card));
        }
        toggleShoppingList() {
            this.shop.toggleShoppingList();
        }
        clearShoppingCart() {
            this.shop.clearAllItems();
        }
    }

    class ShopValues {
        constructor(quantity, totals, totalPrice = 0, totalItems = 0) {
            this.quantity = quantity;
            this.totals = totals;
            this.totalPrice = totalPrice;
            this.totalItems = totalItems;
        }
        decreaseValues(price) {
            this.decrementQuantity();
            this.subtractTotal(price);
        }
        increaseValues(price) {
            this.incrementQuantity();
            this.addTotal(price);
        }
        nullifyValues() {
            this.nullifyTotal();
            this.nullifyQuantity();
        }
        incrementQuantity() {
            this.quantity.textContent = `${++this.totalItems}`;
        }
        addTotal(price) {
            this.totalPrice += price;
            this.totals.forEach(total => total.textContent = `${this.totalPrice}`);
        }
        decrementQuantity() {
            this.quantity.textContent = `${--this.totalItems}`;
        }
        subtractTotal(price) {
            this.totalPrice -= price;
            this.totals.forEach(total => total.textContent = `${this.totalPrice}`);
        }
        nullifyTotal() {
            this.totalPrice = 0;
            this.totals.forEach(total => total.textContent = `${this.totalPrice}`);
        }
        nullifyQuantity() {
            this.totalItems = 0;
            this.quantity.textContent = '0';
        }
    }

    const shopValues = new ShopValues(document.getElementById('quantity'), Array.from(document.getElementsByClassName('amount')));
    const shop = new Shop(document.getElementById('shopping-window'), document.getElementById('cart-item-template'), shopValues);
    const grid = new Grid(document.getElementById('flex-grid'), document.getElementById('frame-template'));
    const page = new Page(shop, grid);

    exports.page = page;

    return exports;

}({}));
