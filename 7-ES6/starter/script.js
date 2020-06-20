// var i = 10
// for (var i=1; i<5; i++) {
//     console.log(i)
// }
// console.log(i)

// let i = 10
// for (let i=1; i<5; i++) {
//     console.log(i)
// }
// console.log(i)




// // arrow function -- arg => result
// let aF = el => el
// console.log(aF(5))

// // simple map writing
// let years = [1988, 1989, 1990, 1991]
// let ages = years.map(y => 2020 - y)

// // arrow function with one line (return is assumed)
// let aF2 = (x, y) => x + y
// console.log(aF2(3,4))

// // compare with function expression
// let F2 = function(x,y) {return x+y}
// console.log(F2(3,4))

// // arrow funtion with multiple lines (explicit return is needed)
// let aF3 = (x, y) => {
//     console.log('hi')
//     return x + y
// }




// // this in ES5
// // = get immediate parent object of the method (object the function is attached to)
// var box5 = {
//     color: 'green',
//     position: 1,
//     clickMe: function() {
//         console.log(1, this)
//         var self = this
//         // run clickMe() to add event listener
//         document.querySelector('.green').addEventListener('click', function() {
//             console.log(1, self)
//             console.log(2, this)
//         })
//     }
// }


// // in ES6, arrow function uses lexical this (one object above)
// let box6 = {
//     color: 'green',
//     position: 1,
//     clickMe: function() {
//         console.log(1, this)
//         var self = this
//         // run clickMe() to add event listener
//         document.querySelector('.green').addEventListener('click', () => {
//             console.log(1, self)
//             console.log(2, this)
//         })
//     }
// }
// try arrow function at both place
// let box66 = {
//     color: 'green',
//     position: 1,
//     clickMe: () => {
//         console.log(1, this)
//         var self = this
//         // run clickMe() to add event listener
//         document.querySelector('.green').addEventListener('click', () => {
//             console.log(1, self)
//             console.log(2, this)
//         })
//     }
// }




// // destructuring
// // deconstruct an array
// let arr = ['john', 26]
// let [name, age] = arr 
// console.log(name)
// console.log(age)

// // deconstruct an object
// let obj = {first: 'james', last: 'smith'}
// let {first, last} = obj
// console.log(first)
// console.log(last)
// // deconstruct an object and assign properties to variables with different names
// let {first: a, last: b} = obj
// console.log(a)
// console.log(b)




// // array
// let boxes = document.querySelectorAll('.box')
// // boxes.forEach(current => current.style.backgroundColor = 'green')
// // let boxesArr = Array.from(boxes)
// // boxesArr.forEach(current => current.style.backgroundColor = 'dodgerBlue')

// // for loop in ES6 -- no longer need arr.length, i++, etc.
// for (const box of boxes) {
//     console.log(box.className)
//     if (box.className.includes('blue')) {
//         console.log('blue')
//         continue
//     }
//     console.log('not blue')
// }

// // array searching
// let ages = [10, 14, 18, 22]
// console.log(ages.map(current => current > 17))
// console.log(ages.filter(current => current > 17))
// // find 1st
// console.log(ages.find(current => current > 17))
// console.log(ages.findIndex(current => current > 17))




// // spread operator -- use in a function call to unpack an array
// let arr = [1, 2, 3, 4]
// console.log(arr)
// console.log(...arr)
// console.log([...arr, ...arr])
// console.log(...[...arr, ...arr])
// console.log([...arr, 'hi', ...arr])

// let sum = (a, b, c, d) => a + b + c + d 
// console.log(sum(arr[0], arr[1], arr[2], arr[3]))
// console.log(sum(...arr))




// // rest parameters -- use in function decoration to accepts an arbitary number of parameters
// // convert separate arguments into a list of arguments
// // ES6
// let func6 = (...years) => years.map(current => (2020-current) >= 18)
// console.log(func6(1987, 1997, 2007, 2017))
// // help separate required arguments
// let func62 = (limit, ...years) => years.map(current => (2020-current) >= limit)
// console.log(func62(18, 1987, 1997, 2007, 2017))

// // ES5 -- rest not available -- use arguments keyword and convert to list
// let func5 = function() {
//     // console.log(arguments)
//     console.log(Array.from(arguments).map(function(current){
//         return (2020-current) >= 18
//     }))
// }
// console.log(func5(1987, 1997, 2007, 2017))
// let func52 = function(limit) {
//     // console.log(arguments)
//     // slice to skip limit in the 1st argument
//     console.log(Array.from(arguments).slice(1).map(function(current){
//         return (2020-current) >= limit
//     }))
// }
// console.log(func52(18, 1987, 1997, 2007, 2017))




// Default parameters
// ES5
// function Person5(firstName, lastName, age) {
    
//     lastName === undefined ? lastName = 'Smith' : lastName = lastName
//     age === undefined ? age = 30 : age = age

//     this.firstName = firstName
//     this.lastName = lastName
//     this.age = age
// }
// console.log(new Person5('Peter', 'Anderson', 56))
// console.log(new Person5('James'))

// ES6
// function Person6(firstName, lastName = 'Hagan', age = 45) {
//     this.firstName = firstName
//     this.lastName = lastName
//     this.age = age
// }
// console.log(new Person6('Patrick', 'Lam', 26))
// console.log(new Person6('Erica'))




// // Map -- similar to dict in python
// // Object is a Map that can only use string as keys
// let m = new Map()
// m.set('first', 1)
// m.set(5, 50)
// m.set(10, 'ten')
// console.log(m)
// console.log(m.size)
// console.log(m.keys())
// console.log(m.values())
// console.log(m.get(10))
// console.log(m.has('first'))
// m.delete('first')
// console.log(m)

// for (let [i, j] of m) {
//     console.log(`key = ${i}, value = ${j}`)
// }

// m.forEach((value, key) => console.log(`key = ${key}, value = ${value}`))




// // Class 
// // ES5 -- use function constructor
// let Person5 = function(firstName, lastName, yob) {
//     this.firstName = firstName
//     this.lastName = lastName 
//     this.yob = yob
// }
// // add prototype method
// Person5.prototype.calculateAge = function() {
//     return new Date().getFullYear() - this.yob 
// }
// console.log(new Person5('Jack', 'Smith', 1985))
// console.log(new Person5('Jack', 'Smith', 1985).calculateAge())

// // ES6 -- use class constructor
// // Note that class constructor is not hoisted
// class Person6 {
//     constructor(firstName, lastName, yob) {
//         this.firstName = firstName
//         this.lastName = lastName
//         this.yob = yob 
//     }
//     // add prototype method directly in class
//     calculateAge() {
//         return new Date().getFullYear() - this.yob
//     }

//     // add statis method -- attach to Class, not instance
//     static greeting() {
//         console.log('hi')
//     }
// }
// console.log(new Person6('Jack', 'Smith', 1985))
// console.log(new Person6('Jack', 'Smith', 1985).calculateAge())
// console.log(Person6.greeting())




// // Classes and sub-classes
// // ES5 -- use function constructor
// let Person5 = function(firstName, lastName, yob) {
//     this.firstName = firstName
//     this.lastName = lastName 
//     this.yob = yob
// }
// // add prototype method
// Person5.prototype.calculateAge = function() {
//     return new Date().getFullYear() - this.yob 
// }

// // inheritance
// let Athlete5 = function(firstName, lastName, yob, olympicGames, medals) {
//     // call constructor of a parent class
//     Person5.call(this, firstName, lastName, yob)
//     // add extended properties
//     this.olympicGames = olympicGames
//     this.medals = medals 
// }
// // add prototype in the same level as the parent class 
// Athlete5.prototype = Object.create(Person5.prototype)
// // add prototype of the child class -- has to be after setting prototype at the parent class level
// Athlete5.prototype.olympicStats = function() {
//     console.log(this.firstName + ' won ' + this.medals + ' Olympic medals')
// }
// console.log(new Athlete5('Jack', 'Smith', 1985, 3, 1))

// // ES6 -- use class constructor
// // Note that class constructor is not hoisted
// class Person6 {
//     constructor(firstName, lastName, yob) {
//         this.firstName = firstName
//         this.lastName = lastName
//         this.yob = yob 
//     }
//     // add prototype method directly in class
//     calculateAge() {
//         return new Date().getFullYear() - this.yob
//     }
// }
// class Athlete6 extends Person6 {
//     constructor(firstName, lastName, yob, olympicGames, medals) {
//         // construct properties inherited from super class
//         // prototype methods are also created
//         super(firstName, lastName, yob)

//         // add extended properties
//         this.olympicGames = olympicGames 
//         this.medals = medals 
//     }
//     // add protype method for this child class
//     olympicStats() {
//         console.log(`${this.firstName} won ${this.medals} Olympic medals`)
//     }
// }
// console.log(new Athlete6('Jane', 'Johnson', 1988, 2, 2))




/////////////////////////////////
// CODING CHALLENGE

/*

Suppose that you're working in a small town administration, and you're in charge of two town elements:
1. Parks
2. Streets

It's a very small town, so right now there are only 3 parks and 4 streets. All parks and streets have a name and a build year.

At an end-of-year meeting, your boss wants a final report with the following:
1. Tree density of each park in the town (forumla: number of trees/park area)
2. Average age of each town's park (forumla: sum of all ages/number of parks)
3. The name of the park that has more than 1000 trees
4. Total and average length of the town's streets
5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal

All the report data should be printed to the console.

HINT: Use some of the ES6 features: classes, subclasses, template strings, default parameters, maps, arrow functions, destructuring, etc.

*/

class Property {
    constructor(name, buildYear) {
        this.name = name 
        this.buildYear = buildYear 
    }
}

class Park extends Property {
    constructor(name, buildYear, numTrees, area) {
        super(name, buildYear)

        this.numTrees = numTrees
        this.area = area 
    }

    getAge() {
        return new Date().getFullYear() - this.buildYear 
    }

    getTreeDensity() {
        return this.numTrees / this.area
    }
}

class Street extends Property {
    constructor(name, buildYear, length, size = 2) {
        super(name, buildYear)

        this.length = length 
        this.size = size
    }

    getStreetSize() {
        return streetSize.get(this.size)
    }
}

let streetSize = new Map() 
const sizes = ['tiny', 'small', 'normal', 'big', 'huge']
for (let i = 0; i < sizes.length; i++) {
    streetSize.set(i, sizes[i])
}

let allParks =  [new Park('Water Park', 1976, 1200, 4),
                 new Park('Green Park', 1998, 4500, 10),
                 new Park('Little Park', 2006, 480, 1),
                ]

let allStreet = [new Street('Giant Street', 1987, 28, 4),
                 new Street('North Street', 1992, 14, 2),
                 new Street('Inner Street', 2008, 11, 1),
                 new Street('First Street', 1965, 5, 0)
                ]


function getAvg(arr) {
    let arrSum = arr.reduce((x, y) => x + y)
    return [arrSum, arrSum/arr.length]
}

let parkAges = allParks.map(p => p.getAge())
let [parkAgeSum, parkAgeAvg] = getAvg(parkAges)
let parks1000 = allParks.filter(cur => cur.numTrees >= 1000)

let streetLengths = allStreet.map(s => s.length)
let [streetLengthSum, streetLengthAvg] = getAvg(streetLengths)



console.log('---------PARK REPORT---------')
allParks.forEach(current => {
    console.log(`${current.name} has ${current.getTreeDensity()} tree/km^2.`)
})
console.log(`These parks have an average age of ${parkAgeAvg}.`)
parks1000.forEach(current => {
    console.log(`${current.name} has >= 1000 trees.`)
})

console.log('----------STREET REPORT----------')
allStreet.forEach(current => {
    console.log(`${current.name} is a ${current.getStreetSize()} street.`)
})
console.log(`The streets have a combined length of ${streetLengthSum} km --> avg. length = ${streetLengthAvg} km.`)
