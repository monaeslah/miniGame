class Player {
  constructor (grid) {
    this.grid = grid
    this.positionX = 0
    this.positionY = 0
    this.numbers = 18
    this.life = 3
    this.duration = 120
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

    this.levelElement = document.createElement('div')
    this.levelElement.classList = 'level-up'
    document.body.appendChild(this.levelElement)
    this.levelElement.style.display = 'none'

    this.winnerElement = document.createElement('div')
    this.winnerElement.classList = 'winner'
    document.body.appendChild(this.winnerElement)
    this.winnerElement.style.display = 'none'
    this.deathMonitor = document.createElement('div')
    this.deathMonitor.id = 'life-number'
    this.deathMonitor.innerHTML = `life remaining: ${this.life}`
    document.body.appendChild(this.deathMonitor)
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
      const lifeSound = new Audio('./sound/game-level-complete-143022.mp3')
      lifeSound.play()
      this.levelElement.style.display = 'block'
      this.levelElement.innerHTML = `
     <img src="./images/looser2.gif" alt="" srcset="">
     <p>Level up!!
     <br>
    Welcome to  level ${gameGrid.level}</p>`
      setTimeout(() => {
        this.levelElement.style.display = 'none'
      }, 3000)

      gameGrid.grid = []
      gameGrid.initGrid(this.positionX, this.positionY)
      gameGrid.renderGrid()
      this.startingPosition()
      this.updatePosition()
      bomb.updateGrid(gameGrid.grid)
    } else {
      this.winnerElement.style.display = 'block'
      this.winnerElement.innerHTML = `
     <img src="./images/winner.gif" alt="" srcset="">
     <p>Congratulations!!!
     <br>
   You have completed the game!</p>`
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
      if (this.duration === 0 || this.life === 0) {
        this.gameOver()
        clearInterval(death)
      }
    }, 1000)
  }

  gameOver () {
    this.isAlive = false
    this.grid.domElement.style.display = 'none'
    document.removeEventListener('keydown', this.handleKeyPress.bind(this))
    const gameOverSound = new Audio('./sound/game-over-38511.mp3')

    gameOverSound.play()

    const gameOverMessage = document.createElement('div')
    gameOverMessage.id = 'page-gameover'
    gameOverMessage.innerHTML = `<p>Game Over!</p>
     <img src="./images/gameover.gif" alt="" srcset="">
      <a href='./index.html'><button id="restart-btn">Restart</button></a>`

    document.body.appendChild(gameOverMessage)

    const playerCell = document.getElementById(
      `cell-${this.positionX}-${this.positionY}`
    )
    if (playerCell && this.sprite) {
      playerCell.removeChild(this.sprite)
    }

    const restartButton = document.getElementById('restart-btn')
    restartButton.addEventListener('click', () => this.restartGame())
  }

  restartGame () {
    const gameOverMessage = document.getElementById('game-over')
    if (gameOverMessage) {
      console.log(gameOverMessage.style.display)
      document.body.removeChild(gameOverMessage)
      gameOverMessage.style.display = 'none'
    }

    this.grid.domElement.style.display = 'grid'
    this.life = 3
    this.isAlive = true
    this.duration = 6
    this.startingPosition()

    document.addEventListener('keydown', this.handleKeyPress.bind(this))
  }
}
const player = new Player(gameGrid)

document.addEventListener('keydown', e => {
  player.handleKeyPress(e)
})
