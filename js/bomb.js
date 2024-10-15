class Bomb {
  constructor (player) {
    this.player = player
    this.bomb = document.createElement('img')
    this.bomb.src = `../assets/bomb.gif`
    this.bomb.className = 'bomb'
    this.position = [this.player.positionX, this.player.positionY]
    this.timer = 3
    this.explosionRadius = [1, 1]
    this.bombNumber = 3
    this.bombTimer = 20
    this.espriteElement = document.getElementById('sprite')
    this.bombPlacement()
    this.explosionEffect()
    this.collisionDetection()
  }
  bombPlacement (check) {
    this.espriteElement.insertAdjacentElement('afterend', this.bomb)

    this.bomb.style.left = `${this.player.newPositionX}px`
    this.bomb.style.top = `${this.player.newPositionY}px`
    if (check === true) {
      this.bomb.style.display = 'block'
    }
    this.explosionEffect()
  }
  explosionEffect () {
    //clear effect after 1 sec
    setTimeout(() => {
      this.timer--
      console.log(this.timer)
      if (this.timer === 0) {
        return (this.timer = 3)
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
