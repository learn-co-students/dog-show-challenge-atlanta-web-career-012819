const DOGS_URL = 'http://localhost:3000/dogs'

document.addEventListener('DOMContentLoaded', () => {
  renderAllDogs()
  document.getElementById('dog-form').addEventListener('submit', handleDogEdit)
})

function renderAllDogs() {
  fetch(DOGS_URL)
  .then(res => res.json())
  .then(data => data.map(dog => renderDog(dog.name, dog.breed, dog.sex, dog.id)))
}

function renderDog(name, breed, sex, id) {
  const dogRow = document.createElement('tr')
  
  const dogName = document.createElement('td')
  dogName.textContent = name
  dogName.id = 'name'
  dogRow.appendChild(dogName)

  const dogBreed = document.createElement('td')
  dogBreed.textContent = breed
  dogBreed.id = 'breed'
  dogRow.appendChild(dogBreed)

  const dogSex = document.createElement('td')
  dogSex.textContent = sex
  dogSex.id = 'sex'
  dogRow.appendChild(dogSex)

  const dogEdit = document.createElement('td')
  const editButton = document.createElement('button')
  editButton.textContent = 'Edit'
  editButton.dataset.id = id
  dogEdit.appendChild(editButton)
  dogRow.appendChild(dogEdit)
  editButton.addEventListener('click', handleEditButton)

  const tableBody = document.getElementById('table-body')
  tableBody.appendChild(dogRow)
}

function handleEditButton(e) {
  const dogInfo = e.target.parentNode.parentNode
  const editForm = document.querySelector('#dog-form')

  editForm.elements['name'].value = dogInfo.querySelector('#name').textContent
  editForm.elements['breed'].value = dogInfo.querySelector('#breed').textContent
  editForm.elements['sex'].value = dogInfo.querySelector('#sex').textContent
  editForm.dataset.id = e.target.dataset.id
}

function handleDogEdit(e) {
  e.preventDefault()
  const dogId = e.target.dataset.id
  const dogName = e.target.elements['name'].value
  const dogBreed = e.target.elements['breed'].value
  const dogSex = e.target.elements['sex'].value

  const newDog = {
    name: dogName,
    breed: dogBreed,
    sex: dogSex
  }

  fetch(DOGS_URL + `/${dogId}`, {
    headers:{
			'Content-Type': 'application/json'
		},
		method:'PATCH',
		body: JSON.stringify(newDog)
  })
}