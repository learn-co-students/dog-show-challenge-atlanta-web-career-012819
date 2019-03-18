const BASE_URL = "http://localhost:3000"

 document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#dog-form').addEventListener('submit', handleEditForm)
renderAllDogs()
 })

function renderAllDogs() {
    fetch(`${BASE_URL}/dogs`)
    .then(resp => resp.json())
    .then(data => {
        data.forEach(function(dog){
            const dogTable = document.getElementById("table-body");
            const tableRow = document.createElement('tr')
            tableRow.setAttribute('class', 'tablerow')
            const name = document.createElement('td')
            name.setAttribute('class', 'name')
            // name.dataset.id = dog.id;
            name.textContent = dog.name;
            const breed = document.createElement('td')
            breed.setAttribute('class', 'breed')
            // breed.dataset.id = dog.id;
            breed.textContent = dog.breed;
            const sex = document.createElement('td')
            sex.setAttribute('class', 'sex')
            // sex.dataset.id = dog.id;
            sex.textContent = dog.sex;
            const edit = document.createElement('button')
            edit.setAttribute('class', 'bttn')
            edit.dataset.id = dog.id;
            edit.innerHTML = "Edit Dog";
            edit.addEventListener('click', handleEditDog)
            dogTable.appendChild(tableRow);
            dogTable.appendChild(name);
            dogTable.appendChild(breed);
            dogTable.appendChild(sex);
            dogTable.appendChild(edit);
        })
    }) 
}

function handleEditDog(e){
    e.preventDefault()
    const row = e.target.parentNode
    const editForm = document.querySelector('#dog-form')
    
    editForm.elements["name"].value = row.querySelector('.name').textContent
    editForm.elements["breed"].value = row.querySelector('.breed').textContent
    editForm.elements["sex"].value = row.querySelector('.sex').textContent
    editForm.dataset.id = event.target.dataset.id
}

function handleEditForm(e) {
    e.preventDefault()
    const dogName = e.target.elements["name"].value
    const dogBreed = e.target.elements["breed"].value
    const dogSex = e.target.elements["sex"].value

    newDog = {
        name: dogName,
        breed: dogBreed,
        sex: dogSex
    }
    
    const id = e.target.dataset.id
    fetch(`${BASE_URL}/dogs/${id}`, {
        headers:{
            'Content-Type': 'application/json'
        },
        method:'PATCH',
        body: JSON.stringify(newDog)
    })
    .then(function() {
        const dogList = document.getElementById('table-body')
        dogList.innerHTML = ""
        
        
    renderAllDogs()}) 
    e.target.reset()
}



