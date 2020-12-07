let total = 0; //On stock le prix total dans cette variable afin de l'afficher dans le tableau et dans l'URL

/*Affichage du panier utilisateur dans la page "panier"*/
function affichagePanier (){
    if (panier.length > 0){
        document.getElementById("panierVide").remove();

        /*Nous allons présenter le panier à l'utilisateut sous forme de tableau que nous plaçons dans la section "Sectionpanier"*/
        let tableauSection = document.getElementById("Sectionpanier");

        //Création du tableau
        let tableauPanier = create("table", "class", "tableauPanier");
        let tableauHeaderLigne = create("tr", "class", "tableauHeaderLigne");
        let tableauHeaderImage = document.createElement("th");
        let tableauHeaderNom = document.createElement("th");
        let tableauHeaderPrix = document.createElement("th");
        let tableauHeaderAction = document.createElement("th");
        let tableauFooterLigne = create("tr", "class", "tableauFooterLigne");
        let tableauFooterPrixTotal = create("th", "class", "tableauFooterPrixTotal");

        /*Attributs suplémentaires*/
        tableauFooterPrixTotal.setAttribute("colspan", "4");

        /*Hiérarchisation des élements crées*/
        tableauSection.appendChild(tableauPanier);
        tableauPanier.appendChild(tableauHeaderLigne);
        tableauHeaderLigne.appendChild(tableauHeaderImage);
        tableauHeaderLigne.appendChild(tableauHeaderNom);
        tableauHeaderLigne.appendChild(tableauHeaderPrix);
        tableauHeaderLigne.appendChild(tableauHeaderAction);

        /*Attribution des données aux élements créees*/
        tableauHeaderImage.textContent = "Article(s)";
        tableauHeaderNom.textContent = "Nom(s)";
        tableauHeaderPrix.textContent = "Prix";
        tableauHeaderAction.textContent = "Action";

        /*Création d'une ligne dans le tableau pour chaque produit composant le panier*/
        JSON.parse(localStorage.getItem("monPanier")).forEach((article, index) => {
            let articleLigne = create("tr", "id", "articleLigne");
            let articleImage = create("img", "id", "articleImage");
            let articleNom = create("td", "id", "articleNom");
            let articlePrix = create("td", "id", "articlePrix");
            let articleAction = create("i", "id", index);

            /*Attributs suplémentaires*/
            articleImage.setAttribute("src", article.imageUrl);
            articleAction.setAttribute("alt", "Retirer l'article du panier.");
            articleAction.setAttribute("class", "fas fa-trash-alt"); 
            //Logo poubelle pour supprimer l'article du panier.
            
            /*Suppression de l'article en cliquant sur la poubelle*/
            articleAction.addEventListener("click", function(event){
                suppressionArticle(event.target.id);
            });
            
            /*Hiérarchisation des élements crées*/
            tableauPanier.appendChild(articleLigne);
            articleLigne.appendChild(articleImage);
            articleLigne.appendChild(articleNom);
            articleLigne.appendChild(articlePrix);
            articleLigne.appendChild(articleAction);

            /*Attribution des données aux élements créees*/
            articleNom.textContent = article.name;
            articlePrix.textContent = article.price / 100 + " " + "€";
        });

        /*Création de la ligne du bas du tableau affichant le prix total de la commande*/
        tableauPanier.appendChild(tableauFooterLigne);
        tableauFooterLigne.appendChild(tableauFooterPrixTotal);
        
        JSON.parse(localStorage.getItem("monPanier")).forEach(priceArticle => {
            total += priceArticle.price / 100;
        });

        tableauFooterPrixTotal.textContent = "Prix total: " + total + "€";        
    }
}
affichagePanier ();