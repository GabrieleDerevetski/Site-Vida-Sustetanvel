/*
    Projeto: Vida Sustentável
    Disciplina: Desenvolvimento Front-End para Web (DFEW.08) - Universidade Positivo
    Equipe: Rafaela de Souza Tavares e Gabriele Derevetski Pereira
    Arquivo: js/checklist.js
    Descrição: checklist de hábitos sustentáveis com cadastro de novos hábitos e
    armazenamento no localStorage, para que os dados não se percam ao fechar a página.
*/

const CHAVE_HABITOS = "vidaSustentavel.habitos";

const habitosIniciais = [
    { id: 1, texto: "Separei o lixo reciclável do orgânico", feito: false },
    { id: 2, texto: "Fechei a torneira ao escovar os dentes", feito: false },
    { id: 3, texto: "Desliguei luzes e aparelhos que não estavam em uso", feito: false },
    { id: 4, texto: "Levei sacola reutilizável às compras", feito: false },
    { id: 5, texto: "Fiz um trajeto a pé, de bicicleta ou de transporte coletivo", feito: false }
];

let habitos = [];

function carregarHabitos() {
    const salvo = localStorage.getItem(CHAVE_HABITOS);

    if (salvo) {
        habitos = JSON.parse(salvo);
    } else {
        habitos = habitosIniciais.slice();
        salvarHabitos();
    }
}

function salvarHabitos() {
    localStorage.setItem(CHAVE_HABITOS, JSON.stringify(habitos));
}

function mensagemDeProgresso(percentual) {
    if (percentual === 100) {
        return "Parabéns! Você cumpriu todos os hábitos de hoje.";
    } else if (percentual >= 60) {
        return "Muito bem! Falta pouco para completar o dia.";
    } else if (percentual > 0) {
        return "Bom começo! Continue marcando seus hábitos.";
    }
    return "Marque os hábitos que você já cumpriu hoje.";
}

function atualizarProgresso() {
    const barra = document.getElementById("barra-progresso");
    const texto = document.getElementById("texto-progresso");
    const total = habitos.length;
    let concluidos = 0;

    for (let i = 0; i < habitos.length; i++) {
        if (habitos[i].feito) {
            concluidos++;
        }
    }

    const percentual = total === 0 ? 0 : Math.round((concluidos / total) * 100);

    barra.style.width = percentual + "%";
    barra.textContent = percentual + "%";
    barra.parentElement.setAttribute("aria-valuenow", percentual);
    texto.textContent = concluidos + " de " + total + " hábitos concluídos. " + mensagemDeProgresso(percentual);
}

function alternarHabito(id) {
    for (let i = 0; i < habitos.length; i++) {
        if (habitos[i].id === id) {
            habitos[i].feito = !habitos[i].feito;
        }
    }

    salvarHabitos();
    desenharHabitos();
}

function removerHabito(id) {
    habitos = habitos.filter(function (habito) {
        return habito.id !== id;
    });

    salvarHabitos();
    desenharHabitos();
}

function desenharHabitos() {
    const lista = document.getElementById("lista-habitos");
    lista.innerHTML = "";

    if (habitos.length === 0) {
        const vazio = document.createElement("li");
        vazio.className = "list-group-item text-muted";
        vazio.textContent = "Nenhum hábito cadastrado. Adicione o primeiro acima.";
        lista.appendChild(vazio);
    }

    for (let i = 0; i < habitos.length; i++) {
        const habito = habitos[i];

        const item = document.createElement("li");
        item.className = "list-group-item d-flex align-items-center" + (habito.feito ? " feito" : "");

        const caixa = document.createElement("input");
        caixa.type = "checkbox";
        caixa.className = "form-check-input mt-0";
        caixa.id = "habito-" + habito.id;
        caixa.checked = habito.feito;
        caixa.addEventListener("change", function () {
            alternarHabito(habito.id);
        });

        const rotulo = document.createElement("label");
        rotulo.className = "lista-habitos-rotulo";
        rotulo.setAttribute("for", caixa.id);
        rotulo.textContent = habito.texto;

        const botao = document.createElement("button");
        botao.type = "button";
        botao.className = "btn btn-outline-danger btn-sm";
        botao.textContent = "Remover";
        botao.setAttribute("aria-label", "Remover hábito: " + habito.texto);
        botao.addEventListener("click", function () {
            removerHabito(habito.id);
        });

        item.appendChild(caixa);
        item.appendChild(rotulo);
        item.appendChild(botao);
        lista.appendChild(item);
    }

    atualizarProgresso();
}

function adicionarHabito(evento) {
    evento.preventDefault();

    const campo = document.getElementById("novo-habito");
    const aviso = document.getElementById("aviso-habito");
    const texto = campo.value.trim();

    if (texto.length < 5) {
        aviso.className = "alert alert-warning mt-3";
        aviso.textContent = "Descreva o hábito com pelo menos 5 caracteres.";
        return;
    }

    let proximoId = 1;

    for (let i = 0; i < habitos.length; i++) {
        if (habitos[i].id >= proximoId) {
            proximoId = habitos[i].id + 1;
        }
    }

    habitos.push({ id: proximoId, texto: texto, feito: false });
    salvarHabitos();
    desenharHabitos();

    campo.value = "";
    aviso.className = "alert alert-success mt-3";
    aviso.textContent = "Hábito adicionado e salvo neste navegador.";
}

function desmarcarTodos() {
    for (let i = 0; i < habitos.length; i++) {
        habitos[i].feito = false;
    }

    salvarHabitos();
    desenharHabitos();
}

document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("form-habito");
    const botaoLimpar = document.getElementById("botao-desmarcar");

    carregarHabitos();
    desenharHabitos();

    formulario.addEventListener("submit", adicionarHabito);
    botaoLimpar.addEventListener("click", desmarcarTodos);
});
