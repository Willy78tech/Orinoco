let carts = document.querySelectorAll('.add-cart');

// Déclaration des objets appareils photos dans mon tableau produit
let products = [
    {
        name: "Asahiflex Pentax",
        tag: "AsahiflexPentax",
        price: 75,
        inCart: 0
    },
    {
        name: "Réflex Argentique",
        tag: "RéflexArgentique",
        price: 85,
        inCart: 0
    },
    {
        name: "Folding",
        tag: "Folding",
        price: 250,        
        inCart: 0
    },
    {
        name: "Leica M2",
        tag: "LeicaM2",
        price: 100,
        inCart: 0
    },
    {
        name: "Pentax K1000",
        tag: "PentaxK1000",
        price: 110,
        inCart: 0
    }
];

// boucle d'ajout au panier à chaque événement de clic sur le bouton ajouter
for (let i=0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

// fonction permettant de garder le nombre d'articles dans le panier si on recharge la page
function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    } 
}

// fonction permettant de déterminer le nombre d'articles dans le panier
function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    if(productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }
    setItems(product);
}

// fonction permettant de déterminer les différents types d'articles dans le panier
function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null) {
        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }        
    cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

// fonction pour définir le prix du panier
function totalCost(product) {
    let cartCost = localStorage.getItem("totalCost");
    

    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    } else {
        localStorage.setItem("totalCost", product.price);
    }
}

onLoadCartNumbers();