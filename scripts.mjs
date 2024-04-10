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

// function to display food
function showFood(list) {
    const foodGrid = document.getElementById("food-grid");
    foodGrid.innerHTML = ""; // Clear previous content

    const subtitle = document.getElementById("subtitle");
    subtitle.innerHTML = "All nutrition content is based on 100 grams of food";

    const table = document.createElement("table");
    const foodItem = document.createElement("div");

    const row = table.insertRow();
    const cell0 = row.insertCell(0);
    const cell1 = row.insertCell(1);
    const cell2 = row.insertCell(2);
    const cell3 = row.insertCell(3);
    const cell4 = row.insertCell(4);
    cell0.textContent = "Food Description"
    cell1.textContent = "Calories"
    cell2.textContent = "Carbs"
    cell3.textContent = "Total Fat"
    cell4.textContent = "Protein"
    const cells = [cell0, cell1, cell2, cell3, cell4];
    for (let i = 0; i < cells.length; i++) {
        cells[i].style.fontWeight = 'bold';
    }




    list.forEach(food => {
        
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
    const buttons = document.getElementsByClassName("sorting-button");
    [...buttons].forEach(button => {
        button.style.display = "inline";
    });
    const sortText = document.getElementById("sort-by");
    sortText.style.display = "inline";

    const backbutton = document.getElementById("back");
    backbutton.style.display = "flex";
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
    const webTitle = document.getElementById("title");
    webTitle.innerHTML = category
    showFood(displaylist);
}

function sortName(a, b) {
    // Compare the names and return the result
    if (a.name < b.name) {
        return -1; // 'a' comes before 'b'
    } else if (a.name > b.name) {
        return 1; // 'b' comes before 'a'
    } else {
        return 0; // names are equal
    }
}

function sortNameReverse(a, b) {
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
    displaylist = foodlist
    displaylist.sort(sortName);
    const webTitle = document.getElementById("title");
    webTitle.innerHTML = "Viewing All Foods"
    removeAllCards();
    showFood(displaylist);
}

function back() {
    location.reload();
}

function sortCalories(a, b) {
    if (a.nutrients[0]["amount"] < b.nutrients[0]["amount"]) {
        return -1;
    } else if (a.nutrients[0]["amount"] > b.nutrients[0]["amount"]){
        return 1;
    } else {
        return 0;
    }
}

function sortCarbs(a, b) {
    if (a.nutrients[1]["amount"] < b.nutrients[1]["amount"]) {
        return -1;
    } else if (a.nutrients[1]["amount"] > b.nutrients[1]["amount"]){
        return 1;
    } else {
        return 0;
    }
}

function sortFat(a, b) {
    if (a.nutrients[2]["amount"] < b.nutrients[2]["amount"]) {
        return -1;
    } else if (a.nutrients[2]["amount"] > b.nutrients[2]["amount"]){
        return 1;
    } else {
        return 0;
    }
}

function sortProtein(a, b) {
    if (a.nutrients[3]["amount"] < b.nutrients[3]["amount"]) {
        return -1;
    } else if (a.nutrients[3]["amount"] > b.nutrients[3]["amount"]){
        return 1;
    } else {
        return 0;
    }
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
window.sortName = function() {
    showFood(displaylist.sort(sortName))
}
window.sortCalories = function() {
    showFood(displaylist.sort(sortCalories));
}
window.sortCarbs = function() {
    showFood(displaylist.sort(sortCarbs));
}
window.sortFat = function() {
    showFood(displaylist.sort(sortFat));
}
window.sortProtein = function() {
    showFood(displaylist.sort(sortProtein));
}
window.back = function() {
    back();
}
