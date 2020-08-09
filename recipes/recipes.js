// author: Jason Cheung

/*
Returns an object containing the filter
and entry so URL can be 
manipulated
*/
function getSearch() {
  let search, url, limit, apiKey;
  apiKey = config.APIKey;
  limit = 2;
  url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=${limit}&instructionsRequired=true&addRecipeInformation=true&addRecipeNutrition=true`;
  search = {
    filter: checkFilter(),
    entry: document.getElementById("search").value,
  };
  console.log(search);
  changeURL(search, url, limit, apiKey);
}

// Gets the filter value
function checkFilter() {
  return document.getElementById("filter").value;
}

/* Alters URL to search spoonacular's API
   based on user input
*/
function changeURL(search, url, limit, apiKey) {
  let splitEntry;
  splitEntry = search.entry.split(" ");
  console.log(splitEntry);
  switch (search.filter) {
    case "query":
      url += `&query=${search.entry}`;
      break;
    case "title":
      url += `&titleMatch=${search.entry}`;
      break;
    case "ingredients":
      url = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&number=${limit}&instructionsRequired=true&addRecipeInformation=true&addRecipeNutrition=true`;
      url += `&ingredients=${splitEntry}`;
      break;
    default:
      break;
  }
  console.log(url);
  changeDisplay(url);
  url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=${limit}&instructionsRequired=true&addRecipeInformation=true&addRecipeNutrition=true`;
}

// Add API data to the recipes.html
function changeDisplay(url) {
  fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((result) => result.json())
    .then((data) => {
      console.log(data.results);
      let mealsEl, results;
      mealsEl = document.getElementById("meals");
      mealsEl.innerHTML = "";
      results = data.results;
      results.forEach((el) => {
        console.log(el.title);
        mealsEl.innerHTML += `
        <div class="meal" id="meal">
            <h2>${el.title}</h2>
            <img src="${el.image}" alt="${el.title}"/>
            <button data-modal-target="#modal" class="meal-info" id="${el.id}">Info</button>
        </div>

      <div class="modal" id="modal-${el.id}">
        <div class="modal-header">
          <div class="modal-title">${el.title}</div>
          <button data-close-button class="close-button" id="close-${el.id}">&times;</button>
        </div>
        <div class="modal-body">${el.summary}</div>
      </div>
      <div id="overlay"></div>
      `;
      });
      mealsEl.addEventListener("click", getInfo, false);
    })
    .catch((e) => console.log(e));
}

/* Displays recipe info in a modal when the Info 
   button is clicked
*/
function getInfo(e) {
  let clicked;
  const overlay = document.getElementById("overlay");
  clicked = e.target;
  if (clicked !== e.currentTarget) {
    const modal = document.getElementById(`modal-${clicked.id}`);
    if (clicked.className === "meal-info") {
      openModal(modal, overlay);
      document
        .getElementById(`close-${clicked.id}`)
        .addEventListener("click", closeModal, false);
    }
    e.stopPropagation();
  }
}

// Closes the individual modal
function closeModal(e) {
  let clicked, modalID;
  clicked = e.target;
  const overlay = document.getElementById("overlay");
  modalID = clicked.id.replace("close-", "");
  const modal = document.getElementById(`modal-${modalID}`);
  if (clicked.className === "close-button") {
    modal.classList.remove("active");
    overlay.classList.remove("active");
  }
}

// Opens the individual modal
function openModal(modal, overlay) {
  modal.classList.add("active");
  overlay.classList.add("active");
}

// Search button event listener
document.getElementById("search-button").addEventListener("click", getSearch);
