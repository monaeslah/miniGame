class Grid {
  constructor () {
    this.width = 19
    this.height = 19
    this.cellSize = 30
    this.domElement = document.getElementById('grid')
    this.grid = []
  }
  initGrid () {
    for (let y = 0; y < this.height; y++) {
      const row = []
      for (let x = 0; x < this.width; x++) {
        if (this.isOuterBorder(x, y)) {
          row.push('block')
        } else if (this.isEmptyInnerBorder(x, y)) {
          row.push('empty')
        } else if (this.isPatternedBlock(x, y)) {
          row.push('block')
        } else {
          if (Math.random() < 0.2) {
            // 20% chance to be destructible
            row.push('destructible')
          } else {
            row.push('empty')
          }
        }
      }
      this.grid.push(row)
    }
    return this.grid
  }
  isOuterBorder (x, y) {
    return x === 0 || x === this.width - 1 || y === 0 || y === this.height - 1
  }
  isEmptyInnerBorder (x, y) {
    return x === 1 || x === this.width - 2 || y === 1 || y === this.height - 2
  }
  isPatternedBlock (x, y) {
    return x >= 2 && y >= 2 && x % 2 === 0 && y % 2 === 0
  }
  renderGrid () {
    this.domElement.style.width = `${this.width * this.cellSize}px`
    this.domElement.style.height = `${this.height * this.cellSize}px`
    this.domElement.style.display = 'grid'
    this.domElement.style.gridTemplateColumns = `repeat(${this.width}, ${this.cellSize}px)`
    this.domElement.style.gridTemplateRows = `repeat(${this.height}, ${this.cellSize}px)`

    this.grid.forEach((row, y) => {
      row.forEach((cell, x) => {
        const cellDiv = document.createElement('div')
        cellDiv.style.width = `${this.cellSize}px`
        cellDiv.style.height = `${this.cellSize}px`
        cellDiv.id = `cell-${x}-${y}`
        if (cell === 'block') {
          cellDiv.style.backgroundColor = ' gray'
        } else if (cell == 'destructible') {
          cellDiv.style.backgroundColor = ' red'
        } else {
          cellDiv.style.backgroundColor = 'green'
        }
        this.domElement.appendChild(cellDiv)
      })
    })
  }
}
const gameGrid = new Grid()
let grid = gameGrid.initGrid()
let newGrid = gameGrid.renderGrid()
