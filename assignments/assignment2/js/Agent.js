class Agent{
  constructor(x,y,size,c){
    this.x= x;
    this.y = y;
    this.size = size;
    this.color = c;
    this.active = true;
  }
  update(){

  }
  display(){
    if(this.active){
      push();
      fill(this.color);
      noStroke();
      ellipse(this.x,this.y,this.size,this.size);
      pop();
    }
  }
  overlap(agent){
    if(this.active){
      let space = dist(this.x,this.y,agent.x,agent.y)
      if(space < this.size/2 + agent.size/2){
        return true;
      }
      else {
        return false;
      }
    }
  }
}
