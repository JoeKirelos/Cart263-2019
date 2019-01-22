class Food extends Agent{
  constructor(x,y,c,velocityX,velocityY,maxSize,minSize){
    super(x,y,random(minSize,maxSize),c);
    this.maxSize = maxSize;
    this.minSize = minSize;
    this.velocityX = velocityX;
    this.velocityY = velocityY;
  }
  update(){
    this.x += this.velocityX;
    this.y += this.velocityY;
    if(this.x<0){
      this.x+=width;
    }if(this.x>width){
      this.x-=width;
    }
    if(this.y<0){
      this.y+=height;
    }if(this.y>height){
      this.y-=height;
    }
  }
  reset(){
    this.x = random(width);
    this.y = random(height);
    this.velocityX = random(-5,5);
    this.velocityY = random(-5,5);
    this.size = random(this.minSize,this.maxSize);
  }
}
