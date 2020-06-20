import axios from 'axios' 

export default class Recipe {
    constructor(id) {
        this.id = id 
    }

    async getRecipe() {
        try {
            // await new Promise((resolve, reject) => setTimeout(resolve, 3000))
            const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`)
            // console.log(res) 
            this.title = res.data.recipe.title 
            this.author = res.data.recipe.publisher
            this.img = res.data.recipe.image_url
            this.url = res.data.recipe.source_url
            this.ingredients = res.data.recipe.ingredients
        }
        catch(error) {
            alert(`Recipe error: ${error}`)
        }
    }

    // assume 15 min for 3 ingredients
    calcTime() {
        const numIng = this.ingredients.length 
        const periods = Math.ceil(numIng / 3)
        this.time = periods * 15
    }

    // placeeholder = 4 servings
    calcServings() {
        this.servings = 4 
    }

    // re-format ingredients
    parseIngredients() {
        // unit pairs 
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds']
        const unitsShort = ['tbs', 'tbs', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound']
        // expand some more units
        const units = [... unitsShort, 'g', 'kg']

        // convert to an array of ingredient object
        const newIngredients = this.ingredients.map(element => {
            // 1. uniform unit
            let ingredient = element.toLowerCase()
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i])
            })

            // 2. remove parentheses (using regex to search and replace with ' ') -- also replace comma
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ').replace(',', '')

            // 3. parse ingredients into count, unit, and ingredient
            const arrIng = ingredient.split(' ')
            const unitIndex = arrIng.findIndex(e => units.includes(e))

            // ingredient object
            let objIng
            if (unitIndex > -1) {
                // if there is a unit
                const arrNum = arrIng.slice(0, unitIndex).map(element => element.replace('-', '+')) // some recipe has 1-1/3 cup of xxx
                objIng = {
                    count: eval(arrNum.join('+')), // e.g. [4, 1/2] ==> 4 + 1/2 = 4.5 
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex + 1).join(' ')
                }
            } 
            else if (parseInt(arrIng[0], 10)) { 
                // if no unit but first element is a number (not 0)
                objIng = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')
                }
            } 
            else {
                // no unit and first element is not a number
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient: ingredient
                }
            }

            // return is needed to assign value in map 
            return objIng
        })

        // replace with re-formatted ingredients
        this.ingredients = newIngredients
    }

    // recalculate servings / counts of ingredients when clicking -/+
    updateServings(type) {
        // cannot be < 1
        const newServings = Math.max(1, type === 'dec' ? this.servings - 1 : this.servings + 1)

        // update counts of ingredients
        this.ingredients.forEach(current => {
            current.count = current.count * newServings / this.servings
        })

        // update servings
        this.servings = newServings
    }
}