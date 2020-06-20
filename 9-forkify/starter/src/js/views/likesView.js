import { elements } from './base' 
import { limitRecipeTitle } from './searchView'

// toggle like button in the recipe panel
export const toggleLikeBtn = isLiked => {
    // select icon to display if the item is currently liked/not liked
    const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined'

    // select use element in .recipe__love class then change href for icon
    document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${iconString}`)
}

// show/hide like icon on the top panel if no like 
export const toggleLikeMenu = numLikes => {
    elements.likesMenu.style.visibility = numLikes > 0 ? 'visible' : 'hidden'
}

// render each like item 
export const renderLike = like => {
    const markup = `<li>
                        <a class="likes__link" href="#${like.id}">
                            <figure class="likes__fig">
                                <img src="${like.img}" alt="Test">
                            </figure>
                            <div class="likes__data">
                                <h4 class="likes__name">${limitRecipeTitle(like.title, 20)}</h4>
                                <p class="likes__author">${like.author}</p>
                            </div>
                        </a>
                    </li>
                    `
    elements.likesList.insertAdjacentHTML('beforeend', markup)
}

// delete like from the list 
export const deleteLike = id => {
    // select .likes__like class with a specific id 
    const element = document.querySelector(`.likes__link[href*="${id}"`)
    // we want to remove the parent <li>...</li> object
    if (element) {
        const removeElement = element.parentElement
        removeElement.parentElement.removeChild(removeElement)
    }
}