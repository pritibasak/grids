import { CELL_SIZE, DEFAULT_HEIGHT, DEFAULT_WIDTH } from "../game";

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

    public move(time, direction: {x: number, y: number},headDirection: {x: number, y: number}){
        this.x += direction.x * CELL_SIZE
        this.y += direction.y * CELL_SIZE
        console.log('dir :---- ',direction.x,direction.y)

        if(direction.x == 0 && direction.y == 0)
        { 

        }
        else{
            console.log('non zero')

            // if()s
        }


        // if(direction.x == 0 && direction.y == -1 ||
        //   direction.x == 0 && direction.y == 1) {
        //   headDirection.x = -1;
        //   headDirection.y = 0; 

        //   this.x += headDirection.x * CELL_SIZE
        //   this.y += headDirection.y * CELL_SIZE
        // }
        // else if(direction.x == 0 && direction.y == -1 ||
        //   direction.x == 0 && direction.y == 1){
        //   headDirection.x = 1;
        //   headDirection.y = 0; 

        //   this.x += headDirection.x * CELL_SIZE
        //   this.y += headDirection.y * CELL_SIZE
        // } 
        // else if(direction.x == -1 && direction.y == 0 ||
        //   direction.x == 1 && direction.y == 0){
        //   headDirection.x = 0; 
        //   headDirection.y = -1; 

        //   this.x += headDirection.x * CELL_SIZE
        //   this.y += headDirection.y * CELL_SIZE
        // } 
        // else if(direction.x == -1 && direction.y == 0 ||
        //   direction.x == 1 && direction.y == 0){
        //   headDirection.x = 0;
        //   headDirection.y = 1; 

        //   this.x += headDirection.x * CELL_SIZE
        //   this.y += headDirection.y * CELL_SIZE
        // }
        // else{
        //     this.x += direction.x * CELL_SIZE
        //     this.y += direction.y * CELL_SIZE
        // }







        if(this.x > DEFAULT_WIDTH){
            this.x = 0
        }

        if(this.y > DEFAULT_HEIGHT){
            this.y = 0
        }

        if(this.x < 0) {
            this.x = DEFAULT_WIDTH-CELL_SIZE
        }

        if(this.y < 0){
            this.y = DEFAULT_HEIGHT-CELL_SIZE
        }

        this.moveTime = time + this.tickDelay;
    }
    // faceLeft(direction: {x: number, y: number}){
    //     console.log('dir : ', this.direction)
    //     if(this.direction.x == 0 && this.direction.y == -1 ||
    //       this.direction.x == 0 && this.direction.y == 1){
    //       this.headDirection.x = -1;
    //       this.headDirection.y = 0;
    //       // return this.headDirection;
    //     }
    //   }
    //   faceRight(direction: {x: number, y: number}){
    //     if(this.direction.x == 0 && this.direction.y == -1 ||
    //       this.direction.x == 0 && this.direction.y == 1){
    //       this.headDirection.x = 1;
    //       this.headDirection.y = 0;
    //       // return this.headDirection;
    //     }
    //   }
    //   faceUp(direction: {x: number, y: number}){
    //     if(this.direction.x == -1 && this.direction.y == 0 ||
    //       this.direction.x == 1 && this.direction.y == 0){
    //       this.headDirection.x = 0; 
    //       this.headDirection.y = -1;
    //       // return this.headDirection;
    //     }
    //   }
    //   faceDown(direction: {x: number, y: number}){
    //     if(this.direction.x == -1 && this.direction.y == 0 ||
    //       this.direction.x == 1 && this.direction.y == 0){
    //       this.headDirection.x = 0;
    //       this.headDirection.y = 1;
    //       this.direction = {x:this.headDirection.x,y:this.headDirection.y}
    //       // return this.headDirection;
    //     }
    //   }
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