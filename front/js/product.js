async function main(){
    fetchData();
 }


function fetchIdFromUrl(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('id');
}

// je récupère les données du back
function fetchData(){
    const id = fetchIdFromUrl();
    fetch(`http://localhost:3000/api/products/${id}`)
        .then(function(res){
            if(res.ok){
                return res.json();
            }
        })
        .then(function(datas){
            displayProduct(datas);
            
        })
}
// Je remplis les différente balise présente dans la page product.html
function displayProduct(sofa){
    const {altTxt, colors, description, imageUrl, name, price, _id} = sofa;
    
    const imageHtml = document.querySelector(".item__img");
    const imgHTML = document.createElement("img");
    imgHTML.src = imageUrl;
    imgHTML.alt = altTxt;
    imageHtml.appendChild(imgHTML);

    document.getElementById("title").textContent = name;
    document.getElementById("price").textContent = price;
    document.getElementById("description").textContent = description;
    displayColorValue(colors);
}
// je remplis les options des différentes couleurs
function displayColorValue(colors){
    let colorProduct = document.getElementById("colors");

    colors.forEach((color) => {
    
        const productColor = document.createElement("option");
        productColor.value = color;
        productColor.textContent = color;
        colorProduct.appendChild(productColor); 
    });
}
function addToCart(){
    console.log("j'ajoute au panier");
    // verifier la quantité n'est pas a vide
    // verifier que la couleur ne soit pas a vide
    // si vide, afficher un message erreur
    // SI pas d'erreur, faire reste du traitement.
    // verifier s'il existe un panier existant 

    // si c'est pas le cas on le créé
    // rajouter le produit et quantité dans ce panier.
    // stocker ce panier dans un endroit approprié pour le récuperer ensuite.

    // SI le panier existe déja, on vérifie que le produit et couleur sont déja a l'interieur
    // si c'est le cas, mettre la quantité à jour.
    // sinon ajouter.

    // quand tout est ok, on redirige vers la page caddie.
}
main();
document.addEventListener('click', function(event){
    if(event.target.id === "addToCart"){
        addToCart();
        // alert("ajouté au panier !");
    }
})