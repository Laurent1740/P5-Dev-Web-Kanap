var product;

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
        product = datas
        displayProduct(datas);        
    })
}
// Je remplis les différente balise présente dans la page product.html
function displayProduct(sofa){
    const {altTxt, colors, description, imageUrl, name, price, _id} = sofa;
    itemPrice = price;
    imgUrl = imageUrl;
    altText = altTxt;
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
    const color = document.querySelector("#colors").value;
    const quantity = document.querySelector("#quantity").value;
    if (isOrderUnexist(color, quantity)) return;
    saveData(color, quantity);
    
}
// verifier la quantité n'est pas a vide
// verifier que la couleur ne soit pas a vide
// si vide, afficher un message erreur
function isOrderUnexist(color, quantity){
    if (quantity == null || quantity == 0 || color == null || color === '') {
        alert("Veuillez sélectionner une couleur et une quantité");
        return true;
    }
}
// SI pas d'erreur, faire reste du traitement.
// verifier s'il existe un panier existant 
// si c'est pas le cas on le créé
function saveData(color, quantity) { 
    // vérifier  l'existante du panier
    let cart = [];
    if(localStorage.getItem("cart")){
        cart = JSON.parse(localStorage.getItem("cart"))
    }
    console.log(cart);
    const id = fetchIdFromUrl();    
    const itemToAdd = {
        id : id,
        color : color,
        quantity : quantity,
        name : product.name
    }
    // parcourir le tableau cart (ou trouver une autre méthode)
    // pour vérifier que ni l'id ni la déclinaison ne se trouve deja dedans
    if (cart.length === 0) {
        // je push le produit
        cart.push(itemToAdd);
    } else {
    
        let isInCart = false;
        cart.forEach((cartItem)=> {
            if(id === cartItem.id && color === cartItem.color ){
                // on update les quantités
                cartItem.quantity = parseInt(cartItem.quantity) + parseInt(quantity)
                isInCart = true;
            } 
        })
        if (!isInCart) cart.push(itemToAdd);
    }
    console.log('cart', cart)
    localStorage.setItem("cart", JSON.stringify(cart));
    redirectToCart();
}

// quand tout est ok, on redirige vers la page caddie.
function redirectToCart(){
    window.location.href = "cart.html";
}

main();
document.addEventListener('click', function(event){
    if(event.target.id === "addToCart"){
        addToCart();
    }
})