/*Appel de l'API*/
const getCams = async function () {
    const response = await fetch(url);
    return await response.json();
}
getCams();

/*##########################################################*/

/*LISTE INDEX*/
async function listeCams() {
    const cams = await getCams();

    /*On vient cibler la balise section ayant l'id "Produits"*/
    let produits = document.getElementById("Produits");

    /*On crée l'affichage de la liste des produits proposés qui sera présente sur l'index*/
    cams.forEach((cameras) => {
        /*Utilisation de la fonction Create*/
        let produitContainer = create("div", "class", "col-12 col-lg-4");
        let produitB1 = create("div", "class", "card");
        let produitB2 = create("div", "class", "card-body");
        let produitNom = create("h2", "class", "card-title");
        let produitLien = create("a", "href", "produit.html?id=" + cameras._id);
        let produitPrix = create("h4", "class", "Prixproduit");
        let produitImage = create("img", "src", cameras.imageUrl, "class", "card-img-top",);

    /*Attributs suplémentaires*/
        produitImage.setAttribute("alt", "image du produit");
        produitImage.setAttribute("class", "card-img-top");
        produitLien.setAttribute("class", "btn btn-primary");
        
    /*Hiérarchisation des élements crées*/ 
        produits.appendChild(produitContainer);
        produitContainer.appendChild(produitB1);
        produitContainer.appendChild(produitB2);
        produitB1.appendChild(produitImage);
        produitB2.appendChild(produitNom);
        produitB2.appendChild(produitPrix);
        produitB2.appendChild(produitLien);

    /*Attribution des données aux élements créees*/
        produitNom.textContent = cameras.name;
        produitPrix.textContent = cameras.price / 100 + " " + "€";
        produitLien.textContent = "Description du produit";
    });
};
listeCams();

