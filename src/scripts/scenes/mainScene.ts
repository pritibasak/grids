import FpsText from '../objects/fpsText'
import Square from '../objects/square';
import Food from '../objects/food';
import Grid from '../objects/grid';
import { CELL_SIZE, DEFAULT_HEIGHT, DEFAULT_WIDTH } from "../game";

export default class MainScene extends Phaser.Scene {
  fpsText: FpsText;
  square: Square;
  food: Food;
  grid: Grid
  direction: {x: number, y: number} = {x: 0, y: 0}
  cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super({ key: 'MainScene' })
  }

  create() {

    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.grid = new Grid(this, 0,0)
    this.food = new Food(this,15,20);
    this.fpsText = new FpsText(this)
    this.square = new Square(this, 0, 0);
  }

  update(time, delta) {
    this.square.nextPos(this.direction)


    if(this.cursorKeys.up.isDown){
      this.direction = {x: 0, y: -1};
    }
    else if(this.cursorKeys.down.isDown){
      this.direction = {x: 0, y: 1};
    }
    else if(this.cursorKeys.left.isDown){
      this.direction = {x: -1, y: 0};
    }
    else if(this.cursorKeys.right.isDown){
      this.direction = {x: 1, y: 0};
    }else{
      // this.direction = {x: 0, y: 0};
    }
    
    if(this.food.x / 15 == this.square.x / 15 && this.food.y / 20 == this.square.y / 20){
      console.log('overlaped')
      /**
       * Now We will move the food along with the snake
       */
 

      let x = this.square.x - this.direction.x * CELL_SIZE;
      let y = this.square.y - this.direction.y * CELL_SIZE; 

      this.food.setPosition(x,y);
      this.food.moveFood(time,this.direction);
    }
    
 
    
    if(time >= this.square.moveTime && this.direction){
      this.square.move(time, this.direction)
    }
  }
}
