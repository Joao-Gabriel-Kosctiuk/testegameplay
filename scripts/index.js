const player = document.getElementById('player');
const velocidade = 10; // Velocidade em pixels por quadro (menor para suavidade)

// Objeto para rastrear o estado das teclas (quais estão pressionadas)
const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
    w: false, s: false, a: false, d: false // Inclui WASD
};

// --- Listeners de Eventos (Mantidos iguais) ---

document.addEventListener('keydown', (event) => {
    if (keys.hasOwnProperty(event.key)) {
        keys[event.key] = true;
        event.preventDefault(); 
    }
});

document.addEventListener('keyup', (event) => {
    if (keys.hasOwnProperty(event.key)) {
        keys[event.key] = false;
        event.preventDefault(); 
    }
});

let posicaoY = parseInt(player.style.top) || 100;
let posicaoX = parseInt(player.style.left) || 100;

function moverPlayer() {
    let deltaX = 0; 
    let deltaY = 0; 

    // 1. Calcular o movimento (Delta)
    if (keys.ArrowUp || keys.w) { deltaY -= velocidade; }
    if (keys.ArrowDown || keys.s) { deltaY += velocidade; }
    if (keys.ArrowLeft || keys.a) { deltaX -= velocidade; }
    if (keys.ArrowRight || keys.d) { deltaX += velocidade; }
    
    // 2. Calcular a Posição Futura Tentativa
    let novaPosX = posicaoX + deltaX;
    let novaPosY = posicaoY + deltaY;

    // 3. --- VERIFICAÇÃO DE LIMITES (AS PAREDES) ---

    // Limites da Viewport
    const larguraMaxima = window.innerWidth;
    const alturaMaxima = window.innerHeight;
    
    // Dimensões do Jogador
    const larguraPlayer = player.offsetWidth;
    const alturaPlayer = player.offsetHeight;

    // Limite Esquerdo (0): Não deixa a posição X ser menor que zero.
    if (novaPosX < 0) {
        novaPosX = 0;
    }

    // Limite Direito: Não deixa a borda direita do player ultrapassar a largura da tela.
    // A posição (left) máxima é a largura da tela MENOS a largura do player.
    if (novaPosX + larguraPlayer > larguraMaxima) {
        novaPosX = larguraMaxima - larguraPlayer;
    }

    // Limite Superior (0): Não deixa a posição Y ser menor que zero.
    if (novaPosY < 0) {
        novaPosY = 0;
    }

    // Limite Inferior: Não deixa a borda inferior do player ultrapassar a altura da tela.
    // A posição (top) máxima é a altura da tela MENOS a altura do player.
    if (novaPosY + alturaPlayer > alturaMaxima) {
        novaPosY = alturaMaxima - alturaPlayer;
    }

    // 4. Aplicar a nova posição validada
    posicaoX = novaPosX;
    posicaoY = novaPosY;
    player.style.left = posicaoX + 'px';
    player.style.top = posicaoY + 'px';
    
    // 5. Loop de Animação
    requestAnimationFrame(moverPlayer);
}



// Inicia o loop
requestAnimationFrame(moverPlayer);