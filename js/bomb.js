class Bomb {
  constructor (player) {
    this.player = player
    this.grid = grid
    this.bomb = document.createElement('img')
    this.collision = document.createElement('img')
    this.bomb.src = `../assets/bomb.gif`
    this.collision.src = `../assets/collision.gif`
    this.bomb.className = 'bomb'
    this.collision.className = 'collision'
    this.position = [this.player.positionX, this.player.positionY]
    this.timer = 4
    this.explosionRadius = [3, 2]
    this.bombNumber = 3
    this.bombTimer = 20
    this.espriteElement = document.getElementById('sprite')
    this.bombPlacement()
    this.explosionEffect()
    this.collisionDetection()
  }
  bombPlacement (check) {
    this.espriteElement.insertAdjacentElement('afterend', this.bomb)
    this.espriteElement.insertAdjacentElement('afterend', this.collision)

    this.bomb.style.left = `${this.player.newPositionX}px`
    this.bomb.style.top = `${this.player.newPositionY}px`
    this.collision.style.left = `${this.player.newPositionX}px`
    this.collision.style.top = `${this.player.newPositionY}px`
    if (check === true) {
      this.bomb.style.display = 'block'
      this.explosionEffect()
    }
  }
  explosionEffect () {
    const explosionInterval = setInterval(() => {
      this.timer--
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
    console.log('hello3')
  }
}
const bomb = new Bomb(player)
document.addEventListener('keydown', e => {
  console.log(e.code)
  if (e.code === 'Space') {
    bomb.bombPlacement(true)
  }
})
