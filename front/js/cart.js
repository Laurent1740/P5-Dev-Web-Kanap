async function main(){
    fetchData();
 }
 // recuperation du tableau dans le back
function fetchData(){
  fetch("http://localhost:3000/api/products")
      .then(function(res){
          if(res.ok){
              return res.json();
          }
      })
      .then(function(datas){
        filterDatas(datas);
      })
}

// récupérer les données du localstorage puis je filtre mon tableau en fonction des Id
function filterDatas(dataFromApi){
  let filteredCart = []
  let itemsFromStorage = JSON.parse(localStorage.getItem("cart"));

  dataFromApi.forEach((itemApi)=> {
    itemsFromStorage.forEach((itemStorage)=> {
      if(itemApi._id == itemStorage.id){
        let finalItem = {};
        finalItem.item = itemApi;
        finalItem.SelectedQuantity = parseInt(itemStorage.quantity);
        finalItem.SelectColor = itemStorage.color;
        filteredCart.push(finalItem);
      }
    })
  })
  displayAllData(filteredCart);
}

function calculTotalPrice(cart){
  let totalPrice = 0;
  let totalItems = 0;
  cart.forEach((cartItem) => {
    totalPrice += (parseFloat(cartItem.item.price) * parseInt(cartItem.SelectedQuantity));
    totalItems += parseInt(cartItem.SelectedQuantity);
  });
  const totalItemsHtml = document.getElementById('totalQuantity');
  totalItemsHtml.innerHTML = totalItems;
  const totalPriceHtml = document.getElementById('totalPrice');
  totalPriceHtml.innerHTML = totalPrice;
}

function addEventsHandler(filteredCart){
  let itemsFromFC = JSON.parse(localStorage.getItem("cart"));
  let deleteItemContainer = [...document.getElementsByClassName('deleteItem')];
  deleteItemContainer.forEach((item, index) => {
    item.addEventListener('click', function(event){
      let itemToRemove = deleteItemContainer[index].closest('.cart__item');
      // je recupere l'id contenu dans le data-id du HTML
      const itemId = itemToRemove.dataset.id;
      // Je selectionne l'index du tableau dans le filteredCart en fonction de l'id du produit
      let indexFC = itemsFromFC.findIndex(function(element) {
        return element.id === itemId;
      });
      // Je le supprime du tableau et met a jour mon localstorage
      itemsFromFC.splice(indexFC, 1);
      localStorage.setItem("cart", JSON.stringify(itemsFromFC));
      // Je supprime l'élément correspondant du html.
      itemToRemove.parentNode.removeChild(itemToRemove);
      // totalItems.push(itemsFromFC);
      
    });
  });
}

function displayAllData(products){
  let cartContainer = document.getElementById("cart__items")
  products.forEach((product) => {
    let productElement = document.createElement('article')
    productElement.innerHTML = `
        <article class="cart__item" data-id="${product.item._id}" data-color="${product.color}">
            <div class="cart__item__img">
                <img src="${product.item.imageUrl}" alt="${product.item.altTxt}">
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__description">
                <h2>${product.item.name}</h2>
                <p>${product.SelectColor}</p>
                <p>${product.item.price} €</p>
                </div>
                <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                    <p>Qté : ${product.SelectedQuantity} </p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="0">
                </div>
                <div class="cart__item__content__settings__delete">
                    <p class="deleteItem">Supprimer</p>
                </div>
                </div>
            </div>
        </article>
    `
    cartContainer.appendChild(productElement);
  })
  calculTotalPrice(products);
  addEventsHandler(products);
}
main();