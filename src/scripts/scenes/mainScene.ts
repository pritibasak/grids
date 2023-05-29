import FpsText from '../objects/fpsText'
import Square from '../objects/square';
import Grid from '../objects/grid';

export default class MainScene extends Phaser.Scene {
  fpsText: FpsText;
  square: Square;
  grid: Grid
  direction: {x: number, y: number} = {x: 0, y: 0}
  cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super({ key: 'MainScene' })
  }

  create() {

    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.grid = new Grid(this, 0,0)
    this.fpsText = new FpsText(this)
    this.square = new Square(this, 0, 0);
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
    }else{
      // this.direction = {x: 0, y: 0};
    }
    
    if(time >= this.square.moveTime && this.direction){
      this.square.move(time, this.direction)
    }
  }
}
