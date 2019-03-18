class DogController {
  static init() {
    DogController.renderAll();

    const form = document.getElementById('dog-form');
    form.addEventListener('submit', DogController.handleFormSubmit);
  }

  static renderAll() {
    const table = document.getElementById('table-body');
    table.innerHTML = '';

    Adapter.get()
    .then(json => json.forEach(data => {
      const dog = new Dog(data);
      table.appendChild(dog.element());
    }))
  }

  static handleEdit(e) {
    const form = document.getElementById('dog-form');
    const row = e.target.parentNode.parentNode;
    const rowData = row.children;

    // console.log(e.target.dataset.id)
    form.dataset.id = e.target.dataset.id;
    form.name.value = rowData[0].innerText;
    form.breed.value = rowData[1].innerText;
    form.sex.value = rowData[2].innerText;
  }

  static handleFormSubmit(e) {
    e.preventDefault();
    // console.log(e.target);

    const data = {
      id: e.target.dataset.id,
      name: e.target.name.value,
      breed: e.target.breed.value,
      sex: e.target.sex.value
    }

    DogController.update(data)
    e.target.reset();
    delete e.target.dataset.id;
  }

  static update(data) {
    Adapter.patch(data)
    .then(() => DogController.renderAll());
  }
}
