import { CELL_SIZE, DEFAULT_HEIGHT, DEFAULT_WIDTH } from "../game"; 
let body;
export default class Square extends Phaser.GameObjects.Rectangle{
    
    tickDelay: number = 250;
    moveTime: number = 0;

    constructor(scene, x, y){
        super(scene, x, y)
        scene.add.existing(this);
        this.randomSnakePosition();
        this.setOrigin(0,0) 
        this.width = CELL_SIZE;
        this.height = CELL_SIZE;
        this.setFillStyle(0x0000ff, 1)
    }

    /**
     * snake random position
     */
    randomSnakePosition(){
        const x = Phaser.Math.RND.between(0, DEFAULT_WIDTH / CELL_SIZE - 1) * CELL_SIZE;
        const y = Phaser.Math.RND.between(0, DEFAULT_HEIGHT / CELL_SIZE - 1) * CELL_SIZE;
 
        this.setPosition(x, y);
    }

    /**
     *  adding square object to a array
     */
    setBodyArray(bodyArray){
        body = bodyArray; 
        body[0] = this;
    }

    /**
     * here I am moving the snake by the mean of an array
     */
    public move(time, direction: {x: number, y: number}){ 
        for (let i = body.length - 1; i > 0; i--) { 
            body[i].x = body[i - 1].x ;
            body[i].y = body[i - 1].y ;
        } 

        body[0].x += direction.x * CELL_SIZE
        body[0].y += direction.y * CELL_SIZE 
       
        if(body[0].x > DEFAULT_WIDTH){
            body[0].x = 0
        }

        if(body[0].y > DEFAULT_HEIGHT){
            body[0].y = 0
        }

        if(body[0].x < 0) {
            body[0].x = DEFAULT_WIDTH-CELL_SIZE
        }

        if(body[0].y < 0){
            body[0].y = DEFAULT_HEIGHT-CELL_SIZE
        } 


        this.moveTime = time + this.tickDelay;
    }

    /*
     * Here I am checking if the head i.e. body[0] 's position X and Y matches the postion of 
     * any other member of the array then returning a boolean by true which is by default false
     */
    public isGameOver() {
        // Check if the snake collides with itself
        for (let i = 1; i < body.length; i++) {
            if (body[i].x === body[0].x && body[i].y === body[0].y) {
                return true;
            }
        } 
        return false;
    }
    /**
     * here I am adding a rectangle just behind the snake of same color of food
     * just to give a feel that snake is actually eating the food
     * and every time snake eating a food tickDelay reduces by 5 for speed up the game
     */
    grow(){ 
        const newPart = this.scene.add.rectangle(-CELL_SIZE, -CELL_SIZE, CELL_SIZE, CELL_SIZE, 0xff00ff).setOrigin(0);
        body.push(newPart);  
        this.tickDelay -= 5;
    } 
    // public nextPos(direction: {x: number, y: number}){
    //     let x = this.x + direction.x * CELL_SIZE;
    //     let y = this.y + direction.y * CELL_SIZE; 

    //     console.log('x----->',direction.x,direction.y) 
    //     if(x > DEFAULT_WIDTH){
    //         x = 0
    //     }

    //     if(y > DEFAULT_HEIGHT){
    //         y = 0
    //     }

    //     if(x < 0) {
    //         x = DEFAULT_WIDTH-CELL_SIZE
    //     }

    //     if(y < 0){
    //         y = DEFAULT_HEIGHT-CELL_SIZE
    //     }

    //     return {x, y}
    // }  

    public moveTo(time: number, x: number,y: number){
        this.x = x;
        this.y = y;
    }
}