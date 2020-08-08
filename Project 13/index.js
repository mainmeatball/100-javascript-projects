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

    var Project13;
    (function (Project13) {
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
        Project13.ElementListener = ElementListener;
    })(Project13 || (Project13 = {}));

    var ElementListener = Project13.ElementListener;
    class ShoppingItem {
        constructor(shop, image, name, price, removeButton, domElement) {
            this.shop = shop;
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
        static of(element, shop) {
            return new ShoppingItem(shop, element.querySelector('.cart-item-image'), element.querySelector('.cart-item-name'), element.querySelector('.cart-item-price'), element.querySelector('.remove'), element.querySelector('.cart-item'));
        }
        ;
        removeItem() {
            this.listeners.forEach(el => el.removeListener());
            this.domElement.remove();
            this.shop.subtractTotal(+(this.price.textContent?.replace(/[.$]/g, '') || ''));
            this.shop.decrementQuantity();
        }
    }

    class Shop {
        constructor(quantity, totals, cartPreview, shoppingWindow, cartItemTemplate) {
            this.totalPrice = 0;
            this.totalItems = 0;
            this.items = [];
            this.quantity = quantity;
            this.totals = totals;
            this.cartPreview = cartPreview;
            this.shoppingWindow = shoppingWindow;
            this.shoppingWindowItemsContainer = shoppingWindow.querySelector('#items');
            this.cartItemTemplate = cartItemTemplate;
        }
        addVehicleToCart(item) {
            this.incrementQuantity();
            this.addTotal(+(item.price.replace(/[.$]/g, '')));
            this.addShoppingWindowItem(item);
        }
        incrementQuantity() {
            this.quantity.textContent = '' + ++this.totalItems;
        }
        decrementQuantity() {
            this.quantity.textContent = '' + --this.totalItems;
        }
        addTotal(price) {
            this.totalPrice += price;
            this.totals.forEach(total => total.textContent = '' + this.totalPrice);
        }
        subtractTotal(price) {
            this.totalPrice -= price;
            this.totals.forEach(total => total.textContent = '' + this.totalPrice);
        }
        nullifyTotal() {
            this.totalPrice = 0;
            this.totals.forEach(total => total.textContent = '' + this.totalPrice);
        }
        nullifyQuantity() {
            this.totalItems = 0;
            this.quantity.textContent = '0';
        }
        addShoppingWindowItem(item) {
            const newItem = this.cartItemTemplate.content.cloneNode(true);
            const shoppingItem = ShoppingItem.of(newItem, this);
            shoppingItem.image.src = item.img;
            shoppingItem.name.textContent = item.name;
            shoppingItem.price.textContent = item.price;
            this.items.push(shoppingItem);
            this.shoppingWindowItemsContainer.appendChild(newItem);
        }
        clearAllItems() {
            this.items.forEach(item => item.removeItem());
            this.nullifyQuantity();
            this.nullifyTotal();
        }
    }
    Shop.cars = [
        new Vehicle('resources/car1.jpg', 'Ferrari', '500.000$'),
        new Vehicle('resources/car2.jpg', 'Lamborghini', '499.000$')
    ];
    Shop.bikes = [
        new Vehicle('resources/bike1.jpg', 'Kawasaki', '100.000$'),
        new Vehicle('resources/bike2.jpg', 'Samurai', '99.000$')
    ];
    Shop.bicycles = [
        new Vehicle('resources/bicycle1.jpg', 'Gucci', '5.000$'),
        new Vehicle('resources/bicycle2.jpg', 'Tesla', '10.000$')
    ];
    Shop.planes = [
        new Vehicle('resources/plane1.jpg', 'Boeing', '1.000.000$'),
        new Vehicle('resources/plane2.jpg', 'S7', '900.000$')
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
                .map(vehicle => {
                const clone = this.grid.frameTemplate.content.cloneNode(true);
                const card = new Card(clone.querySelector('.frame-image'), clone.querySelector('.name'), clone.querySelector('.price'), clone.querySelector('.shop-icon'));
                card.img.src = vehicle.img;
                card.name.textContent = vehicle.name;
                card.price.textContent = vehicle.price;
                card.shopIcon.addEventListener('click', () => {
                    this.shop.addVehicleToCart(vehicle);
                });
                return clone;
            })
                .forEach(card => this.grid.panel.appendChild(card));
        }
        toggleShoppingList() {
            this.shop.shoppingWindow.classList.toggle('move-x');
        }
        clearShoppingCart() {
            this.shop.clearAllItems();
        }
    }

    const shop = new Shop(document.getElementById('quantity'), Array.from(document.getElementsByClassName('amount')), document.getElementById('cart-preview'), document.getElementById('shopping-window'), document.getElementById('cart-item-template'));
    const grid = new Grid(document.getElementById('flex-grid'), document.getElementById('frame-template'));
    const page = new Page(shop, grid);

    exports.page = page;

    return exports;

}({}));
