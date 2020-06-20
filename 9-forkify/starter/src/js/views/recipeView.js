import { elements } from './base'
import { Fraction } from 'fractional'

const formatCount = numCount => {
    // check if numCount exists -- if not just return '?'
    if (numCount) {
        // numCount = 2.5 --> 2 1/2 
        // numCount = 0.5 --> 1/2 

        // fixed some rounding to prevent calculation error -- with this 0.333333333333333... = 0.3333
        const newCount = Math.round(numCount * 10000) / 10000

        // note that int and dec are string
        const [int, dec] = newCount.toString().split('.')//.map(e => parseInt(e, 10))

        // if no decimal just return int
        if (!dec) return int

        // else return int fraction -- do not show int = 0
        // this has a flawn -- 0.333333333 --> 333333333/1000000000
        // it would be better to keep recipe count as string in Recipe.js, but good to play with eval and fractional module
        const fr = new Fraction(`0.${dec}`) 
        
        // keep things like 2 3333/10000 as 2.33
        if (fr.denominator < 10) {
            return `${int === '0' ? '' : int} ${fr.numerator}/${fr.denominator}`   
        }
        return newCount.toFixed(2)

    }
    return '?'
}


const createIngredient = ingredient => `
    <li class="recipe__item">
        <svg class="recipe__icon">
            <use href="img/icons.svg#icon-check"></use>
        </svg>
        <div class="recipe__count">${formatCount(ingredient.count)}</div>
        <div class="recipe__ingredient">
            <span class="recipe__unit">${ingredient.unit}</span>
        ${ingredient.ingredient}
        </div>
    </li>`

export const clearRecipe = () => {
    // clear displayed recipe
    elements.recipe.innerHTML = ''
}

export const renderRecipe = (recipe, isLiked) => {

    // markup without ingredients list
    const markup = `
            <figure class="recipe__fig">
                <img src="${recipe.img}" alt="${recipe.title}" class="recipe__img">
                <h1 class="recipe__title">
                    <span>${recipe.title}</span>
                </h1>
            </figure>

            <div class="recipe__details">
                <div class="recipe__info">
                    <svg class="recipe__info-icon">
                        <use href="img/icons.svg#icon-stopwatch"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--minutes">${recipe.time}</span>
                    <span class="recipe__info-text"> minutes</span>
                </div>
                <div class="recipe__info">
                    <svg class="recipe__info-icon">
                        <use href="img/icons.svg#icon-man"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
                    <span class="recipe__info-text"> servings</span>

                    <div class="recipe__info-buttons">
                        <button class="btn-tiny btn-decrease">
                            <svg>
                                <use href="img/icons.svg#icon-circle-with-minus"></use>
                            </svg>
                        </button>
                        <button class="btn-tiny btn-increase">
                            <svg>
                                <use href="img/icons.svg#icon-circle-with-plus"></use>
                            </svg>
                        </button>
                    </div>

                </div>
                <button class="recipe__love">
                    <svg class="header__likes">
                        <use href="img/icons.svg#icon-heart${isLiked ? '' : '-outlined'}"></use>
                    </svg>
                </button>
            </div>

            <div class="recipe__ingredients">
                <ul class="recipe__ingredient-list">
                    <!--
                    <li class="recipe__item">
                        <svg class="recipe__icon">
                            <use href="img/icons.svg#icon-check"></use>
                        </svg>
                        <div class="recipe__count">1000</div>
                        <div class="recipe__ingredient">
                            <span class="recipe__unit">g</span>
                            pasta
                        </div>
                    </li>
                    -->
                    <!-- map ingredients to get DOM object array, then join them and insert --> 
                    ${recipe.ingredients.map(ingredient => createIngredient(ingredient)).join('')}

                </ul>

                <button class="btn-small recipe__btn recipe__btn--add">
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-shopping-cart"></use>
                    </svg>
                    <span>Add to shopping list</span>
                </button>
            </div>

            <div class="recipe__directions">
                <h2 class="heading-2">How to cook it</h2>
                <p class="recipe__directions-text">
                    This recipe was carefully designed and tested by
                    <span class="recipe__by">${recipe.author}</span>. Please check out directions at their website.
                </p>
                <a class="btn-small recipe__btn" href="${recipe.url}" target="_blank">
                    <span>Directions</span>
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-right"></use>
                    </svg>

                </a>
            </div>
    `
    
    elements.recipe.insertAdjacentHTML('afterbegin', markup)
}

export const updateServingsIngredients = recipe => {
    // update servings
    document.querySelector('.recipe__info-data--people').textContent = recipe.servings

    // update ingredients
    const countElements = Array.from(document.querySelectorAll('.recipe__count'))
    countElements.forEach((element, i) => {
        element.textContent = formatCount(recipe.ingredients[i].count)
    })
}