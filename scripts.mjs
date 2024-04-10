import category_url from './Data/square_images.json' assert {type: 'json' };
import categories from './Data/categories.json' assert { type: 'json' };
import data from './Data/BasicMacros.json' assert { type: 'json'};
let titles = categories

// defining Food class with name, all macro content, and category of food
class Food {
    constructor(name, nutrients, category) {
        this.name = name;
        this.nutrients = nutrients;
        this.category = category;
    }
}

// creating an array of Food class objects of every entry from json data
const jsonfood = data["FoundationFoods"]
let foodlist = []
console.log(jsonfood)
for (let entry of jsonfood) {
    let food = new Food(entry["description"], entry["foodNutrients"], entry["foodCategory"]["description"])
    foodlist.push(food)
}

// empty array to put food items on display
let displaylist = []


// Your final submission should have much more data than this, and 
// you should use more than just an array of strings to store it all.


// This function adds cards the page to display the data in the array
function showCards() {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";
    const templateCard = document.querySelector(".card");
    
    for (let title of titles) {
        let imageURL = category_url[title];
        
        console.log(imageURL);
        const nextCard = templateCard.cloneNode(true); // Copy the template card
        editCardContent(nextCard, title, imageURL); // Edit title and image
        cardContainer.appendChild(nextCard); // Add new card to the     container
        console.log(nextCard)
    }
}
//
// trying to write it myself first
/*
function showFood() {
    const foodContainer = document.getElementById("food-container");
    foodContainer.innterHTML = "";
    const templateFood = document.querySelector(".food");

    for (let food in displaylist) {
        let foodName = displaylist[food].name;
        let foodInfo = displaylist[food].nutrients;

        const nextfood = templateFood.cloneNode(true);
        foodContainer.appendChild(nextFood);
    }
}
*/

// function to display food
function showFood() {
    const foodGrid = document.getElementById("food-grid");
    foodGrid.innerHTML = ""; // Clear previous content

    displaylist.forEach(food => {
        const foodItem = document.createElement("div");
        foodItem.classList.add("food-item");

        const nameElement = document.createElement("h3");
        nameElement.textContent = food.name;
        foodItem.appendChild(nameElement);

        const table = document.createElement("table");

        // Add rows for each nutrient
        food.nutrients.forEach(nutrient => {
            const row = table.insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            cell1.textContent = nutrient.nutrient.name;
            cell2.textContent = nutrient.amount + " " + nutrient.nutrient.unitName;
        });

        foodItem.appendChild(table);
        foodGrid.appendChild(foodItem);
    });
}

function editCardContent(card, newTitle, newImageURL) {
    card.style.display = "block";

    const cardHeader = card.querySelector("h2");
    cardHeader.textContent = newTitle;

    const cardImage = card.querySelector("img");
    cardImage.src = newImageURL;
    cardImage.alt = newTitle + " Poster";

    // You can use console.log to help you debug!
    // View the output by right clicking on your website,
    // select "Inspect", then click on the "Console" tab
    console.log("new card:", newTitle, "- html: ", card);
}

// This calls the addCards() function when the page is first loaded
document.addEventListener("DOMContentLoaded", showCards);

function quoteAlert() {
    console.log("Button Clicked!")
    alert("I guess I can kiss heaven goodbye, because it got to be a sin to look this good!");
}

function removeLastCard() {
    titles.pop(); // Remove last item in titles array
    showCards(); // Call showCards again to refresh
}

// removes all cards
function removeAllCards() {
    titles = [];
    showCards();
}

// removes only the card clicked on
// used to test that category selector was working; not for actual implementation
function removeSelectedCard(card) {
    const cardToRemove = card.querySelector("h2").textContent;
    const index = titles.indexOf(cardToRemove);
    titles.splice(index, 1);
    showCards();
}

// gets a list of all products in the supplied category
function selectCategory(card) {
    const category = card.querySelector("h2").textContent;
    displaylist = [];
    for (let food in foodlist){
        if (foodlist[food].category == category){
            displaylist.push(foodlist[food]);
            console.log(foodlist[food].name);
        }
    }
    removeAllCards();
    showFood();
}

// made the functions accessible globally because they were not working in ES6 format
window.removeLastCard = function() {
    removeLastCard();
}
window.removeAllCards = function() {
    removeAllCards();
}
window.removeSelectedCard = function(card) {
    removeSelectedCard(card);
}
window.selectCategory = function(card) {
    selectCategory(card);
}


/** To-do List
 * display food and contents
 */