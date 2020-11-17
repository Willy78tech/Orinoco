const carts = document.querySelectorAll('.add-cart');


let product = [
    {
        name: 'Asahiflex Pentax',
        tag: 'AsahiflexPentax',
        price: 75,
        image: 'images/vcam_1.jpg',
        inCart: 0,
    },
    {
        name: 'Réflex Argentique',
        tag: 'RéflexArgentique',
        price: 85,
        image: 'images/vcam_2.jpg',
        inCart: 0,
    },
    {
        name: 'Folding',
        tag: 'Folding',
        price: 250,
        image: 'images/vcam_3.jpg',
        inCart: 0,
    },
    {
        name: 'Leica M2',
        tag: 'LeicaM2',
        price: 100,
        image: 'images/vcam_4.jpg',
        inCart: 0,
    },
    {
        name: 'Pentax K1000',
        tag: 'PentaxK1000',
        price: 110,
        image: 'images/vcam_5.jpg',
        inCart: 0,
    },
];

for (let i=0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers();
    })
}


function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    } 
}

function cartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    if(productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }
}

onLoadCartNumbers();