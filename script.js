
/*Variables*/
const tripName = document.getElementById("tripName");
const dateArrive = document.getElementById("dateArrive");
const dateLeave = document.getElementById("dateLeave");
const listContainer = document.getElementById("list-container");
const middleContent = document.getElementById("middle-content");


/*THIS IS THE POPUP FORM*/
document.querySelector(".show-form").addEventListener("click", function(){
    document.querySelector(".popup").classList.add("active")
});

document.querySelector(".popup .close-btn").addEventListener("click", function(){
    document.querySelector(".popup").classList.remove("active")
});

/*THIS IS THE ADD ITEM TO TRIP LIST*/


let currentTripID = null;


function addTrip(){
    if(tripName.value === ''){
        alert(
            "You must write something!"
        )
    }
    else{
        const tripID = Date.now().toString();
        let li = document.createElement("li");
        li.setAttribute('data-id', tripID);

        li.innerHTML = `
            <div class="trip-header">
                <span class="trip-label">${tripName.value}</span>
                <span class="deleteBtn">\u00d7</span>
            </div>
            <div class="content">
                <h5>Dates: ${dateArrive.value} to ${dateLeave.value}</h5>
            </div>
        `;
        listContainer.appendChild(li);

        li.addEventListener('click', function() {
            currentTripID = tripID;
            showItinerary();
        })

        saveData();
    }
    tripName.value = "";
    dateArrive.value = "";
    dateLeave.value = "";
}

listContainer.addEventListener("click", function(e){
    if(e.target.classList.contains('deleteBtn')){
        const tripID = e.target.parentElement.parentElement.getAttribute('get-id');
        e.target.parentElement.parentElement.remove();
        localStorage.removeItem('trip_${tripID}_itinerary');
        localStorage.removeItem('trip_${tripID}_checklist');
        saveData();
    }
})

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}
/*
function clearAll(){
    listContainer.innerHTML = "";
    localStorage.removeItem("data")
}*/
function showTrip(){
    listContainer.innerHTML = localStorage.getItem("data");
    const trips = listContainer.querySelectorAll('li');
    trips.forEach(trip => {
        trip.addEventListener('click', function() {
            currentTripID = trip.getAttribute('data-id');
            showItinerary();
        })
    })
}

showTrip()

function showItinerary(){
    const itinerary = localStorage.getItem('trip_${currentTripID}_itinerary') || "<p>No Itinerary yet. Add some details</p>";
    middleContent.innerHTML = `
        <h2>Itinerary</h2>
        <div>${itinerary}</div>
        <button onclick="addItinerary()">Add Itinerary</button>
    `;
}

function showChecklist(){
    const checklist = localStorage.getItem('trip_${currentTripID}_checklist') || "<p>No Check List items yet. Add some details</p>";
    middleContent.innerHTML = `
        <h2>Check List</h2>
        <div>${checklist}</div>
        <button onclick="addChecklistItem()">Add Check List Item</button>
    `;
}

function addItinerary(){
    const newItinerary = prompt("Enter itinerary details:");
    if(newItinerary) {
        let itinerary = localStorage.getItem('trip_${currentTripID}_itinerary') || "";
        itinerary += `<p>${newItinerary}</p>`;
        localStorage.setItem(`trip_${currentTripID}_itinerary`, itinerary);
        showItinerary();
    }
}

function addChecklistItem() {
    const newItem = prompt("Enter checklist item:");
    if (newItem) {
        let checklist = localStorage.getItem(`trip_${currentTripID}_checklist`) || "";
        checklist += `<p>${newItem}</p>`;
        localStorage.setItem(`trip_${currentTripID}_checklist`, checklist);
        showChecklist();
    }
}
