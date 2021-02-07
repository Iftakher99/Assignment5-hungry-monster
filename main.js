function findFood() {
  const searchBtn = document.getElementById("food");
  document.getElementById("showOutput").innerHTML = "";
  document.getElementById("description").innerHTML = "";
  const url =
    "https://www.themealdb.com/api/json/v1/1/search.php?s=" + searchBtn.value;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showItems(data);
      recipeDetails(data);
    });
}

function showItems(data) {
  data.meals.forEach((food) => {
    const foodDiv = document.createElement("div");
    foodDiv.style.width = "30%";
    foodDiv.innerHTML = `
        <a href="#"  style="text-decoration: none;">
   <img src="${food.strMealThumb}" class="card-img-top">
   <div class="card-body text-center bg-light ">
     <h3 class="card-text">${food.strMeal}</h3>
   </div>
   </a>`;
    document.getElementById("showOutput").appendChild(foodDiv);
  });
}

function recipeDetails(data) {
  const addEvent = document.getElementById("showOutput");
  addEvent.addEventListener("click", function () {
    document.getElementById("description").innerHTML = "";
    let i = 1;
    const foodName = event.target.parentNode.innerText;
    data.meals.forEach((element) => {
      if (element.strMeal === foodName) {
        const foodDiv = document.createElement("div");
        foodDiv.classList.add("col-6", "card");
        foodDiv.innerHTML = `
                    <img src=${element.strMealThumb} >
                    <div class="card-body">
                    <h3 class="card-text">${element.strMeal}</h3>
                    <ul id="ingredients">
                    </ul>
                    </div>`;
        document.getElementById("description").appendChild(foodDiv);
        for (let i = 0; i < 10; i++) {
          let ingredient = "strIngredient" + i++;
          if (element[ingredient] == "") continue;
          const newItem = document.createElement("li");
          newItem.innerText = element[ingredient];
          document.getElementById("ingredients").appendChild(newItem);
        }
      }
    });
  });
}
