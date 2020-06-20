import axios from 'axios'

export default class Search {
    constructor(query) {
        this.query = query
    }

    async getResults() {
        try {
            // await new Promise((resolve, reject) => setTimeout(resolve, 3000))
            const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`)
            // console.log(res)
            this.result = res.data.recipes
            // console.log(this.result)
        }
        catch (error) {
            alert(`Search error: ${error}`)
        }
    }
}
