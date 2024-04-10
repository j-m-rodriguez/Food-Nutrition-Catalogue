import category_url from './Data/square_images.json' assert {type: 'json' };
import categories from './Data/categories.json' assert { type: 'json' };
import data from './Data/stripped_macros.json' assert { type: 'json'};
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
let displaylist = foodlist


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

    const table = document.createElement("table");
    const foodItem = document.createElement("div");

    displaylist.forEach(food => {
        
        // can remove these 3 lines if I don't want header


        //const table = document.createElement("table");
        const row = table.insertRow();
        const cell = row.insertCell(0);
        cell.textContent = food.name

        for (let i = 0; i < 4; i++) {
            const cell = row.insertCell(i+1);
            cell.textContent = food.nutrients[i].amount + " " + food.nutrients[i].nutrient.unitName;
        }
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

function alphabetical(a, b) {
    // Compare the names and return the result
    if (a.name < b.name) {
        return -1; // 'a' comes before 'b'
    } else if (a.name > b.name) {
        return 1; // 'b' comes before 'a'
    } else {
        return 0; // names are equal
    }
}

function alphabeticalReverse(a, b) {
    // Compare the names and return the result
    if (a.name < b.name) {
        return 1; // 'b' comes before 'a'
    } else if (a.name > b.name) {
        return -1; // 'a' comes before 'b'
    } else {
        return 0; // names are equal
    }
}

// show list of all food items sorted alphabetically by default
function showAll() {
    displaylist.sort(alphabetical);
    removeAllCards();
    showFood();
}

// made the functions accessible globally because they were not working after changing html type="module"
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
window.showAll = function() {
    showAll();
}
