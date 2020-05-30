// ########################
// variables and data types

// var firstName = 'John';
// console.log(firstName);

// var lastName  = "Smith";
// var age       = 28;
// console.log(age);

// var fullAge = true;
// console.log(fullAge);

// var job;
// console.log(job);
// job = 'Teacher';
// console.log(job);

// ########################
// variable mutation and type coercion

// var firstName = 'John';
// var age = 28;
// console.log(firstName + ' ' + age)

// var job = 'Teacher', isMarried = false;
// // job = 'Teacher';
// // isMarried = false;
// console.log(firstName + ' is a ' + job + '. Is he married? '+ isMarried);

// alert(firstName);
// var lastName = prompt('What is his lastname?');
// console.log(firstName + ' ' + lastName)

var john = {
    firstName: 'John',
    birthYear: 1988,

    calAge: function() {
        console.log(2020 - this.birthYear)
        return 2020 - this.birthYear
    },
    // assign a predefined function, 
    // not the return value i.e. not cal2()
    calAge2: cal2,
    calAge3: function(a) {
        console.log(a)
        console.log(2020 - this.birthYear)
        return 2020 - this.birthYear
    },
}

// john.calAge()

function cal2() {
    // get this of the calling object
    console.log(this)
    return 2020 - this.birthYear
}
// calling object is Window
console.log(cal2())
// calling object is john
console.log(john.calAge2())