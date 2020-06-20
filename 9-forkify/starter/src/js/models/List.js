import uniqid from 'uniqid'

export default class List {
    // initial list is empty
    constructor() {
        this.items = []
    }

    // an item by count/unit/ingredient to the list
    addItem(count, unit, ingredient) {
        const item = {
            // assign unique id to be able to later identify the item
            id: uniqid(),
            count, // same as count: count
            unit,
            ingredient,
        }

        this.items.push(item) 
        
        // return item to render in UI
        return item
    }

    // delete item 
    deleteItem(id) {
        // find location of item to delete in the list 
        const index = this.items.findIndex(el => el.id === id)

        // array.slice(start, end) --> return array[start to (end-1) position], do not mutate the array
        // array.splice(start, num) --> return array[start to (start+num-1) position], remove the returned part from the original array
        this.items.splice(index, 1)
    }

    // update count of selected item in the shopping list 
    updateCount(id, newCount) {
        // find the selected item
        const selectedItem = this.items.find(el => el.id === id)
        selectedItem.count = newCount
    }
}