// je récupère les données stockées dans le localstorage, puis je les repasse en tant qu'objet. (.parse)
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

function displayItemsOnCart(item) {
    
}