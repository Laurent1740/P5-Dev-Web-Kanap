
const cart = [];
recoverItemsFromLS();
console.log(cart);

function recoverItemsFromLS() {
    const numberOfProduct = localStorage.lenght;
    for (let i = 0; i > numberOfProduct; i++){
        const item = localStorage.getItem(localStorage.key(i));
        const itemObject = JSON.parse(item);
        cart.push(itemObject);
    }
}