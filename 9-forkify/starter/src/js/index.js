// import num from './test'
// console.log(num)

// const x = 5 
// console.log(`This is ${x}`)

// import {a, add as addd} from './test'
// console.log(a, addd(7,8))

// import * as test from './test'
// console.log(test.a, test.add(9,12))

// import axios from 'axios'

// async function getResults(query) {
//     try {
//         const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${query}`)
//         const recipes = res.data.recipes
//         console.log(recipes)
//     }
//     catch (error) {
//         alert(error)
//     }
// }
// getResults('pasta')


// Global app controller
import Search from './models/Search' 
import Recipe from './models/Recipe'
import List from './models/List'
import Likes from './models/Likes'
import * as searchView from './views/searchView'
import * as recipeView from './views/recipeView'
import * as listView from './views/listView'
import * as likesView from './views/likesView'
import { elements, renderLoader, clearLoader } from './views/base'


// global state of the app
// 1. search object 
// 2. current recipe object 
// 3. shopping list opject 
// 4. liked recipes
const state = {}
// assign to global (window) level for testing 
// window.s = state
// s.likes = new Likes()
// likesView.toggleLikeMenu(state.likes.getNumLiked())

// SEARCH CONTROLLER
const controlSearch = async () => {
    // 1. get query from view 
    const query = elements.searchInput.value 

    // if query exists
    if (query) {
        // 2. new Search object and add to state 
        state.search = new Search(query) 
        // console.log(state.search)

        // 3. prepare UI to show results
        // clear input field
        searchView.clearInput()
        // clear old results
        searchView.clearResults()
        // display loader icon 
        renderLoader(elements.searchRes)

        // 4. get search results 
        try {
            await state.search.getResults() 
    
            // 5. render search results in the UI 
            // console.log(state.search)
            // console.log(state.search.result)
            clearLoader()
            searchView.renderResults(state.search.result)
        }
        catch(error) {
            alert('Error loading results')
            clearLoader()
        }
    }
}


elements.searchForm.addEventListener('submit', event => {
    // prevent auto-reload
    event.preventDefault()
    // console.log(event)
    // search for results 
    
    controlSearch()
})


elements.searchResPages.addEventListener('click', event => {
    // get closest .btn-inline element of click location
    const btn = event.target.closest('.btn-inline')
    // console.log(btn)

    // if exists
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto)
        searchView.clearResults()
        searchView.renderResults(state.search.result, goToPage)
    }

})


// RESCIPE CONTROLLER
// const r = new Recipe(47025)
// window.a = r
// r.getRecipe()
// console.log(r)
// r.parseIngredients() 
// console.log(r)
const controlRecipe = async () => {
    // 1. get hash in browser's location 
    const id = window.location.hash.replace('#', '')

    // if id exists
    if (id) {
        // 2. prepare UI for changes 
        // clear existing recipe
        recipeView.clearRecipe()
        // get loader icon
        renderLoader(elements.recipe)
        // highlight selected recipe in search results panel
        if (state.search) searchView.highlightSelected(id)

        // 3. create new recipe object
        state.recipe = new Recipe(id)
        // window.r = state.recipe // for testing

        // 4. get recipe data and parse ingredients to objects
        try {
            await state.recipe.getRecipe()
            state.recipe.parseIngredients()
    
            // 5. calculate time and servings
            state.recipe.calcTime()
            state.recipe.calcServings()
    
            // 6. render recipe
            // console.log(state.recipe)
            clearLoader()
            recipeView.renderRecipe(state.recipe, state.likes.isLiked(id))
        }
        catch(error) {
            alert('Error loading recipe')
        }
    }
}

// listen to hashchange in URL when clicking a recipe in search results, or page load 
// window.addEventListener('hashchange', controlRecipe)
// window.addEventListener('load', controlRecipe)
['hashchange', 'load'].forEach(current => window.addEventListener(current, controlRecipe))


// LIST CONTROLLER
// const l = new List()
// window.l = l
const controlList = () => {
    // create a new list if there is none yet 
    if (!state.list) state.list = new List() 

    // add each ingredient to list and display in UI
    state.recipe.ingredients.forEach(element => {
        const item = state.list.addItem(element.count, element.unit, element.ingredient)
        listView.renderItem(item)
    })
}


// LIKE CONTROLLER
const controlLike = () => {
    // create a new likes if there is none yet 
    if (!state.likes) state.likes = new Likes() 

    // check if the recipe (id) is already liked 
    const currentId = state.recipe.id 
    // console.log(currentId)
    // if not yet liked 
    if (!state.likes.isLiked(currentId)) {
        // add to list of likes
        const newLike = state.likes.addLike(currentId, state.recipe.title, state.recipe.author, state.recipe.img)
        
        // toggle like button style -- set to true
        likesView.toggleLikeBtn(true)

        // add like to UI list
        likesView.renderLike(newLike)
        // console.log(state.likes)
    }
    // if already liked 
    else {
        // remove for list of likes
        state.likes.deleteLike(currentId)
        
        // remove like button style -- set to false
        likesView.toggleLikeBtn(false)

        // remove like from UI list
        likesView.deleteLike(currentId)
        // console.log(state.likes)
    }

    // toggle to display liked icon on the top panel
    likesView.toggleLikeMenu(state.likes.getNumLiked())
}



// listen to button click on recipe page 
// 1. for changing servings
// note that the buttons (dec/inc) are not available at first
// need to attach the listener to '.recipe' then find the buttons with DOM object delegation
// 2. for getting shopping list
elements.recipe.addEventListener('click', element => {
    // 1. if match .btn-decrease or its child element
    if(element.target.matches('.btn-decrease, .btn-decrease *')) {
        state.recipe.updateServings('dec')
        recipeView.updateServingsIngredients(state.recipe)
    }
    // 1. if match .btn-increase or its child element
    if(element.target.matches('.btn-increase, .btn-increase *')) {
        state.recipe.updateServings('inc')
        recipeView.updateServingsIngredients(state.recipe)
    }

    // 2. if match get shopping cart btn or its child element
    if(element.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        // create (or add items to) shopping list
        controlList()
    }

    // 3. if match like btn or its child element
    if(element.target.matches('.recipe__love, .recipe__love *')) {
        controlLike()
    }
})

// listen to button to delete an item in a shopping display 
// listen to button that update count of an item
elements.shopping.addEventListener('click', element => {
    // find id of the closest item
    const id = element.target.closest('.shopping__item').dataset.itemid
    
    // if click on delete button or its child
    if (element.target.matches('.shopping__delete, .shopping__delete *')) {
        // delete item in UI
        listView.deleteItem(id)
        // delete item in state
        state.list.deleteItem(id)
    }

    // if click on update count -- note that we do not handle value change by user input
    if (element.target.matches('.shopping__count-value')) {
        const val = parseFloat(element.target.value, 10)
        state.list.updateCount(id, val)
    }
})


// listen to page load to restore likes from local storage
window.addEventListener('load', () => {
    state.likes = new Likes() 
    state.likes.readStorage()

    // toggle to display liked icon on the top panel
    likesView.toggleLikeMenu(state.likes.getNumLiked())

    // render liked items --> state.likes = Likes object --> Likes.likes = array of liked items
    state.likes.likes.forEach(like => likesView.renderLike(like))
})