'use strict';
var model = {
    boardWidthSize: 4,
    boardHeightSize: 9,
    numDrugDealers: 3,
    shipLength: 3,
    shipsSunk: 0,
    drugDealers: [{ locations: ["05", "06", "07"], hits: ["", "", ""] },
        { locations: ["15", "25", "35"], hits: ["", "", ""] },
        { locations: ["33", "23", "22"], hits: ["", "", ""] }
    ],
    fire: function(guess){
        for (var = 0; i < this.numDealers; i++){
            var drugDealer = this.drugDealers[i];
            locations = ship.locations;
        }
}
};
var view = {
    displayMessage: function (msg) {
        var messageMavashi = document.getElementById("messageMavashi");
        messageMavashi.innerHTML ="KoKo";
    },
    displayHit: function (location) {
        var cell = document.getElementById(location);
            cell.setAttribute("class", "hit");
    },
    displayMiss: function (location) {
        var cell = document.getElementById(location);
        cell.setAttribute("class", "miss");
    }
};