/*comentario com vrias linhas 
let nome_variavel_let // dentro da função
var nome_variavel_var// consigo buscar fora do if
const nome_variavel// cont; variavel fixa. EX:PI3,14

//Var
if(tue){
    var x = 10
}
console.log(x)

//let
if(true){
    let y = 20;
    console.log(y)
}
console.log(y);*/

let canvas = document.getElementById("snake")
let contexto = canvas.getContext("2d");
let caixa = 32;
let snake = [];

snake[0] = {
    x: 8*caixa,
    y: 8*caixa 
}

direcao = "direita";

let comida = { //Math.floor: arredondar os números
    x: Math.floor(Math.random() * 15 + 1)*caixa, // estou pegando numeros aletorios ate quase 16 e arredondando
    y: Math.floor(Math.random() * 15 + 1)*caixa
}



function criarFundo(){
    contexto.fillStyle = "rgb(89, 165, 140)";
   // borda
    contexto.fillRect(0, 0, 16 * caixa, 16 * caixa);
     contexto.strokeStyle = "black";     // Cor da borda
    contexto.lineWidth = 4; 
     contexto.strokeRect(0, 0, 16 * caixa, 16 * caixa);
     
}


function criarCobrinha() {
    for (i=0; i < snake.length; i++){ // len conta a lista
        contexto.fillStyle = "lightgreen";
         
    
    
        contexto.beginPath();    
      contexto.strokeStyle = "green";     // Cor da borda
      contexto.lineWidth = 4; 
      contexto.roundRect(snake[i].x, snake[i].y, caixa, caixa, 6);
      contexto.fill();
      contexto.stroke();
     
        contexto.beginPath();
        contexto.roundRect(snake[i].x, snake[i].y, caixa, caixa, 8);
        contexto.fill();

        contexto.shadowColor = 'rgba(0,0,0,0.5)'; // Cor da sombra
        contexto.shadowBlur = 10;                 // Nível de desfoque
        contexto.shadowOffsetX = 4;               // Deslocamento horizontal
        contexto.shadowOffsetY = 4;               // Deslocamento vertical

        

        // contexto.fillRect() = desenha um retangulo preenchido no canvas
    }   // contexto.fillRect(coord x, coord y, largura, altura)

}



function desenharComida(){
    contexto.fillStyle = "red"
    contexto.beginPath();
      contexto.strokeStyle = "darkred";     // Cor da borda
      contexto.lineWidth = 5; 
      contexto.roundRect(comida.x, comida.y, caixa, caixa, 15);
      contexto.fill();
      contexto.stroke();
     
        contexto.beginPath();
        contexto.roundRect(comida.x, comida.y, caixa, caixa, 15);
        contexto.fill();
        
         // Cabinho marrom
  let cabinhoLargura = 4;
  let cabinhoAltura = 10;
  let cabinhoX = comida.x + caixa / 2 - cabinhoLargura / 2;
  let cabinhoY = comida.y - cabinhoAltura + 2; // pequeno ajuste para parecer que sai da maçã

  contexto.fillStyle = "#5C3317"; // marrom
  contexto.fillRect(cabinhoX, cabinhoY, cabinhoLargura, cabinhoAltura);

  let folhaX = cabinhoX + 4;
  let folhaY = cabinhoY;

  contexto.fillStyle = "#228B22"; // verde escuro
  contexto.beginPath();
  contexto.moveTo(folhaX, folhaY); // início da folha (base do cabinho)
  contexto.quadraticCurveTo(folhaX + 6, folhaY - 10, folhaX + 12, folhaY); // curva pra cima
  contexto.quadraticCurveTo(folhaX + 6, folhaY - 6, folhaX, folhaY); // volta à base
  contexto.fill();

  
}







document.addEventListener('keydown', atualizarDirecao);

function atualizarDirecao(evento) {
    if(evento.keyCode == 37 && direcao !='direita') direcao = 'esquerda'
    if(evento.keyCode == 38 && direcao !='baixo') direcao = 'cima'
    if(evento.keyCode == 39 && direcao !='esquerda') direcao = 'direita'
    if(evento.keyCode == 40 && direcao !='cima') direcao = 'baixo'

}

    //decoração
    
      function desenharMatinho(x, y) {
        // escolher cor aleatória do array
        
        contexto.fillStyle = "green";
      
        for (let i = 0; i < 5; i++) {
          let offsetX = Math.random() * 10 - 5;
          let offsetY = Math.random() * 10 - 5;
          contexto.beginPath();
          contexto.arc(x + offsetX, y + offsetY, 5, 0, 2 * Math.PI);
          contexto.fill();
        }
      }

      function desenharFlor(x, y) {
        contexto.fillStyle = "yellow";
        contexto.beginPath();
        contexto.arc(x, y, 4, 0, 2 * Math.PI); // miolo
        contexto.fill();
        contexto.fillStyle = "lightblue";
        for (let i = 0; i < 5; i++) {
            let angle = (i * 2 * Math.PI) / 5;
            contexto.beginPath();
            contexto.arc(x + Math.cos(angle) * 8, y + Math.sin(angle) * 8, 3, 0, 2 * Math.PI);
            contexto.fill();
        }
    }
    
  

function iniciarJogo() {
// teletranportar a cobra ao ultrapassar as bordas
    if (snake[0].x > 15 * caixa && direcao == 'direita') snake[0].x = 0;
    if (snake[0].x < 0 && direcao == 'esquerda') snake[0].x = 16 * caixa;
    if (snake[0].y > 15 * caixa && direcao == 'baixo') snake[0].y = 0;
    if (snake[0].y < 0 && direcao == 'cima') snake[0].y = 16 * caixa;

    

    // verificar colisao da cabeça com o corpo
    for (let i = 1; i< snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert('fim de jogo');
            
        }
    }
document.getElementById("#reiniciar").addEventListener("click", function () {
  clearInterval(jogo); // para o jogo atual
  location.reload();   // recarrega a página
});


    criarFundo(); // aqui se chama a function 
desenharMatinho(3 * caixa, 3 * caixa); // matinho no canto superior esquerdo
desenharMatinho(12 * caixa, 12 * caixa); // matinho no canto inferior direito
desenharMatinho(7 * caixa, 6 * caixa);
desenharMatinho(9 * caixa, 1 * caixa);
desenharMatinho(3 * caixa, 15 * caixa);
desenharMatinho(15 * caixa, 7 * caixa);
desenharMatinho(8 * caixa, 10 * caixa);
desenharMatinho(10 * caixa, 5 * caixa);
desenharMatinho(3 * caixa, 2 * caixa);
desenharMatinho(2 * caixa, 7 * caixa);
desenharFlor(4 * caixa, 7 * caixa); // flor 
desenharFlor(10 * caixa, 10 * caixa);
desenharFlor(6 * caixa, 12 * caixa);
desenharFlor(6 * caixa, 2 * caixa);
desenharFlor(15 * caixa, 5 * caixa);



    criarCobrinha();
    desenharComida();


  
    let snakeX =snake[0].x;
    let snakeY =snake[0].y;

    if (direcao == "direita") snakeX +=caixa;
    if (direcao == "esquerda") snakeX -=caixa;
    if (direcao == 'cima') snakeY -=caixa;
    if (direcao == 'baixo') snakeY +=caixa;

    // verificar se comeu a comida
    if(snakeX != comida.x || snakeY != comida.y){
        snake.pop();
    } else {
        comida.x = Math.floor(Math.random() * 15 + 1) * caixa;
        comida.y = Math.floor(Math.random() * 15 + 1) * caixa;

    }
    let novaCabeca = {
        x: snakeX,
        y: snakeY
    }
    snake.unshift(novaCabeca);
}
let jogo = setInterval(iniciarJogo, 200);


