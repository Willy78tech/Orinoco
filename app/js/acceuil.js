// Imports
const utils = new Utils();

// Classe
class Home {
    constructor() {
        this.container = document.getElementById('section__products');
        this.basketCounter = document.getElementById('counter');
        this.basket = utils.getStorage('basket');
        this.data = [];
    }

    // Récupération des produits
    getProducts() {
        const that = this;

        utils.get('http://localhost:3000/api/cameras').then(
            (products) => {
                let i = 0;
                for (let product of products) {
                    if (i == 0) {
                        that.data += '<div class="row">';
                    }

                    that.data += '   <div class="col col__small">';
                    that.data += '       <div class="section__product">';
                    that.data += '           <img class="section__product-picture" src="' + product.imageUrl + '"/>';
                    that.data += '           <h3 class="section__product-title">' + product.name + '</h3>';
                    that.data += '           <div class="section__product-content">';
                    that.data += '               <p><b>lentilles :</b>';

                    let j = 1;
                    for (let lens of product.lenses) {
                        if (j !== product.lenses.length) {
                            that.data += ' ' + lens + ',';
                        } else {
                            that.data += ' ' + lens + '.';
                        }
                        j++;
                    }

                    that.data += '               </p>';
                    that.data += '               <p><b>Prix :</b> ' + product.price + '€</p>';
                    that.data += '               <a class="button" href="./produit.html?id=' + product._id + '" role="button">En savoir plus</a>';
                    that.data += '           </div>';
                    that.data += '       </div>';
                    that.data += '   </div>';

                    if (i == 2) {
                        that.data += '</div>';
                    }

                    if (i < 2) {
                        i++;
                    } else {
                        i = 0;
                    }
                }

                return that.container.innerHTML = that.data;
            },
            (error) => {
                return that.container.innerHTML = '<p>Une erreur est survenue au moment du chargement des produits. Veuillez vous assurer que votre API est activée !</p>';
            }
        );
    }
}

// Instance
const home = new Home();
home.getProducts();
utils.countBasketItems();