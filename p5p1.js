//Updated p1 code

//p1 update separate classes
let bgColor = 0;
let circleColor = 0;
let squareColor = 0;

particles = [];

// circles + text random move random color
function setup() { 
    createCanvas(600, 400); 
    bgColor = color(random(190), random(20), random(20));
	circleColor = color(random(255), random(255), random(255));
	squareColor = color(random(255), random(255), random(255));

    a1 = new Circles(random(width),(random(height))); 
    a2 = new Circles(random(width),(random(height))); 
    a3 = new Circles(random(width),(random(height))); 

    c1 = new Squares(random(width),(random(height)));
    c2 = new Squares(random(width),(random(height)));
    c3 = new Squares(random(width),(random(height)));
  } 
   
  function draw() { 
    background(bgColor); 

   
    a1.display();  a1.move(); 
    a2.display();  a2.move(); 
    a3.display();  a3.move();   

    c1.display();  c1.move(); 
    c2.display();  c2.move(); 
    c3.display();  c3.move();  

    //density towards bottom/beginning of particles
    for (let i = 0; i < 4; i = i + 1) {
    let p = new Particle();
    particles.push(p);
  }
    //"smoothness" of particle release and quickness start
  for (let i = particles.length - 1; i >= 0; i = i - 1) {
      particles[i].update();
      particles[i].show();
    
        if (particles[i].finished()) {
          particles.splice(i, 0.5);
    }
  }
 } 
   
   
  class Circles{ 
  constructor(tempx,tempy){ 
   
     //circles x 
    this.x=tempx; 
    this.y=tempy;
     
    this.r=40;
    this.xspeed = random(4); 
    this.yspeed = random(4);
      
    this.xdirection = random(3); 
    this.ydirection = random(3);
  } 
   
    display(){ 
        noStroke(); 
        ellipse(this.x, this.y, this.r); 
        fill(circleColor);
        
    } 
    
    move(){ 
   
      this.x = this.x + this.xspeed * this.xdirection 
      this.y = this.y + this.yspeed * this.ydirection 
      
         //bounceback
      if (this.x > width || this.x < 0){
               this.xdirection =- this.xdirection; 
      } 
      if (this.y > height || this.y <0){ 
            this.ydirection =- this.ydirection; 
      } 
  }   
}

class Squares{ 
    constructor(tempc,tempd){ 
     
       //squares c d
      this.c=tempc; 
      this.d=tempd;
      
      this.sqSize = random(20,80);
      this.cspeed= random(4); 
      this.dspeed= random(4);
       
      this.cdirection=random(3); 
      this.ddirection=random(3);
    } 
     
      display(){ 
          noStroke(); 
          square(this.c, this.d, this.sqSize);
          fill(squareColor);

      } 

      move(){ 
     
        this.c = this.c + this.cspeed * this.cdirection 
        this.d = this.d + this.dspeed * this.ddirection       
         
        //bounceback
        if (this.c > width || this.c < 0){
          this.cdirection =- this.cdirection; 
        } 
        if (this.d > height || this.d <0){ 
          this.ddirection =- this.ddirection; 
        } 
    } 
    
  }
class Particle {
  constructor() {
    this.a = random(width); //random emit spanning widith of screen
    this.b = height; //emit spanning height of s
    this.va = random(-2, 1);
    this.vb = random(-5, -1.5);
    this.alpha = 255;
    this.diam = random(10,17);
  }

  finished() {
    return this.alpha < 0;
  }

  update() {
    this.a = this.a + this.va;
    this.b = this.b + this.vb;
    this.alpha = this.alpha - 3;
    this.diam = this.diam - random(0.1, 0.5);
  }

  show() {
    noStroke();
    fill(random(200,230), random(50, 150), 10, this.alpha);
    ellipse(this.a, this.b, this.diam);
  }
}

function keyPressed(){
  if (keyCode === LEFT_ARROW){ 
    bgColor = color(random(130), random(20), random(20));
  }  
  else if (keyCode === UP_ARROW){
    circleColor = color(random(255), random(255), random(255));
  }
   else if (keyCode === DOWN_ARROW){
   squareColor = color(random(255), random(255), random(255));  
    
    
  }
}