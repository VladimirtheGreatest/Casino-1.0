/* function to generate an array */

function range(start, end) {
  return Array(end - start + 1).fill().map((_, idx) => start + idx)
}


/*jackpot, if this variable is generated, you hit the jackpot*/
var jackpot = "99999"; // 50000 bet multiplier  (jackpot icon visible in the corner, with each spin increase bet multiplier function)

var smallwin = range(1, 8000); // 1.5 bet multiplier  8% chance to win a spin  (1 clients bet will use 4 spins)

var bigwin = range(25000, 30000); // 10 bet multiplier  5% chance to win

var extraspin = range(40000, 42000); // extra 20 spins, this will be a special feature, 20 auto spins with the special random multiplicator

var bankroll = 0 // current bankroll, player needs to make a deposit before playing, after successful deposit will be able to adjust the size of the bet which will affect the maximum winning multiplier.

/*function to generate random number*/

function randomnumber() {


  var startTime = new Date().getTime();
  var interval = setInterval(function() {
    if (new Date().getTime() - startTime > 5000) {
      clearInterval(interval);
      alert("No win this time");
      return;
    }
    var result = Math.floor(Math.random() * 100000);
    document.getElementById("number").innerHTML = result;
    if (result === jackpot) {
      clearInterval(interval);
      alert("jackpot");
    } else if (extraspin.includes(result)) {
      document.getElementById("special").innerHTML = "Your extra spin! Click here!";
      clearInterval(interval);
    } else if (bigwin.includes(result)) {
      alert("big win!!")
      clearInterval(interval);
    } else if (smallwin.includes(result)) {
      alert("small win")
      clearInterval(interval);
    };

  }, 1000);
}

/*jquery function to activate spin once button is clicked*/

$(document).ready(function() {
  $('#button').click(function() {
    randomnumber();
  });
});

/*betsize, bet size will affect winnings*/

function betsize() {
  var size = prompt("Please enter your bet");

  if (size != null) {
    document.getElementById("current_bet").innerHTML = ("Current bet" + " " + size);
  }
}

/*jquery to activate bet function once button bet clicked*/

$(document).ready(function() {
  $('#bet').click(function() {
    betsize();
  });
});
