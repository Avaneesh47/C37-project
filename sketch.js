var drawing = [];
var currentPath = [];

var isDrawing = false;

function setup() {
  canvas = createCanvas(displayWidth-100,displayHeight/2);

  database = firebase.database();

  canvas.mousePressed(start); 
  canvas.mouseReleased(end);

  form = new Form();
  form.display();
}

function draw() {
  background("yellow"); 

  push();
  fill("black");
  text("X:"+mouseX,50,50);
  text("Y:"+mouseY,50,70);
  pop();
  
  if(isDrawing){
    var point = {
      x:mouseX,
      y:mouseY
    }
    currentPath.push(point);
  }

  strokeWeight(5);
  noFill();
  stroke("black");

  for(var i = 0;i<drawing.length;i++){
    var path = drawing[i];
    beginShape();
    for(var j = 0;j<path.length;j++){
      vertex(path[j].x,path[j].y);
    }
    endShape();
  }

  form.button.mousePressed(()=>{
    saveDrawing();
  });

  form.button2.mousePressed(()=>{
    clearDrawing();
  });
}

function start(){
  isDrawing = true;
  currentPath = [];
  drawing.push(currentPath);
}

function end(){
  isDrawing = false;
}

function saveDrawing(){
  var ref = database.ref('drawing');
  var data = {
      name:"Avaneesh",
      drawing:drawing
  }
  var result = ref.push(data,dataSent);
  console.log(result.key);

  function dataSent(status){
    console.log(status);
  }
}

function clearDrawing(){
  drawing = [];
  var ref = database.ref('drawing');
  ref.remove();
}