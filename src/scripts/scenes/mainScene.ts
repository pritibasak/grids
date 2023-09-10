import FpsText from '../objects/fpsText'
import Square from '../objects/square';
import Food from '../objects/food';
import Grid from '../objects/grid';
import { CELL_SIZE, DEFAULT_HEIGHT, DEFAULT_WIDTH } from "../game";

let body = [];
let isIntersected = false;
let leftRightSideArray = [
  {x:-1, y:0},     // for left or right
  {x:1, y:0}
];
let upDownSideArray = [
  {x:0, y:-1},
  {x:0, y:1}        //for up and down
];
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
    this.square = new Square(this, 0, 0);
    this.square.setBodyArray(body)
  } 
  update(time, delta) {  
    if(this.food.x / 15 == this.square.x / 15 && this.food.y / 20 == this.square.y / 20){
      console.log('overlaped')
      this.food.randomFoodPosition();
      this.square.grow();
    }
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
    this.square.CollisionByItself(isIntersected);
    if(isIntersected){
      this.scene.restart();
    }
    
    if(time >= this.square.moveTime && this.direction){
      this.square.move(time, this.direction)
    }
  }
}
