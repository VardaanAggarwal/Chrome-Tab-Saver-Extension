let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");
const leadsfromlocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if (leadsfromlocalStorage) {
  myLeads = leadsfromlocalStorage;
  render(myLeads);
}

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({}, function (tabs) {
    for (const tab of tabs) {
      myLeads.push({ url: tab.url, title: tab.title });
    }
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
});

deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});

inputBtn.addEventListener("click", function () {
  if (!inputEl.value) {
    alert("Please enter a valid URL");
    return;
  }
  myLeads.push(inputEl.value);
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  render(myLeads);
});

function render(Leads) {
  let listItems = "";
  for (let count = 0; count < Leads.length; count++) {
    const lead = Leads[count];
    if (typeof lead === "object") {
      listItems += `<li>[${lead.title}](${lead.url})</li>`;
    } else {
      listItems += `<li>${lead}</li>`;
    }
  }
  ulEl.innerHTML = listItems;
  inputEl.value = "";
}
