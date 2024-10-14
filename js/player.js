class Player {
  constructor (grid) {
    this.grid = grid
    this.positionX = 0
    this.positionY = 0
    this.sprite = document.createElement('img')
    this.sprite.src = `../assets/bomberman.png`
    this.playerElement = document.getElementById('grid')
    this.startingPosition()

    this.moveRight()
    this.moveLeft()
    this.moveUp()
    this.moveDown()
  }
  startingPosition () {
    const oddNumbers = [3, 5, 7, 9, 11, 13, 15, 17]
    const randomIndex = Math.floor(Math.random() * oddNumbers.length)
    const randomIndexY = Math.floor(Math.random() * oddNumbers.length)
    this.positionX = oddNumbers[randomIndex]
    this.positionY = oddNumbers[randomIndexY]
    this.updatePosition()
    this.playerElement.appendChild(this.sprite)
  }
  updatePosition () {
    this.sprite.style.position = 'absolute'
    this.sprite.style.left = `${this.positionX * this.grid.cellSize}px`
    this.sprite.style.top = `${this.positionY * this.grid.cellSize}px`
    this.sprite.style.width = `${this.grid.cellSize}px`
    this.sprite.style.height = `${this.grid.cellSize}px`
    console.log(this.grid.grid)
  }

  moveRight () {
    if (this.grid.grid[this.positionY][this.positionX + 1] === 'empty') {
      this.positionX += 1
      this.updatePosition()
    }
  }
  moveLeft () {
    if (this.grid.grid[this.positionY][this.positionX - 1] === 'empty') {
      this.positionX -= 1
      this.updatePosition()
    }
  }
  moveUp () {
    if (this.grid.grid[this.positionY - 1][this.positionX] === 'empty') {
      this.positionY -= 1
      this.updatePosition()
    }
  }
  moveDown () {
    if (this.grid.grid[this.positionY + 1][this.positionX] === 'empty') {
      this.positionY += 1
      this.updatePosition()
    }
  }
}
const player = new Player(gameGrid)

document.addEventListener('keydown', e => {
  if (e.code === 'ArrowLeft') {
    player.moveLeft()
  } else if (e.code === 'ArrowRight') {
    player.moveRight()
  } else if (e.code === 'ArrowDown') {
    player.moveDown()
    console.log(e.code)
  } else if (e.code === 'ArrowUp') {
    player.moveUp()
  }
})
