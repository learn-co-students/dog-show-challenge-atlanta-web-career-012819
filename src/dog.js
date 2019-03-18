class Dog {
  constructor(data) {
    this.id = data.id
    this.name = data.name
    this.breed = data.breed
    this.sex = data.sex
  }

  element() {
    const row = document.createElement('tr');

    const name = document.createElement('td');
    name.innerText = this.name;
    row.appendChild(name);

    const breed = document.createElement('td');
    breed.innerText = this.breed;
    row.appendChild(breed);

    const sex = document.createElement('td');
    sex.innerText = this.sex;
    row.appendChild(sex);

    const buttonContainer = document.createElement('td');
    row.appendChild(buttonContainer);
    const editButton = document.createElement('button');
    editButton.innerText = "Edit Dog";
    editButton.dataset.id = this.id;
    buttonContainer.appendChild(editButton);

    editButton.addEventListener('click', DogController.handleEdit);

    return row;
  }
}
