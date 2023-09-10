import FpsText from '../objects/fpsText'
import Square from '../objects/square';
import Food from '../objects/food';
import Grid from '../objects/grid';
import { CELL_SIZE, DEFAULT_HEIGHT, DEFAULT_WIDTH } from "../game";

let body = [];  
export default class MainScene extends Phaser.Scene {
  fpsText: FpsText;
  square: Square;
  food: Food;
  grid: Grid
  headDirection : {x: number, y: number} = {x:0, y:-1};
  direction: {x: number, y: number} = {x: 0, y: -1}
  cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super({ key: 'MainScene' })
  }

  create() {

    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.grid = new Grid(this, 0,0)
    this.food = new Food(this,15,20);
    this.fpsText = new FpsText(this)
    this.square = new Square(this, 10, 9);
    this.square.setBodyArray(body)
  } 
  update(time, delta) {  

    /**
     * food eat logic by the snake and repositioned the food
     * and grow the snake
     */
    if(this.food.x == this.square.x && this.food.y  == this.square.y  ){ 
      this.food.randomFoodPosition();
      this.square.grow();
    }

  /**
   * here I block direction if snake is moving up then it can not move to down immediately it has to move left or right 
   * first to move down same for other directions
   */
    if(this.cursorKeys.up.isDown){ 
      if(this.direction.y ! = 1){
        this.direction = {x: 0, y: -1};
      }
    }
    else if(this.cursorKeys.down.isDown){ 
      if (this.direction.y !== -1){
        this.direction = {x: 0, y: 1}; 
      }
    }
    else if(this.cursorKeys.left.isDown){  
      if (this.direction.x !== 1){
        this.direction = {x: -1, y: 0};
      }
    }
    else if(this.cursorKeys.right.isDown){  
      if (this.direction.x !== -1) {
        this.direction = {x: 1, y: 0};
      }
    } else{
      // this.direction = {x: 0, y: 0};
    } 
  
    /**
     * by the help of the boolean its throwng from square class whenever 
     * it overlapped with other elements of the array made game over logic
     * and restarted the scene again
     */
    if (this.square.isGameOver()) { 
      console.log("Game over!"); 
      this.scene.restart();
  }
    
    
    if(time >= this.square.moveTime && this.direction){
      this.square.move(time, this.direction)
    }
  }
}
