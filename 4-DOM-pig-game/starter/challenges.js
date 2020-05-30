/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

// init parameters
var scores, roundScore, activePlayer
// init game state
var isPlaying
// add memory parameter
var lastDice
// add finalScore parameter
var finalScore

// init stage
init()

// executions when click .btn-roll
document.querySelector('.btn-roll').addEventListener('click', function() {
    // execute if the game is playing
    if (isPlaying) {
        // get random roll
        var dice         = 1 + Math.floor(Math.random() * 6)
        
        // display the roll by updating dice-image
        var diceDOM = document.querySelector('.dice')
        diceDOM.style.display = 'block'
        diceDOM.src = 'dice-' + dice + '.png'

        // reset score and switch player if roll two 6s in a row
        if (dice === 6 && lastDice === 6) {
            // assign roundScore to cancel the current score
            roundScore = -scores[activePlayer]
            // update score, check for winner, and switch active player
            updateScoreAndCheckWinnerAndSwitch()
        }
        // update roundScore of the active player if the roll is not 1
        else if (dice !== 1) {
            // update roundScore and display
            roundScore = roundScore + dice 
            document.querySelector('#current-' + activePlayer).textContent = roundScore
        } else {
            // update score, check for winner, and switch active player
            updateScoreAndCheckWinnerAndSwitch()
        }

        // update lastDice
        lastDice = dice        
    }
})

// executions when click .btn-hold 
document.querySelector('.btn-hold').addEventListener('click', function() {
    // execute if the game is playing
    // update score, check for winner, and switch active player
    if (isPlaying) updateScoreAndCheckWinnerAndSwitch()
})

// function to update score, check for winner, and switch active player
function updateScoreAndCheckWinnerAndSwitch() {
    // update accumulate score 
    scores[activePlayer] += roundScore
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer]
    
    // reset roundScore
    document.querySelector('#current-' + activePlayer).textContent = 0
    roundScore = 0
    
    // check winner 
    if (scores[activePlayer] >= finalScore) {
        document.getElementById('name-' + activePlayer).textContent = 'Winner!'
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner')
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active')
        // hide dice
        document.querySelector('.dice').style.display = 'none'
        // set game state to false
        isPlaying = false
    }
    else { // if no winner
        // switch activePlayer
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0
        // toggle activePlayer indicator
        document.querySelector('.player-0-panel').classList.toggle('active')
        document.querySelector('.player-1-panel').classList.toggle('active')
    }
}

// executions when click .btn-new
document.querySelector('.btn-new').addEventListener('click', init)

// function to initialize stage
function init() {
    scores       = [0, 0]
    roundScore   = 0
    activePlayer = 0
    isPlaying    = true
    // set finalScore
    // set to 100 if the Number(input value) is not > 0 ()
    finalScore = document.querySelector('.final-score').value
    Number(finalScore) > 0 ? {} : finalScore = 100
    document.querySelector('.final-score').value = finalScore

    // set scores and current scores to 0 for both players
    document.getElementById('score-0').textContent = 0
    document.getElementById('score-1').textContent = 0
    document.getElementById('current-0').textContent = 0
    document.getElementById('current-1').textContent = 0
    // reset player name -- in case 'winner' persists
    document.getElementById('name-0').textContent = 'Player 1'
    document.getElementById('name-1').textContent = 'Player 2'
    document.querySelector('.player-0-panel').classList.remove('winner')
    document.querySelector('.player-1-panel').classList.remove('winner')
    // reset active status to player-0
    document.querySelector('.player-0-panel').classList.add('active')
    document.querySelector('.player-1-panel').classList.remove('active')

    // modify style/css property -- get object by class, access style (css), select property, then assign value 
    document.querySelector('.dice').style.display = 'none'
}