// VERSION 2:
var audio = new Audio("./sounds/newcarsounds3.mp3");
// Audio.addEventListener("ended", function(){
//   this.currentTime = 0;
//   this.play();
// }, false);
audio.play();

var timer = 0;
function startTimer(){
  var timerInterval = setInterval(function(){
    timer ++;
    $(".timer span").text(timer);
    if(mustang.isCrashed){
      clearInterval(timerInterval);
    }
  }, 1000);
} 
startTimer();


var car1Img = new Image ();
car1Img.src = "../images/blackcar1.png";
var car2Img = new Image ();
car2Img.src = "../images/oldcar.png";
var car3Img = new Image ();
car3Img.src = "../images/greencar.png";
var car4Img = new Image ();
car4Img.src = "../images/silvercar1.png";
var car5Img = new Image ();
car5Img.src = "../images/bluecar1.png";
var car6Img = new Image ();
car6Img.src = "../images/blackcar2.png";
var car7Img = new Image ();
car7Img.src = "../images/policecar.png";
var car8Img = new Image ();
car8Img.src = "../images/schoolbus.png";
var car9Img = new Image ();
car9Img.src = "../images/redcar.png";

function Car (img, trajectory){
  this.x = 660;
  this.y = 400;
  this.width = 7;
  this.height = 5;
  this.carImg = img;
  this.isCrashed = false;
  this.trajectory = trajectory;
 
}

Car.prototype.drawMe = function (){
  ctx.drawImage(this.carImg, this.x, this.y, this.width, this.height);
};

Car.prototype.moveMe = function () {
  this.x += this.trajectory;
  this.y += 3;
  this.height += 3;
  this.width += 3;
}

var gameOver = {
  x: 280,
  y: 400,
  opacity: 0,
  drawMe: function () {
    if (this.opacity < 1) {
      this.opacity += 0.01;
    }

// function gameOver () {
//   if(mustang.isCrashed){
//     $(".gameover span");
//   }
// }

    // fade in the text with globalAlpha
    ctx.globalAlpha = this.opacity;
    ctx.font = "bold 120px  monospace";

    ctx.fillStyle = "red";
    ctx.fillText("Game Over", this.x, this.y);

    ctx.lineWidth = 3;
    ctx.strokeStyle = "rebeccapurple";
    ctx.strokeText("Game Over", this.x, this.y);

    ctx.globalAlpha = 1;
  }
}


var car1 = new Car( car1Img, -3);
var car2 = new Car( car2Img, 3);
var car3 = new Car( car3Img, -3);
var car4 = new Car( car4Img, 3);
var car5 = new Car( car5Img, -3);
var car6 = new Car( car6Img, 3);
var car7 = new Car( car7Img, -3);
var car8 = new Car( car8Img, 3);
var car9 = new Car( car9Img, 3);




function collision (car) {
  return mustang.y + mustang.height >= car.y
     &&  mustang.y <= car.y + car.height
     &&  mustang.x + mustang.width >= car.x
     &&  mustang.x <= car.x + car.width;
}


var myCanvas = document.querySelector(".my-canvas");
var ctx = myCanvas.getContext("2d");

var mustangImg = new Image();
mustangImg.src="../images/mustang.png";

var mustang = {
  x: 450,
  y: 550,
  width: 200,
  height: 150,
  isCrashed: false,
  crashedGif: false,
  drawMe: function () {
    ctx.drawImage(mustangImg, this.x, this.y, this.width, this.height);
  },
  controlBoundaries: function (){
    if (this.x < 450){
      this.x = 450;
    }
    if (this.x > 750){
      this.x = 750;
    }
  }
};

var randomCarArray = [];
var allCars = [car1, car2, car3, car4, car5, car6, car7, car8, car9];
function addRandomCar(){
  var randomCar = allCars[Math.floor(Math.random()*allCars.length)];
  var myCar = new Car(randomCar.carImg, randomCar.trajectory);
  randomCarArray.push(myCar);
}
var carInterval = setInterval(function(){
  addRandomCar();
  }, 2000);

function drawScene(){
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);

  mustang.drawMe();

  randomCarArray.forEach(function (oneCar){
    // if (oneCar.y > myCanvas.height){
    //     oneCar.y = 400;
    //     oneCar.height = 5;
    //     oneCar.width = 7;
    // }
    oneCar.drawMe();
    if(collision(oneCar)){
      mustang.isCrashed = true;
      if(!mustang.crashedGif){
        mustangImg.src="https://media.giphy.com/media/ahza0v6s5pSxy/giphy.gif";
        mustang.crashedGif = true;
      }
      clearInterval(carInterval);
      // clearInterval(timerInterval)
      oneCar.isCrashed = true;
    }  
    if(!oneCar.isCrashed){
     oneCar.moveMe();
    } 
  });

  randomCarArray = randomCarArray.filter(function (oneCar){
    return !oneCar.isCrashed;
  })

  // allCars.forEach(function (oneCar){
    // oneCar.y +=3;
    // if (oneCar.y > myCanvas.height){
    //   oneCar.y = 400;
    //   oneCar.height = 5;
    //   oneCar.width = 7;
    // };
    // oneCar.height += 2;
    // oneCar.width += 2;
   
// );

  // if(collision(mustang, car)){
  //   mustang.isCrashed = true;
  //   car.isCrashed = true;
  // }

  if(mustang.isCrashed){
    gameOver.drawMe();
  }

  requestAnimationFrame(function (){
    drawScene();
  });
}
  drawScene();

  document.onkeydown = function (event){
    if(mustang.isCrashed){
      return;
    }
    switch (event.keyCode){
      case 37: //left arrow
      mustang.x -= 300;
      break;
  
      case 39: //right arrow
      mustang.x += 300;
      break;
    }
    mustang.controlBoundaries();
  };

  //--------------------------------------------------------------------------


