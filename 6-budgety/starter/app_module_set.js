// create standalone modules with IIFE
// IIFE and closure help make sure that these module are independent
// i.e. ensure separation of concerns




// BUDGET CALCULATION MODULE
var budgetController = (function() {
    let x = 5
    
    let add = function(y) {
        return x + y
    }

    return {
        publicAdd: function(z) {
            console.log(add(z))
        }
    }
})()




// UI MODULE
var UIController = (function() {

})()




// APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl) {
    var x = budgetCtrl.publicAdd(3)
    console.log('App controller called')
    return {
        anotherPublicAdd: function() {
            console.log('anotherPublicAdd is called')
        }
    }
})(budgetController, UIController)




