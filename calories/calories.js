// author: Jason Cheung

// Gets values from meal name and calorie fields

let display = (function () {
  let total;

  total = 0;

  function getValue() {
    let name, value, data;
    name = document.getElementById("add-meal-name").value;
    value = document.getElementById("add-meal-calories").value;
    data = {
      mealName: name,
      calories: value,
    };
    document.getElementById("add-meal-name").value = "";
    document.getElementById("add-meal-calories").value = "";
    addToDisplay(data);
  }

  function addToDisplay(data) {
    let entriesEl, totalEl;
    entriesEl = document.getElementById("entries");
    entriesEl.innerHTML += `<div class="entry" id="entry">
          <div class="entry-name">
            <h2>${data.mealName}</h2>
          </div>
            <div class="entry-calories">
              <h2>${data.calories} calories</h2>
            </div>
      </div>`;
    total += parseInt(data.calories);
    totalEl = document.getElementById("total");
    totalEl.innerHTML = "";
    totalEl.innerHTML += `<h1 id="total">Total: ${total} calories</h1>`;
    console.log(data);
  }

  // Event listener for add button
  document.getElementById("add-button").addEventListener("click", getValue);

  //Event listener for enter key
  document.addEventListener("keypress", function (event) {
    if (event.keyCode === 13 || event.which === 13) {
      getValue();
    }
  });
})();
