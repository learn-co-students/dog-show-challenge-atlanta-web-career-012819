

document.addEventListener('DOMContentLoaded', () => {

    document.querySelector('#dog-form').addEventListener('submit', handleEditForm)

    renderAllDogs()


})

function renderAllDogs() {
    fetch('http://localhost:3000/dogs')
    .then (response => response.json())
    .then (data => data.map(dog => renderDog(dog)))
}

function renderDog(dog) {
    const dogList = document.getElementById("table-body")
    const dogRow = document.createElement('tr')
    dogRow.setAttribute('class', 'tablerow')
    // dogRow.dataset.id = dog.id

    const name = document.createElement('td')
    name.setAttribute('class', 'name')
    name.textContent = dog.name
    const breed = document.createElement('td')
    breed.setAttribute('class', 'breed')

    breed.textContent = dog.breed
    const sex = document.createElement('td')
    sex.setAttribute('class', 'sex')
    sex.textContent = dog.sex

    const edit = document.createElement('button')
    edit.dataset.id = dog.id
    edit.setAttribute('class', 'bttn')
    edit.innerHTML = "Edit Dog";
    edit.addEventListener('click', handleEdit)



    dogList.appendChild(dogRow)
    dogRow.appendChild(name)
    dogRow.appendChild(breed)
    dogRow.appendChild(sex)
    dogRow.appendChild(edit)
}

function handleEdit(event) {
    const dogInfo = event.target.parentNode
    const editForm = document.querySelector('#dog-form')
    console.log(dogInfo)

    editForm.elements["name"].value = dogInfo.querySelector('.name').textContent
    editForm.elements["breed"].value = dogInfo.querySelector('.breed').textContent
    editForm.elements["sex"].value = dogInfo.querySelector('.sex').textContent
    editForm.dataset.id = event.target.dataset.id

}

function handleEditForm(event) {
    event.preventDefault()

    const dogName = event.target.elements["name"].value
    const dogBreed = event.target.elements["breed"].value
    const dogSex = event.target.elements["sex"].value

    newdog ={name: dogName,
             breed: dogBreed,
            sex: dogSex}

    const id = event.target.dataset.id

    fetch(`http://localhost:3000/dogs/${id} `,{

		headers:{
			'Content-Type': 'application/json'
		},
		method:'PATCH',
		body: JSON.stringify(newdog)

    })
    .then(function() {
        const dogList = document.getElementById('table-body')
        dogList.innerHTML = ""
        
        renderAllDogs()})
    

	event.target.reset()



}

//e.target.closest("tr")