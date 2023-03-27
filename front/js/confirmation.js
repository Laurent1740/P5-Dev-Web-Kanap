function displayOrderID(){
    document.getElementById('orderId').innerHTML = new URL(window.location.href).searchParams.get('orderid')
}
displayOrderID()

