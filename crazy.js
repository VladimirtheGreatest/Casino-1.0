//Global

var bankroll = "0"; //initial bankroll

var jackpotmoney = 50000; //this will be initial jackpot incrementing with each and every single spin(progressive), after hitting a jackpot it will reset itself to 50000. You can win the jackpot by playing any game

//music

function playmusic() {
  var audio = document.getElementById("audio");
  audio.play();
};

function playmusic2() {
  var audio = document.getElementById("audio2");
  audio.play();
};

function playmusic3() {
  var audio = document.getElementById("audio3");
  audio.play();
}

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
};

//betting function

var initialbet = 5; //minimun bet
var maxbet = 15; // maximum bet
var multiplier = 1; //winning multiplier(changing with the size of the bet)
var win = 0; //global variable, this will be trigerred by playing the game and basic win will be multiplied by the multiplier

$(document).ready(function() {
  $('#decreasebet').click(function() {
    betdecrease();
    document.getElementById("currentbet").innerHTML = "Current bet " + "£" + initialbet
  });
});

$(document).ready(function() {
  $('#increasebet').click(function() {
    betincrease();
    document.getElementById("currentbet").innerHTML = "Current bet " + "£" + initialbet
  });
});

function betincrease() {
  if (initialbet <= maxbet) {
    initialbet += 5;
    multiplier += 1;
  }
};

function betdecrease() {
  if (initialbet > 5) {
    initialbet -= 5;
    multiplier -= 1;
  }
};

//Game
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

function rotateCarousel() {
  var angle = theta * selectedIndex * -1;
  carousel.style.transform = 'translateZ(' + -radius + 'px) ' +
    rotateFn + '(' + angle + 'deg)';
}

//click function

var nextButton = document.querySelector('.next-button2');
nextButton.addEventListener('click', function() {
  $('#playbutton').attr("disabled", "disabled");
  $('#deposit').attr("disabled", "disabled");
  document.getElementById("info").innerHTML = "Crazy cool jackpot";
  playmusic();
  if (bankroll < 5) {
    alert(" minimum bet for this game is £5, deposit first please")
  } else {

    var startTime = new Date().getTime();
    var interval = setInterval(function() {
      if (new Date().getTime() - startTime > 5000) {
        clearInterval(interval);
        selectedIndex = Math.floor(Math.random() * 9) + 1;
        selectedIndex2 = Math.floor(Math.random() * 9) + 1;
        selectedIndex3 = Math.floor(Math.random() * 9) + 1;
        rotateCarousel();
        rotateCarousel2();
        rotateCarousel3();
        console.log(selectedIndex);
        console.log(selectedIndex2);
        console.log(selectedIndex3);
        if (selectedIndex === 0 && selectedIndex2 === 0 && selectedIndex3 === 0) {
          win = multiplier * 2000
          bankroll += win;
          document.getElementById("bankroll").innerHTML = "£" + bankroll;
          document.getElementById("info").innerHTML = "Massive payout, crazy cool jackpot mate!!!";
          audio.pause();
          playmusic3();
        } else if (selectedIndex === 1 && selectedIndex2 === 1 && selectedIndex3 === 1) {
          win = multiplier * 1000
          bankroll += win;
          document.getElementById("bankroll").innerHTML = "£" + bankroll;
          document.getElementById("info").innerHTML = "Massive payout, this is crazy!!!";
          audio.pause();
          playmusic3();
        } else if (selectedIndex === 2 && selectedIndex2 === 2 && selectedIndex3 === 2) {
          win = multiplier * 100
          bankroll += win;
          document.getElementById("bankroll").innerHTML = "£" + bankroll;
          document.getElementById("info").innerHTML = "Massive payout, this is crazy!!!";
          audio.pause();
          playmusic3();
        } else if (selectedIndex === 3 && selectedIndex2 === 3 && selectedIndex3 === 3) {
          win = multiplier * 50
          bankroll += win;
          document.getElementById("bankroll").innerHTML = "£" + bankroll;
          document.getElementById("info").innerHTML = "Massive payout, this is crazy!!!";
          audio.pause();
          playmusic3();
        } else if (selectedIndex === 4 && selectedIndex2 === 4 && selectedIndex3 === 4) {
          win = multiplier * 80
          bankroll += win;
          document.getElementById("bankroll").innerHTML = "£" + bankroll;
          document.getElementById("info").innerHTML = "Massive payout, this is crazy!!!";
          audio.pause();
          playmusic3();
        } else if (selectedIndex === 5 && selectedIndex2 === 5 && selectedIndex3 === 5) {
          win = multiplier * 200
          bankroll += win;
          document.getElementById("bankroll").innerHTML = "£" + bankroll;
          document.getElementById("info").innerHTML = "Massive payout, this is crazy!!!";
          audio.pause();
          playmusic3();
        } else if (selectedIndex === 6 && selectedIndex2 === 6 && selectedIndex3 === 6) {
          win = multiplier * 500
          bankroll += win;
          document.getElementById("bankroll").innerHTML = "£" + bankroll;
          document.getElementById("info").innerHTML = "Massive payout, this is crazy!!!";
          audio.pause();
          playmusic3();
        } else if (selectedIndex === 7 && selectedIndex2 === 7 && selectedIndex3 === 7) {
          win = multiplier * 300
          bankroll += win;
          document.getElementById("bankroll").innerHTML = "£" + bankroll;
        } else if (selectedIndex === 8 && selectedIndex2 === 8 && selectedIndex3 === 8) {
          win = multiplier * 20
          bankroll += win;
          document.getElementById("bankroll").innerHTML = "£" + bankroll;
          document.getElementById("info").innerHTML = "Massive payout, this is crazy!!!";
          audio.pause();
          playmusic3();
        } else if (selectedIndex === 9 && selectedIndex2 === 9 && selectedIndex3 === 9) {
          win = multiplier * 5000
          bankroll += win;
          document.getElementById("bankroll").innerHTML = "£" + bankroll;
          document.getElementById("info").innerHTML = "Massive payout, this is crazy!!!";
          audio.pause();
          playmusic3();
        } else if (selectedIndex === selectedIndex2 || selectedIndex2 === selectedIndex3) { //this is special event "uncle scroove"
          document.getElementById("info").innerHTML = "NICELY DONE enjoy your free gift from uncle scroove!";
          document.getElementById("specialchest").style.visibility = 'visible';
          var randomprice = 0;
          var randomprice1 = 0;
          var randomprice2 = 0;
          $(document).ready(function() {
            $('#firstchest').click(function() {
              randomprice = Math.floor(Math.random() * 100) + 1;
              randomprice1 = Math.floor(Math.random() * 100) + 1;
              randomprice2 = Math.floor(Math.random() * 100) + 1;
              document.getElementById("firstchest").innerHTML = "£" + randomprice;
              document.getElementById("secondchest").innerHTML = "£" + randomprice1;
              document.getElementById("thirdchest").innerHTML = "£" + randomprice2;
              document.getElementById("specialchest_info").innerHTML = "WELL DONE!" + " " + "£" + randomprice + " in your pocket now press continue!";
              bankroll += randomprice;
              document.getElementById("bankroll").innerHTML = "£" + bankroll;
              document.getElementById("continue").style.visibility = 'visible';
              $('#firstchest').attr("disabled", "disabled");
              $('#secondchest').attr("disabled", "disabled");
              $('#thirdchest').attr("disabled", "disabled");
            });
          });
          $(document).ready(function() {
            $('#secondchest').click(function() {
              randomprice = Math.floor(Math.random() * 100) + 1;
              randomprice1 = Math.floor(Math.random() * 100) + 1;
              randomprice2 = Math.floor(Math.random() * 100) + 1;
              document.getElementById("firstchest").innerHTML = "£" + randomprice;
              document.getElementById("secondchest").innerHTML = "£" + randomprice1;
              document.getElementById("thirdchest").innerHTML = "£" + randomprice2;
              document.getElementById("specialchest_info").innerHTML = "WELL DONE!" + " " + "£" + randomprice1 + " in your pocket now press continue!";
              bankroll += randomprice1;
              document.getElementById("bankroll").innerHTML = "£" + bankroll;
              document.getElementById("continue").style.visibility = 'visible';
              $('#firstchest').attr("disabled", "disabled");
              $('#secondchest').attr("disabled", "disabled");
              $('#thirdchest').attr("disabled", "disabled");
            });
          });
          $(document).ready(function() {
            $('#thirdchest').click(function() {
              randomprice = Math.floor(Math.random() * 100) + 1;
              randomprice1 = Math.floor(Math.random() * 100) + 1;
              randomprice2 = Math.floor(Math.random() * 100) + 1;
              document.getElementById("firstchest").innerHTML = "£" + randomprice;
              document.getElementById("secondchest").innerHTML = "£" + randomprice1;
              document.getElementById("thirdchest").innerHTML = "£" + randomprice2;
              document.getElementById("specialchest_info").innerHTML = "WELL DONE!" + " " + "£" + randomprice2 + " in your pocket now press continue!";
              bankroll += randomprice2;
              document.getElementById("bankroll").innerHTML = "£" + bankroll;
              document.getElementById("continue").style.visibility = 'visible';
              $('#firstchest').attr("disabled", "disabled");
              $('#secondchest').attr("disabled", "disabled");
              $('#thirdchest').attr("disabled", "disabled");
            });
          });
          $(document).ready(function() {
            $('#continue').click(function() {
              document.getElementById("specialchest").style.visibility = 'hidden';
              document.getElementById("continue").style.visibility = 'hidden';
              document.getElementById("specialchest_info").innerHTML = "Uncle Scroove has got lucky chest for you! Pick one and enjoy your prize!";
              document.getElementById("firstchest").innerHTML = "<i class='fa fa-gift fa-3x'></i>";
              document.getElementById("secondchest").innerHTML = "<i class='fa fa-gift fa-3x'></i>";
              document.getElementById("thirdchest").innerHTML = "<i class='fa fa-gift fa-3x'></i>";
              $("#firstchest").removeAttr("disabled")
              $("#secondchest").removeAttr("disabled")
              $("#thirdchest").removeAttr("disabled")
            });
          });
          audio.pause();
          playmusic3();
        } else {
          win = multiplier * 5;
          bankroll -= win;
          jackpotmoney += win;
          document.getElementById("jackpot").innerHTML = "Current jackpot:" + "£" + jackpotmoney;
          document.getElementById("bankroll").innerHTML = "£" + bankroll;
        }
        return;
      }
      selectedIndex = Math.floor(Math.random() * 10000);
      selectedIndex2 = Math.floor(Math.random() * 10000);
      selectedIndex3 = Math.floor(Math.random() * 10000);
      rotateCarousel();
      rotateCarousel2();
      rotateCarousel3();
      console.log(selectedIndex);
      if (selectedIndex === 0) { //not working properly need to change it
        bankroll += jackpotmoney;
        jackpotmoney = 50000; //resetting jackpot after hitting the one
        document.getElementById("bankroll").innerHTML = "£" + bankroll;
        document.getElementById("jackpot").innerHTML = "Please contact support";
        clearInterval(interval);
      }
    }, 1000);
  };
  setTimeout('$("#playbutton").removeAttr("disabled")', 5000);
  setTimeout('$("#deposit").removeAttr("disabled")', 5000);
});

var cellsRange = document.querySelector('.cells-range');
cellsRange.addEventListener('change', changeCarousel);
cellsRange.addEventListener('input', changeCarousel);



function changeCarousel() {
  cellCount = cellsRange.value;
  theta = 360 / cellCount;
  var cellSize = isHorizontal ? cellWidth : cellHeight;
  radius = Math.round((cellSize / 2) / Math.tan(Math.PI / cellCount));
  for (var i = 0; i < cells.length; i++) {
    var cell = cells[i];
    if (i < cellCount) {
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
(function() {
  for (var i = 0; i < orientationRadios.length; i++) {
    var radio = orientationRadios[i];
    radio.addEventListener('change', onOrientationChange);
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

//REEL 2

var carousel2 = document.querySelector('.carousel2');
var cells = carousel2.querySelectorAll('.carousel__cell2');
var cellCount; // cellCount set from cells-range input value
var selectedIndex2 = 0;
var cellWidth = carousel.offsetWidth;
var cellHeight = carousel.offsetHeight;
var isHorizontal = true;
var rotateFn = isHorizontal ? 'rotateY' : 'rotateX';
var radius, theta;
// console.log( cellWidth, cellHeight );

function rotateCarousel2() {
  var angle = theta * selectedIndex2 * -1;
  carousel2.style.transform = 'translateZ(' + -radius + 'px) ' +
    rotateFn + '(' + angle + 'deg)';
}

var nextButton = document.querySelector('.next-button2');
nextButton.addEventListener('click', function() {
  selectedIndex2++;
  rotateCarousel();
  rotateCarousel2();
  rotateCarousel3();
});

var cellsRange = document.querySelector('.cells-range2');
cellsRange.addEventListener('change', changeCarousel);
cellsRange.addEventListener('input', changeCarousel);



function changeCarousel() {
  cellCount = cellsRange.value;
  theta = 360 / cellCount;
  var cellSize = isHorizontal ? cellWidth : cellHeight;
  radius = Math.round((cellSize / 2) / Math.tan(Math.PI / cellCount));
  for (var i = 0; i < cells.length; i++) {
    var cell = cells[i];
    if (i < cellCount) {
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
(function() {
  for (var i = 0; i < orientationRadios.length; i++) {
    var radio = orientationRadios[i];
    radio.addEventListener('change', onOrientationChange);
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

//REEL 3

var carousel3 = document.querySelector('.carousel3');
var cells = carousel3.querySelectorAll('.carousel__cell3');
var cellCount; // cellCount set from cells-range input value
var selectedIndex3 = 0;
var cellWidth = carousel.offsetWidth;
var cellHeight = carousel.offsetHeight;
var isHorizontal = true;
var rotateFn = isHorizontal ? 'rotateY' : 'rotateX';
var radius, theta;
// console.log( cellWidth, cellHeight );

function rotateCarousel3() {
  var angle = theta * selectedIndex3 * -1;
  carousel3.style.transform = 'translateZ(' + -radius + 'px) ' +
    rotateFn + '(' + angle + 'deg)';
}

var nextButton = document.querySelector('.next-button');
nextButton.addEventListener('click', function() {
  selectedIndex3++;
  rotateCarousel();
});

var cellsRange = document.querySelector('.cells-range');
cellsRange.addEventListener('change', changeCarousel);
cellsRange.addEventListener('input', changeCarousel);



function changeCarousel() {
  cellCount = cellsRange.value;
  theta = 360 / cellCount;
  var cellSize = isHorizontal ? cellWidth : cellHeight;
  radius = Math.round((cellSize / 2) / Math.tan(Math.PI / cellCount));
  for (var i = 0; i < cells.length; i++) {
    var cell = cells[i];
    if (i < cellCount) {
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
(function() {
  for (var i = 0; i < orientationRadios.length; i++) {
    var radio = orientationRadios[i];
    radio.addEventListener('change', onOrientationChange);
  }
})();

function onOrientationChange() {
  var checkedRadio = document.querySelector('input[name="orientation"]:checked');
  isHorizontal = checkedRadio.value == 'horizontal';
  rotateFn = isHorizontal ? 'rotateY' : 'rotateX';
  changeCarousel();
}

// set initials  this will put all 3 reel equal in the beginning
onOrientationChange();
rotateCarousel();
rotateCarousel2();
rotateCarousel3();

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


