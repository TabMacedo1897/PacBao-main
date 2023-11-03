class Fantasma {
  constructor(x,y, imagem, tamanho, velocidade){
    this.sprite = createSprite(x,y)
    this.sprite.addImage(imagem)
    this.sprite.scale = tamanho / 100
    this.sprite.velocidade = velocidade
  }
  exibir(){
    drawSprite(this.sprite)
  }
  mover(){
    this.sprite.position.x += this.sprite.velocidade

    if(this.sprite.position.x > windowWidth + this.sprite.width/2){
      this.sprite.position.x = this.sprite.width/2
    }
    if(this.sprite.position.x < -this.sprite.width/2){
      this.sprite.position.x = windowWidth+this.sprite.width/2
    }
    if(this.sprite.position.y > windowHeight + this.sprite.height/2){
      this.sprite.position.y = this.sprite.height/2
    }
    if(this.sprite.position.y < -this.sprite.height/2){
      this.sprite.position.y = windowHeight+this.sprite.height/2
    }
  }
  verificarColisaoComParede(paredes) {
    for (let parede of paredes) {
      if (this.sprite.collide(parede)) {
        // Inverte a direção do fantasma quando colide com uma parede
        this.sprite.velocidade *= -1;
      }
    }
  }

}
