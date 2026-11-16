// Lista de palavras e suas categorias.
const palavras = [
    { nome: "javascript", categoria: "Tecnologia" },
    { nome: "computador", categoria: "Tecnologia" },
    { nome: "internet", categoria: "Tecnologia" },
    { nome: "teclado", categoria: "Tecnologia" },
    { nome: "monitor", categoria: "Tecnologia" },
    { nome: "elefante", categoria: "Animais" },
    { nome: "girafa", categoria: "Animais" },
    { nome: "cachorro", categoria: "Animais" },
    { nome: "borboleta", categoria: "Animais" },
    { nome: "tartaruga", categoria: "Animais" },
    { nome: "abacaxi", categoria: "Alimentos" },
    { nome: "chocolate", categoria: "Alimentos" },
    { nome: "morango", categoria: "Alimentos" },
    { nome: "campina", categoria: "Cidades" },
    { nome: "brasilia", categoria: "Cidades" }
];

// Variáveis que controlam a partida.
let palavraSecreta = "";
let categoriaSecreta = "";
let letrasCorretas = [];
let letrasUsadas = [];
let tentativas = 6;
let jogoAtivo = true;

// Elementos do HTML.
const elementoPalavra = document.getElementById("palavra");
const elementoTentativas = document.getElementById("tentativas");
const elementoCategoria = document.getElementById("categoria");
const inputLetra = document.getElementById("letra");
const mensagem = document.getElementById("mensagem");
const elementoLetrasUsadas = document.getElementById("letras-usadas");
const botaoTentar = document.getElementById("btn-tentar");
const botaoReiniciar = document.getElementById("btn-reiniciar");

// Escolhe uma palavra aleatória e prepara uma nova partida.
function iniciarJogo() {
    const indice = Math.floor(Math.random() * palavras.length);

    palavraSecreta = palavras[indice].nome;
    categoriaSecreta = palavras[indice].categoria;
    letrasCorretas = [];
    letrasUsadas = [];
    tentativas = 6;
    jogoAtivo = true;

    mensagem.textContent = "Digite uma letra para começar!";
    elementoTentativas.textContent = tentativas;
    elementoCategoria.textContent = categoriaSecreta;
    elementoLetrasUsadas.textContent = "Nenhuma";
    inputLetra.value = "";
    inputLetra.disabled = false;
    botaoTentar.disabled = false;

    atualizarPalavra();
    inputLetra.focus();
}

// Mostra as letras descobertas e esconde as outras.
function atualizarPalavra() {
    let exibicao = "";

    for (let i = 0; i < palavraSecreta.length; i++) {
        const letra = palavraSecreta[i];

        if (letrasCorretas.includes(letra)) {
            exibicao += letra + " ";
        } else {
            exibicao += "_ ";
        }
    }

    elementoPalavra.textContent = exibicao.trim();
}

// Confere se todas as letras da palavra foram descobertas.
function venceu() {
    for (let i = 0; i < palavraSecreta.length; i++) {
        const letra = palavraSecreta[i];

        if (!letrasCorretas.includes(letra)) {
            return false;
        }
    }

    return true;
}

// Verifica a letra digitada pelo jogador.
function verificarLetra() {
    if (!jogoAtivo) {
        return;
    }

    const letra = inputLetra.value.trim().toLowerCase();

    if (!/^[a-zá-ú]$/i.test(letra)) {
        mensagem.textContent = "Digite apenas uma letra.";
        inputLetra.value = "";
        inputLetra.focus();
        return;
    }

    if (letrasUsadas.includes(letra)) {
        mensagem.textContent = "Essa letra já foi utilizada!";
        inputLetra.value = "";
        inputLetra.focus();
        return;
    }

    letrasUsadas.push(letra);

    if (palavraSecreta.includes(letra)) {
        letrasCorretas.push(letra);
        mensagem.textContent = "Você acertou! Boa!";
    } else {
        tentativas--;
        mensagem.textContent = "Você errou! Tente outra letra.";
    }

    atualizarPalavra();
    elementoTentativas.textContent = tentativas;
    elementoLetrasUsadas.textContent = letrasUsadas.join(", ");

    if (venceu()) {
        mensagem.textContent = "Parabéns! Você venceu!";
        finalizarJogo();
    } else if (tentativas === 0) {
        mensagem.textContent = "Você perdeu! A palavra era: " + palavraSecreta;
        finalizarJogo();
    }

    inputLetra.value = "";

    if (jogoAtivo) {
        inputLetra.focus();
    }
}

// Bloqueia novas tentativas depois do fim da partida.
function finalizarJogo() {
    jogoAtivo = false;
    inputLetra.disabled = true;
    botaoTentar.disabled = true;
}

// Eventos dos botões e do teclado.
botaoTentar.addEventListener("click", verificarLetra);

botaoReiniciar.addEventListener("click", iniciarJogo);

// Desafio extra: permite jogar apertando Enter.
inputLetra.addEventListener("keydown", function(evento) {
    if (evento.key === "Enter") {
        verificarLetra();
    }
});

// Começa a primeira partida automaticamente.
iniciarJogo();
