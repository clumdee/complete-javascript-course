// elements that are available at first run
export const elements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchRes: document.querySelector('.results'),
    searchResList: document.querySelector('.results__list'),
    searchResPages: document.querySelector('.results__pages'),
    recipe: document.querySelector('.recipe'),
    shopping: document.querySelector('.shopping__list'),
    likesMenu: document.querySelector('.likes__field'),
    likesList: document.querySelector('.likes__list')
}

// store strings of elements that will be available later -- cannot immediately select them at first run
export const elementStrings = {
    loader: 'loader'

}

// add loader icon to parent element
export const renderLoader = parent => {
    const loader = `
        <div class="${elementStrings.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>`
    parent.insertAdjacentHTML("afterbegin", loader)
}

// remove loader when done 
export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`)
    // remove if loader exists
    if (loader) loader.parentElement.removeChild(loader)
}