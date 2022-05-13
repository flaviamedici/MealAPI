let result = document.querySelector("#result");
let searchBtn = document.querySelector("#search-btn");
let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

let userInput = document.querySelector("#user-input").value;

fetch(url + "burger")
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
        `;
    });