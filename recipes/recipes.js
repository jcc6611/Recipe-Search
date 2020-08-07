let apiKey, response, url;

apiKey = config.APIKey;

url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=5&instructionsRequired=true&addRecipeInformation=true&addRecipeNutrition=true`;

/*
Returns an object containing the filter
and entry so URL can be 
manipulated
*/
function getSearch() {
  let search = {
    filter: checkFilter(),
    entry: document.getElementById("search").value,
  };
  console.log(search);
  changeURL(search);
  //   return search;
}

// Gets the filter value
function checkFilter() {
  return document.getElementById("filter").value;
}

/* Alters URL to search spoonacular's API
   based on user input
*/
function changeURL(search) {
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
      url = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&number=5&instructionsRequired=true&addRecipeInformation=true&addRecipeNutrition=true`;
      url += `&ingredients=${splitEntry}`;
      break;
    default:
      break;
  }
  console.log(url);
  changeDisplay(url);
  url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=5&instructionsRequired=true&addRecipeInformation=true&addRecipeNutrition=true`;
}

// function changeDisplay(url) {
//   fetch(url, {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   })
//     .then((result) => result.json())
//     .then((data) => {
//       console.log(data);
//       data.results.forEach((item) => {
//         console.log(item.title);
//         addToDisplay(item);
//       });
//     })
//     .catch((e) => console.log(e));
// }

let data = {
  title: [
    "Bacon bits",
    "chicken fingers",
    "onion dip",
    "french fries",
    "burger king jr",
  ],
};

function addToDisplay(item) {
  let mealsEl, single_mealEl, titles;
  mealsEl = document.getElementById("meals");
  single_mealEl = document.getElementById("single-meal");
  single_mealEl.innerHTML = "";
  titles = item.title;
  titles.forEach((el) => {
    console.log(el);
    mealsEl.innerHTML += `<div class="meal"><h2>${el}</h2></div>`;
  });
}

document.getElementById("search-button").addEventListener("click", getSearch);

addToDisplay(data);
