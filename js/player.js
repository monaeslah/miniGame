class Player {
  constructor (grid) {
    this.grid = grid
    this.positionX = 0
    this.positionY = 0
    this.numbers = 18

    this.sprite = document.createElement('img')
    this.sprite.src = `../images/bomberman.png`
    this.sprite.id = 'sprite'
    this.playerElement = document.getElementById('grid')
    this.startingPosition()
    this.movement()
  }
  startingPosition () {
    const oddNumbers = Array.from({ length: this.numbers }, (_, i) => i).filter(
      num => num % 2 !== 0
    )
    let isValidPosition = false

    while (!isValidPosition) {
      const randomIndex = Math.floor(Math.random() * oddNumbers.length)
      const randomIndexY = Math.floor(Math.random() * oddNumbers.length)

      this.positionX = oddNumbers[randomIndex]
      this.positionY = oddNumbers[randomIndexY]

      if (this.grid.grid[this.positionY][this.positionX] === 'empty') {
        isValidPosition = true
      }
    }

    this.updatePosition()

    document
      .getElementById(`cell-${this.positionX}-${this.positionY}`)
      .appendChild(this.sprite)
  }

  updatePosition () {
    const currentCell = document.getElementById(
      `cell-${this.positionX}-${this.positionY}`
    )
    if (currentCell) {
      currentCell.appendChild(this.sprite)
    }
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
