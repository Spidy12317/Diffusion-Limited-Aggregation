let seeker = [];
let attractor = [];

let rp = 2.5;
let dr1;
let dr2;
let attractor_color;

let sk_size;
let tree_height;
let cp_tree_height;
let max_height;

let type;
let step_size;
let vis = true;
let con_vis;
let var_col;
let seeker_percent = 1;
let speed = 1;
let stickness = 1;
let continunity;

let can;
let a_opt;
let button;
let togg_opt = [];
let slider_opt = [];
let continunity_opt = [];

function setup() {

  can = createCanvas(400, 400);
  can.parent("#canvas");
  
  a_opt = document.getElementsByName('btnradio');
  button = selectAll(".check");
  
  togg_opt.push(select('#btncheck1'));
  togg_opt.push(select('#btncheck2'));
  togg_opt.push(select('#btncheck3'));
  
  slider_opt = selectAll(".slider");
  slider_opt.push(createSlider(rp,4*rp,rp));
  slider_opt[(slider_opt.length-1)].parent("step_size");
  
  continunity_opt.push(select("#start"));
  continunity_opt.push(select("#pause"));
  
  step_size = slider_opt[(slider_opt.length-1)].value();
  // find_type();
  noLoop();

}

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}


function find_type(){
  
  for(i = 0; i < a_opt.length; i++) {
    
    if(a_opt[i].checked){
      return(a_opt[i].value);
      break;
    }
  }
}

function able(f){
  
  if(f==0){
    
    for(let i=0;i<button.length;i++){
      button[i].attribute('disabled', '');
    }
    continunity_opt[1].removeAttribute('disabled');

    
  }
  else{
      for(let i=0;i<button.length;i++){
        button[i].removeAttribute('disabled');
      }
      if(continunity_opt[1].checked()){
          document.getElementById("pause").click();
      }
      continunity_opt[1].attribute('disabled', '');
    
  }
}

function draw() {
  
  colorMode(RGB);
  background(0);
  translate(width/2,height/2);
  
  for (let t = 0; t < speed; t++){
    
    for(let i = seeker.length-1; i >=0; i--){
      
      seeker[i].move();
      check_col(i);
      
    }
  }
  
  let limit = max(seeker.length,attractor.length);
  
  for(let j = 0; j < limit; j++){

    if(j < seeker.length){      
      seeker[j].show();    
    }
    
    if(j < attractor.length){
      attractor[j].show();    
    }
  }
  
  
  
  
  terminator();
  
  continunity_opt[0].mouseClicked(start_stop);
  continunity_opt[1].mouseClicked(pause_play);
  
  par_regen()
  
}

function par_regen(){
  
  while(seeker.length < sk_size){
    
    seeker_gen(sk_size - seeker.length);
    
  }  
}

function pause_play(){
  
  if(continunity_opt[1].checked()){
    
    select("#ps").html("Play");
    noLoop();  
    
  }
  else{ 
    
    select("#ps").html("Pause");
    loop();
    
  }
}


function start_stop(){
  
  if(continunity_opt[0].checked()){
    stop();  
  }
  else{ 
    start();
  }
}


function seeker_gen(n){
  
  for(let i =0; i < n; i++){
    seeker.push(new particle(type,"seeker"));  
  }  
}

function attractor_gen(){
  
  switch(type){
      
    case 1:
      attractor.push(new particle(type,"attractor"));
      max_height = (height/2)**2;
      break;
      
    case 2:
      for(let i = -width/2; i<= width/2; i += 2*rp){
        attractor.push(new particle(type,"attractor",i,height/2));
      }
      max_height = height;
      break;
      
    case 3:
      for(let i = -width/2; i<= width/2; i += 2*rp){
        attractor.push(new particle(type,"attractor",i,height/2));
      }
      for(let i = -width/2; i<= width/2; i += 2*rp){
        attractor.push(new particle(type,"attractor",i,-height/2));
      }
      for(let i = -height/2; i<= height/2; i += 2*rp){
        attractor.push(new particle(type,"attractor",width/2,i));
      }
      for(let i = -height/2; i<= height/2; i += 2*rp){
        attractor.push(new particle(type,"attractor",-width/2,i));
      }
      max_height = 0.85*(height/2);
      break;
      
    case 4:
      let n = Math.ceil(PI*width/(2*rp));
      let theta = 360/n;
      let con = theta;
      
      for(let i = 0;i<n;i++){
        attractor.push(new particle(type,"attractor",width*Math.cos(radians(theta))/2,width*Math.sin(radians(theta))/2));
        theta += con; 
      }
      max_height = 0.85*(height/2);
      break;    
  }
  
}

function dis(a){
  
  switch (type){
      
    case 1:
      return( a.pos.x**2 + a.pos.y**2 );  
      
    case 2:
      return(width/2 - a.pos.y);
    
    case 3:
      return((width/2) - (a.pos.x**2 + a.pos.y**2)**0.5 );
    
    case 4:
      return( (width/2 +rp) - (a.pos.x**2 + a.pos.y**2)**0.5 );
      
  }
}

async function stop(){
  
  
  able(1);
  select("#st").html("Start");
  
      document.getElementById("btncheck1").click();

  if(togg_opt[0].checked()){
    
    stop();
  }
    
  noLoop();
  
  await sleep(10);

  attractor.splice(0,attractor.length);
  seeker.splice(0,seeker.length);
  document.getElementById("btncheck1").click();
}


function start(){
  type = int(find_type());
  able(0);
  select("#st").html("Stop");  
  dr1 = 2*rp + 1*(2*rp);
  dr2 =  dr1 + 1.5*(2*rp);
  attractor_color = 17;
  
  sk_size = 28;
  tree_height = 0;
  cp_tree_height = tree_height;
  max_height = 0;
  
  attractor_gen();
  seeker_gen(sk_size);
  loop();
  
}

async function terminator(){
  
    
    switch(type){

      case 1:

        if(tree_height>(max_height)){
          break;
        }
        else{return;}
        break;


      case 2:
        if(tree_height >max_height){
          break;
        }
        else{return;}

      case 3:
        if(tree_height > max_height){
          break;
        }
        else{return};

      case 4:
        if(tree_height > max_height){
          break;
        }
        else{return};
    }
             
             
  document.getElementById("btncheck1").click();
             
  if(togg_opt[0].checked()){
    
    document.getElementById("start").click();

  }
  

}

  


function check_col(n){
  
  let len = attractor.length,attractor_height;  
  
  for(let i = len-1; i >= 0; i--){
    
    if( (attractor[i].pos.x - seeker[n].pos.x)**2 + (attractor[i].pos.y - seeker[n].pos.y)**2 < (attractor[i].ra + seeker[n].rs)**2){
      
      if(random(0,1)<stickness){
      
        attractor.push(seeker.splice(n,1)[0]);
        attractor[len].p_type = "attractor";
        attractor_height = dis(attractor[len]);

        if(var_col){
          attractor[len].color = (map(attractor_height,0,max_height,15,300));

        }
        else{
          attractor[len].color = attractor_color;
        }

        tree_height = max(tree_height,attractor_height);
        update();      
      }
      return;
    }
  }
}

function update(){
  
  vis = togg_opt[0].checked();
  con_vis = togg_opt[1].checked();
  var_col = togg_opt[2].checked();
  
  step_size = slider_opt[(slider_opt.length-1)].value();  
  seeker_percent = slider_opt[3].value();
  stickness = slider_opt[2].value();
  speed = slider_opt[1].value();
  rp = slider_opt[0].value();
  
  switch(type){
      
    case 1:
      if(cp_tree_height!= tree_height && dr2 < max_height**0.5){

        if(100*(sk_size-seeker.length)/sk_size >= seeker_percent){

          cp_tree_height = tree_height;
          dr1 = (tree_height)**0.5 + 1*(2*rp);
          dr2 = dr1                + 1.5*(2*rp);
          sk_size = Math.floor(4*dr2/rp);
          par_regen();
        }  
      }break;
      
      
    case 2:
      if(cp_tree_height!= tree_height && dr2 < max_height){

        if(100*(sk_size-seeker.length)/sk_size >= seeker_percent){
          
          cp_tree_height = tree_height;
          dr1 = (tree_height) + 1*(2*rp);
          dr2 = dr1                + 2*(2*rp);
          sk_size = Math.floor(width/(2*rp));    
          par_regen();
        }
    }break;
    
    case 3:
      
      if(cp_tree_height!= tree_height && dr2 < max_height ){

        if(100*(sk_size-seeker.length)/sk_size >= seeker_percent){
          
          cp_tree_height = tree_height;
          dr1 = (tree_height) + 2*(2*rp);
          dr2 = dr1                + 4*(2*rp);
          sk_size = Math.floor(4*(width/2 - dr2)/(2*rp));
          par_regen();
        }

      }break;
    
    case 4:
      if(cp_tree_height!= tree_height && dr2 < max_height ){

        if(100*(sk_size-seeker.length)/sk_size >= seeker_percent){

          cp_tree_height = tree_height;
          dr1 = (tree_height) + 1*(2*rp);
          dr2 = dr1                + 1.5*(2*rp);
          sk_size = Math.floor(4*dr2/rp);
          par_regen();
        }  
      }break;
      
  }
}
