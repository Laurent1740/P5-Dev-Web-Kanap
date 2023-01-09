// je récupère les données stockées dans le localstorage, puis je les repasse en tant qu'objet. (.parse)
// mavariable="blblabla"

// monHTML = `
//     <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
//         <div class="cart__item__img">
//             <img src="../images/product01.jpg" alt="Photographie d'un canapé">
//         </div>
//         <div class="cart__item__content">
//             <div class="cart__item__content__description">
//             <h2>${product.}</h2>
//             <p>Vert</p>
//             <p>42,00 €</p>
//             </div>
//             <div class="cart__item__content__settings">
//             <div class="cart__item__content__settings__quantity">
//                 <p>Qté : </p>
//                 <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
//             </div>
//             <div class="cart__item__content__settings__delete">
//                 <p class="deleteItem">Supprimer</p>
//             </div>
//             </div>
//         </div>
//     </article>
// `


function recoverItemsFromLS() {
    const numberOfProduct = localStorage.length;
    const cart = [];
    console.log(cart);
    cart.forEach((item) => displayItemsOnCart(item))
    for (let i = 0; i < numberOfProduct; i++){
        const item = localStorage.getItem(localStorage.key(i));
        const itemObject = JSON.parse(item);
        cart.push(itemObject);
    }
}
recoverItemsFromLS();

// J'integre mes élements dans la page cart.html
function displayItemsOnCart(item) {
    // const {altTxt, color, id, imageUrl, price, quantity} = item;

    const articleHtml = createArticle(item);
    console.log(articleHtml);
}

// Je crée mon / mes article(s) --mais pour le moment, ça marche pas =D
function createArticle(item){
    const articleHtml = document.createElement("article");
    articleHtml.classList.add("cart__item")
    articleHtml.dataset.id = item.id;
    articleHtml.dataset.color = item.color;
    return articleHtml;
}
// Je crée mon / mes image(s)
// function createImage(item){
//     const divHtml = document.createElement("div.cart__item__img");
//     articleHtml.appendChild(divHtml);
//     const imgHtml = document.createElement("img")
//     imgHtml.src = imageUrl;
//     imgHtml.alt = altTxt;
//     divHtml.appendchild(imgHtml);
// }