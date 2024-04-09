import category_url from './Data/square_images.json' assert {type: 'json' };
import titles from './Data/categories.json' assert { type: 'json' };
import data from './Data/BasicMacros.json' assert { type: 'json'};

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
    let food = new Food(entry["description"], entry["foodNutrients"], entry["foodCategory"])
    foodlist.push(food)
}


// Your final submission should have much more data than this, and 
// you should use more than just an array of strings to store it all.


// This function adds cards the page to display the data in the array
function showCards() {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";
    const templateCard = document.querySelector(".card");
    
    for (let title of titles) {
        let imageURL = category_url[title]
        
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

// made the functions accessible globally because they were not working in ES6 format
window.removeLastCard = function() {
    removeLastCard();
}
window.removeAllCards = function() {
    removeAllCards();
}

function selectCategory() {
    
}