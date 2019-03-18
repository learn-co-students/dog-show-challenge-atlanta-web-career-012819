const DOGS_URL = "http://localhost:3000/dogs"

class Adapter {
  static get() {
    return fetch(DOGS_URL)
    .then(response => response.json())
  }

  static patch(data) {
    const id = data.id;
    delete data.id;

    return fetch(`${DOGS_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
  }
}
