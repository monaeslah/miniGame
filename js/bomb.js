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
  }
  renderUI () {
    this.scoreMonitor = document.createElement('div')
    this.scoreMonitor.className = 'player-assets'
    const scoreValue = document.createElement('p')
    scoreValue.innerHTML = `Score : ${this.score}`
    scoreValue.id = 'score-value'
    this.scoreMonitor.appendChild(scoreValue)
    document.body.appendChild(this.scoreMonitor)
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

      setTimeout(() => {
        this.collisionDetection()
      }, 3000)
    }
  }
  explosionEffect () {
    const explosionInterval = setInterval(() => {
      this.timer--
      this.timerView.innerHTML = this.timer
      if (this.timer === 0) {
        this.bomb.style.display = 'none'
        this.collision.style.display = 'block'

        this.timer = 4
        setTimeout(() => {
          this.collision.style.display = 'none'
        }, 1000)
        clearInterval(explosionInterval)
      }
    }, 1000)
  }

  collisionDetection () {
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
            console.log('1', this.score)

            this.updateScoreUI()
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
      console.log(this.score)
    }
  }
}
const bomb = new Bomb(player, grid)
document.addEventListener('keydown', e => {
  if (e.code === 'Space') {
    bomb.bombPlacement(true)
  }
})
