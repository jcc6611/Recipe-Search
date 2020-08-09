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
        <div class="meal" id="meal-${el.id}">
        <h2>${el.title}</h2>
        <img src="${el.image}" alt="${el.title}"/>
        <button data-modal-target="#modal" class="meal-info" id="${el.id}">Info</button>
        </div>`;
      });
      mealsEl.addEventListener("click", getInfo, false);
    })
    .catch((e) => console.log(e));
}

/* Gets ID of individual recipe when Info 
   button is clicked
*/
function getInfo(e) {
  let mealID, clicked;
  clicked = e.target;
  if (clicked !== e.currentTarget) {
    if (clicked.className === "meal-info") {
      mealID = clicked.id;
      console.log(mealID);
      searchByID(mealID);
    }

    e.stopPropagation();
  }
}

// Search for an individual recipe by ID
function searchByID(mealID) {
  let url, apiKey;
  apiKey = config.APIKey;
  url = `https://api.spoonacular.com/recipes/${mealID}/information?apiKey=${apiKey}&number=1&instructionsRequired=true&includeNutrition=true`;
  displayModal(url, mealID);
}

// Get info from API by ID and display it in a modal
function displayModal(url, mealID) {
  fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((result) => result.json())
    .then((data) => {
      let mealsEl, openModalButtons, closeModalButtons, overlay, modal;
      mealsEl = document.getElementById(`meal-${mealID}`);
      console.log(mealsEl);
      console.log(data);
      mealsEl.innerHTML += `
      <div class="modal" id="modal">
        <div class="modal-header">
          <div class="title">${data.title}</div>
          <button data-close-button class="close-button">&times;</button>
        </div>
        <div class="modal-body">${data.instructions}</div>
      </div>
      <div id="overlay"></div>
      `;
      openModalButtons = document.querySelectorAll("[data-model-target]");
      closeModalButtons = document.querySelectorAll("[data-close-button]");
      overlay = document.getElementById("overlay");
      modal = document.getElementById("modal");
      modal.classList.add("active");
      overlay.classList.add("active");
      closeModalButtons.forEach((button) => {
        button.addEventListener("click", () => {
          const theModal = button.closest(".modal");
          theModal.classList.remove("active");
          overlay.classList.remove("active");
        });
      });
    })
    .catch((e) => console.log(e));
}

// Search button event listener
document.getElementById("search-button").addEventListener("click", getSearch);
