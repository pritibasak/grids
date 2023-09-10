import FpsText from '../objects/fpsText'
import Square from '../objects/square';
import Food from '../objects/food';
import Grid from '../objects/grid';
import { CELL_SIZE, DEFAULT_HEIGHT, DEFAULT_WIDTH } from "../game";

let body = [];
let leftRightSideArray = [
  {x:-1, y:0},     // for left or right
  {x:1, y:0}
];
let upDownSideArray = [
  {x:0, y:-1},
  {x:0, y:1}        //for up and down
];
let isPressed = false;
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

  // faceLeft(direction: {x: number, y: number}){
  //   console.log('dir : ', this.direction)
  //   if(this.direction.x == 0 && this.direction.y == -1 ||
  //     this.direction.x == 0 && this.direction.y == 1){
  //     this.headDirection.x = -1;
  //     this.headDirection.y = 0;
  //     // return this.headDirection;
  //   }
  // }
  // faceRight(direction: {x: number, y: number}){
  //   if(this.direction.x == 0 && this.direction.y == -1 ||
  //     this.direction.x == 0 && this.direction.y == 1){
  //     this.headDirection.x = 1;
  //     this.headDirection.y = 0;
  //     // return this.headDirection;
  //   }
  // }
  // faceUp(direction: {x: number, y: number}){
  //   if(this.direction.x == -1 && this.direction.y == 0 ||
  //     this.direction.x == 1 && this.direction.y == 0){
  //     this.headDirection.x = 0; 
  //     this.headDirection.y = -1;
  //     // return this.headDirection;
  //   }
  // }
  // faceDown(direction: {x: number, y: number}){
  //   if(this.direction.x == -1 && this.direction.y == 0 ||
  //     this.direction.x == 1 && this.direction.y == 0){
  //     this.headDirection.x = 0;
  //     this.headDirection.y = 1;
  //     this.direction = {x:this.headDirection.x,y:this.headDirection.y}
  //     // return this.headDirection;
  //   }
  // }
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
    
    
 
    
    if(time >= this.square.moveTime && this.direction){
      this.square.move(time, this.direction, this.headDirection,leftRightSideArray,upDownSideArray,isPressed)
    }
  }
}
