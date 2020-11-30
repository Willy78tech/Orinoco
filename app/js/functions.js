/*
* SCRIPT qui regroupe l'ensemble des fonctions utilisées sur le site
*/


/* 
* CREATLISTCameras()
* Fonction qui permet de créer les éléments du DOM grâce à une boucle for, qui afficheront les diverses propriétés de la réponse(argument)
*/
function createListCameras(cameras){
    for(let i = 0; i < cameras.length; i++) { 
        let productCard = document.createElement('section');
            productCard.classList.add('row', 'product');

        let productLeftDiv = document.createElement('div');
            productLeftDiv.classList.add("col-12", "col-md-5", "image-product")
            productLeftDiv.src = cameras[i].imageUrl;
            productLeftDiv.style.background = "url(" + productLeftDiv.src + ") no-repeat";
            productLeftDiv.style.backgroundPosition = "center";
            productLeftDiv.style.backgroundSize = "cover";

        let productRightDiv = document.createElement('div');
            productRightDiv.classList.add("col-12", "col-md-7", "title-product");

        let productName = document.createElement('h2');
            productName.innerText = teddies[i].name;

        let productPrice = document.createElement('p');
            productPrice.innerHTML = cameras[i].price + " €";

        let productDescription = document.createElement('p');
            productDescription.innerText = cameras[i].description;

        let btnProduct = document.createElement("a");
            btnProduct.classList.add("btn");
            btnProduct.textContent = "En savoir plus";
            btnProduct.setAttribute("href", "produit.html#" + cameras[i]._id);
            

        listBears.append(productCard);
        productCard.append(productLeftDiv,productRightDiv);
        productRightDiv.append(productName,productPrice,productDescription, btnProduct);
    };
}


/* 
* DETAILPRODUCT() 
* Fonction qui permet de créer les éléments du DOM, qui afficheront les diverses propriétés de la réponse(argument)
*/
function detailProduct(camera){
    // Création des éléments dans le DOM
    let productTitle = document.createElement("h1");
        productTitle.textContent = camera.name;

    let productImage = document.createElement("div");
        productImage.classList.add("productImagePageDetail");
        productImage.src = camera.imageUrl;
        productImage.style.background = "url(" + productImage.src + ") no-repeat";
        productImage.style.backgroundPosition = "center";
        productImage.style.backgroundSize = "cover";

    let productPrice = document.createElement("p");
        productPrice.textContent = camera.price + " €";

    let productDescription = document.createElement("p");
        productDescription.innerHTML = camera.description;

    let lensDiv = document.createElement("div");

    let choiceLabel = document.createElement("label");
        choiceLabel.innerText = "Choisissez une lentille: ";

    let colorsSelector = document.createElement("select");
        lensessSelector.setAttribute("class", "lentille_photo");
    let lenses = camera.lenses;
    // Boucle for pour afficher sous forme de choix d'options, les différentes couleurs disponibles du produit
    for (let i = 0; i < lenses.length; i++) {
        let myOption = document.createElement('option');
        myOption.textContent = lenses[i];
        myOption.setAttribute("value", lenses[i]);
        lensesSelector.appendChild(myOption);                
    };

    const mySubmit = document.querySelector('.btn_add');
    
    lensDiv.prepend(choiceLabel, lensesSelector);
    productCard.prepend(productTitle, productImage, productPrice, productDescription, lensDiv);
    
    /*
    * Création d'un évènement lorsque l'on clique sur le bouton "ajouter au panier"
    * Création de l'objet "objJson" = information du produit ajouté
    * Stockage des informations dans le localStorage
    */ 
    mySubmit.addEventListener('click', function (event) {
        let objJson = {
            id: camera._id,
            name: camera.name,
            image: camera.imageUrl,
            lenses: lensesSelector.value,
            price: camera.price,
            qte: 1
        };
        
        let tableOfProducts = localStorage.getItem("obj");

        //On vérifie si le tableau contenant les articles ajoutés existe
        if(!tableOfProducts){
            //Si elle n'existe pas : on créer le tableau et on ajoute un produit
            tableOfProducts = [];
            objJson.qte = 1;
            tableOfProducts.push(objJson);
        }else{ 
            //Si elle existe : on parse le tableau et on l'affiche dans la console
            tableOfProducts = JSON.parse(tableOfProducts);
            console.log(tableOfProducts);
            //On vérifie un des éléments du tableau possède le même id et la même couleur que le produit sélectionné
            if(tableOfProducts.find(choice => choice.id === objJson.id &&  choice.lenses === objJson.lenses)){
                //Si oui: boucle for qui passe dans le tableau et qui incrémente de 1 la quantité du produit qui possède le même id et la même couleur que le produit sélectionné
                for(var i = 0; i < tableOfProducts.length; i++){
                    if(objJson.id === tableOfProducts[i].id && objJson.lenses === tableOfProducts[i].lenses){
                        tableOfProducts[i].qte++;
                        break;
                    }
                }
            }else{
                //Si il n'existe pas: on définit la quantité du produit à 1 et on l'ajoute au tableau
                objJson.qte = 1;
                tableOfProducts.push(objJson);
            }
        }
        //On encode le tableau au format JSON
        tableOfProducts = JSON.stringify(tableOfProducts);

        //On renvoie le tableau au localStorage
        localStorage.setItem("obj", tableOfProducts);
        
        /*
        * Fenêtre PoPup
        * Affiche un choix: voir le panier ou continuer les achats
        */
        let popupAdded = document.getElementById("popupAdd");
        if(popupAdded.classList.contains("hide")){
            popupAdded.classList.remove("hide");
            document.body.style.overflow = "hidden";
        }else{
            popupAdded.classList.add("hide");
        }
    });
}