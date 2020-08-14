// author: Jason Cheung

// Immediately invoked function to avoid global variables
let display = (function () {
  let total, date, dateEntry, dataEntries, htmlSelectors;

  // Total calories for this session
  total = 0;

  // Date and date formatting to store
  date = new Date();

  dateEntry = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

  // Reusable selectors
  htmlSelectors = {
    entryName: document.getElementById("add-meal-name"),
    entryValue: document.getElementById("add-meal-calories"),
    entries: document.getElementById("entries"),
    totalEl: document.getElementById("total"),
  };

  // To store in database
  dataEntries = {
    date: dateEntry,
    calories: total,
  };

  // Get the value from input
  function getValue() {
    let data;
    data = {
      mealName: htmlSelectors.entryName.value,
      calories: htmlSelectors.entryValue.value,
    };
    htmlSelectors.entryName.value = "";
    htmlSelectors.entryValue.value = "";
    addToDisplay(data);
  }

  // Adds all additonal entries to display
  function addToDisplay(data) {
    htmlSelectors.entries.innerHTML += `<div class="entry" id="entry">
          <div class="entry-name">
            <h2>${data.mealName}</h2>
          </div>
            <div class="entry-calories">
              <h2>${data.calories} calories</h2>
            </div>
      </div>`;
    total += parseInt(data.calories);
    htmlSelectors.totalEl.innerHTML = "";
    htmlSelectors.totalEl.innerHTML += `<h1 id="total">Total: ${total} calories</h1>`;
    dataEntries.calories = total;
    console.log(data);
  }

  /* Gets the total calories, stores in a datatype 
     to be put into a database
  */
  function getTotal() {
    console.log(dataEntries);
    total = 0;
    htmlSelectors.entries.innerHTML = "";
    htmlSelectors.totalEl.innerHTML = `<h1 id="total">Total: ${total} calories</h1>`;
  }

  // Event listener for submit button
  document.getElementById("submit-button").addEventListener("click", getTotal);

  // Event listener for add button
  document.getElementById("add-button").addEventListener("click", getValue);

  //Event listener for enter key
  document.addEventListener("keypress", function (event) {
    if (event.keyCode === 13 || event.which === 13) {
      getValue();
    }
  });
})();
