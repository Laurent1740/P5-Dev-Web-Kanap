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
            displayAllData(datas);
        })
}
// affichage, dans les cards HTML, des différentes 
// infos du tableau récupéré juste au dessus.
function displayAllData(products){
    let itemsHtml = document.getElementById("items");

    products.forEach((element) => {

        const {_id, imageUrl, altTxt, name, description } = element;

        const aHtml = document.createElement("a");
        aHtml.href = "./product.html?id=" + _id;
        itemsHtml.appendChild(aHtml);

        const articleHtml = document.createElement("article");
        aHtml.appendChild(articleHtml);

        const imgHtml = document.createElement("img");
        imgHtml.src = imageUrl;
        imgHtml.alt = altTxt;
        articleHtml.appendChild(imgHtml);

        const h3Html = document.createElement("h3");
        h3Html.innerHTML = name;
        articleHtml.appendChild(h3Html);

        const pHtml = document.createElement("p");
        pHtml.innerHTML = description;
        articleHtml.appendChild(pHtml);
    });
}

main();