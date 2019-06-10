//Global

var bankroll = "100"; //initial bankroll

var jackpotmoney = 50000; //this will be initial jackpot incrementing with each and every single spin(progressive), after hitting a jackpot it will reset itself to 50000. You can win the jackpot by playing any game

//music

function playmusic(){
       var audio = document.getElementById("audio");
       audio.play();
};

function playmusic2(){
       var audio = document.getElementById("audio2");
       audio.play();
};

function playmusic3(){
       var audio = document.getElementById("audio3");
       audio.play();
};
function playmusic4(){
       var audio = document.getElementById("audio4");
       audio.play();
};
function playmusic5(){
       var audio = document.getElementById("audio5");
       audio.play();
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


//Magical numbers game

/* function to generate an array,   Random generated number  found in this array, will trigger small or big win or special event with "free spins" */

function range(start, end) {
  return Array(end - start + 1).fill().map((_, idx) => start + idx)
}


//VARIABLES winning ranges
/*jackpot, if this variable is generated, you hit the jackpot*/
var jackpot = range(0, 1); // 50000 bet multiplier  (jackpot icon visible in the corner, with each spin increase bet multiplier function)

var smallwin = range(101, 4001); // 1.5 bet multiplier  4% chance to win a spin  (1 clients bet will use 4 spins)

var bigwin = range(29500, 30000); // 10 bet multiplier

var extraspin = range(49000, 50000); // extra 20 spins, this will be a special feature, 20 auto spins with the special random multiplicator

var specialwin = range(55000, 60000); // free spins range which will trigger special win during special event "free spins"


/*this function will find out if player have enough money to play magical numbers, if not, player will be encouraged to deposit before he can wager*/

function randomnumber() {


  if (bankroll > 0) {
    spin();
    document.getElementById("info").innerHTML = "Jackpot activated during any spin!";
  } else {
    alert(" minimum bet for this game is £1, deposit first please")
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
      document.getElementById("number").className = 'animated bounceInDown';
      if (jackpot.includes(result)) {
        document.getElementById("Genie").className = 'sliding-jackpot';
        bankroll += jackpotmoney;
        jackpotmoney = 50000;  //resetting jackpot after hitting the one
        document.getElementById("bankroll").innerHTML = "£" + bankroll;
        document.getElementById("jackpot").innerHTML = "Please contact support";
        audio4.pause();
        playmusic3();
        clearInterval(interval);
      } else if (extraspin.includes(result)) {
        // button will not be displayed, once player activate the special button, random number function will be replaced with the special event
        document.getElementById("special").style.visibility = 'visible';
        clearInterval(interval);
      } else if (bigwin.includes(result)) {
        document.getElementById("info").innerHTML = "BIG WIN!!!!!";
        document.getElementById("Genie").className = 'win';
        document.getElementById("info").className = 'infowin';
        audio4.pause();
        playmusic5();
        if (bankroll != "0") {
          bankroll += 10;
          document.getElementById("bankroll").innerHTML = "£" + bankroll;
        }
        clearInterval(interval);
      } else if (smallwin.includes(result)) {
        document.getElementById("info").innerHTML = "WIN!!!!!";
        document.getElementById("Genie").className = 'win';
        document.getElementById("info").className = 'infowin';
        audio4.pause();
        playmusic5();
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
    $('audio').each(function(){
      this.pause(); // Stop playing music
      this.currentTime = 0; // Reset time
    });
    playmusic4();
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
      document.getElementById("svg").style.visibility = 'hidden';
      return;
    }
    var result = Math.floor(Math.random() * 100000); //function that generates random number
    document.getElementById("number").innerHTML = result;
    document.getElementById("number").className = 'animated bounceInDown';
    var multiplier = randomrange();
    if (specialwin.includes(result)) {
      var number = 5 * multiplier;
      bankroll += number;
      document.getElementById("info").innerHTML = "BIG WIN !!!!!";
      document.getElementById("info").className = 'infowin';
      document.getElementById("bankroll").innerHTML = "£" + bankroll;
      document.getElementById("number").className = 'infowin';
      document.getElementById("Genie").className = 'win';
      audio4.pause();
      playmusic5();
      document.getElementById("number").innerHTML = animateResultCount(1, number);
      clearInterval(interval);
    };

  }, 1000);
  setTimeout('$("#special").removeAttr("disabled")', 15000);
};

//increasing number animation used during "free spins" special event

function animateResultCount(number, target) {
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

//STARS OF FORTUNE

var carousel = document.querySelector('.carousel');
var cells = carousel.querySelectorAll('.carousel__cell');
var cellCount; // cellCount set from cells-range input value
var selectedIndex = 0;
var cellWidth = carousel.offsetWidth;
var cellHeight = carousel.offsetHeight;
var isHorizontal = true;
var rotateFn = isHorizontal ? 'rotateY' : 'rotateX';
var radius, theta;
// console.log( cellWidth, cellHeight );

/*function that rotates rewards*/

function rotateCarousel() {
  var angle = theta * selectedIndex * -1;
  carousel.style.transform = 'translateZ(' + -radius + 'px) ' +
    rotateFn + '(' + angle + 'deg)';
}

/*click event PLAY button*/

var nextButton = document.querySelector('.next-button');
nextButton.addEventListener( 'click', function() {
$('#playbutton').attr("disabled", "disabled");
$('#deposit').attr("disabled", "disabled");
$("#scene").removeClass("carouselwin");
document.getElementById("scene").className = 'spincarousel';
document.getElementById("info1").innerHTML = "Jackpot activated during any spin!";
document.getElementById("jackpotstars").innerHTML = "";
$('audio').each(function(){
  this.pause(); // Stop playing music
  this.currentTime = 0; // Reset time
});
playmusic();

    if (bankroll < 5) {
      alert(" minimum bet for this game is £5, deposit first please")
    } else {

  var startTime = new Date().getTime();
  var interval = setInterval(function() {
    if (new Date().getTime() - startTime > 8000) {
      clearInterval(interval);
      selectedIndex = Math.floor(Math.random() * 14) + 1;
      rotateCarousel();
      if (selectedIndex === 0) {
        bankroll -= 3;
        jackpotmoney += 5;
        document.getElementById("bankroll").innerHTML = "£" + bankroll;
        document.getElementById("jackpot").innerHTML = ' Current jackpot is' + ' ' + jackpotmoney;
        document.getElementById("scene").className = 'scene';
      } else if (selectedIndex === 1) {
        bankroll -= 3;
        jackpotmoney += 5;
        document.getElementById("bankroll").innerHTML = "£" + bankroll;
        document.getElementById("jackpot").innerHTML = ' Current jackpot is' + ' ' + jackpotmoney;
        document.getElementById("scene").className = 'scene';
      } else if (selectedIndex === 2) {
        bankroll -= 3;
        jackpotmoney += 5;
        document.getElementById("bankroll").innerHTML = "£" + bankroll;
        document.getElementById("jackpot").innerHTML = ' Current jackpot is' + ' ' + jackpotmoney;
        document.getElementById("scene").className = 'scene';
      } else if (selectedIndex === 3) {
        bankroll -= 3;
        jackpotmoney += 5;
        document.getElementById("bankroll").innerHTML = "£" + bankroll;
        document.getElementById("jackpot").innerHTML = ' Current jackpot is' + ' ' + jackpotmoney;
        document.getElementById("scene").className = 'scene';
      } else if (selectedIndex === 4) {
        bankroll -= 3;
        jackpotmoney += 5;
        document.getElementById("bankroll").innerHTML = "£" + bankroll;
        document.getElementById("jackpot").innerHTML = ' Current jackpot is' + ' ' + jackpotmoney;
        document.getElementById("scene").className = 'scene';
      } else if (selectedIndex === 5) {
        bankroll += 3;
        jackpotmoney += 5;
        document.getElementById("bankroll").innerHTML = "£" + bankroll;
        document.getElementById("jackpot").innerHTML = ' Current jackpot is' + ' ' + jackpotmoney;
        document.getElementById("scene").className = 'carouselwin';
        document.getElementById("info1").innerHTML = "Good job young padawan!! Big win !!";
        audio.pause();
        playmusic3();
      } else if (selectedIndex === 6) {
        bankroll -= 3;
        jackpotmoney += 5;
        document.getElementById("bankroll").innerHTML = "£" + bankroll;
        document.getElementById("jackpot").innerHTML = ' Current jackpot is' + ' ' + jackpotmoney;
        document.getElementById("scene").className = 'scene';
      } else if (selectedIndex === 7) {
        bankroll += 3;
        jackpotmoney += 5;
        document.getElementById("bankroll").innerHTML = "£" + bankroll;
        document.getElementById("jackpot").innerHTML = ' Current jackpot is' + ' ' + jackpotmoney;
        document.getElementById("scene").className = 'carouselwin';
        document.getElementById("info1").innerHTML = "Lasers did not stop you! Big win !!";
        audio.pause();
        playmusic3();
      } else if (selectedIndex === 8) {
        bankroll -= 3;
        jackpotmoney += 5;
        document.getElementById("bankroll").innerHTML = "£" + bankroll;
        document.getElementById("jackpot").innerHTML = ' Current jackpot is' + ' ' + jackpotmoney;
        document.getElementById("scene").className = 'scene';
      } else if (selectedIndex === 9) {
        bankroll += 3;
        jackpotmoney += 5;
        document.getElementById("bankroll").innerHTML = "£" + bankroll;
        document.getElementById("jackpot").innerHTML = ' Current jackpot is' + ' ' + jackpotmoney;
        document.getElementById("scene").className = 'carouselwin';
        document.getElementById("info1").innerHTML = "Force is with you!! £8 in your pocket!!";
        audio.pause();
        playmusic3();
      } else if (selectedIndex === 10) {
        bankroll -= 3;
        jackpotmoney += 5;
        document.getElementById("bankroll").innerHTML = "£" + bankroll;
        document.getElementById("jackpot").innerHTML = ' Current jackpot is' + ' ' + jackpotmoney;
        document.getElementById("scene").className = 'scene';
      } else if (selectedIndex === 11) {
        bankroll += 15;
        jackpotmoney += 5;
        document.getElementById("bankroll").innerHTML = "£" + bankroll;
        document.getElementById("jackpot").innerHTML = ' Current jackpot is' + ' ' + jackpotmoney;
        document.getElementById("scene").className = 'carouselwin';
        document.getElementById("info1").innerHTML = "Good job captain, your ship is faster than the speed of light!!";
        audio.pause();
        playmusic3();
      } else if (selectedIndex === 12) {
        bankroll -= 3;
        jackpotmoney += 5;
        document.getElementById("bankroll").innerHTML = "£" + bankroll;
        document.getElementById("jackpot").innerHTML = ' Current jackpot is' + ' ' + jackpotmoney;
        document.getElementById("scene").className = 'scene';
      } else if (selectedIndex === 13) {
        bankroll += 495;
        jackpotmoney += 5;
        document.getElementById("bankroll").innerHTML = "£" + bankroll;
        document.getElementById("jackpot").innerHTML = ' Current jackpot is' + ' ' + jackpotmoney;
        document.getElementById("scene").className = 'carouselwin';
        document.getElementById("info1").innerHTML = "HUGE PAYOUT!! YOU DESTROYED THE ENTIRE FLEET";
        audio.pause();
        playmusic3();
      } else if (selectedIndex === 14) {
        bankroll += 15;
        jackpotmoney += 5;
        document.getElementById("bankroll").innerHTML = "£" + bankroll;
        document.getElementById("jackpot").innerHTML = ' Current jackpot is' + ' ' + jackpotmoney;
        document.getElementById("scene").className = 'carouselwin';
        document.getElementById("info1").innerHTML = "Amazing, your ship is faster than the speed of light!!";
        audio.pause();
        playmusic3();
      }
      return;
      document.getElementById("scene").className = 'scene';
    }
    selectedIndex = Math.floor(Math.random() * 100);
    rotateCarousel();
    if (jackpot.includes(selectedIndex)) {
      bankroll += jackpotmoney;
      jackpotmoney = 50000;  //resetting jackpot after hitting the one
      document.getElementById("bankroll").innerHTML = "£" + bankroll;
      document.getElementById("jackpot").innerHTML = "Please contact support";
      document.getElementById("info1").innerHTML = "CONGRATULATION, PROGRESSIVE JACKPOT IS YOURS!!!!!";
      document.getElementById("jackpotstars").innerHTML = animateResultCount2(45000, jackpotmoney);
      audio.pause();
      playmusic2();
      clearInterval(interval);
    }
  }, 1000);
  };
  setTimeout('$("#playbutton").removeAttr("disabled")', 9000);
  setTimeout('$("#deposit").removeAttr("disabled")', 9000);
});


var cellsRange = document.querySelector('.cells-range');
cellsRange.addEventListener( 'change', changeCarousel );
cellsRange.addEventListener( 'input', changeCarousel );



function changeCarousel() {
  cellCount = cellsRange.value;
  theta = 360 / cellCount;
  var cellSize = isHorizontal ? cellWidth : cellHeight;
  radius = Math.round( ( cellSize / 2) / Math.tan( Math.PI / cellCount ) );
  for ( var i=0; i < cells.length; i++ ) {
    var cell = cells[i];
    if ( i < cellCount ) {
      // visible cell
      cell.style.opacity = 1;
      var cellAngle = theta * i;
      cell.style.transform = rotateFn + '(' + cellAngle + 'deg) translateZ(' + radius + 'px)';
    } else {
      // hidden cell
      cell.style.opacity = 0;
      cell.style.transform = 'none';
    }
  }

  rotateCarousel();
}

var orientationRadios = document.querySelectorAll('input[name="orientation"]');
( function() {
  for ( var i=0; i < orientationRadios.length; i++ ) {
    var radio = orientationRadios[i];
    radio.addEventListener( 'change', onOrientationChange );
  }
})();

function onOrientationChange() {
  var checkedRadio = document.querySelector('input[name="orientation"]:checked');
  isHorizontal = checkedRadio.value == 'horizontal';
  rotateFn = isHorizontal ? 'rotateY' : 'rotateX';
  changeCarousel();
}

// set initials
onOrientationChange();

//increasing number animation used during "jackpot" special event in the game stars of fortune

function animateResultCount2(number, target) {
  if (number < target) {
    var interval = setInterval(function() {
      $("#jackpotstars").text(number);
      if (number >= target) {
        clearInterval(interval);
        return;
      }
      number++
    }, 1);
  }
}

//fancy headings

const signs = document.querySelectorAll('x-sign')
const randomIn = (min, max) => (
  Math.floor(Math.random() * (max - min + 1) + min)
)

const mixupInterval = el => {
  const ms = randomIn(2000, 4000)
  el.style.setProperty('--interval', `${ms}ms`)
}

signs.forEach(el => {
  mixupInterval(el)
  el.addEventListener('webkitAnimationIteration', () => {
    mixupInterval(el)
  })
})




