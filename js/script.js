const submitButton = document.getElementById("submit_button");
const removeButton = document.getElementById("remove_button");

let stationeries = [{
    price: 123,
    producer: "WIN",
    barCode: "12341234",
    targetAge: 12,
},
{
    price: 100,
    producer: "WIN",
    barCode: "121211234",
    targetAge: 10,
},
{
    price: 121,
    producer: "WIN",
    barCode: "11111234",
    targetAge: 9,
},
{
    price: 99,
    producer: "WIN",
    barCode: "12341234",
    targetAge: 15,
},
{
    price: 101,
    producer: "Skiper",
    barCode: "11111111",
    targetAge: 18,
}]

const stationeriesContainer = document.getElementById("stationeries");

const addItem = ({ price, producer, barCode, targetAge }) => {
    const generatedId = uuid.v1();
    const newItem = {
    id: generatedId,
    price, 
    producer, 
    barCode, 
    targetAge,
    };
    stationeries.push(newItem);
    addItemToPage(newItem);
};

function showStationery(stationeries){
    let innerItem = "";
    stationeries.forEach((item, index)=>{
        innerItem += `<div class="object">
        <img class="notebook-icon" src="images/notebook.svg" alt="Notebook">
        <h2 class="object-name">Notebook</h2>
        <p class="object-description">Price: ${item.price} UAH<br>Producer: ${item.producer}<br>Bar code: ${item.barCode}<br>Target age: ${item.targetAge}</code></p>
        <div class="time-update">Last time update: 1s</div>
        <div class="object__button">
            <button onclick="goToEdit(${index})" class="button-edit">Edit</button>
            <button onclick="removeElement(${index})" class="button-remove">Remove</button>
        </div>
    </div>`;
    });
    stationeriesContainer.innerHTML=innerItem;
}
showStationery(stationeries);

function sortStationery(){
    stationeries.sort(function(obj1, obj2){
        return obj1.price > obj2.price ? 1:-1;
    });
    showStationery(stationeries);
}

function countStationery(){
    let sum = 0;
    stationeries.forEach(item=>{
        sum += item.price;
    });
    document.getElementById("counter").innerHTML=sum;
}

function findStationery(){
    let findedElement = document.getElementById("finder").value;
    let findResult = [];
    stationeries.forEach(item=>{
        switch(true){
            case item.price.toString().includes(findedElement):
                findResult.push(item);
                break;
            case item.producer.includes(findedElement):
                findResult.push(item);
                break;
            case item.barCode.includes(findedElement):
                findResult.push(item);
                break;
            case item.targetAge.toString().includes(findedElement):
                findResult.push(item);
                break;
        }
    });
    if (findedElement == "") {
        showStationery(stationeries);
    } else{
        showStationery(findResult);
    }
}

function goToEdit(index) {
    window.location = "/edit.html?index=" + index;
}