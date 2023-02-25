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
        listItems += `<li><a href="${myLeads[count]}" target="_blank">${myLeads[count]}</a></li>`
    }
    ulEl.innerHTML = listItems
    inputEl.value = ''
}
