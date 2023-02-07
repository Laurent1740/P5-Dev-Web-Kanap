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
  console.log('cart', cart)
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
function updateLocalStorageArray(filteredCart) {
  const localStorageArray = [];
  filteredCart.forEach((product) => {
    console.log('product', product)
    let item = {};
    item.id = product.item._id;
    item.color = product.SelectColor;
    item.quantity = product.SelectedQuantity;
    item.name = product.item.name;
    localStorageArray.push(item);
  });
  localStorage.setItem("cart", JSON.stringify(localStorageArray));
}

function addEventsHandler(filteredCart){
  console.log('filteredCart', filteredCart)
  //let filteredCart = JSON.parse(localStorage.getItem("cart"));
  let deleteItemContainer = [...document.getElementsByClassName('deleteItem')];
  deleteItemContainer.forEach((item, index) => {
    item.addEventListener('click', function(event){
      let itemToRemove = deleteItemContainer[index].closest('.cart__item');
      // je recupere l'id contenu dans le data-id du HTML
      const itemId = itemToRemove.dataset.id;
      // Je selectionne l'index du tableau dans le filteredCart en fonction de l'id du produit
      console.log('itemId', itemId)
      let indexFC = filteredCart.findIndex(function(element) {
        return element.item._id === itemId;
      });
      console.log('indexFC', indexFC)
      // Je le supprime du tableau et met a jour mon localstorage
      filteredCart.splice(indexFC, 1);
      console.log('new cart', filteredCart)
   
      updateLocalStorageArray(filteredCart);   

      // Je supprime l'élément correspondant du html.
      itemToRemove.parentNode.removeChild(itemToRemove);
      // totalItems.push(filteredCart);
      calculTotalPrice(filteredCart)
    });
  });
}
function changeQuantity(cartFiltered){
  console.log('cartFiltered', cartFiltered)
  const inputs = [...document.getElementsByClassName('itemQuantity')];
  inputs.forEach((input, index) => {
    input.addEventListener('change' , function(event){
      let itemToChange = inputs[index].closest('.cart__item');
      // Validate the entered value
      const quantity = event.target.value;
      if(quantity > 100 || quantity < 0){
        alert('La quantité sélectionnée doit être comprise entre 1 et 100');
        event.target.value = event.target.dataset.initialValue;
        return;
      }
      if(quantity >= input.min || quantity <= input.max){
        // Update the quantity
        const itemId = itemToChange.dataset.id;
        let indexCF = cartFiltered.findIndex(function(element) {
          return element.item._id === itemId;
        });
        cartFiltered[indexCF].SelectedQuantity = quantity;
        // Update local storage with updated data
        updateLocalStorageArray(cartFiltered);
        // Update the values on HTML
        if(quantity == 0){
          // Remove the item from the cartFiltered array
          cartFiltered.splice(indexCF, 1);
          // Update local storage with updated data
          updateLocalStorageArray(cartFiltered);
          // Remove the HTML element
          let deleteItemContainer = [...document.getElementsByClassName('deleteItem')];
          let itemToRemove = deleteItemContainer[index].closest('.cart__item');
          itemToRemove.remove();
        }
        calculTotalPrice(cartFiltered);
      } 
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
                    <p>Qté :</p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.SelectedQuantity}">
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
  changeQuantity(products);
}

function checkUserData(){
  const valueFirstName = document.getElementById('firstName').value;
  const errorFirstNameHTML = document.getElementById('firstNameErrorMsg');
  const valueLastName = document.getElementById('lastName').value;
  const errorLastNameHTML = document.getElementById('lastNameErrorMsg');
  const valueAddress = document.getElementById('address').value;
  const errorAddressHMTL = document.getElementById('addressErrorMsg');
  const valueCity = document.getElementById('city').value;
  const errorCityHTML = document.getElementById('cityErrorMsg');
  const valueMail = document.getElementById('email').value;
  const errorMailHTML = document.getElementById('emailErrorMsg');

  const checkTypeMail 	= /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i

  let isValid = true;
  let errorTypeFirstName = '';
  let errorTypeLastName = '';
  let errorTypeAddress = '';
  let errorTypeCity = '';
  let errorTypeMail = '';

  // traitement du champs prénom
  if(valueFirstName == ''){
    errorTypeFirstName = "votre champ prénom est vide";
    isValid = false;
  }
  if(valueFirstName.length < 3 && valueFirstName.length > 0){
    errorTypeFirstName = "votre champ doit comporter au moins 3 caractères";
    isValid = false;
  } 
    // traitement du champs nom
  if(valueLastName == ''){
    errorTypeLastName = "votre champ nom est vide";
    isValid = false;
  }
  if(valueLastName.length < 3 && valueLastName.length > 0){
    errorTypeLastName = "votre champ doit comporter au moins 3 caractères";
    isValid = false;
  }
  // traitement du champs adresse
  if(valueAddress == ''){
    errorTypeAddress = "votre champ adresse est vide";
    isValid = false;
  }
  if(valueAddress.length < 3 && valueAddress.length > 0){
    errorTypeAddress = "votre champ doit comporter au moins 3 caractères";
    isValid = false;
  }
  // traitement du champs ville
  if(valueCity == ''){
    errorTypeCity = "votre champ adresse est vide";
    isValid = false;
  }
  if(valueAddress.length < 3 && valueAddress.length > 0){
    errorTypeCity = "votre champ doit comporter au moins 3 caractères";
    isValid = false;
  }
  // traitement du champs mail 
  if(valueMail == ''){
    errorTypeMail = "votre champ adresse est vide";
    isValid = false;
  }
  if(valueMail.length < 3 && valueMail.length > 0){
    errorTypeMail = "votre champ doit comporter au moins 3 caractères";
    isValid = false;
  }
  if(!checkTypeMail.test(valueMail)){
    errorTypeMail = "le type du contenu saisi dans ce champs n'est pas valide";
    isValid = false;
  }
  
  errorFirstNameHTML.innerHTML = errorTypeFirstName;
  errorLastNameHTML.innerHTML = errorTypeLastName;
  errorAddressHMTL.innerHTML = errorTypeAddress;
  errorCityHTML.innerHTML = errorTypeCity;
  errorMailHTML.innerHTML = errorTypeMail;
  // faire la même chose pour le nom, adresse, ville, mail

  
  // suite du traitement du formulaire
  const saveUsersInAPI = [];
  console.log('user', saveUsersInAPI)
  if (isValid) {
    // je peux enchainer sur le reste du traitement
    // créer mon objet JSON qui va comporter les ID de l'api et les infos du formulaire (voir spec technique pour le format)
 
    // je récupère le cart de mon localstorage et je le stock dans une variable "cart"
    let cart = JSON.parse(localStorage.getItem("cart"));
    // let orderDetails = {};
    // orderDetails.contact = {
    //     firstName: valueFirstName,
    //     lastName : valueLastName,
    //     address : valueAddress,
    //     city : valueCity,
    //     email : valueMail,
    //   }

    // orderDetails.products = [...cart.map(product => product.id)]
    // console.log('orderDetails',orderDetails)

    fetch('http://localhost:3000/api/products/order', {
      mode: 'no-cors',
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ contact :{
        firstName: valueFirstName,
        lastName : valueLastName,
        address : valueAddress,
        city : valueCity,
        email : valueMail,
      },
      products : [...cart.map(product => product.id)]
    })
   })
   .then(response => response.json())
   .then(order => {
    console.log('order', order)
      // traitement
   })
   .catch(error => console.log(error));


    //saveUsersInAPI.push(userDatas);
    
    // envoyer mon objet JSON a l'API
    
    // récupérer la réponse de l'API
    
    // rediriger l'urilisateur vers la page de confirmation 
    // en mettant dans l'url l'id de la commande renvoyé par l'API
  }
  
}
main();
document.addEventListener('click', function(event){
  if(event.target.id === "order"){
    event.preventDefault()
    checkUserData();
  }
})