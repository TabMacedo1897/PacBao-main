let PLAY = 1
let END = 0
let gameState = PLAY
let pacman, pacmanViradoDireita, pacmanViradoCima, pacmanViradoBaixo, pacmanViradoEsquerda;
let fantasma1,fantasma2,fantasma3,fantasma4,fantasma5;
let instanciaFantasma1,instanciaFantasma2,instanciaFantasma3,instanciaFantasma4,instanciaFantasma5;
let fantasmas = []
let paredes = []
let pacmanSound;
let comida1, comida2, comida3, comida4,comida5,comida6,comida7,comida8,comida9,comida10
let comidasPacman;
let comidas = [];
let restartButton;

function preload(){
    pacmanViradoDireita = loadAnimation("./assets/pacman/pacman1.png","./assets/pacman/pacman2.png","./assets/pacman/pacman1.png","./assets/pacman/pacman2.png")
    pacmanViradoCima = loadAnimation("./assets/pacman/pacman3.png","./assets/pacman/pacman4.png","./assets/pacman/pacman3.png","./assets/pacman/pacman4.png")

    pacmanViradoBaixo = loadAnimation("./assets/pacman/pacman5.png","./assets/pacman/pacman6.png","./assets/pacman/pacman5.png","./assets/pacman/pacman6.png")

    pacmanViradoEsquerda = loadAnimation("./assets/pacman/pacman7.png","./assets/pacman/pacman8.png","./assets/pacman/pacman7.png","./assets/pacman/pacman8.png")

    fantasma1 = loadImage("./assets/fantasma/fantasmaAzul.png")

    fantasma2 = loadImage("./assets/fantasma/fantasmaAmarelo.png")

    fantasma3 = loadImage("./assets/fantasma/fantasmaRosa.png")

    fantasma4 = loadImage("./assets/fantasma/fantasmaVerde.png")

    fantasma5 = loadImage("./assets/fantasma/fantasmaVermelho.png")
}




function setup(){
    createCanvas(windowWidth, windowHeight)
    pacman = createSprite(70,height-50, 20, 50)
    pacman.addAnimation("running", pacmanViradoDireita)
    pacman.addAnimation("changingUp", pacmanViradoCima)
    pacman.addAnimation("changingDown", pacmanViradoBaixo)
    pacman.addAnimation("changingLeft", pacmanViradoEsquerda)
    pacman.scale = 0.3

    instanciaFantasma1 = new Fantasma(windowWidth/2-400, 100, fantasma1, 10, 4)

    instanciaFantasma2 = new Fantasma(windowWidth,200, fantasma2, 10, -4)

    instanciaFantasma3 = new Fantasma(windowWidth/2, 300, fantasma3, 10, 5)

    instanciaFantasma4 = new Fantasma(windowWidth, 400, fantasma4, 15, -5)

    instanciaFantasma5 = new Fantasma(windowWidth - 200, 500, fantasma5, 15, 7)

    createParedes()
    createComidas()
}


function draw(){
    background(0)
    movimentoPacman()
    movimentoFantasma()
    colisaoParedes(pacman, paredes)
    for (let comida of comidas) {
        comida.exibir();
        if (!comida.removida && comida.verificarColisao(pacman)) {
            comida.removida = true;
          }
      }
    //Filtro para manter apenas as comidas que não foram removidas.
    comidas = comidas.filter((comida) => !comida.removida);

    for(let fantasma of fantasmas){
        if(!fantasma.removida && fantasma.verificarColisao(pacman)){
           fantasma.removida = true 
        }
    }
    fantasmas = fantasmas.filter((fantasma) => !fantasma.removida);
    drawSprites()
    
}
function movimentoPacman(){
    if(keyIsDown(LEFT_ARROW)){
        pacman.position.x -=5
        pacman.changeAnimation("changingLeft")
    }
    if (pacman.position.x < 0) {
        pacman.position.x = width;
    }
    if(keyIsDown(RIGHT_ARROW)){
        pacman.position.x +=5
        pacman.changeAnimation("running")
    }
    if (pacman.position.x > width) {
        pacman.position.x = 0;
    }
    if(keyIsDown(UP_ARROW)){
        pacman.position.y -=5
        pacman.changeAnimation("changingUp")
    }
    if (pacman.position.y < 0) {
        pacman.position.y = height;
    }
    if(keyIsDown(DOWN_ARROW)){
        pacman.position.y +=5
        pacman.changeAnimation("changingDown")
    }
    if (pacman.position.y > height) {
        pacman.position.y = 0;
    }
}

function movimentoFantasma(){
    const fantasmas = [instanciaFantasma1, instanciaFantasma2, instanciaFantasma3, instanciaFantasma4, instanciaFantasma5]

    for(let i = 0; i < fantasmas.length; i++){
        const fantasma = fantasmas[i];
        fantasma.exibir()
        fantasma.mover()
        fantasma.verificarColisaoParede(paredes, pacman)
    }
}
function createParedes(){
    let paredeEspacamentoX = windowWidth/5
    let startX = paredeEspacamentoX
    let startY = windowHeight - 700

    for(let i = 0; i < 4; i++){
        let parede = createSprite(startX + i * paredeEspacamentoX, startY, 20, 400)
        parede.shapeColor = 'black'
        parede.draw = function(){
            stroke('blue')
            strokeWeight(1)
            fill(this.shapeColor)
            rect(0,0, this.width,this.height)
        }
        paredes.push(parede)
    }
    for(var i = 0; i < 4; i++){
        let parede = createSprite(startX + i * paredeEspacamentoX, windowHeight/2+300,20, 300)
        parede.shapeColor = 'black'
        parede.draw = function(){
            stroke('blue')
            strokeWeight(1)
            fill(this.shapeColor)
            rect(0,0,this.width,this.height)
        }
        paredes.push(parede)
    }
}
function colisaoParedes(sprite, array){
    for(var i = 0; i < array.length; i++){
        if(sprite.collide(array[i])){
            sprite.position.x -=1
            sprite.position.y -=1
        }
    }
}

  
function createComidas() {
    let fileirasDeComida = 4; // Número de fileiras
    let comidaPorFileira = 5; // Número de comidas em cada fileira
    let espacamentoVertical = height * 0.2; // Espaçamento vertical entre as fileiras
  
    for (let i = 0; i < fileirasDeComida; i++) {
      let posY = espacamentoVertical * (i + 1); // Posição vertical da fileira
      for (let j = 0; j < comidaPorFileira; j++) {
        let posX = (width / comidaPorFileira) * j + width / (comidaPorFileira * 2); // Posição horizontal da comida
        let comida = new ComidaPacman(posX, posY, 30);
        comidas.push(comida);
      }
    }
  }


function windowResized(){
    resizeCanvas(windowWidth, windowHeight)
}