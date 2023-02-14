function fetchOrderIdFromUrl(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('order.orderId');
    // const params = new URLSearchParams(window.location.search);
    // const orderId = params.get("orderId");
    // console.log(orderId);
}

function fetchData(){
    const id = fetchOrderIdFromUrl();
    fetch(`http://localhost:3000/api/products/order/${orderId}`)
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


