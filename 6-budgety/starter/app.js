// create standalone modules with IIFE
// IIFE and closure help make sure that these module are independent
// i.e. ensure separation of concerns




// BUDGET CALCULATION MODULE
let budgetController = (function() {
    // create constructor for expense and income
    let Expense = function(id, description, value) {
        this.id = id
        this.description = description 
        this.value = value
    }    
    Expense.prototype.calcPercentage = function(totalIncome) {
        if (totalIncome > 0) {
            this.percentage = Math.round(100 * this.value / totalIncome)
        } 
        else {
            this.percentage = undefined
        }
    }
    Expense.prototype.getPercentage = function() {
        return this.percentage
    }

    let Income = function(id, description, value) {
        this.id = id
        this.description = description
        this.value = value
    }

    // create main data object 
    let data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: undefined
    }

    // function to update total
    let calculateTotal = function(type) {
        let sum = 0 
        data.allItems[type].forEach(function(current) {
            sum += current.value
        })
        data.totals[type] = sum
    }


    // return public functions for other modules to manipulate(add) incomes/expenses
    return {
        addItem: function(type, desc, val) {
            // prepare id for a new item
            // if there are existing items, get the id of the last item, then + 1
            // do not use length because it cannot support item deletion
            // else id = 0 (id will get reset to 0 if all items get deleted -- kind of a bug but let it be for now)
            let id
            if (data.allItems[type].length > 0) {
                id = data.allItems[type][data.allItems[type].length - 1]['id'] + 1
            }
            else {id = 0}
            
            // create a new item
            let newItem
            if (type==='exp') newItem = new Expense(id, desc, val)
            if (type==='inc') newItem = new Income(id, desc, val)

            // append newItem to data object with respect to item's type
            data.allItems[type].push(newItem)
            
            // return newItem for other modules/functions to use
            return newItem
        },

        calculateBudget: function() {
            // calculate incomes and expenses
            calculateTotal('inc')
            calculateTotal('exp')

            // calculate budget = income - expenses 
            data.budget = data.totals.inc - data.totals.exp

            // calculate percentage of expenses/income -- undefined if income = 0
            data.percentage = (data.totals.inc > 0)? Math.round(100 * data.totals.exp / data.totals.inc) : undefined
        },

        getBudget: function() {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            }
        },

        deleteItem: function(type, id) {
            // identify item to delete 
            // note that item index != id, e.g. id = [0, 2, 3, 4, 7]
            
            // 1. Build a list of item ids
            // map all objects in an allItems list to create a list of ids
            var ids = data.allItems[type].map(function(current) {
                return current.id
            })

            // 2. Get location (index) of item to be deleted in the allItems list
            // get index based on the target id of the item
            var index = ids.indexOf(id)

            // 3. Remove the item from the allItems list if exists
            if (index >= 0) {
                // specify index to start and length to delete
                data.allItems[type].splice(index, 1)
            }

        },

        calculatePercentages: function() {
            data.allItems.exp.forEach(function(current) {
                current.calcPercentage(data.totals.inc)
            })
        },

        getPercentages: function() {
            // map all objects in the list to create a new list of return values
            let allPerc = data.allItems.exp.map(function(current) {
                return current.getPercentage()
            })
            return allPerc
        },

        getData: function() {return data}
    }
})()




// UI MODULE
let UIController = (function() {
    // centralize *all* DOM (UI) objects to use
    // and return as public properties for all modules
    let DOMStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensePercLabel: '.item__percentage',
        dateLabel: '.budget__title--month'
    }
    
    // function to format a number
    let formatNumber = function(num, type) {
        // 1. +/- before the number
        type === 'inc'? sign = '+' : sign = '-'
        // default sign of the number is no longer needed
        num = Math.abs(num)

        // 2. Two decimal points
        // get string then split to int and dec
        num = num.toFixed(2)
        let int = num.split('.')[0]
        let dec = num.split('.')[1]

        // 3. Comma separating the thousands of int part
        int = Number(int).toLocaleString()

        // return number as designed
        return sign + ' ' + int + '.' + dec
    }

    return {
        // return public properties/methods to be called in controller module
        getInput: function() {
            return {
                type: document.querySelector(DOMStrings.inputType).value, // either 'inc' or 'exp'
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMStrings.inputValue).value)
            }
        },

        addListItem: function(obj, type) {
            // create HTML string with placeholder text 
            // also pick html element to insert this html to
            let html, element
            if (type==='inc') {
                element = DOMStrings.incomeContainer
                html = `
                <div class="item clearfix" id="inc-%id%">
                    <div class="item__description">%description%</div>
                    <div class="right clearfix">
                        <div class="item__value">%value%</div>
                        <div class="item__delete">
                            <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                        </div>
                    </div>
                </div>
                `
            }
            if (type==='exp') {
                element = DOMStrings.expenseContainer
                html = `
                <div class="item clearfix" id="exp-%id%">
                    <div class="item__description">%description%</div>
                    <div class="right clearfix">
                        <div class="item__value">%value%</div>
                        <div class="item__percentage">21%</div>
                        <div class="item__delete">
                            <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                        </div>
                    </div>
                </div>
                `
             }

            // replace placeholder text with actual data 
            let newHtml = html.replace('%id%', obj.id)
            newHtml = newHtml.replace('%description%', obj.description)
            newHtml = newHtml.replace('%value%', formatNumber(obj.value, type))

            // insert HTML into DOM 
            // insert as a child, and at the end of the selected element
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml)
        },

        clearFields: function() {
            // get input fields to clear
            let fields = document.querySelectorAll(DOMStrings.inputDescription + ', ' + DOMStrings.inputValue)
            
            // clear value using forEach loop 
            fields.forEach(function(current) {
                current.value = ''
            })

            // move the focus back to inputDescription
            document.querySelector(DOMStrings.inputDescription).focus()
        },

        displayBudget: function(obj) {
            // update budget summary
            document.querySelector(DOMStrings.budgetLabel).textContent = formatNumber(obj.budget, obj.budget >= 0 ? 'inc' : 'exp')
            document.querySelector(DOMStrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc')
            document.querySelector(DOMStrings.expensesLabel).textContent = formatNumber(obj.totalExp, 'exp')
            // display % if %expense > 0
            if (obj.percentage > 0) {
                document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage + '%'
            }
            else {
                document.querySelector(DOMStrings.percentageLabel).textContent = '---'
            }
            
        },

        deleteListItem: function(itemID) {
            // delete an item based on itemID e.g. inc-3
            let element = document.getElementById(itemID)

            // JS does not allow remove an element directly
            // But we can do up and remove a child element of a parent element
            element.parentNode.removeChild(element)
        },

        displayPercentages: function(percentages) {
            // get NodeList to update percentages
            elements = document.querySelectorAll(DOMStrings.expensePercLabel)
            
            // loop over all nodes and update with its percentage
            for (let i = 0; i < elements.length; i++) {
                if (percentages[i] > 0) {
                    elements[i].textContent = percentages[i] + '%'
                }
                else {
                    elements[i].textContent = '---'
                }
            }
        },

        displayMonth: function() {
            // get current date
            let now = new Date()

            // get specific date (month is 0-based e.g. 0 = Jan)
            // let christmas = new Date(2020, 11, 25)

            let year = now.getFullYear()

            let months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            let month = months[now.getMonth()]

            document.querySelector(DOMStrings.dateLabel).textContent = month + ' ' + year
        },

        changedType: function() {
            // get boxes of input fields
            let fields = document.querySelectorAll(
                DOMStrings.inputType + ',' + 
                DOMStrings.inputDescription + ',' + 
                DOMStrings.inputValue
            )
            // toggle .red-focus class
            for (i = 0; i < fields.length; i++) {
                fields[i].classList.toggle('red-focus')
                // console.log(fields[i])
            }

            // get input button
            // toggle .red class 
            let btn = document.querySelector(DOMStrings.inputBtn)
            btn.classList.toggle('red')
            // console.log(btn)
        },

        getDOMStrings: function() {
            return DOMStrings
        },
    }
})()




// APP CONTROLLER MODULE
let controller = (function(budgetCtrl, UICtrl) {

    // function to update budget 
    let updateBudget = function() {
        // 1. Calculate the budget
        budgetCtrl.calculateBudget()

        // 2. Return the budget
        let budget = budgetCtrl.getBudget()

        // 3. Display the budget on the UI
        // console.log(budget)
        UICtrl.displayBudget(budget)
    }

    // function to update percentages
    let updatePercantages = function() {
        // 1. Calculate percentages
        budgetCtrl.calculatePercentages()

        // 2. Return percentages
        let percentages = budgetCtrl.getPercentages()

        // 3. Update percentages on the UI
        // console.log(percentages)
        UICtrl.displayPercentages(percentages)

    }


    // function to add item
    let ctrlAddItem = function() {
        // console.log('Something was added.')

        // 1. Get data from input field -- end function if no value provided
        let input = UICtrl.getInput()
        if (input.description === '' || !(input.value > 0)) return false
        // console.log(input)

        // 2. Add item to the budget controller
        let newItem = budgetCtrl.addItem(input.type, input.description, input.value)

        // 3. Add item to the UI
        UICtrl.addListItem(newItem, input.type)
        
        // 4. Clear input fields
        UICtrl.clearFields()

        // 5. Calculate and update budget
        updateBudget()

        // 6. Update percentages
        updatePercantages()
    }

    // function to delete item 
    let ctrlDeleteItem = function(event) {
        // parent traversing to get element to delete
        let item = event.target.parentNode.parentNode.parentNode.parentNode
        let itemID = item.id

        // delete if itemID exists -- e.g. itemID = 'inc-1'
        if (itemID) {
            let splitID, type, id
            splitID = itemID.split('-')
            type = splitID[0]
            id = parseInt(splitID[1])

            // 1. Delete item from the data structure
            budgetCtrl.deleteItem(type, id)

            // 2. Delete item from the UI 
            UICtrl.deleteListItem(itemID)

            // 3. Update budget summary
            updateBudget()

            // 4. Update percentages
            updatePercantages()
        }
    }

    // function to add event listeners to HTML elements
    let setupEventListeners = function() {
        // get DOMStrings objects
        let DOM = UICtrl.getDOMStrings()
        
        // listen to click event on the input button
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem)

        // listen to keypress -- event info can be passed to the function
        document.addEventListener('keypress', function(event) {
            // execute when the Enter key is pressed (keyCode = 13)
            // some older browsers use event.which instead of event.keyCode
            // also prevent double press/click when Enter is pressed on the input button
            if ((event.keyCode === 13 || event.which === 13)) {
            // the line below is no longer needed as focus is moved to DOM.inputdescription after adding an item
            // && event.target.classList.value !== 'add__btn') {
                ctrlAddItem()
            }
        })

        // setup event listener for click on a parent element
        // then we will set delegation steps to delete a selected income/expense item
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem)

        // listen to change inputType ('inc' or 'exp')
        // then update color outline of boxes of input fields
        document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changedType)
    }

    return {
        // return a public function to start to app
        init: function() {
            console.log('Application has started.')
            // initialize budget data 
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: undefined
            })
            
            // display date
            UICtrl.displayMonth()

            // set event listeners
            setupEventListeners()
        }
    }

})(budgetController, UIController)

// start the application
controller.init()




// document.querySelector('.add__btn').addEventListener('click', function() {
//     // test
//     console.log('button clicked')
// })

// document.addEventListener('keypress', function(event) {
//     // test event info
//     console.log('Enter was pressed!')
//     console.log(event)
// })

/*

*** Note ***
JS runs from top-bottom. Exclude hoisting.
A function is run when called. Then done.
IIFE is run immediately. Then done.

*** My confusion -- why event listeners appear to be on standby forever ***
addEventListener(arg1, arg2) adds to the target HTML element an event to listen and a function to call.
This is done once in JS.
But the HTML element permanently changes (in that running session, unless removed).
And the target HTML element will call the attached function every time it receives the specified event.

*/
