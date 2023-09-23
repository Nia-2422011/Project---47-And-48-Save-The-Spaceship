var score =0;
var rocket,rock1,rock2, shoot, backBoard;

var rocketImg,rock1Img, bulletImg, shootImg, backBoardImg;

var rock2Group, rock2Group, bulletGroup;


var life =3;
var score=0;
var gameState=1

function preload(){
  rocketImg = loadImage("Rocket.png")
  blastImg = loadImage("blast.png")
  shootImg = loadImage("Shoot.png")
  rock1Img = loadImage("Rock.png")
  rock2Img = loadImage("Rock.png")
  backBoardImg= loadImage("back.jpg")
}



function setup() {
  createCanvas(800, 800);

  backBoard= createSprite(50, width/2, 100,height);
  backBoard.addImage(backBoardImg)
  
  rocket= createSprite(100, height/2, 50,50);
  rocket.addImage(rocketImg)
  rocket.scale=0.4
  
  shootGroup = createGroup();   
  rock1Group = createGroup();   
  rock2Group = createGroup();   
  
  heading= createElement("h1");
  scoreboard= createElement("h1");
}





function draw() {
  background("#4d3319");
  
  heading.html("Life: "+life)
  heading.style('color:red'); 
  heading.position(150,20)

  scoreboard.html("Score: "+score)
  scoreboard.style('color:red'); 
  scoreboard.position(width-200,20)

  if(gameState===1){
    rocket.y=mouseY  

    if (frameCount % 80 === 0) {
      drawrock1();
    }

    if (frameCount % 100 === 0) {
      drawrock2();
    }

    if(keyDown("space")){
      shootBullet();
    }

    if (rock1Group.collide(backBoard)){
      handleGameover(rock1Group);
    }
    
    if (rock2Group.collide(backBoard)) {
      handleGameover(rock2Group);
    }
    
    if(rock1Group.collide(shootGroup)){
      handleBubbleCollision(rock1Group);
    }

    if(rock2Group.collide(shootGroup)){
      handleBubbleCollision(rock2Group);
    }

    drawSprites();
  }
    
  
}

function drawrock1(){
  rock1 = createSprite(800,random(20,780),40,40);
  rock1.addImage(rock1Img);
  rock1.scale = 0.1;
  rock1.velocityX = -8;
  rock1.lifetime = 400;
  rock1Group.add(rock1);
}
function drawrock2(){
  rock2 = createSprite(800,random(20,780),40,40);
  rock2.addImage(rock2Img);
  rock2.scale = 0.1;
  rock2.velocityX = -8;
  rock2.lifetime = 400;
  rock2Group.add(rock2);
}

function shootBullet(){
  shoot= createSprite(150, width/2, 50,20)
  shoot.y= rocket.y-20
  shoot.addImage(shootImg)
  shoot.scale=0.03
  shoot.velocityX= 7
  shootGroup.add(shoot)
}

function handleBubbleCollision(bubbleGroup){
    if (life > 0) {
       score=score+1;
    }

    blast= createSprite(shoot.x+60, shoot.y, 50,50);
    blast.addImage(blastImg)
    
    blast.scale=0.3
    blast.life=20
    shootGroup.destroyEach()
    bubbleGroup.destroyEach()
}

function handleGameover(bubbleGroup){
  
    life=life-1;
    bubbleGroup.destroyEach();
    

    if (life === 0) {
      gameState=2
      
      swal({
        title: `Game Over`,
        text: "Oops you lost the game....!!!",
        text: "Your Score is " + score,
        imageUrl:
          "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
        imageSize: "100x100",
        confirmButtonText: "Thanks For Playing"
      });
    }
  
  }

  