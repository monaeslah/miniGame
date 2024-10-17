class Enemy {
  constructor (grid, player) {
    this.grid = grid
    this.player = player
    this.positionX = 0
    this.positionY = 0
    this.sprite = document.createElement('img')
    this.sprite.src = './images/enemy.gif'
    this.sprite.className = 'enemy'

    this.isAlive = true

    this.startingPosition()
    this.updatePosition()

    this.movementInterval = setInterval(() => {
      if (this.isAlive) {
        this.moveRandomly()
      }
    }, 500)
  }

  startingPosition () {
    let isValidPosition = false

    while (!isValidPosition) {
      this.positionX = Math.floor(Math.random() * this.grid.width)
      this.positionY = Math.floor(Math.random() * this.grid.height)

      if (this.grid.grid[this.positionY][this.positionX] === 'empty') {
        isValidPosition = true
      }
    }

    this.updatePosition()
  }

  updatePosition () {
    const previousCell = document.querySelector('#grid .enemy')
    if (previousCell) {
      previousCell.classList.remove('enemy')
      previousCell.removeChild(this.sprite)
    }
    const currentCell = document.getElementById(
      `cell-${this.positionX}-${this.positionY}`
    )
    if (currentCell) {
      currentCell.classList.add('enemy')
      currentCell.appendChild(this.sprite)
    }

    this.checkForCollisionWithPlayer()
  }

  moveRandomly () {
    const directions = [
      { dx: -1, dy: 0 },
      { dx: 1, dy: 0 },
      { dx: 0, dy: -1 },
      { dx: 0, dy: 1 }
    ]

    const randomDirection =
      directions[Math.floor(Math.random() * directions.length)]

    const newX = this.positionX + randomDirection.dx
    const newY = this.positionY + randomDirection.dy

    if (
      newX >= 0 &&
      newX < this.grid.width &&
      newY >= 0 &&
      newY < this.grid.height &&
      (this.grid.grid[newY][newX] === 'empty' ||
        this.grid.grid[newY][newX] === 'unique')
    ) {
      this.positionX = newX
      this.positionY = newY
      this.updatePosition()
    }
  }

  checkForCollisionWithPlayer () {
    if (
      this.positionX === this.player.positionX &&
      this.positionY === this.player.positionY
    ) {
      this.player.life--

      this.player.deathMonitor.innerHTML = `life remaining: ${this.player.life}`

      if (this.player.life <= 0) {
        this.player.gameOver()
      }
    }
  }
}
const enemy = new Enemy(gameGrid, player)
