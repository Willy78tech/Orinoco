// Imports
const utils = new Utils();

// Classe
class Product {
    constructor() {
        this.container = document.getElementById('section__products');
        this.basketCounter = document.getElementById('counter');
        this.productId = utils.getUrlParams()[0][1];
        this.productLens = null;
        this.basket = utils.getStorage('basket');
        this.data = [];
    }

    // Récupération des données du produit par l'ID fourni en URL
    getProduct() {
        const that = this;

        utils.get('http://localhost:3000/api/cameras/' + that.productId).then(
            (product) => {
                that.data += '<div class="row">';
                that.data += '   <div class="col col__large">';
                that.data += '       <div class="section__product">';
                that.data += '           <img class="section__product-picture" src="' + product.imageUrl + '"/>';
                that.data += '           <h3 class="section__product-title">' + product.name + '</h3>';
                that.data += '           <div class="section__product-content">';
                that.data += '               <p>' + product.description + '</p>';
                that.data += '               <p><b>Couleurs :</b>';

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
                that.data += '           </div>';
                that.data += '       </div>';
                that.data += '   </div>';
                that.data += '   <div class="col col__small">';
                that.data += '       <div class="section__product">';
                that.data += '           <h4 class="section__product-title">Choisir une lentille</h4>';
                that.data += '           <div class="section__product-content">';
                that.data += '               <p>Afin que votre appareil corresponde parfaitement à vos attentes, veuillez nous indiquer votre type de lentille !</p>';
                that.data += '               <select class="input" onchange="updateItemLens(this)">';
                that.data += '                      <option value="" disabled selected hidden>Choisissez un type de lentille</option>';

                for (let lens of product.lenses) {
                    that.data += '                  <option value="' + lens + '">' + lens + '</option>';
                }

                that.data += '               </select>';
                that.data += '           </div>';
                that.data += '       </div>';
                that.data += '       <div class="section__product">';
                that.data += '           <h4 class="section__product-title">Ajouter au panier</h4>';
                that.data += '           <div class="section__product-content">';
                that.data += '               <p>Si ce produit vous plait, cliquez simplement sur le bouton ci-dessous pour l\'ajouter à votre panier !</p>';
                that.data += '               <button class="button" onclick="addToBasket(\'' + product._id + '\', \'' + product.name + '\', \'' + product.price + '\', \'' + product.imageUrl + '\', \'' + product.description + '\');"><i class="fas fa-shopping-cart"></i> Ajouter au panier</button>';
                that.data += '           </div>';
                that.data += '       </div>';
                that.data += '   </div>';
                that.data += '</div>';

                return that.container.innerHTML = that.data;
            },
            (error) => {
                return that.container.innerHTML = '<p>Une erreur est survenue au moment du chargement du produit. Veuillez vous assurer que votre API est activée !</p>';
            }
        );
    }
}