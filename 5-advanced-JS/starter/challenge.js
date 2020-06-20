// Q1: Who am I? {0: 'Tua', 1: 'Phet', 2: 'Kwang'}
// Q2: When was I born? {0: 1988, 1: 1989, 2: 1990}
// Q3: What did I study? {0: 'Eng', 1: 'MD', 2: 'DMD'}


let Question = function(text, choices, solution) {
    this.text = text 
    // convert array to enumerate object
    // this.choices = {...choices}
    this.choices = choices
    this.solution = solution
}

// add prototype function
Question.prototype.displayQuestion = function() {
    console.log(this.text);
    for (let i = 0; i < this.choices.length; i++) {
        console.log(i + ': ' + this.choices[i])
    }
}

let q1 = new Question('Who am I?', ['Tua', 'Phet', 'Kwang'], 0)
let q2 = new Question('When was I born?', [1988, 1989, 1990], 0)
let q3 = new Question('What did I study?', ['Eng', 'MD', 'DMD'], 0)
let questions = [q1, q2, q3]

function getQuestion(questions) {
    let id = Math.floor(Math.random()*questions.length)
    let q = questions[id]
    q.displayQuestion()
    return q 
}

let score = 0
for (let round = 1; true; round++) {
    console.log('Question ' + round + ':')

    // get question
    let q = getQuestion(questions)
    // get answer through prompt
    let answer = prompt(q.text + (' Enter the number of your answer.'))
    
    // exit loop by prompt input
    if (answer.toLowerCase() === 'exit') break 
    
    // check solution -- you can also use parseInt(answer)
    if (q.solution === Number(answer)) {
        console.log('You are correct. Hello my friend.')
        score++
    }
    else console.log('Sorry. You are wrong. Let\'s be friends.')

    // score 
    console.log('You answered correctly ' + score + '/' + round + ' times.')

    // end question
    console.log('======================================')
}


// You can put the whole code block in IIFE
// to prevent the code from interfering with others
// (function() {
// YOUR CODE BLOCK
// })()