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

function removeSelectedCard(card) {
    const cardToRemove = card.querySelector("h2").textContent;
    const index = titles.indexOf(cardToRemove);
    titles.splice(index, 1);
    showCards();
}

// gets a list of all products in the supplied category
function displayCategory(category) {
    let displaylist = [];
    for (let food in foodlist){
        if (foodlist[food].category == category){
            displaylist.push(foodlist[food]);
            console.log(foodlist[food].name);
        }
    }
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
function selectCategory() {
    
}


/** To-do List
 * analyze how information is stored/displayed in Food class and foodlist to see if anything should revised before continuing
 * add content to function selectCategory()
 * figure out how to get string of the category from card that is clicked
 * display food and contents
 */