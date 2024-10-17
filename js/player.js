class Player {
  constructor (grid) {
    this.grid = grid
    this.positionX = 0
    this.positionY = 0
    this.numbers = 18
    this.life = 2
    this.duration = 600
    this.isAlive = true

    this.sprite = document.createElement('img')
    this.sprite.src = './images/player.gif'
    this.sprite.id = 'sprite'
    this.lifeMonitor = document.createElement('div')
    this.lifeMonitor.className = 'player-sprite'
    this.lifeElement = document.getElementById('player-sprite')
    this.lifeElement = document.createElement('div')
    this.lifeElement.classList = 'life-time'
    document.body.appendChild(this.lifeElement)
    this.startingPosition()
    this.grid.initGrid(this.positionX, this.positionY)
    this.movement()
    this.playerLife()
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
  }

  updatePosition () {
    const previousCell = document.querySelector('#grid .player')
    if (previousCell) {
      previousCell.classList.remove('player')
      previousCell.removeChild(this.sprite)
    }
    const currentCell = document.getElementById(
      `cell-${this.positionX}-${this.positionY}`
    )

    if (currentCell) {
      currentCell.classList.add('player')
      currentCell.appendChild(this.sprite)

      if (this.grid.grid[this.positionY][this.positionX] === 'unique') {
        console.log('hell yeah', currentCell.className)

        this.nextLevel()
      }
    }
  }
  nextLevel () {
    if (gameGrid.level < gameGrid.maxLevel) {
      gameGrid.level++
      alert(`Level up! Welcome to level ${gameGrid.level}`)
      gameGrid.grid = []
      gameGrid.initGrid(this.positionX, this.positionY)
      gameGrid.renderGrid()
      this.startingPosition()
      this.updatePosition()
      bomb.updateGrid(gameGrid.grid)
    } else {
      alert('Congratulations! You have completed the game!')
    }
  }
  movement (dx, dy) {
    const newX = this.positionX + dx
    const newY = this.positionY + dy

    if (
      newX >= 0 &&
      newX < this.grid.width &&
      newY >= 0 &&
      newY < this.grid.height
    ) {
      const targetCell = this.grid.grid[newY][newX]

      if (targetCell === 'empty' || targetCell === 'unique') {
        this.positionX = newX
        this.positionY = newY
        this.updatePosition()
      }
    }
  }
  handleKeyPress (e) {
    if (e.code === 'ArrowLeft') {
      this.movement(-1, 0)
    } else if (e.code === 'ArrowRight') {
      this.movement(1, 0)
    } else if (e.code === 'ArrowDown') {
      this.movement(0, 1)
    } else if (e.code === 'ArrowUp') {
      this.movement(0, -1)
    }
  }
  playerLife () {
    let death = setInterval(() => {
      this.duration--
      this.lifeElement.innerHTML = `Time remainig : ${this.duration}`
      if (this.duration === 0) {
        this.gameOver()
        clearInterval(death)
      }
    }, 1000)
  }
  gameOver () {
    this.isAlive = false
    location.href = 'gameover.html'
  }
}
const player = new Player(gameGrid)

document.addEventListener('keydown', e => {
  player.handleKeyPress(e)
})
