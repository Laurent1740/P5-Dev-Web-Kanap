// je récupère les données stockées dans le localstorage, puis je les repasse en tant qu'objet. (.parse)
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

function filterDatas(dataFromApi){
  // récupérer les données du localstorage
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
                    <p>Qté : </p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.SelectedQuantity}">
                </div>
                <div class="cart__item__content__settings__delete">
                    <p class="deleteItem">Supprimer</p>
                </div>
                </div>
            </div>
        </article>
    `
    cartContainer.appendChild(productElement)
    
  })
}
main();
document.addEventListener('click', function(event){
  if(event.target.class === "deleteItem"){
      deleteItemFromStorage();
    }
    console.log(event)

})