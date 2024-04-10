import json

BASIC_NUTRIENTS = ["Energy (Atwater General Factors)", "Protein",
                   "Total lipid (fat)", "Carbohydrate, by difference"]


filepath = "stripped_macros.json"
with open(filepath) as json_file:
    data = json.load(json_file)["FoundationFoods"]

both = []
general = []
specific = []
neither = []
print(len(data), "total food items before")
for food in data:
    nutrient_list = []
    for nutrient_entry in food["foodNutrients"]:
        nutrient_list.append(nutrient_entry["nutrient"]["name"])

    if "Energy (Atwater Specific Factors)" in nutrient_list and "Energy (Atwater General Factors)" in nutrient_list:
        both.append(food)
    if "Energy (Atwater Specific Factors)" not in nutrient_list and "Energy (Atwater General Factors)" in nutrient_list:
        general.append(food)
    if "Energy (Atwater Specific Factors)" in nutrient_list and "Energy (Atwater General Factors)" not in nutrient_list:
        specific.append(food)
    if "Energy (Atwater General Factors)" not in nutrient_list:
        neither.append(food)
        data.remove(food)
    if food["foodNutrients"] == []:
        print("No food nutrients found")
    for nutrient_entry in food["foodNutrients"]:
        if nutrient_entry["nutrient"]["name"] == "Energy (Atwater Specific Factors)":
            food["foodNutrients"].remove(nutrient_entry)

print(len(both), "have both")
print(len(general), "only have general")
print(len(specific), "only have specific")
print(len(neither), "have neither")
print(len(data), "total food items after")
for each in neither:
    print(each)
print("\nDone with Calories")

for food in data:
    nutrient_list = []
    for nutrient_entry in food["foodNutrients"]:
        if nutrient_entry["nutrient"]["name"] == "Carbohydrate, by summation":
            food["foodNutrients"].remove(nutrient_entry)
        nutrient_list.append(nutrient_entry["nutrient"]["name"])
    if BASIC_NUTRIENTS[1] not in nutrient_list:
        print(food)
        data.remove(food)

print(len(data), "total food items after")

for food in data:
    sorted_list_of_dicts = sorted(food["foodNutrients"], key=lambda x: x["nutrient"]["number"], reverse=True)
    food["foodNutrients"] = sorted_list_of_dicts

with open("stripped_macros.json", "w") as outfile:
    json.dump({"FoundationFoods": data}, outfile, indent=4)
