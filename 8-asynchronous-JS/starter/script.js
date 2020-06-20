// const second = () => {
//     setTimeout(()=> {
//         console.log('second')
//     }, 5000)
// }

// const third = () => {
//     setTimeout(() => {
//         console.log('third')
//     }, 2000)
// }
// const first = () => {
//     console.log('first')
//     second()
//     third()
//     console.log('end')
//     for (let i = 1; i < 1000000001; i++) {
//         if (i%100000000===0) {
//             console.log(i)
//         }
//     }
// }

// first()

// const woeid = 1225448
// let a = fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}/`)
// .then(result => {
//     console.log(result)
//     return result.json()
// })
// .then(data => {
//     console.log(data)
//     return data
// })
// .catch(error => console.log(error))


// async function getWeatherAW(woeid) {
//     try {
//         const result = await fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}/`);
//         console.log(typeof(result))
//         const data = await result.json();
//         console.log(typeof(data))
//         const tomorrow = data.consolidated_weather[1];
//         console.log(`Temperatures tomorrow in ${data.title} stay between ${tomorrow.min_temp} and ${tomorrow.max_temp}.`);
//         // return result;
//         return data
//     } catch(error) {
//         alert(error);
//     }
// }
// // getWeatherAW(2487956);

// // async funtion return a promise, with the return as the resolved data
// // dataLondon = getWeatherAW(44418)

// // the returned promise can be assigned to a varibale using then statement
// // let dataLondon;
// let dataLondon = getWeatherAW(44418).then(data => {
//     dataLondon = data
//     console.log(dataLondon);
// });







const getIDs = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve([523, 883, 432, 974]);
    }, 1500);
});

const getRecipe = recID => {
    return new Promise((resolve, reject) => {
        setTimeout(ID => {
            const recipe = {title: 'Fresh tomato pasta', publisher: 'Jonas'};
            // resolve(`${ID}: ${recipe.title}`);
            resolve(recipe);
        }, 1500, recID);
    });
};

const getRelated = publisher => {
    return new Promise((resolve, reject) => {
        setTimeout(pub => {
            const recipe = {title: 'Italian Pizza', publisher: 'Jonas'};
            resolve(`${pub}: ${recipe.title}`);
        }, 1500, publisher);
    });
};

getIDs
.then(IDs => {
    console.log(IDs);
    return getRecipe(IDs[2]);
})
.then(recipe => {
    console.log(recipe);
    return getRelated(recipe.publisher);
})
.then(recipe => {
    console.log(recipe);
})
.catch(error => {
    console.log('Error!!');
});

// async function getRecipesAW() {
//     const IDs = await getIDs;
//     console.log(IDs);
//     const recipe = await getRecipe(IDs[2]);
//     console.log(recipe);
//     const related = await getRelated(recipe.publisher);
//     console.log(related);

//     return recipe;
// }
// getRecipesAW().then(result => console.log(`${result.title} is the best ever!`));