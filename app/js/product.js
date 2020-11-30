/*
* SCRIPT JavaScript - Affichage dynamique des résultats de l'API (GET)
*/

/*
* URL de l'API
* URL avec l'id d'un produit
*/ 
const url = "http://localhost:3000/api/cameras";
const hash = window.location.hash;
const idHash = hash.replace('#', '/');
const nomUrl = url + idHash;

/*
* LISTE DES MODELES
*/
// Séléction de la balise div conteneur des modèles
const listPhotos = document.getElementById('fromServer');
/*
* Appel de la fonction getCameras() en passant l'url de l'API en paramètre
* - then: si réussi, parse la réponse, affiche la réponse dans la console et appel la fonction createListCameras() en prenant en paramètre la réponse parsée
* - catch: si echec, affiche l'erreur dans la console
* - then: affiche la fin de l'exécution de la requête dans la console
*/
getResp(url).then(response => {
    let cameras = JSON.parse(response);
    console.log(cameras);
    createListCameras(cameras);
}).catch(error => {
    console.error(error);
}).then(function(){
    console.log("Fin des requêtes Ajax");
});



/*
* DETAIL D'UN MODELE
*/
// Séléction de la balise div conteneur des détails du produit
const productCard = document.getElementById('productCard');
/*
* Appel de la fonction getCamera() en passant l'url de l'API + id en paramètre
* - then: si réussi, parse la réponse, affiche la réponse dans la console et appel la fonction detailProduct() en prenant en paramètre la réponse parsée
* - catch: si echec, affiche l'erreur dans la console
* - then: affiche la fin de l'exécution de la requête dans la console
*/
getResp(nomUrl).then(function(response){
    let camera = JSON.parse(response);
    console.log(camera);
    detailProduct(camera);
}).catch(error => {
    console.error(error);
})
.then(function(){
    console.log("Fin des requêtes Ajax");
})