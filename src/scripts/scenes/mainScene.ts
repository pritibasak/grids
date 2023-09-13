import FpsText from '../objects/fpsText'
import Square from '../objects/square'
import Grid from '../objects/grid'
import { CELL_SIZE, DEFAULT_HEIGHT, DEFAULT_WIDTH } from '../game'

export default class MainScene extends Phaser.Scene {
  fpsText: FpsText
  square: Square
  food: Square
  grid: Grid
  snakeArray: Square[] = []
  direction: { x: number; y: number } = { x: 0, y: 0 }
  cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys
  foodConsumed: boolean = false
  directionName: string
 
  constructor() {
    super({ key: 'MainScene' })
  }

  create() {
    this.cursorKeys = this.input.keyboard.createCursorKeys()
    this.grid = new Grid(this, 0, 0)
    this.fpsText = new FpsText(this)
    this.square = new Square(this, 0, 0, 0x0000ff)
    this.snakeArray.push(this.square)
    this.food = new Square(
      this,
      Math.floor(Math.random() * (DEFAULT_WIDTH / CELL_SIZE)) * CELL_SIZE,
      Math.floor(Math.random() * (DEFAULT_HEIGHT / CELL_SIZE)) * CELL_SIZE,
      0xff0000
    )
  }

  update(time, delta) {
    if (this.cursorKeys.up.isDown) {
      if (this.directionName==='left')
      this.snakeTurn(+40);
      
      if (this.directionName==='right')
      this.snakeTurn(-40);
      
      this.direction = { x: 0, y: -1 }
      this.directionName = 'up'
    } 
    else if (this.cursorKeys.down.isDown) {
      if (this.directionName==='left')
      this.snakeTurn(-40); 

      if (this.directionName==='right')
      this.snakeTurn(+40);

      this.direction = { x: 0, y: 1 }
      this.directionName = 'down'
    } 
    else if (this.cursorKeys.left.isDown) {
     if (this.directionName==='up')
     {
     for(let i=1;i<this.snakeArray.length;i++)
     {this.snakeArray[i].x= this.snakeArray[i-1].x+40;
      this.snakeArray[i].y=this.snakeArray[i-1].y;
     }
     }

     if (this.directionName==='down')
     {
     for(let i=1;i<this.snakeArray.length;i++)
     {this.snakeArray[i].x= this.snakeArray[i-1].x-40;
      this.snakeArray[i].y=this.snakeArray[i-1].y;
     }
     }
      this.direction = { x: -1, y: 0 }
      this.directionName = 'left'
    } 
    else if (this.cursorKeys.right.isDown) {
      if (this.directionName==='up')
      {
      for(let i=1;i<this.snakeArray.length;i++)
      {this.snakeArray[i].x= this.snakeArray[i-1].x-40;
      this.snakeArray[i].y=this.snakeArray[i-1].y;
      }
      }
 
      if (this.directionName==='down')
      {
      for(let i=1;i<this.snakeArray.length;i++)
      {this.snakeArray[i].x= this.snakeArray[i-1].x+40;
      this.snakeArray[i].y=this.snakeArray[i-1].y;
      }
      }
      this.direction = { x: 1, y: 0 }
      this.directionName = 'right'
    } 

    if (time >= this.square.moveTime && this.direction) {
      this.snakeArray.forEach(square => {
        square.move(time, this.direction)
      })
    }

  this.snakeArray.forEach(square => {
    if 
    ( square.x === this.food.x && square.y=== this.food.y ) {
    this.foodConsumed = true
    this.food.setPosition(
      Math.floor(Math.random() * (DEFAULT_WIDTH / CELL_SIZE)) * CELL_SIZE,
      Math.floor(Math.random() * (DEFAULT_HEIGHT / CELL_SIZE)) * CELL_SIZE
    )
    console.log('Reached')
    if (this.foodConsumed) {
      //let color=[0x0000ff,]
      const newSquare = new Square(this, 0, 0, 0x0000ff)
      if (this.directionName === 'down') {
        newSquare.x = square.x
        newSquare.y = square.y+ 40;
      }
      if (this.directionName === 'up') {
        newSquare.x = square.x
        newSquare.y = square.y - 40;
      }
      if (this.directionName === 'left') {
        newSquare.x = square.x-40
        newSquare.y = square.y ;
      }
      if (this.directionName === 'right') {
        newSquare.x = square.x+40
        newSquare.y = square.y ;
      }

      this.snakeArray.push(newSquare)
      console.log(this.snakeArray.length)
      this.foodConsumed = false
    }
  }
})
}

snakeTurn(c:number)
{
  for(let i=1;i<this.snakeArray.length;i++)
  {this.snakeArray[i].y= this.snakeArray[i-1].y+c;
   this.snakeArray[i].x=this.snakeArray[i-1].x;
  }
}
}
