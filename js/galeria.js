/*
    Projeto: Vida Sustentável
    Disciplina: Desenvolvimento Front-End para Web (DFEW.08) - Universidade Positivo
    Equipe: Rafaela de Souza Tavares e Gabriele Derevetski Pereira
    Arquivo: js/galeria.js
    Descrição: filtro por categoria e visualizador ampliado da galeria (JavaScript puro, sem bibliotecas).
*/

function filtrarGaleria(categoria) {
    const itens = document.querySelectorAll(".item-galeria");

    for (let i = 0; i < itens.length; i++) {
        const pertence = categoria === "todas" || itens[i].dataset.categoria === categoria;

        if (pertence) {
            itens[i].classList.remove("oculto");
        } else {
            itens[i].classList.add("oculto");
        }
    }
}

function marcarFiltroAtivo(botaoAtivo) {
    const botoes = document.querySelectorAll(".filtros button");

    for (let i = 0; i < botoes.length; i++) {
        botoes[i].classList.remove("ativo");
        botoes[i].setAttribute("aria-pressed", "false");
    }

    botaoAtivo.classList.add("ativo");
    botaoAtivo.setAttribute("aria-pressed", "true");
}

function abrirVisualizador(figura) {
    const janela = document.getElementById("visualizador");
    const imagem = janela.querySelector("img");
    const legenda = janela.querySelector("p");
    const origem = figura.querySelector("img");

    imagem.src = origem.src;
    imagem.alt = origem.alt;
    legenda.textContent = figura.querySelector("figcaption").textContent;

    if (typeof janela.showModal === "function") {
        janela.showModal();
    } else {
        janela.setAttribute("open", "");
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const botoes = document.querySelectorAll(".filtros button");
    const figuras = document.querySelectorAll(".item-galeria");
    const janela = document.getElementById("visualizador");
    const fechar = document.getElementById("fechar-visualizador");

    botoes.forEach(function (botao) {
        botao.addEventListener("click", function () {
            filtrarGaleria(botao.dataset.filtro);
            marcarFiltroAtivo(botao);
        });
    });

    figuras.forEach(function (figura) {
        figura.querySelector("img").addEventListener("click", function () {
            abrirVisualizador(figura);
        });
    });

    fechar.addEventListener("click", function () {
        janela.close();
    });
});
