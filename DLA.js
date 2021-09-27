class particle{

  constructor(ta,ty,x,y){
    
    this.a_type = ta;
    this.p_type = ty;
    this.rs = rp;
    this.ra = this.rs;
    this.life_span = 360;
    
    
    this.color =50;
      
    
    
    if(this.p_type === "attractor"){
      this.pos = createVector(x,y);
      this.color = attractor_color;
    }  
    else{
      this.pos = rd_pt_gen();
    }
    
  }// End of Constructor
    
 
  grow_up(){
    this.life_span --;
  }
  
  
  move(){
    
      this.pos.x += random(-step_size,step_size);
      this.pos.y += random(-step_size,step_size);
      
      constraint(this.pos);
    
    
    
  }
  
  show(){
    
    colorMode(HSL);
    noStroke();
    fill(this.color,100,50);
    
    if(this.p_type ==="seeker"){
      
      if(vis){
        ellipse(this.pos.x,this.pos.y,this.rs*2);
        constrain_vis();
      }
    }
    
    else{
      ellipse(this.pos.x,this.pos.y,this.ra*2);
    }
  }
  
  
  
  
  
}//End of Class

function rd_pt_gen() {
   
    let x,y;
    switch(type){
              
      case 1:

        do{
          x = random(-dr2,dr2);
          y = random(-dr2,dr2);
      
        }while(!( x**2 + y**2 > dr1**2 &&  x**2 + y**2 < dr2**2 ));
        
        return(createVector(x,y));
        
        break;
        
        
     case 2:
        
          x = random(-width/2,width/2);
          y = random(height/2-dr1,height/2-dr2);
        
          return(createVector(x,y));
      
          break;    
        
         
      case 3:
        
        do{      
          
          x = random(-width/2+dr1,width/2-dr1);
          y = random(-height/2+dr1,height/2-dr1);
          
        }while(!(x**2 > (width/2-dr2)**2 | y**2 > (height/2-dr2)**2) );
        
        return(createVector(x,y));
        break;
          
        
      case 4:
        
       do{

          x = random(-width/2+dr1,width/2-dr1);
          y = random(-height/2+dr1,height/2-dr1);
         
        }while(!(x**2 + y**2 > (width/2-dr2)**2 && x**2 + y**2 < (width/2-dr1)**2) );
        
        return(createVector(x,y));
        
       break;      
    }
  }   

function constraint(pos){
  
  switch(type){
      
    case 1:
      
      pos.x = constrain(pos.x,-dr2,dr2);
      pos.y = constrain(pos.y,-dr2,dr2);
      break;
      
    case 2:
      
      pos.x = constrain(pos.x,-width/2,width/2);  
      pos.y = constrain(pos.y,height/2 - dr2,height/2);
      break;
      
    case 3:
      
      while(!(pos.x**2 > (width/2-dr2)**2 | pos.y**2 > (height/2-dr2)**2)){
        
        pos.x += random(-step_size,step_size);
        pos.y += random(-step_size,step_size);
          
      }
      break;
      
    case 4:
      
      while(!( pos.x**2 + pos.y**2 > (width/2-dr2)**2 )){

        pos.x += random(-step_size,step_size);
        pos.y += random(-step_size,step_size);
        
      }
      break;
      
      
  } 
}


function constrain_vis(){
  if(con_vis){
    noFill();
    stroke(255);
    rectMode(CENTER);

    switch(type){

      case 1:
        rect(0,0,2*dr2);
        break;

      case 2:
        rect(0,height/2,width,dr2*2);
        break;

      case 3:
        rect(0,0,2*(width/2 - dr2));
        break;

      case 4:
        ellipse(0,0,(width/2-dr2)*2);
        break;

    }
  }
}
