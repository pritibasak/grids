import { CELL_SIZE, DEFAULT_HEIGHT, DEFAULT_WIDTH } from "../game";

export default class Grid extends Phaser.GameObjects.Grid{
    constructor(scene, x,y){
        super(scene, x, y);
        scene.add.existing(this);
        this.setOrigin(0,0);
        this.x += 0
        this.y += 0
        this.width = DEFAULT_WIDTH
        this.height = DEFAULT_HEIGHT
        this.cellWidth = CELL_SIZE
        this.cellHeight = CELL_SIZE
        this.fillColor = 0xff00ff
        this.fillAlpha = 1
        this.outlineFillColor = 0x000000
        this.outlineFillAlpha = 0.5
    }
}