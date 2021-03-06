/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// var scores       = [0, 0]
// var roundScore   = 0
// var activePlayer = 0

// get dice value from 1 to 6
// var dice         = 1 + Math.floor(Math.random() * 6)

// document.querySelector('#current-' + activePlayer).textContent = dice
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>'

// test accessing html content
// var x = document.querySelector('#current-' + activePlayer).textContent
// console.log(x)
// console.log(typeof x)

// test click event callback -- using declarative function, expressive functions, and anonymous function
// function f() {console.log('declaration function clicked')}
// document.querySelector('.btn-hold').addEventListener('click', f)
// var f2 = function() {console.log('expression function clicked')}
// document.querySelector('.btn-roll').addEventListener('click', f2)
// document.querySelector('.btn-new').addEventListener('click', function() {console.log('anonymous function clicked')}) 

// set scores and current scores to 0 for both players
// document.getElementById('score-0').textContent = 0
// document.getElementById('score-1').textContent = 0
// document.getElementById('current-0').textContent = 0
// document.getElementById('current-1').textContent = 0

// modify style/css property -- get object by class, access style (css), select property, then assign value 
// document.querySelector('.dice').style.display = 'none'

// init parameters
var scores, roundScore, activePlayer
// init game state
var isPlaying

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

        // update roundScore of the active player if the roll is not 1
        if (dice !== 1) {
            // update roundScore and display
            roundScore = roundScore + dice 
            document.querySelector('#current-' + activePlayer).textContent = roundScore
        } else {
            // update score, check for winner, and switch active player
            updateScoreAndCheckWinnerAndSwitch()
        }
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
    if (scores[activePlayer] >= 100) {
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