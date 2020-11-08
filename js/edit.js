import { updateStationery, getStationeryById } from "./api.js"

window.onload = async () => {
    let editValues = await getStationeryById(getId());
    document.getElementById("price_input").value = editValues.priceInHryvnia;
    document.getElementById("producer_select").value = editValues.producer;
    document.getElementById("bar_code_input").value = editValues.barCode;
    document.getElementById("target_age_input").value = editValues.targetAge;
}

var getId = () => {
    let url = document.location.href;
    return url.split("?")[1].split("=")[1];
};

let popup = document.getElementById("popup");
let popupToggle=document.getElementById('submit_button');
let popupClose=document.querySelector('.popup-close');

popupToggle.onclick = function(event) {
    let errorText = "Error! ";
    let price = document.getElementById("price_input").value;
    let producer = document.getElementById("producer_select").value;
    let barCode = document.getElementById("bar_code_input").value;
    let targetAge = document.getElementById("target_age_input").value;
    if( price<=0 || price>=1000000){
        errorText += "Incorect price! ";
    }
    if(targetAge <=0 || targetAge >=100){
        errorText += "Incorect age! ";
    } 
    if(price == ""){
        errorText = "Error! ";
    }
    if(producer == ""){
        errorText = "Error! ";
    }
    if(barCode == ""){
        errorText = "Error! ";
    }
    if(targetAge == ""){
        errorText = "Error! ";
    }
    if(errorText != "Error! "){
        event.preventDefault();
        popup.style.display= "flex";
        document.getElementById("popup-message").innerHTML = errorText;
    } else {
        const id = getId();
        updateStationery(id, {
            priceInHryvnia: price,
            producer,
            barCode,
            targetAge,
        });
    }
}

popupClose.onclick = function () {
    popup.style.display= "none";
}

window.onclick = function (event) {
    if(event.target==popup){
        popup.style.display="none";
    }
}