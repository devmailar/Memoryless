let DataB = [];
const inputValue = document.getElementById("input-txt");
const outputList = document.getElementById("input-list");
const saveButton = document.getElementById("save-btn");
const deleteButton = document.getElementById("delete-btn");
const dataFromLocalStorage = JSON.parse(localStorage.getItem("DataB"));
const saveTabButton = document.getElementById("savetab-btn");

if (dataFromLocalStorage) {
  DataB = dataFromLocalStorage;
  render(DataB);
}

function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `;
  }
  outputList.innerHTML = listItems;
}

saveButton.addEventListener("click", function () {
  DataB.push(inputValue.value);
  inputValue.value = "";
  localStorage.setItem("DataB", JSON.stringify(DataB));
  render(DataB);
});

saveTabButton.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    DataB.push(tabs[0].url)
    localStorage.setItem("DataB", JSON.stringify(DataB))
    render(DataB)
  })
});

deleteButton.addEventListener("dblclick", function () {
  localStorage.clear();
  DataB = [];
  render(DataB);
});
