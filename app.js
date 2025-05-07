const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");
const leadsfromlocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if (leadsfromlocalStorage) {
  render();
}

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({}, function (tabs) {
    const leads = [];
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

inputBtn.addEventListener("click", async function () {
  const leads = JSON.parse(localStorage.getItem("myLeads")) ?? [];
  let listItems = "";
  for (const idx in leads) {
    const lead = leads[idx];
    if (typeof lead === "object") {
      listItems += `${idx + 1}. [${lead.title}](${lead.url})\n`;
    } else {
      listItems += `${idx + 1}. ${lead}\n`;
    }
  }
  await setClipboard(listItems);
});

function render(renderAsLinks = true) {
  const leads = JSON.parse(localStorage.getItem("myLeads"));

  let listItems = "";

  if (!leads) {
    ulEl.innerHTML = listItems;
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
}

async function setClipboardUsingItems(text) {
  const type = "text/plain";
  const clipboardItemData = {
    [type]: text,
  };
  const clipboardItem = new ClipboardItem(clipboardItemData);
  await navigator.clipboard.write([clipboardItem]);
}

async function setClipboard(text) {
  await navigator.clipboard.writeText(text);
}
