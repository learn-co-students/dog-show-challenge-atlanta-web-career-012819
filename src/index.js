document.addEventListener('DOMContentLoaded', () => {
    const dogTable = document.getElementById("table-body")
    const form = document.getElementById("dog-form")
    form.addEventListener("submit", handleFormSubmit)
    fetch("http://localhost:3000/dogs")
    .then(resp => {
        if(resp.ok){
            return resp.json()
        }
        throw new Error("Problem fetching dogs")
    })
    .then(data => renderAllDogs(data, dogTable))
})

function renderAllDogs(dogData, dogTable) {
    dogData.forEach((data) =>{
        const dog = new Dog(data)
        dog.editHandler = editButtonClicked
        dogTable.appendChild(dog.render())
    })
  
}

function updateDogRow(dog) {
    const dogRow = document.getElementById(`dog-${dog.id}`)
    dogRow.innerHTML = ""
    const newDog = new Dog(dog)
    newDog.element = dogRow
    newDog.render()
}
function editButtonClicked(event,dog){
    console.log("clicked");
    console.log(event);
    console.log(dog);
    const form = document.getElementById("dog-form")
    form.elements["name"].value = dog.name
    form.elements["breed"].value = dog.breed
    form.elements["sex"].value = dog.sex
    form.dataset.id = dog.id
}

function handleFormSubmit(event){
    event.preventDefault()
    const form = event.target
    if (!form.dataset.id){
        throw new Error("You didn't fill out the form")
    }
    const id = form.dataset.id
    const dog = {
        name: form.name.value,
        breed: form.breed.value,
        sex: form.sex.value
    }

    fetch(`http://localhost:3000/dogs/${id}`,{
        headers: {
            "Content-Type": "application/json"
        },
        method: "PATCH",
        body: JSON.stringify(dog)
    })
    .then(resp => {
        if(resp.ok){
            console.log(resp)
        }else{
            throw new Error("It broke dammit!")
        }
    })
    dog.id = id
    updateDogRow(dog)
}