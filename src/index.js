const DOGS_URL = "http://localhost:3000/dogs"

document.addEventListener('DOMContentLoaded', () => {
  renderAllDogs();

  const form = document.getElementById('dog-form');
  form.addEventListener('submit', handleFormSubmit);
})

function renderAllDogs() {
  fetch(DOGS_URL)
  .then(response => response.json())
  .then(json => json.forEach(data => renderDog(data)))
}

function renderDog(data) {
  // console.log(data)
  const table = document.getElementById('table-body');
  const row = document.createElement('tr');
  table.appendChild(row);

  const name = document.createElement('td');
  name.innerText = data.name;
  row.appendChild(name);

  const breed = document.createElement('td');
  breed.innerText = data.breed;
  row.appendChild(breed);

  const sex = document.createElement('td');
  sex.innerText = data.sex;
  row.appendChild(sex);

  const buttonContainer = document.createElement('td');
  row.appendChild(buttonContainer);
  const editButton = document.createElement('button');
  editButton.innerText = "Edit Dog";
  editButton.dataset.id = data.id;
  buttonContainer.appendChild(editButton);

  editButton.addEventListener('click', handleEditDog);
}


function handleEditDog(e) {
  // console.log(e.target.parentNode.parentNode)
  const form = document.getElementById('dog-form');
  const row = e.target.parentNode.parentNode;
  const rowData = row.children;

  // console.log(e.target.dataset.id)
  form.dataset.id = e.target.dataset.id;
  form.name.value = rowData[0].innerText;
  form.breed.value = rowData[1].innerText;
  form.sex.value = rowData[2].innerText;
}

function handleFormSubmit(e) {
  e.preventDefault();
  // console.log(e.target);

  const dog = {
    id: e.target.dataset.id,
    name: e.target.name.value,
    breed: e.target.breed.value,
    sex: e.target.sex.value
  }

  // console.log(dog)
  updateDog(dog)
  e.target.reset();
  // e.target.dataset.id = '';
  delete e.target.dataset.id;
}

function updateDog(dog) {
  // console.log(dog)
  const id = dog.id;
  delete dog.id;
  console.log("ID", id)
  console.log(dog)

  fetch(`${DOGS_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(dog)
  })
  .then(response => response.json())
  .then(data => {
    console.log(data)
    document.getElementById('table-body').innerHTML = '';
    renderAllDogs();
  })
}
