//images
var splash, instruc, musicnote, constellationImages = [],
   messageImages = [],
   scoreStarImages = [];

//integers
var constellationAnswer, yellowStars, wrongGuess, visibleScoreImage;

//arrays
var ref = ["_bg", "a", "e", "i", "o", "u", "k", "z", "r", "s", "d", "h", "f", "v", "j", "t", "c", "p", "g", "y", "x", "q", "n", "l", "m", "b", "w"];

//objects
var stars = [],
   letters = [],
   messages = [];

//booleans
var guessing, homeScreen, instrucScreen, settingsScreen, doneGame, inImage, BGMon;

//fonts
var fontShown, fontStars;

//music & sFx
var BGM, guessMusic, sfChime; //var sfLetterPress;


function preload() {
   for (var i = 0; i < ref.length; i++) {
      constellationImages[i] = loadImage("/assets/" + ref[i] + ".jpg");
   }
   for (var j = 0; j <= 6; j++) {
      scoreStarImages[j] = loadImage("/assets/" + j + ".png");
   }
   splash = loadImage("/assets/_title.jpg");
   instruc = loadImage("/assets/_instruc.jpg");
   messageImages[0] = loadImage("/assets/_tryagain.jpg");
   messageImages[1] = loadImage("/assets/_welldone.jpg");
   musicnote = loadImage("assets/_music.png");
   fontStars = loadFont("assets/_ABCBULLE.TTF");
   fontShown = loadFont("assets/_ABCPRINT.TTF");
   BGM = loadSound("/assets/_music/bgm.mp3");
   guessMusic = loadSound("/assets/_music/guess.mp3");
   sfChime = loadSound("/assets/_music/sfChime.mp3");
   //sfLetterPress = loadSound("/assets/_music/sfLetterPress.wav");
}

function setup() {
   createCanvas(800, 500);
   noCursor();
   guessing = false;
   BGMon = true;
   homeScreen = true;
   instrucScreen = false;
   settingsScreen = false;
   doneGame = false;
   constellationAnswer = 0;
   yellowStars = 0;
   wrongGuess = 0;
   visibleScoreImage = -1;
   textAlign(CENTER, CENTER);
   rectMode(CENTER);
   guessMusic.loop();
   guessMusic.fade(0, 0);
   BGM.loop();
   BGM.fade(0, 0);
   var buffer = 80;
   for (var i = 1; i <= ref.length; i++) {
      var i1div = floor((i - 1) / 7);
      var i1mod = (i - 1) % 7;
      var pos = createVector(i1div * 50 + buffer, i1mod * 50 + buffer);
      if (i === ref.length) {
         var idiv = floor(i / 7);
         var imod = i % 7;
         var newPos = createVector(idiv * 50 + buffer, imod * 50 + buffer);
         letters[i - 1] = new Letter(newPos, "BACK");
      } else {
         letters[i - 1] = new Letter(pos, ref[i]);
      }
   }
}

function gamePlay(position) {
   if (BGM.getVolume() === 0 && BGMon && !guessing) {
      BGM.fade(1, 2);
   }
   image(constellationImages[0], 0, 0);
   if (constellationAnswer === 0) {
      constellationAnswer = floor(random(1, 26));
   }
   if (!guessing && mouseIsPressed && mouseX <= width && mouseY <= height - 100) {
      inImage = false;
      var target = findPixel();
      var star = new Star(position, target, inImage);
      stars.push(star);
      if (stars.length > 2000) {
         stars.shift();
      }
   }
   for (var i = 0; i < stars.length; i++) {
      stars[i].update();
      stars[i].draw();
   }
   for (var m = 0; m < messages.length; m++) {
      messages[m].draw();
      if (messages[m].update()) {
         messages.splice(m, 1);
      }
   }
   if (visibleScoreImage !== -1) {
      image(scoreStarImages[visibleScoreImage], width - 310, 50);
   }
   stroke(255);
   strokeWeight(2);
   var xdis = abs(mouseX - width / 2);
   var h2 = height - 25;
   var ydis = abs(mouseY - h2);
   if (mouseIsPressed && xdis <= 70 && ydis <= 15) {
      mouseIsPressed = false;
      if (doneGame) {
         resetGame();
      } else {
         fill(255, 255, 0);
         guessing = true;
         BGM.fade(0, 2);
         if (BGMon && guessMusic.getVolume() === 0) {
            guessMusic.fade(1, 2);
         }
      }
   } else {
      fill(85, 0, 190);
   }
   var buttonText = "GUESS";
   if (doneGame) {
      buttonText = "AGAIN";
   }
   if (guessing) {
      showGuesses();
   } else {
      rect(width / 2, height - 25, 140, 30, 20);
      noStroke();
      textSize(24);
      fill(255);
      text(buttonText, width / 2, height - 25);
   }
   if (mouseIsPressed) {
      var intriangle = inTriangle(width - 70, width - 40, height - 70, width - 10, height - 40);
      var w2 = width - 40;
      h2 = height - 20;
      xdis = abs(mouseX - w2);
      ydis = abs(mouseY - h2);
      var insquare = xdis <= 30 && ydis <= 20;
      if (insquare || intriangle) {
         resetGame();
         BGM.fade(0, 1);
         guessMusic.fade(0, 1);
         homeScreen = true;
      }
   }
}

function homeDisplay() {
   image(splash, 0, 0);
   strokeWeight(5);
   stroke(255, 255, 117, 100);
   fill(255, 255, 0, 100);
   rect(620, 250, 180, 80, 20);
   stroke(174, 0, 255, 100);
   fill(108, 0, 159, 100);
   rect(620, 350, 180, 60, 20);
   fill(255);
   noStroke();
   textStyle(BOLD);
   textSize(50);
   text("PLAY", 620, 250);
   textSize(20);
   text("INSTRUCTIONS", 620, 350);
   //gear drawing
   push();
   translate(width - 35, 35);
   stroke(0);
   strokeWeight(2);
   fill(210);
   ellipse(0, 0, 45);
   var offsets = [18, 18, 12, 12, 18, 18, 12, 12, 18, 18, 12, 12, 18, 18, 12, 12, 18, 18, 12, 12, 18, 18, 12, 12, 18, 18, 12, 12, 18, 18, 12, 12];
   fill(120);
   beginShape();
   for (var i = 0; i <= 32; i++) {
      var angle = map(i, 0, 32, 0, TWO_PI);
      vertex(offsets[i] * cos(angle), offsets[i] * sin(angle));
   }
   endShape(CLOSE);
   fill(210);
   ellipse(0, 0, 10);
   pop();
   if (mouseIsPressed) {
      if (abs(mouseX - 620) <= 90 && abs(mouseY - 250) <= 40) {
         if (BGMon) {
            sfChime.play();
            sfChime.fade(2, 0);
         }
         mouseIsPressed = false;
         homeScreen = false;
      } else if (abs(mouseX - 620) <= 90 && abs(mouseY - 350) <= 30) {
         if (BGMon) {
            sfChime.play();
            sfChime.fade(2, 0);
         }
         mouseIsPressed = false;
         homeScreen = false;
         instrucScreen = true;
      } else if (dist(mouseX, mouseY, width - 35, 35) <= 23) {
         homeScreen = false;
         settingsScreen = true;
      }
   }
}

function draw() {
   var position = createVector(mouseX, mouseY);
   if (homeScreen) {
      homeDisplay();
   } else if (instrucScreen) {
      image(instruc, 0, 0);
      fill(0);
      rect(width / 2, height - 15, width, 30);
      fill(255);
      text("CLICK ANYWHERE TO GO BACK", width / 2, height - 15);
   } else if (settingsScreen) {
      settingsWindow();
   } else { // game play
      gamePlay(position);
   }
   drawStar(position);
}

function settingsWindow() {
   image(constellationImages[0], 0, 0);
   if (BGM.getVolume() === 0 && BGMon && !guessing) {
      BGM.fade(1, 2);
   }
   var windowW = width / 2;
   var windowH = (height - 100) / 2;
   var posX = windowW - windowW / 2;
   var posY = windowH - windowH / 2;
   push();
   rectMode(CORNER);
   strokeCap(PROJECT);
   strokeWeight(6);
   noFill();
   stroke(205, 205, 50);
   line(posX - 6, posY - 6, posX + windowW + 6, posY - 6);
   line(posX + windowW + 6, posY - 6, posX + windowW + 6, posY + windowH);
   stroke(255, 255, 120);
   line(posX - 6, posY, posX - 6, posY + windowH + 6);
   line(posX - 6, posY + windowH + 6, posX + windowW + 6, posY + windowH + 6);
   noStroke();
   fill(255, 255, 175, 90);
   rect(posX - 3, posY - 3, windowW + 6, windowH + 6);
   var iconsize = 75;
   textSize(11);
   textAlign(CENTER);
   imageMode(CENTER);
   image(musicnote, windowW, windowH - 35, iconsize, iconsize);
   fill(255, 255, 120);
   text("Development & Illustration: Rob Mihalko\n", windowW, windowH + 90);
   textSize(40);
   textStyle(BOLD);
   fill(0, 88, 163, 100);
   stroke(255, 255, 120);
   strokeWeight(2);
   text("BGM", windowW, windowH - iconsize / 2);
   noFill();
   stroke(0, 195, 0);
   strokeWeight(10);
   if (!BGMon) {
      stroke(255, 0, 0);
      var degX = (iconsize / 2 + 10) * cos(PI / 4);
      var degY = (iconsize / 2 + 10) * sin(PI / 4);
      line(windowW - degX, windowH - iconsize / 2 + degY, windowW + degX, windowH - iconsize / 2 - degY);
   }
   ellipse(windowW, windowH - iconsize / 2, iconsize * 1.5);
   textSize(25);
   stroke(0);
   strokeWeight(5);
   fill(162, 244, 255);
   rectMode(CENTER);
   rect(windowW, windowH + 50, 150, 36, 20);
   fill(0);
   noStroke();
   text("OK", windowW, windowH + 51.5);
   //gear drawing
   translate(width / 2 + windowW / 2 - 28.5, height / 2 - windowH / 2 - 20);
   stroke(0);
   strokeWeight(2);
   fill(210);
   ellipse(0, 0, 45);
   var offsets = [18, 18, 12, 12, 18, 18, 12, 12, 18, 18, 12, 12, 18, 18, 12, 12, 18, 18, 12, 12, 18, 18, 12, 12, 18, 18, 12, 12, 18, 18, 12, 12];
   fill(120);
   beginShape();
   for (var i = 0; i <= 32; i++) {
      var angle = map(i, 0, 32, 0, TWO_PI);
      vertex(offsets[i] * cos(angle), offsets[i] * sin(angle));
   }
   endShape(CLOSE);
   fill(210);
   ellipse(0, 0, 10);
   pop();
   var disx = abs(mouseX - windowW);
   var h2 = windowH + 50;
   var disy = abs(mouseY - h2);
   if (mouseIsPressed) {
      if (dist(mouseX, mouseY, windowW, windowH - iconsize / 2) <= iconsize * 0.8) {
         mouseIsPressed = false;
         BGMon = !BGMon;
         if (!BGMon) {
            BGM.fade(0, 0);
         }
      } else if (disx <= 75 && disy <= 18) {
         settingsScreen = false;
         homeScreen = true;
         BGM.fade(0, 0);
      }
   }
}

function showGuesses() {
   messages = [];
   for (var i = 0; i < letters.length; i++) {
      letters[i].draw();
   }
}

function resetGame() {
   doneGame = false;
   constellationAnswer = 0;
   stars = [];
   messages = [];
   visibleScoreImage = -1;
   yellowStars = 0;
   wrongGuess = 0;
   guessing = false;
   mouseIsPressed = false;
}

function result(letter) {
   guessing = false;
   guessMusic.fade(0, 2);
   if (letter === ref[constellationAnswer]) {
      BGM.fade(0, 1);
      if (BGMon) {
         sfChime.play();
         sfChime.fade(2, 0);
      }
      messages.push(new Message(createVector(100, 100), "good\njob"));
      stars = [];
      var tempYellow = yellowStars;
      for (var x = 0; x < width; x += 8) {
         for (var y = 0; y < height - 100; y += 8) {
            var pos = createVector(x, y);
            if (red(constellationImages[constellationAnswer].get(x, y)) < 200) {
               stars.push(new Star(pos, pos, true));
            }
         }
      }
      var Score = floor(100 - tempYellow / stars.length * 100);
      if (Score > 25) {
         Score = constrain(3 - wrongGuess / 2, 0, 3);
      } else if (Score > 15) {
         Score = constrain(2 - wrongGuess / 2, 0, 3);
      } else if (Score > 5) {
         Score = constrain(1 - wrongGuess / 2, 0, 3);
      } else {
         Score = 0;
      }
      Score *= 2;
      var missMessage = "WRONG TRIES: \n" + wrongGuess;
      visibleScoreImage = Score;
      var w2 = 3 * width;
      messages.push(new Message(createVector(w2 / 4 + 40, height / 2), missMessage));
      doneGame = true;
   } else {
      messages.push(new Message(createVector(width - 100, height - 140), "try\nagain"));
      wrongGuess++;
   }
}

function findPixel() {
   var x, y;
   var l = constellationAnswer;
   for (var i = 0; i < 8; i++) {
      x = floor(random(constellationImages[l].width));
      y = floor(random(constellationImages[l].height));
      if (red(constellationImages[l].get(x, y)) < 200) {
         inImage = true;
         break;
      }
   }
   return createVector(x, y);
}

function drawStar(position) {
   noStroke();
   fill(255, 255, 0);
   beginShape();
   vertex(position.x, position.y - 10);
   vertex(position.x + 2, position.y - 2);
   vertex(position.x + 10, position.y - 2);
   vertex(position.x + 4, position.y + 3);
   vertex(position.x + 6, position.y + 10);
   vertex(position.x, position.y + 6);
   vertex(position.x - 6, position.y + 10);
   vertex(position.x - 4, position.y + 3);
   vertex(position.x - 10, position.y - 2);
   vertex(position.x - 2, position.y - 2);
   endShape(CLOSE);
}

function mousePressed() {
   if (guessing) {
      var letterGuess;
      for (var i = 0; i < letters.length; i++) {
         if (letters[i].isClicked()) {
            letterGuess = letters[i].val;
            break;
         }
      }
      if (letterGuess === "BACK") {
         guessing = false;
         guessMusic.fade(0, 2);
      } else if (letterGuess) {
         mouseIsPressed = false;
         result(letterGuess);
      }
   } else if (instrucScreen) {
      instrucScreen = false;
      homeScreen = true;
   }
}

function inTriangle(p1x, p2x, p2y, p3x, p3y) {
   var y2MINy3 = p2y - p3y;
   var x3MINx2 = p3x - p2x;
   var x1MINx3 = p1x - p3x;
   var xmouseMINx3 = mouseX - p3x;
   var ymouseMINy3 = mouseY - p3y;
   var y23Xxm3 = y2MINy3 * xmouseMINx3;
   var x23Xym3 = x3MINx2 * ymouseMINy3;
   var y23Xx13 = y2MINy3 * x1MINx3;
   var x12Xym3 = x1MINx3 * ymouseMINy3;
   var y23Xxm3ANDx23Xym3 = y23Xxm3 + x23Xym3;
   var a = y23Xxm3ANDx23Xym3 / y23Xx13;
   var b = x12Xym3 / y23Xx13;
   var c = 1.0 - a - b;
   return a > 0 && b > 0 && c > 0;
}