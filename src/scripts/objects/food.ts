import { CELL_SIZE, DEFAULT_HEIGHT, DEFAULT_WIDTH } from "../game";

export default class Food extends Phaser.GameObjects.Rectangle{
    
    tickDelay: number = 250;
    moveTime: number = 0;

    constructor(scene, x, y){
        super(scene, x, y)  
        let cellPosX = x * CELL_SIZE; 
        let cellPosY = y * CELL_SIZE;
        console.log(' cellPosX : ' + cellPosX );
        this.setPosition(cellPosX,cellPosY);

        scene.add.existing(this)
        this.setOrigin(0,0)
        this.width = CELL_SIZE;
        this.height = CELL_SIZE;
        this.setFillStyle(0xff00ff, 1)
    }  
    randomFoodPosition(){
        const x = Phaser.Math.RND.between(0, DEFAULT_WIDTH / CELL_SIZE - 1) * CELL_SIZE;
        const y = Phaser.Math.RND.between(0, DEFAULT_HEIGHT / CELL_SIZE - 1) * CELL_SIZE;
        this.setPosition(x, y);
    }
    moveFood(time, direction: {x: number, y: number}){

        console.log('food moving',direction.x,direction.y)
        this.x += direction.x * CELL_SIZE
        this.y += direction.y * CELL_SIZE
    }
}