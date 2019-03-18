// I made these. I noticed every lab in the past (booklist, pokemon, toytale)
const BASE_URL = "http://localhost:3000"
let dogTable = document.getElementById("table-body");

// this was here, I just added renderAllDogs
 document.addEventListener('DOMContentLoaded', () => {
renderAllDogs()
 })

// this is where it gets wild. The readMe wants this info in a table.
// the array prints out to the console, but nothing changes 
// on the page
function renderAllDogs() {
    fetch(`${BASE_URL}/dogs`)
    .then(resp => resp.json())
    .then(data => {console.log(data)
        data.forEach(function(dog){
            const tableRow = document.createElement('tr')
            const tableData = document.createElement('td')
            tableRow.setAttribute('class', 'tablerow')
            tableData.setAttribute('class', 'tabledata')
            tableRow.dataset.id = dog.id;
            tableData.textContent = dog.name;
            tableData.textContent = dog.breed;
            tableData.textContent = dog.sex;
            dogTable.appendChild(tableRow);
            dogTable.appendChild(tableData);
        })
    }) 
}

