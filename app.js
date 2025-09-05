const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");
const searchBar = document.getElementById("searchInput");

if (JSON.parse(localStorage.getItem("myLeads"))) {
  render();
}

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({}, function (tabs) {
    let leads = JSON.parse(localStorage.getItem("myLeads")) || [];

    for (const tab of tabs) {
      if (tab.url.includes("www.google.com/search?q")) {
        continue;
      }

      leads = leads.filter((lead) => lead.url !== tab.url);

      if (
        !["chrome://newtab/", "https://www.youtube.com/"].includes(tab.url) &&
        !tab.url.includes("music") &&
        !tab.url.includes("instagram")
      ) {
        leads.push({ url: tab.url, title: tab.title });
      }
    }
    localStorage.setItem("myLeads", JSON.stringify(leads));
    render();
  });
});

deleteBtn.addEventListener("dblclick", async function () {
  const leads = localStorage.getItem("myLeads") ?? "";
  await setClipboard(leads);
  // localStorage.setItem("myLeads", JSON.stringify([]));
  // render();
});

// createBtn.addEventListener("dblclick", async function () {
//   for (const tab of leadsfromlocalStorage) {
//     chrome.tabs.create({ url: tab.url });
//   }
// });

inputBtn.addEventListener("click", async function () {
  const leads = JSON.parse(localStorage.getItem("myLeads")) ?? [];
  let listItems = "";
  for (const idx in leads) {
    const lead = leads[idx];
    if (typeof lead === "object") {
      listItems += `${Number(idx) + 1}. [${lead.title}](${lead.url})\n`;
    } else {
      listItems += `${Number(idx) + 1}. ${lead}\n`;
    }
  }
  await setClipboard(listItems);
});

searchBar.addEventListener("keyup", function () {
  render(this.value.toLowerCase());
});

function render(search) {
  let data = JSON.parse(localStorage.getItem("myLeads"));

  data = search
    ? data.filter(
        (lead) =>
          lead.title.toLowerCase().includes(search) ||
          lead.url.toLowerCase().includes(search)
      )
    : data;

  const reversedData = [...data].reverse();

  ulEl.innerHTML = "";

  for (const i in reversedData) {
    const lead = reversedData[i];

    const li = document.createElement("li");

    const favicon = document.createElement("img");
    favicon.src = `https://www.google.com/s2/favicons?domain=${
      new URL(lead.url).hostname
    }`;
    favicon.className = "link-icon";

    const div = document.createElement("div");
    div.className = "link-info";

    const anchor = document.createElement("button");
    anchor.className = "link-button";
    anchor.onclick = () => {
      chrome.tabs.create({ url: lead.url, active: false });
    };
    anchor.textContent = `${Number(i) + 1}. ${lead.title}`;

    favicon.onclick = () => {
      let data = JSON.parse(localStorage.getItem("myLeads"));

      data = data.filter((wow) => wow.url !== lead.url);

      localStorage.setItem("myLeads", JSON.stringify(data));

      render(search);
    };

    div.appendChild(anchor);

    li.appendChild(favicon);
    li.appendChild(div);

    ulEl.appendChild(li);
  }
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
