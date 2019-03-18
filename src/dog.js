class Dog {
    constructor({name, breed, sex, id}){
        this.name = name
        this.breed = breed
        this.sex = sex
        this.id = id
        this.element = document.createElement("tr")
        this.button =  document.createElement("button")
    }

    render = () => {
        this.element.id = `dog-${this.id}`
        this.element.appendChild(this._newTd(this.name))
        this.element.appendChild(this._newTd(this.breed))
        this.element.appendChild(this._newTd(this.sex))
        this.button.innerText = "Edit"
        this.element.appendChild(this._newTd("").appendChild(this.button))
        return this.element
    }
    
    _newTd(text){
        const td = document.createElement("td")
        td.innerText = text
        return td
    }

    set editHandler(callback){
        const closure = (e)=>{
            const dog = this
            callback(e,dog)
        }
        this.button.addEventListener("click",closure)
    }
}