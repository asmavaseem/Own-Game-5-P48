class Item{
    constructor(x,y){
        this.body = Bodies.rectangle(x,y,10,10);
        World.add(world,this.body);
    }
}