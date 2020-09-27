// author: Jason Cheung

/*
Returns an object containing the filter
and entry so URL can be 
manipulated
*/
function getSearch() {
  let search, url, limit, apiKey;
  apiKey = config.RecipesAPIKey;
  limit = 10;
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
          <div class="meal-title">
            <h2>${el.title}</h2>
          </div>
            <div class="image-container">
              <img src="${el.image}" alt="${el.title}"/>
            </div>
            <div class="button-container">
              <button data-modal-target="#modal" class="meal-info" id="${
                el.id
              }">Info</button>
            </div>
        </div>

      <div class="modal" id="modal-${el.id}">
        <div class="modal-header">
          <div class="modal-title">${el.title}</div>
          <button data-close-button class="close-button" id="close-${
            el.id
          }">&times;</button>
        </div>
        <div class="modal-body">
          <img src="${el.image}" alt="${el.title}"/>
          <div class="modal-diets">
            <p>Diets: ${formatDiets(el.diets)}</p>
          </div>
          <p>Preparation Time: ${el.preparationMinutes} mins. | Cooking Time: ${
          el.cookingMinutes
        } mins. | Ready In: ${el.readyInMinutes} mins.</p><br>
          <div class="instructions">
            <h2>Instructions</h2>
            <p>${formatInstructions(el.analyzedInstructions)}</p><br>
          </div>
          <div class="ingredients">
            <h2>Ingredients</h2>
            <p>${formatIngredients(el.nutrition.ingredients)}</p><br>
          </div>
          <div class="nutrition">
            <h2>Nutrition</h2>
            <p>${el.servings} servings:<br><br>${formatNutrition(
          el.nutrition.nutrients
        )}</p><br>
          </div>
          <div class="source">
            <h2>Source</h2>
            <a href="${el.sourceUrl}" target="_blank">${el.sourceUrl}</a>
          </div>
        </div>
      </div>
      <div id="overlay"></div>
      `;
      });
      mealsEl.addEventListener("click", getInfo, false);
    })
    .catch((e) => console.log(e));
}

// Formats the nutrition section for the modal
function formatNutrition(nutrients) {
  let str;
  nutrients.forEach((nutrient) => {
    str += `- ${nutrient.title}: ${nutrient.amount} ${nutrient.unit}<br>`;
  });
  return str.replace("undefined", "");
}

// Formats the ingredients section for the modal
function formatIngredients(ingredients) {
  let str;
  ingredients.forEach((ingredient) => {
    str += `- ${ingredient.name}: ${ingredient.amount} ${ingredient.unit}<br>`;
  });
  const capitalStr = str.replace(/\b\w/g, (c) => c.toUpperCase());
  return capitalStr.replace("Undefined", "");
}

// Formats the instructions section for the modal
function formatInstructions(instructions) {
  let steps, str;
  steps = instructions[0].steps;
  steps.forEach((step) => {
    str += `${step.number}: ${step.step}<br>`;
  });
  return str.replace("undefined", "");
}

// Formats the diets section for the modal
function formatDiets(diets) {
  let initStr, str;
  initStr = diets.toString();
  str = initStr.replace(",", ", ");
  const capitalStr = str.replace(/\b\w/g, (c) => c.toUpperCase());

  return capitalStr;
}

/* Displays recipe info in a modal when the Info button is clicked
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

//Event listener for enter key
document.addEventListener("keypress", function (event) {
  if (event.keyCode === 13 || event.which === 13) {
    getSearch();
  }
});
