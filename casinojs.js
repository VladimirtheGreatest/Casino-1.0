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
    document.getElementById("info").innerHTML = "Jackpot activated during any spin!";
  } else {
    alert("deposit first please")
    document.getElementById("svg").style.visibility = 'hidden';
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
          document.getElementById("bankroll").innerHTML = "£" + bankroll;
          document.getElementById("jackpot").innerHTML = ' Current jackpot is' + ' ' + jackpotmoney;
          document.getElementById("number").className = 'animated pulse';
          document.getElementById("svg").style.visibility = 'hidden';
        } else {
          alert("You have to make a deposit to play again") //if bankroll falls to zero player will be encouraged to deposit again to keep playing
        }
        return;
      }
      var result = Math.floor(Math.random() * 100000); //function that generates random number
      document.getElementById("number").innerHTML = result;
      document.getElementById("number").className = 'animated rotateIn';
      if (result === jackpot) { //chance to win a jackpot are 1 to 100000 still better than some pokerstars slots, good luck !:)
        clearInterval(interval);
        alert("jackpot");
        bankroll += 50000;
      } else if (extraspin.includes(result)) {
        // button will not be displayed, once player activate the special button, random number function will be replaced with the special event
        document.getElementById("special").style.visibility = 'visible';
        clearInterval(interval);
      } else if (bigwin.includes(result)) {
        document.getElementById("info").innerHTML = "BIG WIN!!!!!";
        document.getElementById("Genie").className = 'win';
        document.getElementById("info").className = 'infowin';
        if (bankroll != "0") {
          bankroll += 10;
          document.getElementById("bankroll").innerHTML = "£" + bankroll;
        }
        clearInterval(interval);
      } else if (smallwin.includes(result)) {
        document.getElementById("info").innerHTML = "WIN!!!!!";
        document.getElementById("Genie").className = 'win';
        document.getElementById("info").className = 'infowin';
        if (bankroll != "0") {
          bankroll += 2;
          document.getElementById("bankroll").innerHTML = "£" + bankroll;
        }
        clearInterval(interval);
      };

    }, 1000);
  }
  setTimeout('$("#button").removeAttr("disabled")', 5000); //timeout will remove disable attribute
  setTimeout('$("#deposit").removeAttr("disabled")', 5000);
}


/*jquery function to activate spin once button is clicked*/

$(document).ready(function() {
  $('#button').click(function() {
    $(this).attr("disabled", "disabled"); //both buttons will be disabled while spin is activated, this will prevent the player from double clicking or interrupting the spinning function with the deposit
    $('#deposit').attr("disabled", "disabled");
    $("#info").removeClass("infowin");
    $("#number").removeClass("infowin");
    document.getElementById("Genie").className = 'spin';
    document.getElementById("svg").style.visibility = 'visible';
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
    if (new Date().getTime() - startTime > 15000) { //if no win subtract 1 from bankroll if min small bet clicked, subtract 2 if big bet clicked, in the future implement auto-spin feature as well
      clearInterval(interval);
      document.getElementById("number").className = 'animated pulse';
      return;
    }
    var result = Math.floor(Math.random() * 100000); //function that generates random number
    document.getElementById("number").innerHTML = result;
    document.getElementById("number").className = 'animated rotateIn';
    var multiplier = randomrange();
    if (specialwin.includes(result)) {
      var number = 5 * multiplier;
      bankroll += number;
      document.getElementById("info").innerHTML = "BIG WIN !!!!!";
      document.getElementById("info").className = 'infowin';
      document.getElementById("bankroll").innerHTML = "£" + bankroll;
      document.getElementById("number").className = 'infowin';
      document.getElementById("Genie").className = 'win';
      document.getElementById("number").innerHTML = animateResultCount(1, number, "#number");
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
  do {
    var deposit = parseFloat(window.prompt("Please enter your deposit, maximum deposit is £100, minimum deposit £1, if you dont want to deposit please refresh this page"), 10);
  } while (isNaN(deposit) || deposit > 100 || deposit < 1); //for now I will use prompt to deposit in the future I might implement something like a link to paypal, after successful deposit credit will be added to the bankroll
  deposit = parseFloat(deposit);
  bankroll = parseFloat(bankroll);
  bankroll = deposit + bankroll;
  document.getElementById("bankroll").innerHTML = "£" + bankroll;
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


//increasing number animation used during "free spins" special event

function animateResultCount(number, target, elem) {
  if (number < target) {
    var interval = setInterval(function() {
      $("#number").text(number);
      if (number >= target) {
        clearInterval(interval);
        return;
      }
      number++;
    }, 100);
  }
}
