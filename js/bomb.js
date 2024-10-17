class Bomb {
  constructor (player, grid) {
    this.player = player
    this.grid = grid
    this.bomb = document.createElement('img')
    this.collision = document.createElement('img')
    this.timerView = document.createElement('p')
    this.bomb.src = '/images/bomb.gif'
    this.collision.src = './images/collision.gif'
    this.bomb.className = 'bomb'
    this.collision.className = 'collision'
    this.bomb.style.display = 'none'
    this.collision.style.display = 'none'
    this.timer = 3
    this.score = 0
    this.explosionRadius = [
      this.player.positionX - 1,
      this.player.positionX + 1,
      this.player.positionY - 1,
      this.player.positionY + 1
    ]
    this.bombNumber = 3
    this.bombPlacement()
    this.scoreMonitor = null
    this.renderUI()
    this.extraBomb = document.createElement('img')
    this.extraBomb.src = './images/extraBomb.svg'
    this.extraBomb.className = 'extra-bomb'

    this.extraLife = document.createElement('img')
    this.extraLife.src = './images/start.png'
    this.extraLife.className = 'extra-life'
    this.extraLife.style.display = 'none'
  }
  renderUI () {
    this.scoreMonitor = document.createElement('div')
    this.scoreMonitor.className = 'player-assets'
    const scoreValue = document.createElement('p')
    scoreValue.innerHTML = `Score : ${this.score}`
    scoreValue.id = 'score-value'
    this.scoreMonitor.appendChild(scoreValue)
    document.body.appendChild(this.scoreMonitor)
    this.bombMonitor = document.createElement('div')
    this.bombMonitor.className = 'bomb-number'
    this.bombMonitor.innerHTML = `Bomb remaining: ${this.bombNumber}`
    document.body.appendChild(this.bombMonitor)
  }
  updateGrid (newGrid) {
    this.grid = newGrid
  }
  bombPlacement (check) {
    if (
      this.bomb.style.display === 'block' ||
      this.collision.style.display === 'block'
    ) {
      return
    }
    this.bombPosition = [this.player.positionX, this.player.positionY]
    const bombCell = document.getElementById(
      `cell-${this.bombPosition[0]}-${this.bombPosition[1]}`
    )
    if (bombCell) {
      bombCell.appendChild(this.bomb)
      bombCell.appendChild(this.collision)
    }

    if (check === true) {
      this.bomb.style.display = 'block'
      this.collision.style.display = 'none'
      this.explosionEffect()

      this.bombNumber -= 1
      this.bombMonitor.innerHTML = `Bomb remaining: ${this.bombNumber}`
      setTimeout(() => {
        this.collisionDetection()
      }, 3000)
    }
  }
  explosionEffect () {
    const explosionInterval = setInterval(() => {
      this.timer--

      if (this.timer === 0) {
        this.bomb.style.display = 'none'

        this.collision.style.display = 'block'

        this.timer = 3
        setTimeout(() => {
          this.collision.style.display = 'none'
        }, 2000)
        clearInterval(explosionInterval)
      }
    }, 1000)
  }

  collisionDetection () {
    const collisionSound = new Audio(
      './sound/explosion-sound-effect-1-241821.mp3'
    )

    collisionSound.play()
    this.explosionRadius = [
      { x: this.bombPosition[0] - 1, y: this.bombPosition[1] },
      { x: this.bombPosition[0], y: this.bombPosition[1] - 1 },
      { x: this.bombPosition[0] + 1, y: this.bombPosition[1] },
      { x: this.bombPosition[0], y: this.bombPosition[1] + 1 },
      { x: this.bombPosition[0], y: this.bombPosition[1] }
    ]

    this.explosionRadius.forEach(({ x, y }) => {
      if (
        x >= 0 &&
        x < this.player.numbers &&
        y >= 0 &&
        y < this.player.numbers
      ) {
        const cell = document.getElementById(`cell-${x}-${y}`)

        if (cell) {
          if (this.player.positionX === x && this.player.positionY === y) {
            this.player.life--
            console.log(`Player hit! Life remaining: ${this.player.life}`)

            if (this.player.life === 0) {
              this.player.gameOver()
            }
          }
          if (cell.classList.contains('wall')) {
            this.score += 50

            this.updateScoreUI()
            if (cell.classList.contains('gift-extra-life')) {
              cell.appendChild(this.extraLife)

              this.extraLife.style.display = 'block'
              this.player.life++
              const lifeSound = new Audio('./sound/coin-recieved-230517.mp3')

              lifeSound.play()
              setTimeout(() => {
                this.extraLife.style.display = 'none'
                console.log(
                  `Extra life obtained! Player life: ${this.player.life}`
                )
              }, 2000)

              cell.classList.remove('gift-extra-life')
              cell.className = 'path'
              this.grid[y][x] = 'empty'
            } else if (cell.classList.contains('gift-extra-bomb')) {
              cell.appendChild(this.extraBomb)
              this.extraBomb.style.display = 'block'
              this.bombNumber += 1

              setTimeout(() => {
                this.extraBomb.style.display = 'none'
              }, 2000)

              console.log(
                `Extra bomb obtained! Player boms: ${this.bombNumber}`
              )
            }
          }
          if (!cell.classList.contains('block')) {
            cell.className = 'path'
            this.grid[y][x] = 'empty'
          }
        }
      }
    })
  }
  updateScoreUI () {
    const scoreElement = document.getElementById('score-value')
    if (scoreElement) {
      scoreElement.innerHTML = `Score: ${this.score}`
    }
  }
}
const bomb = new Bomb(player, grid)
document.addEventListener('keydown', e => {
  if (e.code === 'Space') {
    if (bomb.bombNumber != 0) {
      bomb.bombPlacement(true)
    } else {
      console.log('no bomb ha ha ha')
    }
  }
})
