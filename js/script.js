import { deleteStationery, getAllStationeries} from "./api.js";

let stationeries;
let primaryStationeries;

const stationeriesContainer = document.getElementById("stationeries");
const sortItems = document.getElementById("sorter");
const countPrice = document.getElementById("count_price");
const findItems = document.getElementById("finder");

export const refetchAllStationeries = async () => {
    const allStationeries = await getAllStationeries();
    primaryStationeries = [...allStationeries];
    stationeries = allStationeries;
    showStationery(stationeries);
    addEvent();
};
refetchAllStationeries();

function showStationery(stationeries){
    let innerItem = "";
    stationeries.forEach((item)=>{
        innerItem += `<div class="object">
        <img class="notebook-icon" src="images/notebook.svg" alt="Notebook">
        <h2 class="object-name">Notebook</h2>
        <p class="object-description">Price: ${item.priceInHryvnia} UAH<br>Producer: ${item.producer}<br>Bar code: ${item.barCode}<br>Target age: ${item.targetAge}</code></p>
        <div class="object__button">
            <button id="edit${item.id}" class="button-edit">Edit</button>
            <button id="remove${item.id}" class="button-remove">Remove</button>
        </div>
    </div>`;
    });
    stationeriesContainer.innerHTML=innerItem;
}

var sort = 1;
sortItems.onclick = () => {
    if (sort >= 1){
        stationeries.sort(function(obj1, obj2){
            return obj1.priceInHryvnia > obj2.priceInHryvnia ? 1:-1;
        });
        sort = 0;
    } else {
        stationeries = [...primaryStationeries];
        sort = 1;
    }
    showStationery(stationeries);
    addEvent();
}

countPrice.onclick = () => {
    let sum = 0;
    stationeries.forEach(item=>{
        sum += item.priceInHryvnia;
    });
    document.getElementById("counter").innerHTML=sum;
    addEvent();
}

findItems.oninput = () => {
    stationeries = primaryStationeries;
    let findedElement = document.getElementById("finder").value;
    let findResult = [];
    stationeries.forEach(item=>{
        switch(true){
            case item.priceInHryvnia.toString().includes(findedElement):
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
    stationeries = findResult;
    if (findedElement == "") {
        stationeries = primaryStationeries;
    }
    sortItems;
    showStationery(stationeries);
    addEvent();
}

const goToEdit = (e) => {
    const id = e.target.id.replace("edit", "");
    window.location = "/edit.html?id=" + id;
}
const removeElement = (e) => {
    const id = e.target.id.replace("remove", "");
    deleteStationery(id).then(refetchAllStationeries);
};
const addEvent = () => {
    stationeries.forEach((item) => {
        const editButton = document.getElementById(`edit${item.id}`);
        const removeButton = document.getElementById(`remove${item.id}`);
        editButton.addEventListener("click", goToEdit);
        removeButton.addEventListener("click", removeElement);
    });
};