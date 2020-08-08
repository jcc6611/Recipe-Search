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
      let mealsEl, single_mealEl, results;
      mealsEl = document.getElementById("meals");
      single_mealEl = document.getElementById("single-meal");
      mealsEl.innerHTML = "";
      results = data.results;
      results.forEach((el) => {
        console.log(el.title);
        mealsEl.innerHTML += `
        <div class="meal">
        <h2>${el.title}</h2>
        <img src="${el.image}" alt="${el.title}"/>
        <div class="meal-info-wrapper">
        <div class="meal-info" id="meal-${el.id}">
        <h3>Info</h3>
        </div>
        </div>
        </div>`;
        console.log(el.id);
      });
      // mealsEl.addEventListener("click", (e) => {
      //   const mealInfo = e.path.find((item) => {
      //     console.log(item.classList);
      //   });
      // });
    })
    .catch((e) => console.log(e));
}

function getMealID() {
  console.log("hello world");
}

// Search button event listener
document.getElementById("search-button").addEventListener("click", getSearch);
