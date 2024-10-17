class Bomb {
  constructor (player, grid) {
    this.player = player
    this.grid = grid
    this.bomb = document.createElement('img')
    this.collision = document.createElement('img')
    this.timerView = document.createElement('p')

    this.bomb.src = `./images/bomb.gif`
    this.collision.src = `./images/collision.gif`
    this.bomb.className = 'bomb'
    this.collision.className = 'collision'
    this.bomb.style.display = 'none'
    this.collision.style.display = 'none'

    this.timer = 4
    this.explosionRadius = [
      this.player.positionX - 1,
      this.player.positionX + 1,
      this.player.positionY - 1,
      this.player.positionY + 1
    ]
    this.bombNumber = 3
    this.bombPlacement()
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
      { x: this.bombPosition[0], y: this.bombPosition[1] } // Center of the explosion
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
            this.player.life-- // Decrease player's life
            console.log(`Player hit! Life remaining: ${this.player.life}`)

            // Optional: Check if player's life is 0 and trigger game over
            if (this.player.life === 0) {
              this.player.gameOver() // Assuming gameOver() is a method in the Player class
            }
          }
          if (!cell.classList.contains('block')) {
            cell.className = 'path'
            this.grid[y][x] = 'empty' //
          }
        }
      }
    })
  }
}
const bomb = new Bomb(player, grid)
document.addEventListener('keydown', e => {
  if (e.code === 'Space') {
    bomb.bombPlacement(true)
  }
})
