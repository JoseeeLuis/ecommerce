// script.js
let cart = []; // Array para almacenar los productos seleccionados
let counterDiv = document.querySelector(".counter");
let productInCart;
let quantityProducts;
let addNotificationDiv= true;

function getProductInfo(item) {
    return item;
}

function initializer() {
    const btns = document.querySelectorAll(".btn-Cart");


        // Featured Product Cards
    const cardFeaturedDataArray = [
        {
            title: 'Lorem ipsum dolor sit amet consectetur',
            imgSrc: 'img/example pic 2.png',
            oldPrice: '$232',
            newPrice: '$2321',
            identifierNumber: '82839823', // Corregido el nombre de la propiedad
        },
        {
            title: 'Lorem hiral uranio dolor sit amet consectetur',
            imgSrc: 'img/example pic 2.png',
            oldPrice: '$232',
            newPrice: '$2321',
            identifierNumber: '82839823', // Corregido el nombre de la propiedad
        },
        {
            title: 'Lorem ipsum dolor sit amet consectetur',
            imgSrc: 'img/example pic 2.png',
            oldPrice: '$232',
            newPrice: '$2321',
            identifierNumber: '82839823', // Corregido el nombre de la propiedad
        },
            {
            title: 'Lorem ipsum dolor sit amet consectetur',
            imgSrc: 'img/example pic 2.png',
            oldPrice: '$232',
            newPrice: '$2321',
            identifierNumber: '82839823', // Corregido el nombre de la propiedad
        }
    ];

    cardFeaturedDataArray.forEach((data) => {
        const productCard = createProductCard(
            data.title,
            data.imgSrc,
            data.oldPrice,
            data.newPrice,
            data.identifierNumber
        );

        addProductToContainer(productCard); // Agrega la tarjeta de producto al contenedor
    });


    // Sale Products Card
    const cardSaleDataArray = [
        {
            title: 'Lorem ipsum dolor sit amet consectetur',
            imgSrc: 'img/example pic 2.png',
            oldPrice: '$232',
            newPrice: '$2321',
            identifier: 'Identifier number 1',
            productDiscount:`20%`
        },
        {
            title: 'Limude ehfue dolor sit amet consectetur',
            imgSrc: 'img/example pic 2.png',
            oldPrice: '$232',
            newPrice: '$2321',
            identifier: 'fdvfvfd number 1',
            productDiscount:`20%`
        },
    ];



    cardSaleDataArray.forEach((data) => {
        createSaleCard(
            data.title,
            data.imgSrc,
            data.oldPrice,
            data.newPrice,
            data.identifier ,
            data.productDiscount
        );
    });


    //Horizontal card

    const cardHDataArray = [
        {
            title: 'Lorem ipsum dolor sit amet consectetur',
            imgSrc: 'img/example pic 1.png',
            rating: 5,
            numberRating: 126,
            identifier: 'Identifier number 1',
            oldPrice: '$232',
            newPrice: '$2321'
        },
        {
            title: 'Lorem ipsum dolor sit amet consectetur',
            imgSrc: 'img/example pic 1.png',
            rating: 5,
            numberRating: 126,
            identifier: 'Identifier number 1',
            oldPrice: '$232',
            newPrice: '$2321'
        }
    ];

    cardHDataArray.forEach((data) => {
        createHorizontalCard(
            data.title,
            data.imgSrc,
            data.rating,
            data.numberRating,
            data.identifier,
            data.oldPrice,
            data.newPrice
        );
    });





    btns.forEach(function (btn) {
        btn.addEventListener("click", function (evento) {
            // Aquí debes obtener la información del producto seleccionado
            const productInfo = getProductInfo(evento.target); // Implementa la lógica para obtener la información correcta
            cart.push(productInfo); // Agrega el producto al carrito
            updateCartNotification(); // Actualiza la notificación del carrito
        });
    });
}

function convertToString(object) {
    return JSON.stringify(object);
}

function createElementWithClass(tagName, className) {
    let element = document.createElement(tagName);
    element.className = className;
    return element;
}

function createNotification() {
    const notification = document.createElement("div");
    notification.className = "productsInCart";
    
    const quantityProducts = document.createElement("p");
    quantityProducts.className = "quantityProducts";
    quantityProducts.textContent = cart.length > 9 ? '9+' : cart.length;
    
    notification.appendChild(quantityProducts);
    counterDiv.appendChild(notification);
}

function changeQuantityProducts(number) {
    const quantityProducts = document.querySelector(".quantityProducts");
    if (quantityProducts) {
        quantityProducts.textContent = number;
    }
}

function updateCartNotification() {
    const notification = document.querySelector(".productsInCart");
    
    if (!notification) {
        // Si la notificación no existe, créala
        createNotification();
    }
    
    const quantityProducts = cart.length > 9 ? '9+' : cart.length; // Verifica si hay más de 9 productos
    changeQuantityProducts(quantityProducts);
}   

function pushToCart(item) {
    cart.push(item);
}

function saveProduct() {
    let productInfo = getProductInfo;
    pushToCart(productInfo);
    allProducts = convertToString(products);
    localStorage.setItem("cart", allProducts);
}

function createProductCard(title, imgSrc, oldPrice, newPrice, identifierNumber) {
    const cardDiv = document.createElement("div");
    cardDiv.id = "card";

    const bgCardDiv = document.createElement("div");
    bgCardDiv.className = "bgCard";

    const pictureDiv = document.createElement("div");
    pictureDiv.className = "picture";

    const img = document.createElement("img");
    img.src = imgSrc;
    img.alt = "product";

    pictureDiv.appendChild(img);

    const productInfoDiv = document.createElement("div");
    productInfoDiv.className = "productInfo";

    const titleProduct = document.createElement("p");
    titleProduct.className = "titleProduct";
    titleProduct.textContent = title;

    const identifierNumberPara = document.createElement("p");
    identifierNumberPara.className = "identifierNumber";
    identifierNumberPara.textContent = identifierNumber;

    productInfoDiv.appendChild(titleProduct);
    productInfoDiv.appendChild(identifierNumberPara);

    const priceDiv = document.createElement("div");
    priceDiv.className = "price";

    const oldPricePara = document.createElement("p");
    oldPricePara.className = "oldPrice";
    oldPricePara.textContent = oldPrice;

    const newPricePara = document.createElement("p");
    newPricePara.className = "newPrice";
    newPricePara.textContent = newPrice;

    priceDiv.appendChild(oldPricePara);
    priceDiv.appendChild(newPricePara);

    const addButton = document.createElement("button");
    addButton.className = "addCart btn-Cart";

    const shoppingBagIcon = document.createElement("img");
    shoppingBagIcon.className = "shoppingBag";
    shoppingBagIcon.src = "img/shopping-bag-w.svg";
    shoppingBagIcon.alt = "bag";

    const plusIcon = document.createElement("img");
    plusIcon.src = "img/plus.svg";
    plusIcon.alt = "plus";

    addButton.appendChild(shoppingBagIcon);
    addButton.appendChild(plusIcon);

    bgCardDiv.appendChild(addButton);

    cardDiv.appendChild(bgCardDiv);
    bgCardDiv.appendChild(pictureDiv);
    bgCardDiv.appendChild(productInfoDiv);
    bgCardDiv.appendChild(priceDiv);

    return cardDiv; // Devuelve la tarjeta de producto creada
}

function addProductToContainer(productCard) {
    const productsContainer = document.querySelector('.products');
    if (productsContainer) {
        productsContainer.appendChild(productCard);
    } else {
        console.error('No se encontró el contenedor de productos.');
    }
}

function createSaleCard(productTitle, productImgSrc, productOldPrice, productNewPrice, productIdentifier, productDiscount) {
    const saleCardsContainer = document.querySelector('.saleCards');

    const cardSaleDiv = document.createElement('div');
    cardSaleDiv.id = 'cardSale';

    const bgCardSaleDiv = document.createElement('div');
    bgCardSaleDiv.className = 'bgCardSale';

    const pictureDiv = document.createElement('div');
    pictureDiv.className = 'picture';

    const img = document.createElement('img');
    img.src = productImgSrc;
    img.alt = 'product';

    pictureDiv.appendChild(img);

    const labelContainerDiv = document.createElement('div');
    labelContainerDiv.className = 'labelContainer';

    const labelImg = document.createElement('img');
    labelImg.className = 'label';
    labelImg.src = 'img/label.png';
    labelImg.alt = 'label';

    const labelTextPara = document.createElement('p');
    labelTextPara.className = 'labelText';
    labelTextPara.textContent = productDiscount;

    labelContainerDiv.appendChild(labelImg);
    labelContainerDiv.appendChild(labelTextPara);

    const productInfoDiv = document.createElement('div');
    productInfoDiv.className = 'productInfo';

    const titleProductPara = document.createElement('p');
    titleProductPara.className = 'titleProduct';
    titleProductPara.textContent = productTitle;

    const identifierNumberPara = document.createElement('p');
    identifierNumberPara.className = 'identifierNumber';
    identifierNumberPara.textContent = productIdentifier;

    productInfoDiv.appendChild(titleProductPara);
    productInfoDiv.appendChild(identifierNumberPara);

    const priceDiv = document.createElement('div');
    priceDiv.className = 'price';

    const oldPricePara = document.createElement('p');
    oldPricePara.className = 'oldPrice';
    oldPricePara.textContent = productOldPrice;

    const newPricePara = document.createElement('p');
    newPricePara.className = 'newPrice';
    newPricePara.textContent = productNewPrice;

    priceDiv.appendChild(oldPricePara);
    priceDiv.appendChild(newPricePara);

    const addButton = document.createElement('button');
    addButton.className = 'addCart btn-Cart';

    const shoppingBagIcon = document.createElement('img');
    shoppingBagIcon.className = 'shoppingBag';
    shoppingBagIcon.src = 'img/shopping-bag-w.svg';
    shoppingBagIcon.alt = 'bag';

    const plusIcon = document.createElement('img');
    plusIcon.src = 'img/plus.svg';
    plusIcon.alt = 'plus';

    addButton.appendChild(shoppingBagIcon);
    addButton.appendChild(plusIcon);

    bgCardSaleDiv.appendChild(pictureDiv);
    bgCardSaleDiv.appendChild(labelContainerDiv);
    bgCardSaleDiv.appendChild(productInfoDiv);
    bgCardSaleDiv.appendChild(priceDiv);
    bgCardSaleDiv.appendChild(addButton);

    cardSaleDiv.appendChild(bgCardSaleDiv);

    saleCardsContainer.appendChild(cardSaleDiv);
}

function createHorizontalCard(productTitle, productImgSrc, productRating, productNumberRating, productIdentifier, productOldPrice, productNewPrice) {
    const horizontalCardContainer = document.querySelector('.productsH');

    const horizontalCardDiv = document.createElement('div');
    horizontalCardDiv.className = 'horizontalCard';

    const contentHDiv = document.createElement('div');
    contentHDiv.className = 'contentH';

    const horizontalPictureDiv = document.createElement('div');
    horizontalPictureDiv.className = 'horizontalPicture';

    const img = document.createElement('img');
    img.src = productImgSrc;
    img.alt = 'product';

    horizontalPictureDiv.appendChild(img);

    const productInfoHorizontalDiv = document.createElement('div');
    productInfoHorizontalDiv.className = 'productInfoHorizontal';

    const titleAndRatingDiv = document.createElement('div');
    titleAndRatingDiv.className = 'titleAndRating';

    const titleProductPara = document.createElement('p');
    titleProductPara.className = 'titleProduct';
    titleProductPara.textContent = productTitle;

    const ratingDiv = document.createElement('div');
    ratingDiv.className = 'rating';

    const starsDiv = document.createElement('div');
    starsDiv.className = 'stars';

    for (let i = 0; i < productRating; i++) {
        const starImg = document.createElement('img');
        starImg.src = 'img/star.svg';
        starImg.alt = 'star';
        starsDiv.appendChild(starImg);
    }

    const numberRatingPara = document.createElement('p');
    numberRatingPara.className = 'numberRating';
    numberRatingPara.textContent = productNumberRating;

    ratingDiv.appendChild(starsDiv);
    ratingDiv.appendChild(numberRatingPara);

    titleAndRatingDiv.appendChild(titleProductPara);
    titleAndRatingDiv.appendChild(ratingDiv);

    productInfoHorizontalDiv.appendChild(titleAndRatingDiv);

    const identifierNumberHorizontalPara = document.createElement('p');
    identifierNumberHorizontalPara.className = 'identifierNumberHorizontal';
    identifierNumberHorizontalPara.textContent = productIdentifier;

    const horizontalPriceDiv = document.createElement('div');
    horizontalPriceDiv.className = 'horizontalPrice';

    const oldPricePara = document.createElement('p');
    oldPricePara.className = 'oldPrice';
    oldPricePara.textContent = productOldPrice;

    const newPricePara = document.createElement('p');
    newPricePara.className = 'newPrice';
    newPricePara.textContent = productNewPrice;

    horizontalPriceDiv.appendChild(oldPricePara);
    horizontalPriceDiv.appendChild(newPricePara);

    productInfoHorizontalDiv.appendChild(identifierNumberHorizontalPara);
    productInfoHorizontalDiv.appendChild(horizontalPriceDiv);

    contentHDiv.appendChild(horizontalPictureDiv);
    contentHDiv.appendChild(productInfoHorizontalDiv);

    horizontalCardDiv.appendChild(contentHDiv);

    // Mover los botones al div horizontalCard
    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'actions';

    const deliveryButton = document.createElement('button');
    deliveryButton.className = 'delivery';

    const deliveryImg = document.createElement('img');
    deliveryImg.src = 'img/truck.svg';
    deliveryImg.alt = 'delivery';

    const deliveryTitlePara = document.createElement('p');
    deliveryTitlePara.className = 'titleButton';
    deliveryTitlePara.textContent = 'Order delivery';

    deliveryButton.appendChild(deliveryImg);
    deliveryButton.appendChild(deliveryTitlePara);

    const addToCartButton = document.createElement('button');
    addToCartButton.className = 'addCartH btn-Cart';

    const cartImg = document.createElement('img');
    cartImg.src = 'img/shopping-bag.svg';
    cartImg.alt = 'bag';

    const cartTitlePara = document.createElement('p');
    cartTitlePara.className = 'titleButton';
    cartTitlePara.textContent = 'Add to cart';

    addToCartButton.appendChild(cartImg);
    addToCartButton.appendChild(cartTitlePara);

    actionsDiv.appendChild(deliveryButton);
    actionsDiv.appendChild(addToCartButton);

    horizontalCardDiv.appendChild(actionsDiv);

    horizontalCardContainer.appendChild(horizontalCardDiv);
}

//Carga de Pagina
window.addEventListener("load", (event) => {
    console.log("La página se ha cargado completamente");
    initializer();
});

