$(document).ready(function() {

  var hash = window.location.hash;
  if (hash && $(hash).length) {
    openSection(hash);
  }

  $('#links .button').click(function() {
    var selected = '#'+$(this).data('id');
    openSection(selected);
  })
});

function openSection(id, heading) {
  $('.block').hide();
  $(id).show();
  window.location.hash = id.substring(1);
  if (!heading) {
    $(window).scrollTop(0);
  } else {
    $(window).scrollTop($("#"+heading).offset().top-30);
  }
}

//BIRD ANIMATION
var growSprites = [];
var mainSprites = [];
var eatSprites = [];
var curSprites = [];

var eatNum = 11;
var mainNum = 4;
var growNum = 29;
var curNum;

var wormsEaten = 0;

var timer = 0;
var lastCount = 0;
var rate = 200;
var curIndex = 0;

var curPosY = window.innerHeight - 320;

//0 = main
//1 = eat
//2 = grow

var state = 0;
var cnv;

function preload() {
  imageLoad(mainSprites, "main", mainNum);
  imageLoad(eatSprites, "eat", eatNum);
  imageLoad(growSprites, "grow-v3-", growNum);
  curSprites = mainSprites;
  curNum = mainNum;
}

function setup() {
  // put setup code here
  cnv = createCanvas(220, windowHeight-100);
  cnv.id('bird-cnv');
  background(255);
  noStroke();
}

function draw() {
  cycleMain();
  image(curSprites[curIndex], 10, curPosY+10);
  fill("#ff00f7");
  rect(0, 0, width, 10);
  rect(0, height-10, width, 10);
  rect(0, 0, 10, height);
  rect(width-10, 0, width, height);
}

function cycleMain() {
  if(millis() - timer >= rate) {
    timer = millis();
    if(state == 0)
      curIndex = curIndex < curNum-1 ? curIndex + 1 : 0;
    else if (state == 1) {
      if(curIndex < curNum - 1)
        curIndex++;
      else {
        curSprites = mainSprites;
        curNum = mainNum;
        state = 0;
        curIndex = 0;
      }
    } else {
      if(curIndex < curNum - 1)
        curIndex++;
    }
  }
}

function imageLoad(array, name, num) {
  for(var i=0; i<num; i++) {
    array[i] = loadImage("imgs/bird/" + name + i +".jpg");
  }
}

function mousePressed() {
  //check if on bird-friend
  if((mouseX > 30 && mouseX < width-30) && (mouseY > height-200 && mouseY < height-20)) {
    if(state == 0) {
      wormsEaten++;
      if(wormsEaten <= 3) {
        state = 1;
        curSprites = eatSprites;
        curNum = eatNum;
      } else {

        curSprites = growSprites;
        curNum = growNum;
        //mystery number based on size of image, plus egg alignment
        curPosY = -1 * (2010 - height);
        state = 2;
      }
    }
  }
}
