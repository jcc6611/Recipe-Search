// author: Jason Cheung

/*
Returns an object containing the filter
and entry so URL can be 
manipulated
*/
function getSearch() {
  let search, url, limit, apiKey;
  apiKey = config.APIKey;
  limit = 6;
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
        <div class="meal">
        <h2>${el.title}</h2>
        <img src="${el.image}" alt="${el.title}"/>
        <div class="meal-info-wrapper">
        <div class="meal-info" id="${el.id}">
        <h3>Info</h3>
        </div>
        </div>
        </div>`;
        // console.log(el.id);
      });
      mealsEl.addEventListener("click", getInfo, false);
    })
    .catch((e) => console.log(e));
}

/* Gets ID of individual recipe when Info 
   button is clicked
*/
function getInfo(e) {
  let parentEl, mealID, clicked;
  clicked = e.target;
  parentEl = clicked.parentNode;
  if (e.target !== e.currentTarget) {
    if (clicked.tagName === "H3") {
      mealID = parentEl.id;
      console.log(mealID);
      searchByID(mealID);
    } else if (clicked.className === "meal-info") {
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
  displayModal(url);
}

// Get info from API by ID and display it in a modal
function displayModal(url) {
  fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((result) => result.json())
    .then((data) => {
      console.log(data);
    })
    .catch((e) => console.log(e));
}

// Search button event listener
document.getElementById("search-button").addEventListener("click", getSearch);
