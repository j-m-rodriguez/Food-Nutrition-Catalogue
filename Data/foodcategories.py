import json
from duckduckgo_search import DDGS


# function to save json file. must define filepath and data
def save(filepath, input):
    with open(filepath, "w") as f:
        json.dump({"FoundationFoods": input}, f, indent=4)


# loads original json file and sets variable as "data"
file = "NewDataSet.json"
# obtain a list of the data
with open(file) as fp:
    data = json.load(fp)["FoundationFoods"]

food_categories = []
for food in data:
    if food["foodCategory"]["description"] not in food_categories:
        food_categories.append(food["foodCategory"]["description"])
food_categories.sort()
print(len(food_categories), food_categories)

urls = []
for category in food_categories:
    results = DDGS().images(
        keywords=category,
        region="us-en",
        layout="Square",
        safesearch="off",
        type_image="photo",
        max_results=1
    )
    urls.extend(results)
i = 0
category_url = {}
for each in food_categories:
    category_url[each] = urls[i]["image"]
    i += 1
with open("categories.json", "w") as fp:
    json.dump(food_categories, fp, indent=4)
with open("square_images.json", "w") as fp:
    json.dump(category_url, fp, indent=4)
