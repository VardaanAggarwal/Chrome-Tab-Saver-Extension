let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");
const leadsfromlocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if (leadsfromlocalStorage) {
  render(true);
}

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({}, function (tabs) {
    const leads = JSON.parse(localStorage.getItem("myLeads")) ?? [];
    for (const tab of tabs) {
      leads.push({ url: tab.url, title: tab.title });
    }
    localStorage.setItem("myLeads", JSON.stringify(leads));
    render();
  });
});

deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  render();
});

inputBtn.addEventListener("click", function () {
  if (!inputEl.value) {
    alert("Please enter a valid URL");
    return;
  }
  const leads = JSON.parse(localStorage.getItem("myLeads")) ?? [];
  leads.push(inputEl.value);
  localStorage.setItem("myLeads", JSON.stringify(leads));
  render();
});

function render(renderAsLinks = false) {
  const leads = JSON.parse(localStorage.getItem("myLeads"));

  let listItems = "";

  if (!leads) {
    ulEl.innerHTML = listItems;
    inputEl.value = "";
    return;
  }

  for (const lead of leads) {
    if (typeof lead === "object") {
      listItems += renderAsLinks
        ? `<li><a href="${lead.url}" target="_blank">${lead.title}</a></li>`
        : `<li>[${lead.title}](${lead.url})</li>`;
    } else {
      listItems += `<li>${lead}</li>`;
    }
  }

  ulEl.innerHTML = listItems;
  inputEl.value = "";
}
