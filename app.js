let result = document.querySelector("#result");
let searchBtn = document.querySelector("#search-btn");
let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

let userInput = document.querySelector("#user-input").value;

searchBtn.addEventListener("click", () => {
    let userInput = document.querySelector("#user-input").value;
    if (userInput.length == 0) {
        result.innerHTML = `<h2>Input Field Cannot Be Empty</h2>`
    }
    else {
    fetch(url + userInput)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        let myMeal = data.meals[0];
        let count = 1;
        let ingredients = [];
        for (let i in myMeal) {
            let ingredient = "";
            let measure = "";
            if(i.startsWith("strIngredient") && myMeal[i]) {
                ingredient = myMeal[i];
                measure = myMeal[`strMeasure` + count];
                count += 1;
                ingredients.push(`${measure} ${ingredient}`);
            }
        }
        console.log(ingredients);
        result.innerHTML = `<img src=${myMeal.strMealThumb}>
        <div class="details">
            <h2>${myMeal.strMeal}</h2>
            <h3>${myMeal.strArea}</h3>
        </div>
        <div id="ingredient-con"></div>
        <div id="recipe">
            <button id="hide-recipe">X</button>
            <pre id="instructions">${myMeal.strInstructions}</pre>
        </div>
        <button id="show-recipe">View Recipe</button>
        `;
        let ingredientCon = document.querySelector("#ingredient-con");
        let parent = document.createElement("ul");
        let recipe = document.querySelector("#recipe");
        let hideRecipe = document.querySelector("#hide-recipe");
        let showRecipe = document.querySelector("#show-recipe");

        ingredients.forEach((i) => {
            let child = document.createElement("li");
            child.innerText = i;
            parent.appendChild(child);
            ingredientCon.appendChild(parent);
        });

        hideRecipe.addEventListener("click", () => {
            recipe.style.display = "none";
        });

        showRecipe.addEventListener("click", () => {
            recipe.style.display = "block";
        });

    }).catch(() => {
        result.innerHTML = `<h2>Invalid Input</h2>`
    })
    }
});

