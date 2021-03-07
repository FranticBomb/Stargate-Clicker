var game = {
  cash: 0,
  totalCash: 0,
  totalClick: 0,
  clickValue: 1,
  version: 0.000,

  addToCash: function(amount) {
      this.cash += amount;
      this.totalCash += amount;
      display.updateCash();
  },

  getCashPerSecond: function() {
    var cashPerSecond = 0;
    for (i = 0; i < building.name.length; i++) {
        cashPerSecond += building.income[i] * building.count[i];
    }
    return cashPerSecond;
    }
};

var building = {
    name: [
        "SG Team",
        "Alpha site",
        "ZPM",
        "Jumper",
        "BC-304",
        "Atlantis"
    ],
    image: [
        "sgteam.jpg",
        "alphasite.png",
        "zpm.png",
        "jumper.png",
        "bc304.png",
        "atlantis.png"
    ],
    count: [0, 0, 0, 0, 0, 0],

    income: [
        1,
        5,
        8,
        13,
        17,
        25
    ],
    cost: [
        150,
        500,
        1250,
        2750,
        3500,
        7500
    ],

    purchase: function(index) {
        if (game.cash >= this.cost[index]) {
            game.cash -= this.cost[index];
            this.count[index]++;
            this.cost[index] = Math.ceil(this.cost[index] * 1.10);
            display.updateCash();
            display.updateUpgrades();
            display.updateShop();
        }
    }
};

var upgrade = {
      name: [
          "Better teams",
          "Even better teams",
          "The best teams",
          "Basic alpha site",
          "Better alpha site",
          "Best alpha site",
          "More ZPM power",
          "Even more ZPM power",
          "UNLIMITED ZPM POWER",
          "Improved jumper",
          "Upgraded jumper",
          "Maxed out jumper",
          "Aschen upgrades",
          "Goa'uld upgrades",
          "Asgard upgrades",
          "One ZPM powered city",
          "Dual ZPM powered city",
          "Triple ZPM powered city"
      ],
      description: [
        "Improved training for new SG Teams doubles their profitability",
        "Even better training for new SG Teams quadruples their profitability",
        "The best training for new SG Teams octuples their profitability",
        "A basic alpha site upgrade doubles the profitability",
        "A better alpha site upgrade quadruples the profitabiliy",
        "The best upgrade octuples the profitability of the alpha site",
        "Rodney has found a way to double the profitability of the ZPMs",
        "Rodney has found a way to quadruple the profitabiliy of the ZPMs",
        "Rodney has found a way to octuple the profitabiliy of the ZPMs",
        "Radek has improved the Puddle Jumpers, Jumpers now make double the money",
        "Radek has improved the Puddle Jumpers, Jumpers now make quadruple the money",
        "Radek has improved the Puddle Jumpers, Jumpers now make octuple the money",
        "The Aschen have given their technology to improve the BC-304 ships, they now make double the money",
        "The Goa'Uld have given their technology to improve the BC-304 ships, they now make quadruple the money",
        "The Asgard have given their technology to improve the BC-304 ships, they now make octuple the money",
        "Atlantis is now powered by one ZPM, it now makes double the money",
        "Atlantis is now powered by two ZPMs, it now makes quadruple the money",
        "Atlantis is now powered by three ZPMs, it now makes octuple the money"
      ],
      image: [
        "profit2x.png",
        "profit4x.png",
        "profit8x.png",
        "profit2x.png",
        "profit4x.png",
        "profit8x.png",
        "profit2x.png",
        "profit4x.png",
        "profit8x.png",
        "profit2x.png",
        "profit4x.png",
        "profit8x.png",
        "profit2x.png",
        "profit4x.png",
        "profit8x.png",
        "profit2x.png",
        "profit4x.png",
        "profit8x.png"
      ],
      type: [
        "building",
        "building",
        "building",
        "building",
        "building",
        "building",
        "building",
        "building",
        "building",
        "building",
        "building",
        "building",
        "building",
        "building",
        "building",
        "building",
        "building",
        "building"
      ],
      cost: [
        500,
        750,
        1000,
        1000,
        1500,
        2000,
        2000,
        2750,
        3500,
        4500,
        7500,
        9000,
        10000,
        12500,
        15000
      ],
      buildingIndex: [
        0,
        0,
        0,
        1,
        1,
        1,
        2,
        2,
        2,
        3,
        3,
        3,
        4,
        4,
        4,
        5,
        5,
        5
      ],
      requirement: [
        10,
        25,
        50,
        10,
        25,
        50,
        10,
        25,
        50,
        10,
        25,
        50,
        10,
        25,
        50,
        10,
        25,
        50
      ],
      bonus: [
        2,
        2,
        4,
        2,
        2,
        4,
        2,
        2,
        4,
        2,
        2,
        4,
        2,
        2,
        4,
        2,
        2,
        4
      ],
      purchased:[false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],

      purchase: function(index) {
          if (!this.purchased[index] && game.cash >= this.cost[index]) {
              if (this.type[index] == "building" && building.count[this.buildingIndex[index]] >= this.requirement[index]) {
                  game.cash -= this.cost[index];
                  building.income[this.buildingIndex[index]] *= this.bonus[index];
                  this.purchased[index] = true;

                  display.updateUpgrades();
                  display.updateCash();
              } else if (this.type[index] == "click" && game.totalClick >= this.requirement[index]) {
                  game.cash -= this.cost[index];
                  game.clickValue *= this.bonus[index];
                  this.purchased[index] = true;

                  display.updateUpgrades();
                  display.updateCash();
              }
          }
      }
};

var display = {
  updateCash: function() {
    document.getElementById("cash").innerHTML = game.cash;
    document.getElementById("cashpersecond").innerHTML = game.getCashPerSecond();
    document.title = game.cash + " $ - Stargate Clicker";
  },

  updateShop: function() {
    document.getElementById("shopContainer").innerHTML = "";
    for (i = 0; i < building.name.length; i++) {
        document.getElementById("shopContainer").innerHTML += '<table class="shopButton" onClick="building.purchase('+i+')"><tr><td id ="image"><img src="'+building.image[i]+'"></td><td id ="nameAndCost"><p>'+building.name[i]+'</p><p><span>'+building.cost[i]+'</span> $</p></td><td id="amount"><span>'+building.count[i]+'</span></td></tr></table>';
    }
  },
  updateUpgrades: function() {
    document.getElementById("upgradeContainer").innerHTML = "";
    for (i = 0; i < upgrade.name.length; i++) {
        if (!upgrade.purchased[i]) {
            if (upgrade.type[i] == "building" && building.count[upgrade.buildingIndex[i]] >= upgrade.requirement[i]) {
                document.getElementById("upgradeContainer").innerHTML += '<img src="'+upgrade.image[i]+'" title="'+upgrade.name[i]+' &#10; '+upgrade.description[i]+' &#10; ('+upgrade.cost[i]+' $)" onclick="upgrade.purchase('+i+')"> ';
            } else if (upgrade.type[i] == "click" && game.totalClick >= upgrade.requirement[i]) {
                document.getElementById("upgradeContainer").innerHTML += '<img src="'+upgrade.image[i]+'" title="'+upgrade.name[i]+' &#10; '+upgrade.description[i]+' &#10; ('+upgrade.cost[i]+' $)" onclick="upgrade.purchase('+i+')"> ';
            }
        }
    }
  }
};

function saveGame() {
    var gameSave = {
        cash: game.cash,
        totalCash: game.totalCash,
        totalClick: game.totalClick,
        clickValue: game.clickValue,
        version: game.version,
        buildingCount: building.count,
        buildingIncome: building.income,
        buildingCost: building.cost,
        upgradePurchased: upgrade.purchased
    };
    localStorage.setItem("gameSave", JSON.stringify(gameSave));
}

function loadGame() {
  var savedGame = JSON.parse(localStorage.getItem("gameSave"));
  if (localStorage.getItem("gameSave") !== null) {
    if (typeof savedGame.cash !== "undefined") game.cash = savedGame.cash;
    if (typeof savedGame.totalCash !== "undefined") game.totalCash = savedGame.totalCash;
    if (typeof savedGame.totalClick !== "undefined") game.totalClick = savedGame.totalClick;
    if (typeof savedGame.clickValue !== "undefined") game.clickValue = savedGame.clickValue;
    if (typeof savedGame.version !== "undefined") game.version = savedGame.version;
    if (typeof savedGame.buildingCount !== "undefined") {
        for (i = 0; i < savedGame.buildingCount.length; i++) {
        building.count[i] = savedGame.buildingCount[i];
      }
    }
    if (typeof savedGame.buildingIncome !== "undefined") {
        for (i = 0; i < savedGame.buildingIncome.length; i++) {
        building.income[i] = savedGame.buildingIncome[i];
      }
    }
    if (typeof savedGame.buildingCost !== "undefined") {
        for (i = 0; i < savedGame.buildingCost.length; i++) {
        building.cost[i] = savedGame.buildingCost[i];
      }
    }
    if (typeof savedGame.upgradePurchased !== "undefined") {
        for (i = 0; i < savedGame.upgradePurchased.length; i++) {
            upgrade.purchased[i] = savedGame.upgradePurchased[i];
        }
    }
  }
}

function resetGame() {
    if (confirm("Are you sure you want to reset your game?")) {
      var gameSave = {};
      localStorage.setItem("gameSave", JSON.stringify(gameSave));
      location.reload();
    }
}

document.getElementById("clicker").addEventListener("click", function() {
    game.totalClick++;
    game.addToCash(game.clickValue);
}, false);

window.onload = function() {
  loadGame();
  display.updateCash();
  display.updateUpgrades();
  display.updateShop();
};

setInterval(function() {
  game.cash += game.getCashPerSecond();
  game.totalCash += game.getCashPerSecond();
  display.updateCash();
}, 1000); //1000ms = 1 second

setInterval(function() {
    display.updateCash();
    display.updateUpgrades();
}, 3000); //3000ms = 3 seconds

setInterval(function() {
  saveGame();
}, 30000) ; // 30000ms = 30 seconds

document.addEventListener("keydown", function(event) {
  if (event.ctrlKey && event.which == 83) {
    event.preventDefault();
    saveGame()
  }
}, false);
