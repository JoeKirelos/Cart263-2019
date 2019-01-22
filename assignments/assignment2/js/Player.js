class Player extends Agent{
  constructor(x,y,size,c,loss){
    super(x,y,size,c);
    this.maxSize = size;
    this.loss = loss;
  }
  update(){
    this.x = mouseX;
    this.y = mouseY;
    this.size-=this.loss;
    this.size = constrain(this.size,0,this.maxSize);
    if(this.size<1){
      this.active=false;
    }
  }
  eat(meal){
    this.size+= meal.size;
  }
}
