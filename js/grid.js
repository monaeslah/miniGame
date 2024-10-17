class Grid {
  constructor () {
    this.width = 19
    this.height = 19
    this.cellSize = 35
    this.domElement = document.getElementById('grid')
    this.grid = []
    this.uniquePosition = null
    this.level = 1
    this.maxLevel = 3
  }

  initGrid (playerStartX, playerStartY) {
    const lifeSound = new Audio('./sound/scream-ride-start-91271.mp3')
    lifeSound.play()
    for (let y = 0; y < this.height; y++) {
      const row = []
      for (let x = 0; x < this.width; x++) {
        if (this.isNearPlayer(x, y, playerStartX, playerStartY)) {
          row.push('empty')
        } else if (this.isOuterBorder(x, y)) {
          row.push('block')
        } else if (this.isEmptyInnerBorder(x, y)) {
          row.push('empty')
        } else if (this.isPatternedBlock(x, y)) {
          row.push('block')
        } else {
          const wallChance = 0.2 + 0.1 * (this.level - 1)

          if (Math.random() < wallChance) {
            row.push('destructible')
          } else {
            row.push('empty')
          }
        }
      }
      this.grid.push(row)
    }
    this.placeUniqueCell(playerStartX, playerStartY)
    return this.grid
  }
  isNearPlayer (x, y, playerStartX, playerStartY) {
    return Math.abs(x - playerStartX) <= 1 && Math.abs(y - playerStartY) <= 1
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
  placeUniqueCell (playerStartX, playerStartY) {
    let uniqueX, uniqueY
    let isFarEnough = false
    while (!isFarEnough) {
      uniqueX = Math.floor(Math.random() * this.width)
      uniqueY = Math.floor(Math.random() * this.height)

      if (
        !this.isNearPlayer(uniqueX, uniqueY, playerStartX, playerStartY) &&
        this.grid[uniqueY][uniqueX] === 'empty'
      ) {
        isFarEnough = true
      }
    }

    this.grid[uniqueY][uniqueX] = 'unique'
    this.uniquePosition = { x: uniqueX, y: uniqueY }
  }
  renderGrid () {
    this.domElement.innerHTML = ''
    this.domElement.style.width = `${this.width * this.cellSize}px`
    this.domElement.style.height = `${this.height * this.cellSize}px`
    this.domElement.style.display = 'grid'
    this.domElement.style.gridTemplateColumns = `repeat(
      ${this.width},
      ${this.cellSize}px
    )`

    this.domElement.style.gridTemplateRows = `repeat(
      ${this.height},
      ${this.cellSize}px
    )`

    this.grid.forEach((row, y) => {
      row.forEach((cell, x) => {
        const cellDiv = document.createElement('div')
        cellDiv.style.width = `${this.cellSize}px`
        cellDiv.style.height = `${this.cellSize}px`
        cellDiv.id = `cell-${x}-${y}`
        if (cell === 'block') {
          cellDiv.className = 'block'
        } else if (cell == 'destructible') {
          cellDiv.className = 'wall'
          const gifts = ['gift-extra-life', 'gift-extra-bomb', 'gift-time', '']
          const randomGift = gifts[Math.floor(Math.random() * gifts.length) / 3]
          if (randomGift) {
            cellDiv.classList.add(randomGift)
          }
        } else if (cell === 'unique') {
          cellDiv.className = 'unique'
        } else {
          cellDiv.className = 'path'
        }
        this.domElement.appendChild(cellDiv)
      })
    })
  }
}
const gameGrid = new Grid()
let grid = gameGrid.initGrid()
let newGrid = gameGrid.renderGrid()
