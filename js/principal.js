/*
    Projeto: Vida Sustentável
    Disciplina: Desenvolvimento Front-End para Web (DFEW.08) - Universidade Positivo
    Equipe: Rafaela de Souza Tavares e Gabriele Derevetski Pereira
    Arquivo: js/principal.js
    Descrição: comportamentos comuns a todas as páginas (menu das páginas sem Bootstrap,
    ano do rodapé e dica sustentável do dia).
*/

const dicasDoDia = [
    "Leve uma sacola reutilizável ao mercado e diga não às sacolas descartáveis.",
    "Desligue da tomada os aparelhos que ficam em modo de espera.",
    "Feche a torneira enquanto escova os dentes ou ensaboa a louça.",
    "Separe o lixo reciclável do orgânico e lave as embalagens antes de descartar.",
    "Prefira ir a pé, de bicicleta ou de transporte coletivo em trajetos curtos.",
    "Aproveite a luz natural durante o dia e troque lâmpadas antigas por LED.",
    "Planeje as refeições da semana para evitar o desperdício de alimentos.",
    "Conserte, doe ou troque objetos antes de comprar algo novo.",
    "Use uma garrafa reutilizável em vez de comprar água em garrafas descartáveis.",
    "Reaproveite a água da chuva para lavar calçadas e regar as plantas."
];

function iniciarMenuPuro() {
    const botao = document.getElementById("botao-menu");
    const lista = document.getElementById("lista-menu");

    if (!botao || !lista) {
        return;
    }

    botao.addEventListener("click", function () {
        const aberta = lista.classList.toggle("aberta");
        botao.setAttribute("aria-expanded", aberta ? "true" : "false");
    });
}

function mostrarAnoAtual() {
    const alvo = document.getElementById("ano-atual");

    if (alvo) {
        alvo.textContent = new Date().getFullYear();
    }
}

function iniciarDicaDoDia() {
    const texto = document.getElementById("dica-texto");
    const botao = document.getElementById("botao-dica");

    if (!texto) {
        return;
    }

    let indice = new Date().getDate() % dicasDoDia.length;
    texto.textContent = dicasDoDia[indice];

    if (botao) {
        botao.addEventListener("click", function () {
            indice = (indice + 1) % dicasDoDia.length;
            texto.textContent = dicasDoDia[indice];
        });
    }
}

document.addEventListener("DOMContentLoaded", function () {
    iniciarMenuPuro();
    mostrarAnoAtual();
    iniciarDicaDoDia();
});
