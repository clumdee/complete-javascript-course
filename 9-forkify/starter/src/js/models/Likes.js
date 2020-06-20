export default class Likes {
    constructor() {
        this.likes = []
    }

    addLike(id, title, author, img) {
        // shorthand notation creating a like object
        const like = {id, title, author, img}

        // append to the list of likes and return liked item
        this.likes.push(like)

        // persist data in local storage
        this.persistData()

        return like
    }

    deleteLike(id) {
        // find location of liked item to delete in the list 
        const index = this.likes.findIndex(el => el.id === id)
        // remove liked item
        this.likes.splice(index, 1)

        // persist data in local storage
        this.persistData()
    }

    isLiked(id) {
        // find location of liked item to check 
        const index = this.likes.findIndex(el => el.id === id)

        // item exists in the liked list will have index >= 0
        return index !== -1
    }

    getNumLiked() {
        return this.likes.length
    }

    persistData() {
        localStorage.setItem('likes', JSON.stringify(this.likes))
    }

    readStorage() {
        const storage = JSON.parse(localStorage.getItem('likes'))

        // restore if likes exists in local storage
        if (storage) {
            this.likes = storage
        }
    }
}