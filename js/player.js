class Player {
  constructor (grid) {
    this.grid = grid
    this.positionX = 0
    this.positionY = 0
    this.newPositionX = 0
    this.newPositionY = 0
    this.sprite = document.createElement('img')
    this.sprite.src = `../assets/bomberman.png`
    this.sprite.id = 'sprite'
    this.playerElement = document.getElementById('grid')
    this.startingPosition()
    this.movement()
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
    this.newPositionX = this.positionX * this.grid.cellSize
    this.newPositionY = this.positionY * this.grid.cellSize
    this.sprite.style.position = 'absolute'
    this.sprite.style.left = `${this.newPositionX}px`
    this.sprite.style.top = `${this.newPositionY}px`
    this.sprite.style.width = `${this.grid.cellSize}px`
    this.sprite.style.height = `${this.grid.cellSize}px`
  }
  movement (dx, dy) {
    const newX = this.positionX + dx
    const newY = this.positionY + dy
    if (isNaN(newX) || isNaN(newY)) {
      return
    }

    if (
      newX >= 0 &&
      newX < this.grid.width &&
      newY >= 0 &&
      newY < this.grid.height
    ) {
      if (this.grid.grid[newY][newX] === 'empty') {
        this.positionX = newX
        this.positionY = newY
        this.updatePosition()
      }
    }
  }
}
const player = new Player(gameGrid)

document.addEventListener('keydown', e => {
  if (e.code === 'ArrowLeft') {
    player.movement(-1, 0)
  } else if (e.code === 'ArrowRight') {
    player.movement(1, 0)
  } else if (e.code === 'ArrowDown') {
    player.movement(0, 1)
  } else if (e.code === 'ArrowUp') {
    player.movement(0, -1)
  }
})
