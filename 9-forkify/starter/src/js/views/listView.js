import { elements } from './base' 

export const renderItem = item => {
    const markup = `<li class="shopping__item" data-itemid="${item.id}">
                        <div class="shopping__count">
                            <input type="number" value="${item.count}" step="${item.count}" class="shopping__count-value">
                            <p>${item.unit}</p>
                        </div>
                        <p class="shopping__description">${item.ingredient}</p>
                        <button class="shopping__delete btn-tiny">
                            <svg>
                                <use href="img/icons.svg#icon-circle-with-cross"></use>
                            </svg>
                        </button>
                    </li>
                    `
    // add before end so a later item in the array is added at the end
    elements.shopping.insertAdjacentHTML('beforeend', markup)
}

export const deleteItem = id => {
    // find item using data-itemid
    const item = document.querySelector(`[data-itemid="${id}"]`)
    // delete
    item.parentElement.removeChild(item)
}