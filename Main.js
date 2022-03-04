
function drawArrow(base, vec) {

  push();
  stroke(0,255,250);
  strokeWeight(3);
  fill(0,255,250);
  translate(base.x, base.y);
  line(0, 0, vec.x, vec.y);
  rotate(vec.heading());
  let arrowSize = 2;
  translate(vec.mag() - arrowSize, 0);
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  pop();

}

function rampa (){
  modo = 2;
}
function mouse (){
  modo = 1;
}

function parabola (){
  modo = 3;
}
var modo = 1 ;
var referencia = 0;
var x = 400;
var errorAcumulado = 0 ;
var errorAnterior = 0 ;

let Kps ;
let Kds ;
let Kis ;

var vel = 5;
var aceleracion = 0.1 ;

function setup() {

  createCanvas( 800 , 800 );

  Kps = createSlider(0,100,10);
  Kps.position(10, 10);
  Kds = createSlider(0,100,50);
  Kds.position(10, 30);
  Kis = createSlider(0,100,1);
  Kis.position(10, 50);

  button1 = createButton('Mouse mode');
  button1.position(10, width-30);
  button1.mousePressed(mouse);

  button2 = createButton('Ramp mode');
  button2.position(120, width-30);
  button2.mousePressed(rampa);

  button3 = createButton('parable');
  button3.position(220, width-30);
  button3.mousePressed(parabola);

}

function draw() {
  background(250);
  textSize(15);
  fill(0,255,0);
  text('Kp : '+ Kps.value()/100, 140, 15);
  fill(255,0,0);
  text('Kd : '+ Kds.value()/100, 140, 35);
  fill(0,0,255);
  text('Ki : '+ Kis.value()/100, 140, 55);

  fill(0,0,0);
  strokeWeight(1)

  noFill()
  stroke(1);
  var radioGrande = height-60 ;
  var of = 50 ;
  var y = 100 ;
  line(of,y,width-of,y);
  fill(0)
  fill(0,255,0)

  if (modo == 1 ){
      vel = 5 ;
      aceleracion = 0.1 ;
      referencia = mouseX ;
  }
  if(modo == 2) {
     referencia += vel;
  }

  if(modo == 3){
    vel+= aceleracion ;
    referencia += vel;
  }


  if (x < of){
     x = of
  }
  if (x > width-of){
     x = width-of
  }

  if (referencia < of){
     //referencia = of
     aceleracion*=-1
     vel*=-1
  }
  if (referencia > width-of){
     //referencia = width-of
     aceleracion*=-1
     vel*=-1
  }


  stroke(0)
  line(width/2,height/2,x,y);

  stroke(255,0,0)
  strokeWeight(4)
  line(referencia,y,x,y);

  fill(0,255,0)
  noStroke()
  ellipse(referencia,y,10,10);

  noStroke()
  fill(0)
  ellipse(width/2,height/2,70,70);
  fill(0)
  ellipse(x,y,10,10);
  var a = 20

  //PID

  var Kp = Kps.value()/100;
  var Kd = Kds.value()/100;
  var Ki = Kis.value()/100;

  var actualError = (referencia-x) ;
  var velocidadError = actualError - errorAnterior ;
  errorAcumulado += actualError ;

  var cambio = Kp * actualError + Kd * velocidadError + Ki * errorAcumulado
  var proporcional = Kp * actualError ;
  var velodidad = Kd * velocidadError ;
  var acumulado = Ki * errorAcumulado ;
  errorAnterior = actualError ;

  x += cambio
  drawArrow(createVector(x,y-a),createVector(cambio,0).mult(2))

  fill(0)
  var mult = 50 ;
  fill(0,255,0)
  rect(of,height-200,abs(proporcional)*mult,100)
  fill(255,0,0)
  rect(of+abs(proporcional)*mult,height-200,abs(velodidad)*mult,100)
  fill(0,0,255)
  rect(of+abs(proporcional)*mult+abs(velodidad)*mult,height-200,abs(acumulado)*mult,100)
}
