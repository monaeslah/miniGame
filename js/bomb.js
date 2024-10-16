class Bomb {
  constructor (player, grid) {
    this.player = player
    this.grid = grid
    this.bomb = document.createElement('img')
    this.collision = document.createElement('img')
    this.timerView = document.createElement('p')
    this.espriteElement = document.getElementById('sprite')
    this.bomb.src = `../assets/bomb.gif`
    this.collision.src = `../assets/collision.gif`
    this.bomb.className = 'bomb'
    this.collision.className = 'collision'
    this.bomb.style.display = 'none'
    this.collision.style.display = 'none'
    this.position = [this.player.positionX, this.player.positionY]
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

    // Place the bomb in the current player's cell
    const playerCell = document.getElementById(
      `cell-${this.player.positionX}-${this.player.positionY}`
    )
    if (playerCell) {
      playerCell.appendChild(this.bomb)
      playerCell.appendChild(this.collision)
    }

    this.bomb.style.display = 'none'
    this.collision.style.display = 'none'

    // this.espriteElement.insertAdjacentElement('afterend', this.bomb)
    // this.espriteElement.insertAdjacentElement('afterend', this.collision)

    // this.bomb.style.left = `${this.player.calculatedX}px`
    // this.bomb.style.top = `${this.player.calculatedY}px`
    // this.collision.style.left = `${this.player.calculatedX}px`
    // this.collision.style.top = `${this.player.calculatedY}px`
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
        console.log(this.collision.style.display)
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
      { x: this.player.positionX - 1, y: this.player.positionY },
      { x: this.player.positionX + 1, y: this.player.positionY },
      { x: this.player.positionX, y: this.player.positionY - 1 },
      { x: this.player.positionX, y: this.player.positionY + 1 }
    ]
    this.explosionRadius.forEach(({ x, y }) => {
      console.log('hhh')
      if (
        x >= 0 &&
        x < this.player.numbers &&
        y >= 0 &&
        y < this.player.numbers
      ) {
        const cell = document.getElementById(`cell-${x}-${y}`)
        console.log('cell', x, y, cell)
        if (cell) {
          cell.style.backgroundColor = 'yellow'
          console.log('cell', x, y, cell)
          // setTimeout(() => {
          //   cell.style.backgroundColor = ''
          // }, 1000)
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
