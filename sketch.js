const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

var gameState = 1;
var PLAY = 1;
var END = 0;
var EnD = 2;
var knight, knightRunning, knightIdle;
var Monster, MonsterImg;
var bg;
var health = 100, lastItem = "None", damage = 0;
var isRunning = false;
var item = 0;
var engine, world;
var ironSword, masterSword, thorn, poison;
var ironSwordPicked = false;
var masterSwordPicked = false;
var itemInHand = "None";
var monsterHealth = 100;
var numberOfMasterSword = 0;
var numberOfIronSword = 0;

function preload(){
    knightRunning = loadAnimation("1.png","2.png","3.png","4.png","5.png",
    "6.png","7.png","8.png","9.png","10.png","11.png","12.png","13.png",
    "14.png","15.png","16.png","17.png","18.png","19.png","20.png");
    knightIdle = loadAnimation("1.png");
    MonsterImg = loadImage("Boss Monster.png");
    bg = loadImage("Background.jpg");
    ironSwordImg = loadImage("Iron Sword.png");
    masterSwordImg = loadImage("Master Sword.png");
    thornImg = loadImage("Thorn.png");
    poisonImg = loadImage("Poison.png");
}

function setup(){
    canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;
    knight = createSprite(50,200,30,30);
    knight.addAnimation("running",knightRunning);
    knight.addAnimation("idle",knightIdle);
    knight.setCollider("rectangle",-3,3,40,50);

    Monster = createSprite(1100,200,40,40);
    Monster.addImage(MonsterImg);
    Monster.scale = 0.8;

    box1 = new Box(125,200,45,45);
    box2 = new Box(300,200,45,45);
    box3 = new Box(475,200,45,45);
    box4 = new Box(650,200,45,45);
    box5 = new Box(825,200,45,45);
    invisibleBox1 = createSprite(125,200,25,40);
    invisibleBox1.visible = false;
    invisibleBox1.setCollider("rectangle",0,0,40,40);
    invisibleBox1.debug = true;
    invisibleBox2 = createSprite(300,200,25,40);
    invisibleBox2.setCollider("rectangle",0,0,40,40);
    invisibleBox2.visible = false;
    invisibleBox3 = createSprite(475,200,25,40);
    invisibleBox3.setCollider("rectangle",0,0,40,40);
    invisibleBox3.visible = false;
    invisibleBox4 = createSprite(650,200,25,40);
    invisibleBox4.setCollider("rectangle",0,0,40,40);
    invisibleBox4.visible = false;
    invisibleBox5 = createSprite(825,200,25,40);
    invisibleBox5.setCollider("rectangle",0,0,40,40);
    invisibleBox5.visible = false;
    
}

function draw(){
    background(bg);
    Engine.update(engine);
    textSize(30);
    fill("red");
    text("Health: " + health,10,50);
    text("Monster health: " + monsterHealth,900,50);
    textSize(40);
    fill("yellow");
    text("Lucky Knight",475,50);
    textSize(20);
    fill(255);
    text("Last Item: " + lastItem,10,90 );
    text("Item in hand: " + itemInHand,950,90);
    textSize(15);
    text("No. of Iron Sword: " + numberOfIronSword, 170,40);
    text("No. of Master Sword: " + numberOfMasterSword, 170,60);
    
    isMoving();
    if(!isRunning){
        knight.changeAnimation("idle",knightIdle);
    }
    if(isRunning){
        knight.changeAnimation("running",knightRunning);
    }

    if(gameState === 1){
        Attack();
        if(frameCount < 300){
            text("*Use arrow keys to move, You will receive random item when in contact with lucky box, When in contact with monster use 'i' or 'm' keys to use the represented sword",10,390);
        }
        if(keyIsDown(UP_ARROW)){
            knight.y = knight.y-4;
        }
        if(keyIsDown(DOWN_ARROW)){
            knight.y = knight.y+4;
        }
        if(keyIsDown(RIGHT_ARROW)){
            knight.x = knight.x+4;
        }
        if(keyIsDown(LEFT_ARROW)){
            knight.x = knight.x-4;
        }

        if(knight.isTouching(invisibleBox1)){
            items(invisibleBox1);
            invisibleBox1.destroy();
            Matter.Body.setPosition(box1.body , {x:-100,y:0});
        }
        if(knight.isTouching(invisibleBox2)){
            items(invisibleBox2);
            invisibleBox2.destroy();
            Matter.Body.setPosition(box2.body , {x:-100,y:0});
        }
        if(knight.isTouching(invisibleBox3)){
            items(invisibleBox3);
            invisibleBox3.destroy();
            Matter.Body.setPosition(box3.body , {x:-100,y:0});
        }
        if(knight.isTouching(invisibleBox4)){
            items(invisibleBox4);
            invisibleBox4.destroy();
            Matter.Body.setPosition(box4.body , {x:-100,y:0});
        }
        if(knight.isTouching(invisibleBox5)){
            items(invisibleBox5);
            invisibleBox5.destroy();
            Matter.Body.setPosition(box5.body , {x:-100,y:0});
        }
        if(ironSwordPicked){
            itemInHand = "Iron Sword";
            ironSwordPicked = false;
            numberOfIronSword++;
        }
        if(masterSwordPicked){
            itemInHand = "Master Sword";
            masterSwordPicked = false;
            numberOfMasterSword++;
        }
    }
    if(health < 1){
        gameState = 0;
    }
    if(monsterHealth < 1){
        gameState = 2;
    }

    box1.display();
    box2.display();
    box3.display();
    box4.display();
    box5.display();

    drawSprites();

    if(gameState === 0){
        textSize(100);
        fill("red");
        text("You Lost",400,225);
    }
    if(gameState === 2){
        textSize(100);
        fill("green");
        text("You Won",400,225);
    }
}

function isMoving(){
    if(keyIsDown(UP_ARROW) || keyIsDown(DOWN_ARROW) || keyIsDown(RIGHT_ARROW) || keyIsDown(LEFT_ARROW)){
        isRunning = true;
    }
    else{
        isRunning = false;
    }
}

function items(box){
    item = Math.round(random(1,4));
    console.log(item);
    if(item === 1){
        ironSword = createSprite(-10,-10,10,10);
        var x = box.x;
        var y = box.y;
        ironSword.x = box.x;
        ironSword.y = box.y;
        ironSword.addImage(ironSwordImg);
        ironSword.scale = 0.02;
        lastItem = "Iron Sword";
        ironSwordPicked = true;
    }
    if(item === 2){
        masterSword = createSprite(-10,-10,10,10);
        var x = box.x;
        var y = box.y;
        masterSword.x = box.x;
        masterSword.y = box.y;
        masterSword.addImage(masterSwordImg);
        masterSword.scale = 0.04;
        lastItem = "Master Sword";
        masterSwordPicked = true;
    }
    if(item === 3){
        thorn = createSprite(-10,-10,10,10);
        thorn.x = box.x;
        thorn.y = box.y;
        thorn.addImage(thornImg);
        thorn.scale = 0.05;
        damage = 10;
        health = health - damage;
        lastItem = "Thorn";
    }
    if(item === 4){
        poison = createSprite(-10,-10,10,10);
        poison.x = box.x;
        poison.y = box.y;
        poison.addImage(poisonImg);
        poison.scale = 0.02;
        damage = 25;
        health = health - damage;
        lastItem = "Poison";
    }
}

function keyPressed(){
    if(knight.isTouching(Monster)){
        
        if(keyCode === 73 && numberOfIronSword > 0){
            monsterHealth = monsterHealth - 25;
            --numberOfIronSword;
            console.log("i");
        }

        if(keyCode === 77 && numberOfMasterSword > 0){
            monsterHealth = monsterHealth - 50;
            --numberOfMasterSword;
            console.log("m");
    }
    }
}

function Attack(){
    if(knight.isTouching(Monster)){
        if(frameCount % 45 === 0){
            health = health - 15;
        }
    }
}