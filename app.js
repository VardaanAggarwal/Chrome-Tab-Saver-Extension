let inputEl = document.getElementById("input-el")
let inputBtn = document.getElementById("input-btn")
let ulEl = document.getElementById("ul-el")
let myLeads = []
inputBtn.addEventListener("click", function(){
    myLeads.push(inputEl.value) 
    renderLeads()
})

function renderLeads(){
    let listItems = ""
    for(let count = 0; count < myLeads.length; count++){
        listItems += "<li>" + myLeads[count] + "</li>"
    }
    ulEl.innerHTML = listItems
}
