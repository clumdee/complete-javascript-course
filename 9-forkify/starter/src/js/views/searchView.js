import { elements } from './base' 

export const getInput = () => elements.searchInput.value

export const clearInput = () => {
    // wrap it in a curly because we do not want to return anything
    elements.searchInput.value = ''
}

export const clearResults = () => {
    // clear item list
    elements.searchResList.innerHTML = ''
    // clear navigation buttons
    elements.searchResPages.innerHTML = ''
}

// search for selected recipe id and highlight it
export const highlightSelected = id => {
    // clear existing selections
    const selectedArr = document.querySelectorAll('.results__link--active')
    selectedArr.forEach(element => element.classList.remove('results__link--active'))
    
    // add highlight class to a new selection by href (in a class .results__link)
    document.querySelector(`.results__link[href="#${id}"]`).classList.add('results__link--active')
}

// limit length of title to a set limit (default 17 characters, excluding ' ')
export const limitRecipeTitle = (title, limit = 17) => {
    
    const newTitle = [] 
    
    if (title.length > limit) {
        const titleSplit = title.split(' ')

        titleSplit.reduce((accum, current) => {
            // append next word if still in limit
            if (accum + current.length <= limit) {
                newTitle.push(current)    
            }
            // return to update accum
            return accum + current.length
        }, 0)

        return newTitle.join(' ') + ' ...'
    }
    
    // return original if already in the limit
    return title

}

const renderRecipe = recipe => {
    const markup = `
    <li>
        <a class="results__link" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="${recipe.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>
    `
    elements.searchResList.insertAdjacentHTML("beforeend", markup)
}


// create prev/next button
const createButton = (page, type) => {
    return `<button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
                <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
                </svg>
                
            </button>
            `
}


const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage) 
    
    // exit if page not valid
    if (page > pages) return false
    
    // use let because it will be updated
    let button 
    // display only next button
    console.log()
    if (page == 1 && pages > 1) {
        button = createButton(page, 'next')
    } 
    // display only prev button
    if (page == pages && pages > 1) {
        button = createButton(page, 'prev')
    }
    // display next and prev buttons
    if (page > 1 && page < pages) {
        button =    `
                    ${createButton(page, 'prev')}
                    ${createButton(page, 'next')}
                    `
    }

    // add buttons
    elements.searchResPages.insertAdjacentHTML('afterbegin', button)
}


// render results for different page
export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    const start = (page - 1) * resPerPage 
    const end = page * resPerPage

    // end item not included
    recipes.slice(start, end).forEach(renderRecipe)

    // add navigation buttons
    renderButtons(page, recipes.length, resPerPage)

    // recipes.forEach(element => renderRecipe(element))
    // shorthand notation -- element is automatically applied
    // recipes.forEach(renderRecipe)
}