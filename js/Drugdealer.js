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
         { locations: ["33", "23", "22"], hits: ["", "", ""] }
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


model.fire("13");
model.fire("06");
model.fire("16");
model.fire("26");
model.fire("34");
model.fire("24");
model.fire("14");
model.fire("12");
model.fire("11");
model.fire("30");
