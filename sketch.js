//..
var dog, dogImage, happyDogImage, database, foodS, foodStock;

function preload(){
  dogImage = loadImage("images/dog.png");
  happyDogImage = loadImage("images/happydog.png");
}

function setup(){
  database = firebase.database();
	createCanvas(500,500);
  
  dog = createSprite(250,320);
  dog.addImage(dogImage);
  dog.scale = 0.3; 

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  console.log(foodStock);

}

function draw(){
  background(46, 139, 87); 
  drawSprites();
  
  fill("white");
  textSize(24);
  textAlign(CENTER, TOP);
  text(" Note: Press Up arrow key to feed Drago Milk.", 0,50,width,50);
  text("Food remaining: "+foodS,0,110,width,50 );

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImage);
  }
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x=0   
  }else{
    x = x - 1;
  }
  database.ref('/').update({
    Food:x
  })
}