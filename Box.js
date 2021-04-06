class Box{
    constructor(x,y,width,height){
        var options={
            isStatic: true
        }
        this.body = Bodies.rectangle(x,y,width,height,options);
        this.width = width;
        this.height = height;
        this.Visiblity = 255;
        this.image = loadImage("Lucky Box.png");
        World.add(world,this.body);
    }
    display(){
        var pos = this.body.position;
        push()
        imageMode(CENTER);
        image(this.image, pos.x, pos.y, this.width + 20, this.height);
        pop();
    }
    
}