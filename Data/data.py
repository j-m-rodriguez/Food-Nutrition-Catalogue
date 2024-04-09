"""
This script was made to simplify and organize data taken from the U.S. Department of Agriculture's collection of
Foundation Foods released in October 2023.
"""

import json

VITAMINS = ["Vitamin A", "Thiamin", "Riboflavin", "Niacin", "Pantothenic acid", "Vitamin B-6", "Biotin", "Folate",
            "Vitamin B-12", "Vitamin C", "Choline" "Vitamin D", "Vitamin E", "Tocopherol", "tocopherol", "Tocotrienol",
            "Vitamin K"]
MINERALS = ["Magnesium", "Calcium", "Phosphorus", "Sulfur", "Sodium", "Potassium", "Chloride", "Iron", "Selenium",
            "Zinc", "Manganese", "Chromium", "Copper", "Iodine", "Fluoride", "Molybdenum", "Nickel"]
MACROS = ["Protein", "Fat", "fat", "Carb", "Sugar", "Fructose", "Sucrose", "Glucose", "Galactose", "Fiber", "Starch",
          "Cholesterol"]
KCAL = ["Energy"]
NUTRIENTS = [*VITAMINS, *MINERALS, *MACROS, *KCAL]
BASIC_NUTRIENTS = ["Energy (Atwater Specific Factors)", "Energy (Atwater General Factors)", "Protein",
                   "Total lipid (fat)", "Carbohydrate, by summation", "Carbohydrate, by difference"]


# function to save json file. must define filepath and data
def save(filepath, entry):
    with open(filepath, "w") as f:
        json.dump({"FoundationFoods": entry}, f, indent=4)


# loads original json file and sets variable as "data"
file = "foundationDownload.json"
# obtain a list of the data
with open(file) as fp:
    data = json.load(fp)["FoundationFoods"]

# creates a list of only essential information
new_food_list = []
for food in data:
    new_food_list.append({"description": food["description"], "foodNutrients": food["foodNutrients"],
                          "foodCategory": food["foodCategory"]})


# writes new file with list of extracted elements "description", "foodNutrients", "foodCategory" as data
file = "NewDataSet.json"
save(file, new_food_list)


# list of different food groups for my viewing
category = []
for each in data:
    if each["foodCategory"]['description'] not in category:
        category.append(each["foodCategory"]['description'])
print(category)
print(len(category))


# writes new file containing only basic macros as
for food_entry in new_food_list:
    basic_nutrient_list = []
    for nutrient in food_entry["foodNutrients"]:
        if nutrient["nutrient"]["name"] in BASIC_NUTRIENTS:
            basic_nutrient_list.append(nutrient)
    food_entry["foodNutrients"] = basic_nutrient_list
file = "BasicMacros.json"
save(file, new_food_list)


