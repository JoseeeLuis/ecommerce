let cart = []; // Initialize the cart variable
let counterDiv = document.querySelector(".counter");
let productsInCartCounter = document.querySelector(".productsInCart"); 
let quantityProducts;
let addNotificationDiv= true;
loadCartFromLocalStorage(); 

function loadCartFromLocalStorage() {
    const cartData = localStorage.getItem('cart');
    if (cartData) {
        cart = JSON.parse(cartData);
    }
}

async function fetchData() {
    
    const apiURL = "https://64f659ae2b07270f705e6753.mockapi.io/api/products";

    try {
        const apiResponse = await fetch(apiURL);
        const jsonData = await apiResponse.json();

      // Ahora 'cardFeaturedDataArray' contendrá los datos de la API en el formato deseado
    console.log(jsonData);
    return await jsonData
    } catch (error) {
        console.error("Error al obtener los datos de la API:", error);
    }
}

async function initializer() {
    
    const data = await fetchData() 
        console.log(data)


        data.forEach((product) => {
            if (product.featured == true) {
                const productCard = createProductCard(
                    product.title,
                    product.image,
                    product.previousPrice,
                    product.price,
                    product.id,
                );

                addProductToContainer(productCard,'.products');
            }
        });


    // Sale Products Card
    data.forEach((product) => {
        if (product.onSale == true) {
            const saleCards = createSaleCard(
                product.title,
                product.image,
                product.previousPrice,
                product.price,
                product.id,
                `${Math.round(((product.previousPrice - product.price) / product.previousPrice) * 100)}%`,
            );
            console.log(saleCards);
            addProductToContainer(saleCards, ".saleCards");
        }
    });


    // Horizontal card
    data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Tomar los primeros n elementos (por ejemplo, los 5 productos más recientes)
    const numRecentProducts = 4; // Puedes ajustar este número según tus necesidades
    const recentProducts = data.slice(0, numRecentProducts);

    // Crear tarjetas de productos para los productos más recientes y agregarlos al contenedor
    recentProducts.forEach((product) => {
    const productCard = createHorizontalCard (
        product.title,
        product.image,
        product.stars,
        product.reviews,
        product.id,
        product.previousPrice,
        product.price
    );

    addProductToContainer(productCard, '.productsH');
    });

    const btns = document.querySelectorAll(".btn-Cart");
    btns.forEach(function (btn) {
        btn.addEventListener('click', function (evento) {
            console.log(cart);
            saveCartToLocalStorage(); // Guardar el carrito en el almacenamiento local
            createNotification();
            productsInCartCounter.textContent = cart.length.toString(); // Actualizar el contador de productos en el carrito
        });
    });

}   

function createElementWithClass(tagName, className) {
    let element = document.createElement(tagName);
    element.className = className;
    return element;
}

function updateCartNotification() {
    const notification = document.querySelector(".productsInCart");

    if (notification) {
        // Calcula la cantidad de productos en el carrito
        const productCount = cart.length > 9 ? '9+' : cart.length;
        notification.textContent = productCount;
    }
}

function createProductCard(title, imgSrc, oldPrice, newPrice, identifierNumber) {
    const cardDiv = document.createElement("div");
    cardDiv.className = "card";

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
    oldPricePara.textContent = `${oldPrice}`;

    const newPricePara = document.createElement("p");
    newPricePara.className = "newPrice";
    newPricePara.textContent = `$${newPrice}`;

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
    addButton.addEventListener("click", function (event) {
        console.log("Click");

        // Crear un objeto con la información del producto
        const productInfo = {
            title: title,
            newPrice: newPrice,
        };

        pushToCart(productInfo)

    });

    bgCardDiv.appendChild(addButton);

    cardDiv.appendChild(bgCardDiv);
    bgCardDiv.appendChild(pictureDiv);
    bgCardDiv.appendChild(productInfoDiv);
    bgCardDiv.appendChild(priceDiv);

    return cardDiv; // Devuelve la tarjeta de producto creada
}

function createSaleCard(productTitle, productImgSrc, productOldPrice, productNewPrice, productIdentifier, productDiscount) {
    const saleCardsContainer = document.querySelector('.saleCards');

    const cardSaleDiv = document.createElement('div');
    cardSaleDiv.className = 'cardSale';

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
    oldPricePara.textContent = `$${productOldPrice}`;

    const newPricePara = document.createElement('p');
    newPricePara.className = 'newPrice';
    newPricePara.textContent = `$${productNewPrice}`;

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

    addButton.addEventListener("click", function (event) {
        console.log("Click");

        // Crear un objeto con la información del producto
        const productInfo = {
            title: productTitle,
            newPrice: productNewPrice,
        };

        pushToCart(productInfo)
    });

    bgCardSaleDiv.appendChild(pictureDiv);
    bgCardSaleDiv.appendChild(labelContainerDiv);
    bgCardSaleDiv.appendChild(productInfoDiv);
    bgCardSaleDiv.appendChild(priceDiv);
    bgCardSaleDiv.appendChild(addButton);

    cardSaleDiv.appendChild(bgCardSaleDiv);

    saleCardsContainer.appendChild(cardSaleDiv);
    return cardSaleDiv; 
}
//TO DO pasar array como parametro 
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

    for (let i = 1; i <= 5; i++) {
        const starImg = document.createElement('img');
        starImg.src = i <= productRating ? 'img/star.svg' : 'img/notstar.svg';
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

    const aboutProduct={
        title:productTitle,
        price:productNewPrice
    }

    addToCartButton.addEventListener("click", function (event) {
        pushToCart(aboutProduct)
    });


    return horizontalCardDiv ;
}

function saveCartToLocalStorage() {
    const cartJSON = JSON.stringify(cart);
    localStorage.setItem('cart', cartJSON);
}

function createNotification() {
    const notification = document.createElement("div");
    notification.className = "productsInCart"; // Establece la clase como "productsInCart"

    // Calcula la cantidad de productos en el carrito
    const productCount = cart.length > 9 ? '9+' : cart.length;
    notification.textContent = productCount;

    // Selecciona el elemento con clase "counter" en el DOM y agrega la notificación
    const counterDiv = document.querySelector(".counter");
    if (counterDiv) {
        counterDiv.appendChild(notification);
    } else {
        console.error('No se encontró el contenedor de productos en el carrito.');
    }
}

function addProductToContainer(productCard, container) {
    const productsContainer = document.querySelector(container);
    if (productsContainer) {
        productsContainer.appendChild(productCard);
    } else {
        console.error('No se encontró el contenedor de productos.');
    }
}

function pushToCart(item) {
    cart.push(item);
}

//Carga de Pagina
window.addEventListener("load", (event) => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
        cart = JSON.parse(savedCart); // Restaura el carrito desde el almacenamiento local
        updateCartNotification();
        createNotification(); // Actualiza la notificación del carrito
    }

    console.log("La página se ha cargado completamente");
    initializer();
});

