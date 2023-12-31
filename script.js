window.onload = function() {
  var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
  'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
  't', 'u', 'v', 'w', 'x', 'y', 'z'];


  var categories;
  var chosenCategory;
  var getHint;
  var word;
  var guess;
  var guesses = [ ];
  var lives;
  var counter;
  var space;

  var showLives = document.getElementById('mylives');
  var showCategories = document.getElementById('scategory');
  var getHint = document.getElementById('hint')
  var showClue = document.getElementById('clue');

  var buttons = function() {
    myButtons = document.getElementById('buttons');
    letters = document.createElement('ul');

    for(var i = 0; i < alphabet.length; i++) {
      letters.id = 'alphabet';
      list = document.createElement('li');
      list.id = 'letter';
      list.innerHTML = alphabet[i];
      check();
      myButtons.appendChild(letters);
      letters.appendChild(list);


    }

  }

  var selectCat = function() {
    if(chosenCategory === categories[0]) {
      catagoryName.innerHTML = "category is football teams";
    } else if(chosenCategory === categories[1]) {
      catagoryName.innerHTML = "category is films ";
    } else if(chosenCategory === categories[2]) {
      catagoryName.innerHTML = "category is cities";
    }
  }

  result = function() {
    wordHolder = document.getElementById('hold');
    correct = document.createElement('ul');

    for(var i = 0; i < word.length; i++) {
      correct.setAttribute('id', 'my-word');
      guess = document.createElement('li');
      guess.setAttribute('class', 'guess');
      if(word[i] === "-") {
        guess.innerHTML = "-";
        space = 1;

      } else {
        guess.innerHTML = "_";
      }
    
      guesses.push(guess);
      wordHolder.appendChild(correct)
      correct.appendChild(guess)

    }
  }

  comments = function() {
    showLives.innerHTML = "you have " + lives + " lives";
    if(lives < 1) {
      showLives.innerHTML = "game over"
    }
    for(var i = 0; i < guesses.length; i++) {
      if(counter + space === guesses.length) {
        showLives.innerHTML = "you win";
      }
    }
  }


  var animate = function() {
    var drawMe = lives;
    drawArray[drawMe]();
  }

  canvas = function() {
    myStickman = document.getElementById('stickman');
    context = myStickman.getContext('2d');
    context.beginPath();
    context.strokeStyle = "#fff";
    context.lineWidth = 2;
  };

  head = function() {
    myStickman = document.getElementById('stickman');
    context = myStickman.getContext('2d');
    context.beginPath();
    context.arc(60, 25, 10, 0, Math.PI*2, true);
    context.stroke()
  }

  draw = function($pathFromx, $pathFromy, $pathTox, $pathToy) {
    context.moveTo($pathFromx, $pathFromy);
    context.lineTo($pathTox, $pathToy);
    context.stroke();
  }

  frame1 = function() {
    draw(0, 150, 150, 150)
  }
  frame2 = function() {
    draw(10, 0, 10, 600)
  }
  frame3 = function() {
    draw(0, 5, 70, 5)
  }
  frame4 = function() {
    draw(60, 5, 60, 15)
  }

  torso = function() {
    draw(60, 36, 60, 70)
  }

  rightArm = function() {
    draw(60, 46, 100, 50)
  }

  leftArm = function() {
    draw(60, 46, 20, 50)
  }

  rightLeg = function() {
    draw(60, 70, 100, 100)
  }

  leftLeg = function() {
    draw(60, 70, 20, 100)
  }

  drawArray = [rightLeg, leftLeg, rightArm, leftArm, torso, head, frame4, frame3, frame2, frame1]

check = function() {
  list.onclick = function() {
    var guess = (this.innerHTML);
    this.setAttribute('class', 'active');
    this.onclick = null;
    for(var i = 0; i < word.length; i++) {
      if(word[i] === guess) {
        guesses[i].innerHTML = guess
        counter += 1;
      }
    }

    var j = (word.indexOf(guess));
    if(j === -1) {
      lives -= 1;
      comments();
      animate();

    } else {
      comments();
    }

  }
}

play = function() {
  categories = [
    ["everton", "liverpool", "swansea", "chelsea", "hull", "manchester-city", "newcastle-united"],
    ["alien", "dirty-harry", "gladiator", "finding-nemo", "jaws"],
    ["manchester", "milan", "madrid", "amsterdam", "prague"]
  ];

  chosenCategory = categories[Math.floor(Math.random() * categories.length)];
  word = chosenCategory[Math.floor(Math.random() * chosenCategory.length)];
  word = word.replace(/\s/g, "-");
  console.log(word);
  buttons();

  guesses = [ ];
  lives = 10;
  counter = 0;
  space = 0;
  result();
  comments();
  selectCat();
  canvas();


}

play();


hint.onclick = function() {
  hints = [
    ["Based in Mersyside", "Based in Mersyside", "First Welsh team to reach the Premier Leauge", "Owned by A russian Billionaire", "Once managed by Phil Brown", "2013 FA Cup runners up", "Gazza's first club"],
    ["Science-Fiction horror film", "1971 American action film", "Historical drama", "Anamated Fish", "Giant great white shark"],
    ["Northern city in the UK", "Home of AC and Inter", "Spanish capital", "Netherlands capital", "Czech Republic capital"]
  ];

  var catagoryIndex = categories.indexOf(chosenCategory);
  var hintIndex = chosenCategory.indexOf(word);
  showClue.innerHTML = "clue: -" + hints [catagoryIndex][hintIndex]
};

document.getElementById('reset').onclick = function() {
  correct.parentNode.removeChild(correct);
  letters.parentNode.removeChild(letters);
  showClue = "";
  context.clearRect(0, 0, 400, 400);
  play();
}
}