let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")
const leadsfromlocalStorage = JSON.parse(localStorage.getItem("myLeads"))

if(leadsfromlocalStorage) {
    myLeads = leadsfromlocalStorage
    render(myLeads)
}

tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})

deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

inputBtn.addEventListener("click", function(){
    myLeads.push(inputEl.value)
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
})

function render(Leads){
    let listItems = ""
    for(let count = 0; count < Leads.length; count++){
        listItems += `<li><a href="${Leads[count]}" target="_blank">${Leads[count]}</a></li>`
    }
    ulEl.innerHTML = listItems
    inputEl.value = ''
}
