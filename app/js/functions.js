/*
* SCRIPT qui regroupe l'ensemble des fonctions utilisées sur le site
*/


/* 
* CREATLISTTEDDIES()
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
            productName.innerText = cameras[i].name;

        let productPrice = document.createElement('p');
            productPrice.innerHTML = cameras[i].price/100 + " €";

        let productDescription = document.createElement('p');
            productDescription.innerText = cameras[i].description;

        let btnProduct = document.createElement("a");
            btnProduct.classList.add("btn");
            btnProduct.textContent = "En savoir plus";
            btnProduct.setAttribute("href", "ficheProduit.html#" + cameras[i]._id);
            

        listBears.append(productCard);
        productCard.append(productLeftDiv,productRightDiv);
        productRightDiv.append(productName,productPrice,productDescription, btnProduct);
    };
}