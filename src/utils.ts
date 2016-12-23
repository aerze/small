export const centerGameObjects = (objects: Array<Phaser.Sprite>) => {
  objects.forEach(function (object) {
    object.anchor.setTo(0.5)
  })
}

export const getRandomInt = (min: number, max?: number) => {
  if (!max) {
    max = min
    min = 0
  }
  return min + Math.floor(Math.random() * (max - min + 1))
}

export const setResponsiveWidth = (sprite: Phaser.Sprite, percent: number, parent: Phaser.Group | Phaser.Sprite) => {
  let percentWidth = (sprite.texture.width - (parent.width / (100 / percent))) * 100 / sprite.texture.width
  sprite.width = parent.width / (100 / percent)
  sprite.height = sprite.texture.height - (sprite.texture.height * percentWidth / 100)
}