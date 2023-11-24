class Fantasma {
  constructor(x,y, imagem, tamanho, velocidade){
    this.sprite = createSprite(x,y)
    this.sprite.addImage(imagem)
    this.sprite.scale = tamanho / 100
    this.sprite.velocidade = velocidade
    this.removida = false
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
  verificarColisaoParede(paredes, pacman){
    for(let parede of paredes){
      if(this.sprite.collide(parede)){
        this.sprite.velocidade *= -1;
      }
    }
    
    if(this.sprite.collide(pacman)){
      pacman.destroy()
      restartButton = createButton('Restart');
      restartButton.position(width / 2 - 50, height / 2);
      restartButton.style('background-color', 'blue');
      restartButton.style('color', 'white');
    }
  }

}
