//waves
var wavesQu = 20;
var yoff = []; 
var offset = []; 
var offsetDist = 30;

var boats = [];

function setup() {
  createCanvas(800, 500);
  
  //water
  for(var a = 0; a <= wavesQu; a = a + 1) {
    offset[a] = a * offsetDist;
    yoff[a] = random(50);
	}
  
  // colors
  colorWaves = color (random (10,90), random (80,120), random (150,200), (20,50)); 
  colorBoats = color(140, 85, 20);
  colorSails = color(220);
  colorBg = color(0,30,70)
  
}

function draw() {
	background (colorBg); 
  
  //sky + its color 
    cSk1 = color(0, 16, 18, 150);
	cSk2 = color(4, 60, 66, 5);	
	sky(0, 0, width, height/2, cSk1, cSk2);
  
  //waves 
	fill(colorWaves); 
	for(var a = 0; a < wavesQu; a = a + 1) {
		noiseWave(yoff[a], offset[a]);
		yoff[a] += 0.0055; // Increment y_dimension for noise
      
	}
  
  //boats
  for (let b = 0; b < boats.length; b = b + 1) {
    boats[b].fly();
    boats[b].display();
  } 
}


function sky(x, y, w, h, c1, c2) {
	noFill();
  for (var sk = y; sk <= y + h; sk = sk + 1) {
      var inter = map(sk, y, y + h, 0, 1);
      var cSky = lerpColor(c1, c2, inter);
      stroke(cSky);
      line(x, sk, x + w, sk);
  }
}

//waves
function noiseWave(yoff, offset) {
  beginShape();
    this.xoff = 0;
    for (var x = 0; x <= width; x = x + 12) {  
      this.y = map(noise(this.xoff, yoff), 0, 1, height / 4  + offset, height/2 + offset);   
      vertex(x, this.y); 
      xoff += 0.05;
    }
    vertex(width * 3, height);
    vertex(-width * 3, height);
  endShape(CLOSE);
}

class Boat {
  constructor(e, f) {
    this.e = e;
    this.f = random(height * 0.05, height * 0.4);
  }
  
  fly() {
    this.e = this.e + 0.85;
    this.f = this.f + -0.2;
  }

  display() {
    {
      //bottom
      fill(colorBoats);
      quad(this.e, -5 + this.f, this.e + 5, this.f, this.e + 30, this.f, this.e + 40, -5 + this.f) 
      //sail
       fill(colorSails);
      triangle(this.e + 8, -25 + this.f, this.e + 10, -4 + this.f, this.e + 30, -4 + this.f);
    }
  }
}

function mousePressed() {
  let b = new Boat(-15, random(0,height));
  boats.push(b);
}

function keyPressed(){
  if (keyCode === LEFT_ARROW){ 
  colorWaves = color (random (10,90), random (90,160), random (90,190), (10,50)); 
  }  else if (keyCode === UP_ARROW){
    colorBoats = color (random (100,255), random (50,130), random (50,130));
  }else if (keyCode === RIGHT_ARROW){
    colorBg = color (random (10,50), random (10,50), random (40,110));
}
}