// object constructor and prototype (class)
// build an object based on a define set of properties
// then add prototypes

// var Person = function(name, yearOfBirth, job) {
//     this.name = name
//     this.yearOfBirth = yearOfBirth 
//     this.job = job 
// }

// var john = new Person('John', 1990, 'teacher')

// function Person2(name, yearOfBirth, job) {
//         this.name = name
//         this.yearOfBirth = yearOfBirth 
//         this.job = job 
// }

// var mike = new Person2('Mike', 1989, 'doctor')

// Person.prototype.calculageAge = function() {
//     console.log(2020 - this.yearOfBirth)
// }
// var jane = new Person('Jane', 1982, 'professor')
// var mark = new Person('MArk', 1967, 'trader')

// john.calculageAge()
// jane.calculageAge() 
// mark.calculageAge()




// object.create
// build an object based on a define set of prototypes
// then add properties

// var personProto = {
//     calculageAge: function () {
//         console.log(2020 - this.yearOfBirth)
//     }
// }

// var john = Object.create(personProto)
// john.name = 'John'
// john.yearOfBirth = 1990 
// john.job = 'teacher'

// var jane = Object.create(personProto, {
//     name: {value: 'Jane'},
//     yearOfBirth: {value: 1989},
//     job: {value: 'professor'}
// }) 




// Primitives and Objects

// var a = 20
// var b = a 
// a = 30 
// console.log(a)
// console.log(b)

// var obj1 = {name: 'John', age: 20}
// var obj2 = obj1 
// obj1.age = 22 
// console.log(obj1.age)
// console.log(obj2.age)
// obj2.age = 24 
// console.log(obj1.age)
// console.log(obj2.age)


// function change(x, y) {
//     x = 55 
//     y.name = 'Jack'
// }

// console.log(a)
// console.log(obj1)
// change(a, obj1)
// console.log(a)
// console.log(obj1)




// function as an argument

// var years = [1985, 1996, 2008, 2014]

// function arrayCalc(arr, fn) {
//     var arrRes = []
//     for (var i = 0; i < arr.length; i++) {
//         // append new element at the end
//         arrRes.push(fn(arr[i]))
//     }
//     return arrRes 
// }

// function calcAge(y) {
//     return 2020 - y
// }

// function maxHeartRate(age) {
//     if (age >= 18 && age <= 81) {
//         return 206.9 - (0.67 * age)
//     }
//     else return -1 
// }

// var ages = arrayCalc(years, calcAge)
// var maxHeartRates = arrayCalc(ages, maxHeartRate)




// returning a function 

// function masterFunc(id) {
//     if (id == 0) {
//         // return an anonymous function
//         return function(name) {
//             console.log('Hello, ' + name)
//         }
//     }
//     else {
//         return function(name) {
//             console.log('Goodbye, ' + name)
//         }
//     }
// }

// var hello = masterFunc(0)
// var goodbye = masterFunc(1)

// hello('James')
// goodbye('Nick')
// masterFunc(0)('Jack')




// immediately invoked function expression (IIFE)
// used to improve data protection

// (function () {
//     let score = Math.random() * 10 
//     console.log(score > 5)
// })()

// (function (goodluck) {
//     let score = Math.random() * 10 + goodluck
//     console.log(score > 5)
// })(5)




// function closures

function retirementStatus(retirementAge) {
    let end = ' years left until retirement'
    return function(yearOfBirth) {
        let age = 2020 - yearOfBirth
        console.log(retirementAge - age + end)
    }
}

let retirementUS = retirementStatus(66)
let retirementTH = retirementStatus(60)

retirementUS(1988)
retirementTH(1988)




// function -- call, bind, apply







