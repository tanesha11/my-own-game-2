
var hero;
var option1, option2, option3;
var coin, diamond, diamond2, fireball, waterball;
var robot1, robot2, robot3, spaceship, spaceship2,trophy;
var x1, x2, x3;
gameState = 0;
var hero ,robotsGroup1 ,robotsGroup2, coinGroup;
var score, coin1;
function preload()
{
   option1 = loadImage("images/option1.png");
   option2 = loadImage("images/option2.png");
   option3 = loadImage("images/option3.png");

   coin = loadImage("images/coin.png");
   diamond = loadImage("images/diamond.png");
   diamond2 = loadImage("images/diamond2.png");
   fireball = loadImage("images/fireball.png");
   waterball = loadImage("images/waterball.png");

   robot1 = loadImage("images/robot1.png");
   robot2 = loadImage("images/robot2.png");
   robot3 = loadImage("images/robot3.png");

   spaceship = loadImage("images/spaceship.png");
   spaceship2 = loadImage("images/spaceship2.png");

   trophy = loadImage("images/trophy.png");

}
function setup() 
{

  score = 0;

  createCanvas(1000,1000);
  //hero = createSprite(500,10,20,20);
  x1 = createSprite(200,300,20,20);
  x1.addImage(option1);
  x1.visible = false;

  x2 = createSprite(500,300,20,20);
  x2.addImage(option2);
  x2.visible = false;

  x3 = createSprite(800,300,20,20);
  x3.addImage(option3);
  x3.visible = false;

  robotsGroup1 = new Group();
  robotsGroup2 = new Group();
  coinGroup = new Group();

  diamond1 = createSprite(900,900,20,20);
  diamond1.addImage(diamond);
  diamond1.visible = false;
  diamond1.scale = 0.3;

  
}

function draw() 
{
  background(0);   
  drawSprites();
  
  if(gameState === 0)
  {
    chooseCharacter();
    
    console.log(hero);
  }
  distance();

  textSize(30);
  fill("white");
  text("Score: "+score,800,100);
  
  if(gameState ===1)
  {
    hero.scale = 0.3;
    spawnRobots1();
    spawnRobots2();
   
    if(robotsGroup1.isTouching(hero) || robotsGroup2.isTouching(hero)) {
      hero.x = 50;
      hero.y = 50;
    }

    spawnCoins();
    if(coinGroup.isTouching(hero)) {
      score += 1;
      coinGroup.destroyEach();
    }
    diamond1.visible = true;

    if(diamond1.isTouching(hero)) {
      hero.x = 50;
      hero.y = 50;
      gameState = 2;
      diamond1.destroy();
      score += 10;
    }
   // camera.position.x = 500;
   // camera.position.y = hero.y;
  
  }
  
  if(gameState ===2)
  {

  }
  
}
function spawnRobots1()
{
  if(frameCount%300===0){
   var obstacle1 = createSprite(100,300,20,20);
   obstacle1.velocityX = 4;
   obstacle1.y = random(300,700);
  
   var rand = Math.round(random(1,2));
   console.log(rand);
   switch(rand)
   {
     case 1 : obstacle1.addImage(robot1);
     break;
     case 2 : obstacle1.addImage(robot3);
     break;
     default : obstacle1.addImage(robot1);
     break;
   }
   obstacle1.scale = 1.5;
   obstacle1.lifetime = 250;
   robotsGroup1.add(obstacle1);
  }
}

function spawnRobots2()
{
  if(frameCount%50===0){
   var obstacle1 = createSprite(1000,300,20,20);
   obstacle1.velocityX = -9;
   obstacle1.y = random(300,700);
 
   obstacle1.addImage(robot2); 
   obstacle1.scale = 1.5;
   obstacle1.lifetime = 250;
   robotsGroup2.add(obstacle1);
  }
}

function spawnCoins() {
  if(frameCount%90===0) {
    coin1 = createSprite(100,100,20,20);
    coin1.debug = true;
    coin1.setCollider("circle",0,0,15);
    coin1.y = random(200,800);
    coin1.x = random(100,900);
    coin1.lifetime = 100;

    coin1.addImage(coin);
    
    coinGroup.add(coin1);
  }
}

function chooseCharacter()
{
  x1.visible = true;
  x2.visible = true;
  x3.visible = true;
  if(mousePressedOver(x1))
  {
    hero = x1;
    console.log("hello");
    x2.destroy();
    x3.destroy();
    gameState= 1;
  }
  else if(mousePressedOver(x2))
  {
    hero = x2;
    console.log("hello");
    x1.destroy();
    x3.destroy();
    gameState= 1;
  }
  else if(mousePressedOver(x3))
  {
    hero = x3;
    console.log("hello");
    x1.destroy();
    x2.destroy();
    gameState= 1;
  }

}
function distance(){
  if(keyDown("W")) {
    hero.y -=5;
  }

  if(keyDown("S")) {
    hero.y +=5;
  }

  if(keyDown("A")) {
    hero.x -=5
  }

  if(keyDown("D")) {
    hero.x +=5
  }
}