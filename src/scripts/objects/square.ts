import { CELL_SIZE, DEFAULT_HEIGHT, DEFAULT_WIDTH } from "../game";

// let body = [];
let body;
export default class Square extends Phaser.GameObjects.Rectangle{
    
    tickDelay: number = 250;
    moveTime: number = 0;

    constructor(scene, x, y){
        super(scene, x, y)
        scene.add.existing(this)
        this.setOrigin(0,0) 
        this.width = CELL_SIZE;
        this.height = CELL_SIZE;
        this.setFillStyle(0x0000ff, 1)
    }
    setBodyArray(bodyArray){
        body = bodyArray;
        console.log('body;;;;;',this);
        
        body[0] = this;
    }
    public move(time, direction: {x: number, y: number},headDirection: {x: number, y: number},_leftright,_upDown,_bool){
        // console.log('dir :---- ',_leftright,_upDown)
        // console.log('_bool :---- ',_bool)
          
        // if(body.length > 1){
            for (let i = body.length - 1; i > 0; i--) { 
            body[i].x = body[i - 1].x ;
            body[i].y = body[i - 1].y ;
            }
        // }
       
  




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
    grow(){
        const newPart = this.scene.add.rectangle(-CELL_SIZE, -CELL_SIZE, CELL_SIZE, CELL_SIZE, 0x00ff00).setOrigin(0);
        body.push(newPart); 
    }
    public nextPos(direction: {x: number, y: number}){
        let x = this.x + direction.x * CELL_SIZE;
        let y = this.y + direction.y * CELL_SIZE; 

        console.log('x----->',direction.x,direction.y) 
        if(x > DEFAULT_WIDTH){
            x = 0
        }

        if(y > DEFAULT_HEIGHT){
            y = 0
        }

        if(x < 0) {
            x = DEFAULT_WIDTH-CELL_SIZE
        }

        if(y < 0){
            y = DEFAULT_HEIGHT-CELL_SIZE
        }

        return {x, y}

    }

    public moveTo(time: number, x: number,y: number){
        this.x = x;
        this.y = y;
    }
}