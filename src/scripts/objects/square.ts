import { CELL_SIZE, DEFAULT_HEIGHT, DEFAULT_WIDTH } from "../game";

export default class Square extends Phaser.GameObjects.Rectangle{
    
    tickDelay: number = 250;
    moveTime: number = 0;

    constructor(scene, x, y,color){
        super(scene, x, y)
        scene.add.existing(this)
        this.setOrigin(0,0)
        this.width = CELL_SIZE;
        this.height = CELL_SIZE;
        this.setFillStyle(color, 1)
    }
//A new parameter snake array added because after growing the snake body, whole body needs to move instead of one square
//Also the snake body needs to be repositioned for each grow
    public move(time, direction: {x: number, y: number},snake : Square[])
    {
         for (let i = snake.length - 1; i > 0; i--) { 
            snake[i].x = snake[i - 1].x ;
            snake[i].y = snake[i - 1].y ;
        } 

        snake[0].x += direction.x * CELL_SIZE
        snake[0].y += direction.y * CELL_SIZE 

        /*to wrap the snake around the screen, so when the snake
        goes off any of the sides of the screen it re-appears*/
       
        if(snake[0].x > DEFAULT_WIDTH){
            snake[0].x = 0
        }

        if(snake[0].y > DEFAULT_HEIGHT){
            snake[0].y = 0
        }

        if(snake[0].x < 0) {
            snake[0].x = DEFAULT_WIDTH-CELL_SIZE
        }

        if(snake[0].y < 0){
            snake[0].y = DEFAULT_HEIGHT-CELL_SIZE
        } 
 
        this.moveTime = time + this.tickDelay;
    }
}