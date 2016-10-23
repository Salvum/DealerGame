'use strict';
var model = {
    boardWidthSize: 4,
    boardHeightSize: 9,
    numDrugDealers: 3,
    drugDealersLine: 3,
    deathDrugDealer: 0,
    timeToLose: 30,
    drugDealers:
        [{ locations: ["05", "06", "07"], hits: ["", "", ""] },
         { locations: ["15", "25", "35"], hits: ["", "", ""] },
         { locations: ["33", "23", "13"], hits: ["", "", ""] }
    ],
    fire : function ( guess ){
        for (var i = 0; i < this.numDrugDealers; i++){
            var drugDealer = this.drugDealers[i];
            var index = drugDealer.locations.indexOf(guess);
            if (index >= 0) {
                drugDealer.hits[index] = "hit";
                view.displayHit(guess);
                view.displayMessage("Барыга уничтожен!");
                if (this.isDead(drugDealer)) {
                    view.displayMessage("Я уничтожил один из отрядов барыг!");
                    this.deathDrugDealer++;
                }
                return true;
            }
        }
        view.displayMiss(guess);
        view.displayMessage("Я промахнулся");
        return false;
},
isDead: function(drugDealer) {
    for (var i = 0; i < this.drugDealersLine; i++) {
        if (drugDealer.hits[i] !== "hit") {
            return false;
        }
    }
    return true;
}
};
var view = {
    displayMessage: function ( msg ) {
        var messageMavashi = document.getElementById("messageMavashi");
        messageMavashi.innerHTML = msg;
    },
    displayHit: function ( location ) {
        var cell = document.getElementById(location);
        cell.setAttribute("class", "hit");
    },
    displayMiss: function ( location ) {
        var cell = document.getElementById(location);
        cell.setAttribute("class", "miss");
    }
};
var control = {
    quesses: 0,
    processGuess: function(guess) {
        var location = parseGuess(guess);
        if (location) {
            this.guesses++;
            var hit = model.fire(location);
            if (hit && model.deathDrugDealer === model.numDrugDealers) {
                view.displayMessage("Я уничтожил все отряды барыг, вычищаю мусор города");
            }
        }
    }
};
function parseGuess (guess) {
    var alphabet = ["A", "B", "C", "D"];
    if (guess === null || guess.length !== 2) {
        alert("Опс, таких координат в комнате нет")
    } else {
        var firstChar = guess.charAt(0);
        var row = alphabet.indexOf(firstChar);
        var column = guess.charAt(1);
        if (isNaN(row) || isNaN(column)) {
            alert("Таких значений нет");
        } else if (row < 0 || row >= model.boardWidthSize ||
            column < 0 || column >= model.boardHeightSize) {
            alert("Вы ошиблись данными");
        } else {
            return row + column;
        }
    }
    return null;
}
function init() {
    var fireButton = document.getElementById("fireButton");
    fireButton.onclick = handleFireButton;
    var guessInput = document.getElementById("guessInput");
    guessInput.onkeypress = handleKeyPress;
    var guess = guessInput.value;
}
function handleFireButton() {
    var guessInput = document.getElementById("guessInput");
    var guess = guessInput.value;
    control.processGuess(guess);
    guessInput.value = "";
}
function handleKeyPress(e) {
    var fireButton = document.getElementById("fireButton");
    if (e.keyCode === 13) {
        fireButton.click();
        return false;
    }
}
window.onload = init;