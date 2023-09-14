import FpsText from '../objects/fpsText'
import Square from '../objects/square'
import Grid from '../objects/grid'
import { CELL_SIZE, DEFAULT_HEIGHT, DEFAULT_WIDTH } from '../game'
export default class MainScene extends Phaser.Scene {
  fpsText: FpsText
  square: Square
  //head: Square
  //tail: Square
  food: Square
  grid: Grid
  snakeArray: Square[] = []
  direction: { x: number; y: number } = { x: 0, y: 0 }
  cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys
  foodConsumed: boolean = false
 
  constructor() {
    super({ key: 'MainScene' })
  }

  create() {
    this.cursorKeys = this.input.keyboard.createCursorKeys()
    this.grid = new Grid(this, 0, 0)
    this.fpsText = new FpsText(this)
    this.square = new Square(this, 0, 0, 0x0000ff)
    this.snakeArray.push(this.square)
    //this.head=this.square;
    //this.tail=this.square;
    this.food = new Square(
      this,
      Math.floor(Math.random() * (DEFAULT_WIDTH / CELL_SIZE)) * CELL_SIZE,
      Math.floor(Math.random() * (DEFAULT_HEIGHT / CELL_SIZE)) * CELL_SIZE,
      0xff0000
    )
  }

  update(time, delta) {
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
    } 

    if (time >= this.square.moveTime && this.direction) {
        this.square.move(time, this.direction,this.snakeArray)
    }

  this.snakeArray.forEach(square => {
    if 
    ( square.x === this.food.x && square.y=== this.food.y ) {
    this.foodConsumed = true;
    //setting next random position of the food on the grid
    this.food.setPosition(
      Math.floor(Math.random() * (DEFAULT_WIDTH / CELL_SIZE)) * CELL_SIZE,
      Math.floor(Math.random() * (DEFAULT_HEIGHT / CELL_SIZE)) * CELL_SIZE
    )
    console.log('Food Consumed')
    if (this.foodConsumed) {
      const newSquare = new Square(this, -50, -50, 0x00ff00) //newSquare created as a new part of the body
      //added the square at (-50,-50) ie out the screen posiition because otherwise for a fraction of second 
      /*when new square was getting created it was appearing for a fraction of second 
      before getting added with the snakearray and repositioning in move() function 
      this.snakeArray.push(newSquare);//inserting the square at the end of the array*/
      this.foodConsumed=false;
    }
  }
})
}

}
