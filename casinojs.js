/* function to generate an array,   Random generated number  found in this array, will trigger small or big win or special event with "free spins" */

function range(start, end) {
  return Array(end - start + 1).fill().map((_, idx) => start + idx)
}


/*jackpot, if this variable is generated, you hit the jackpot*/
var jackpot = "99999"; // 50000 bet multiplier  (jackpot icon visible in the corner, with each spin increase bet multiplier function)

var smallwin = range(1, 4000); // 1.5 bet multiplier  4% chance to win a spin  (1 clients bet will use 4 spins)

var bigwin = range(28000, 30000); // 10 bet multiplier  2% chance to win

var extraspin = range(40000, 42000); // extra 20 spins, this will be a special feature, 20 auto spins with the special random multiplicator

var specialwin = range(50000, 55000); // free spins range which will trigger special win during special event "free spins"

var bankroll = "0"; //initial bankroll

var jackpotmoney = 50000; //this will be initial jacpot incrementing with each and every single spin, after hitting a jackpot it will reset itself to 50000.



/*this function will find out if player have enough money to play, if not, player will be encouraged to deposit before he can wager*/

function randomnumber() {


  if (bankroll > 0) {
    spin();
  } else {
    alert("deposit first please")
  };

  //function to generate a random number, game of chance itself

  function spin() {
    var startTime = new Date().getTime();
    var interval = setInterval(function() {
      if (new Date().getTime() - startTime > 5000) { //if no win subtract 1 from bankroll if min small bet clicked, subtract 2 if big bet clicked, in the future implement auto-spin feature as well
        clearInterval(interval);
        if (bankroll != "0") {
          bankroll -= 1;
          jackpotmoney += 1;
          document.getElementById("bankroll").innerHTML = 'bankroll' + ' ' + bankroll;
          document.getElementById("jackpot").innerHTML = ' Current jackpot is' + ' ' + jackpotmoney;
        } else {
          alert("You have to make a deposit to play again") //if bankroll falls to zero player will be encouraged to deposit again to keep playing
        }
        return;
      }
      var result = Math.floor(Math.random() * 100000); //function that generates random number
      document.getElementById("number").innerHTML = result;
      document.getElementById("number").className = 'animated bounceInDown';
      if (result === jackpot) { //chance to win a jackpot are 1 to 100000 still better than some pokerstars slots, good luck !:)
        clearInterval(interval);
        alert("jackpot");
        bankroll += 50000;
      } else if (extraspin.includes(result)) {
        document.getElementById("special").innerHTML = "Your extra spin! Click here!"; // button will not be displayed, once player activate the special button, regular spin will dissappear and random number function will be replaced with the special event
        document.getElementById("special").style.visibility = 'visible';
        clearInterval(interval);
      } else if (bigwin.includes(result)) {
        document.getElementById("info").innerHTML = "BIG WIN!!!!!";
        if (bankroll != "0") {
          bankroll += 10;
          document.getElementById("bankroll").innerHTML = bankroll;
        }
        clearInterval(interval);
      } else if (smallwin.includes(result)) {
        document.getElementById("info").innerHTML = "WIN!!!!!";
        if (bankroll != "0") {
          bankroll += 2;
          document.getElementById("bankroll").innerHTML = bankroll;
        }
        clearInterval(interval);
      };

    }, 1000);
  }
  setTimeout('$("#button").removeAttr("disabled")', 5000);
}


/*jquery function to activate spin once button is clicked*/

$(document).ready(function() {
  $('#button').click(function() {
    $(this).attr("disabled", "disabled");
    randomnumber();
  });
});


//jquery function to activate special event "free spins"

$(document).ready(function() {
  $('#special').click(function() {
    $(this).attr("disabled", "disabled");
    specialevent();
    document.getElementById("special").style.visibility = 'hidden';
    //some animation
  });
});

//random range function to calculate multiplier in the following "free spins" function
function randomrange() {
  return Math.floor(Math.random() * 6) + 1;

};

//special "free spins" event function

function specialevent() {
  var startTime = new Date().getTime();
  var interval = setInterval(function() {
    if (new Date().getTime() - startTime > 15000) { 
      clearInterval(interval);
      return;
    }
    var result = Math.floor(Math.random() * 100000); //function that generates random number
    document.getElementById("number").innerHTML = result;
    var multiplier = randomrange();
    if (specialwin.includes(result)) {
      bankroll += 5 * multiplier;
      document.getElementById("info").innerHTML = "BIG WIN";
      document.getElementById("bankroll").innerHTML = bankroll;
      clearInterval(interval);
    };

  }, 1000);
  setTimeout('$("#special").removeAttr("disabled")', 15000);
};



/*jquery to activate deposit function once button bet clicked*/

$(document).ready(function() {
  $('#deposit').click(function() {
    deposit();
  });
});

//deposit function, bankroll variable will be adjusted after successful deposit, also bankroll will be adjusted while playing, either by losing or winning the game of chance.
function deposit() {
  var deposit = prompt("Please enter your deposit"); //for now I will use prompt to deposit in the future I might implement something like a link to paypal, after successful deposit credit will be added to the bankroll
  deposit = parseFloat(deposit);
  bankroll = parseFloat(bankroll);
  bankroll = deposit + bankroll;
  document.getElementById("bankroll").innerHTML = bankroll;
}


// animate css function

function animateCSS(element, animationName, callback) {
    const node = document.querySelector(element)
    node.classList.add('animated', animationName)

    function handleAnimationEnd() {
        node.classList.remove('animated', animationName)
        node.removeEventListener('animationend', handleAnimationEnd)

        if (typeof callback === 'function') callback()
    }

    node.addEventListener('animationend', handleAnimationEnd)
}

