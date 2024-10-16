class Bomb {
  constructor (player) {
    this.player = player
    this.grid = grid
    this.bomb = document.createElement('img')
    this.collision = document.createElement('img')
    this.timerView = document.createElement('p')
    this.espriteElement = document.getElementById('sprite')
    this.bomb.src = `../images/bomb.gif`
    this.collision.src = `../images/collision.gif`
    this.bomb.className = 'bomb'
    this.collision.className = 'collision'
    this.bomb.style.display = 'none'
    this.collision.style.display = 'none'
    this.position = [this.player.positionX, this.player.positionY]
    this.timer = 4
    this.explosionRadius = [
      this.player.positionY + 1,
      this.player.positionX + 1,
      this.player.positionX - 1,
      this.player.positionY - 1
    ]
    this.bombNumber = 3
    this.bombPlacement()
    this.collisionDetection()
  }
  bombPlacement (check) {
    if (
      this.bomb.style.display === 'block' ||
      this.collision.style.display === 'block'
    ) {
      return
    }
    this.espriteElement.insertAdjacentElement('afterend', this.bomb)
    this.espriteElement.insertAdjacentElement('afterend', this.collision)

    this.bomb.style.left = `${this.player.newPositionX}px`
    this.bomb.style.top = `${this.player.newPositionY}px`
    this.collision.style.left = `${this.player.newPositionX}px`
    this.collision.style.top = `${this.player.newPositionY}px`
    if (check === true) {
      this.bomb.style.display = 'block'
      this.collision.style.display = 'none'
      this.explosionEffect()
    }
  }
  explosionEffect () {
    const explosionInterval = setInterval(() => {
      this.timer--
      this.timerView.innerHTML = this.timer
      if (this.timer === 0) {
        this.bomb.style.display = 'none'
        this.collision.style.display = 'block'
        this.collisionDetection()
        this.timer = 4
        setTimeout(() => {
          this.collision.style.display = 'none'
        }, 1000)
        clearInterval(explosionInterval)
      }
    }, 1000)
  }

  collisionDetection () {
    const [bombX, bombY] = this.position
    const radiusX = this.explosionRadius[0]
    const radiusY = this.explosionRadius[1]

    // Check positions within explosion radius horizontally and vertically
    for (let x = bombX - radiusX; x <= bombX + radiusX; x++) {
      this.checkAndDestroy(x, bombY) // Check horizontally
    }

    for (let y = bombY - radiusY; y <= bombY + radiusY; y++) {
      this.checkAndDestroy(bombX, y) // Check vertically
    }
  }
  checkAndDestroy (x, y) {
    console.log('at first', this.grid[y][x], x, y)
    if (x >= 0 && x < this.grid.length && y >= 0 && y < this.grid[0].length) {
      if (this.grid[y][x] === 'destructible') {
        // Destroy the block (set to 'empty' or any value representing an empty space)
        this.grid[y][x] = 'empty'
        console.log(`Block destroyed at (${x}, ${y})`)

        // Optionally, update the visual representation if needed
      }
    }
  }
}
const bomb = new Bomb(player)
document.addEventListener('keydown', e => {
  if (e.code === 'Space') {
    bomb.bombPlacement(true)
  }
})
