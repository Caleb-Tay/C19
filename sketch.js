var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);

  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(300,300,30,60);
  ghost.addImage("ghost",ghostImg);
  ghost.scale = 0.35;

  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();

  spookySound.loop();
}

function draw() {
  background(200);
  if(gameState === 'play'){
    if(tower.y > 400){
      tower.y = 300
    }

    if(keyDown("RIGHT_ARROW")){
    ghost.x = ghost.x + 2;
    }
  
    if(keyDown("LEFT_ARROW")){
    ghost.x = ghost.x - 2;
    }

    if(keyDown("SPACE")){
    ghost.velocityY = -4

    }
    
    ghost.velocityY = ghost.velocityY + 0.4;
  
    if(climbersGroup.isTouching(ghost)){
    ghost.velocityY = 0 ;
    }

    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();

      gameState = "end";
    }
    spawnDoor(); 
    
    drawSprites();
  }
  if(gameState === "end"){
    fill('black');
    textSize(50)
    text("Game Over",200,200);

  }
  

  
}


function spawnDoor(){
  if(frameCount %  240 === 0 ){
    door = createSprite(Math.round(random(100,500)),-50,30,60);
    door.addImage('door',doorImg);
    door.velocityY = 1 ;
    
    doorsGroup.add(door);

    door.lifetime = 550;

    climber = createSprite(50,50);
    climber.addImage('climber',climberImg);
    climber.x = door.x;
    climber.y = door.y + 65
    climber.velocityY = 1;

    climbersGroup.add(climber);

    climber.lifetime = 550  

    invisibleBlock = createSprite(50,door.y + 70);
    invisibleBlock.width = climber.width ; 
    invisibleBlock.height = 1;
    invisibleBlock.x = door.x ; 
    invisibleBlock.velocityY = 1;
    invisibleBlockGroup.visible = false ; 

    invisibleBlockGroup.add(invisibleBlock);

    ghost.depth = door.depth;
    ghost.depth = ghost.depth + 1;

    
  }
}





