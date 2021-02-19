<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Stargate Clicker</title>
    <style>
      #cash{
        color: #0be881;
        font-weight: bolder;
      }
      #CashPerSec{
        color: #05c46b;
        font-weight: bolder;
      }
      .sectionLeft {
        float: left;
        width: 80%;

      }
      .sectionRight {
        float: right;
        width: 20%;
      }
      .cashcontainer {
        background-color: rgb(238,238,238, 0.6);
        width: 50%;
        padding: 10px;
        border-radius: 10px;
        font-size: 25px;
        font-weight: bold;
      }
      .clickercontainer img {
        position: relative;
        transition: all .2s ease-in-out;
      }
      .clickercontainer img:hover { transform:scale(1.10);}
      .clickercontainer img:active {transform:scale(0.98);}

      .shopButton {
        background-color: #b5b5b5;
        transition: all .2s ease-in-out;
        border-radius: 10px;
        width: 100%;
        margin: 10px 0px 10px 0px;
      }
      .shopButton:hover {
        background-color: #c7c7c7;
        transition: all .2s ease-in-out;
      }
      .shopButton #image {
        width: 20%;

      }
      .shopButton img {
        height: 74px;
        width: 84px;
      }
      .shopButton #nameAndCost p {
        margin: 0px;
        width: 60%

      }
      .shopButton #nameAndCost p:first-of-type {
        font-size: 25px;
      }
      .shopButton #amount {
        font-size: 48px;
        color: #595959;
        font-family: roboto;
        width: 15%;
      }
      .sectionFooter{
        margin-top: 10%;
      }
      .unselectable {
        user-select: none;
      }
    </style>
  </head>
  <body>
      <div class="sectionLeft">
        <center>
          <div class="cashcontainer">
            <span id="cash">0</span> $<br>
            <span id="CashPerSec">0</span> $/s<br>
          </div>
        <br>
        <div class="clickercontainer unselectable">
          <img src="stargate.png" height="256px" width="365px" onclick="makeMoney(power)">
        </div>
        <button onclick="saveGame()">Save Game</button>
        </center>
        <div class="sectionFooter">
            <h5>Stargate Clicker</h5>
        </div>
      </div>
      <div class="sectionRight unselectable">
        <table class="shopButton" onClick="buySGTeam()">
          <tr>
              <td id ="image"><img src="sgteam.jpg"></td>
              <td id ="nameAndCost">
                <p>SG Team</p>
                <p><span id="sgteamCost">15</span> $</p>
              </td>
              <td id="amount"><span id="sgteams">0</span></td>
          </tr>
        </table>
        <table class="shopButton" onClick="buyAlphasite()">
          <tr>
              <td id ="image"><img src="alphasite.png"></td>
              <td id ="nameAndCost">
                <p>Alphasite</p>
                <p><span id="alphasiteCost">250</span> $</p>
              </td>
              <td id="amount"><span id="alphasites">0</span></td>
          </tr>
        </table>
        <table class="shopButton" onClick="buyZPM()">
          <tr>
              <td id ="image"><img src="zpm.png"></td>
              <td id ="nameAndCost">
                <p>Zero Point Module</p>
                <p><span id="alphasiteCost">1000</span> $</p>
              </td>
              <td id="amount"><span id="zpms">0</span></td>
          </tr>
        </table>
      </div>
      <script>
        var cash = 0;
        var power = 1;
        var sgteamCost = 15;
        var sgteams = 0;
        var alphasiteCost = 250;
        var alphasites = 0;
        var zpmCost = 1000;
        var zpms = 0;

        function buySGTeam() {
          if (cash >= sgteamCost) {
            cash = cash - sgteamCost;
            sgteams = sgteams + 1;
            sgteamCost = Math.round(sgteamCost * 1.15);

            document.getElementById("cash").innerHTML = cash;
            document.getElementById("sgteamCost").innerHTML = sgteamCost;
            document.getElementById("sgteams").innerHTML = sgteams;
            updateCashPerSec();
          }
        }

        function buyAlphasite() {
          if (cash >= alphasiteCost) {
            cash = cash - alphasiteCost;
            alphasites = alphasites + 1;
            alphasiteCost = Math.round(alphasiteCost * 3.5);

            document.getElementById("cash").innerHTML = cash;
            document.getElementById("alphasiteCost").innerHTML = alphasiteCost;
            document.getElementById("alphasites").innerHTML = alphasites;
            updateCashPerSec();
          }
        }
        function buyZPM() {
          if (cash >= zpmCost) {
            cash = cash - zpmCost;
            zpms = zpms + 1;
            zpmCost = Math.round(zpmCost * 5);

            document.getElementById("cash").innerHTML = cash;
            document.getElementById("zpmCost").innerHTML = zpmCost;
            document.getElementById("zpms").innerHTML = zpms;
            updateCashPerSec();
          }
        }

        function makeMoney(amount) {
          cash = cash + amount;
          document.getElementById("cash").innerHTML = cash;
        }

        function updateCashPerSec() {
          CashPerSec = sgteams + alphasites * 5 + zpms * 15;
          document.getElementById("CashPerSec").innerHTML = CashPerSec;
        }

        function loadGame() {
          var savedGame = JSON.parse(localStorage.getItem("gameSave"));
          if (typeof savedGame.cash !== "undefined") cash = savedGame.cash;
          if (typeof savedGame.power !== "undefined") power = savedGame.power;
          if (typeof savedGame.sgteamCost !== "undefined") sgteamCost = savedGame.sgteamCost;
          if (typeof savedGame.sgteams !== "undefined") sgteams = savedGame.sgteams;
          if (typeof savedGame.alphasiteCost !== "undefined") alphasiteCost = savedGame.alphasiteCost;
          if (typeof savedGame.alphasites !== "undefined") alphasites = savedGame.alphasites;
          if (typeof savedGame.zpmCost !== "undefined") zpmCost = savedGame.zpmCost;
          if (typeof savedGame.zpms !== "undefined") zpms = savedGame.zpms;
        }

        function saveGame() {
          var gameSave = {
            cash: cash,
            power: power,
            sgteamCost: sgteamCost,
            sgteams: sgteams,
            alphasiteCost: alphasiteCost,
            alphasites: alphasites,
            zpmCost: zpmCost,
            zpms: zmps
          };
         localStorage.setItem("gameSave"), JSON.stringify(gameSave);
        }

        window.onload = function() {
            loadGame();
        };

        setInterval(function() {
          cash = cash + sgteams;
          cash = cash + alphasites * 5;
          cash = cash + zpms * 15;
          document.getElementById("cash").innerHTML = cash;

          document.title = cash + " $ - Stargate Clicker"
        }, 1000) ; // 1000ms = 1 second

        setInterval(function() {
          saveGame();
        }, 30000) ; // 30000ms = 30 seconds
      </script>
  </body>
</html>