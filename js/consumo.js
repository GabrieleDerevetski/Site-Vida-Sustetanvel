/*
    Projeto: Vida Sustentável
    Disciplina: Desenvolvimento Front-End para Web (DFEW.08) - Universidade Positivo
    Equipe: Rafaela de Souza Tavares e Gabriele Derevetski Pereira
    Arquivo: js/consumo.js
    Descrição: questionário de pegada ecológica simplificada da página de consumo consciente.
*/

const perguntasPegada = [
    {
        id: "transporte",
        texto: "Como você se desloca na maior parte dos dias?",
        opcoes: [
            { rotulo: "A pé ou de bicicleta", pontos: 0 },
            { rotulo: "Transporte coletivo", pontos: 1 },
            { rotulo: "Carro ou moto, com carona", pontos: 2 },
            { rotulo: "Carro ou moto, sozinho(a)", pontos: 3 }
        ]
    },
    {
        id: "alimentacao",
        texto: "Quantas vezes por semana você come carne vermelha?",
        opcoes: [
            { rotulo: "Quase nunca", pontos: 0 },
            { rotulo: "1 a 3 vezes", pontos: 1 },
            { rotulo: "4 a 6 vezes", pontos: 2 },
            { rotulo: "Todos os dias", pontos: 3 }
        ]
    },
    {
        id: "lixo",
        texto: "Você separa o lixo reciclável?",
        opcoes: [
            { rotulo: "Sempre", pontos: 0 },
            { rotulo: "Quase sempre", pontos: 1 },
            { rotulo: "Às vezes", pontos: 2 },
            { rotulo: "Nunca", pontos: 3 }
        ]
    },
    {
        id: "compras",
        texto: "Com que frequência você compra itens novos (roupas, eletrônicos)?",
        opcoes: [
            { rotulo: "Só quando preciso", pontos: 0 },
            { rotulo: "Uma vez por trimestre", pontos: 1 },
            { rotulo: "Uma vez por mês", pontos: 2 },
            { rotulo: "Toda semana", pontos: 3 }
        ]
    },
    {
        id: "energia",
        texto: "Você desliga luzes e aparelhos que não estão em uso?",
        opcoes: [
            { rotulo: "Sempre", pontos: 0 },
            { rotulo: "Quase sempre", pontos: 1 },
            { rotulo: "Às vezes", pontos: 2 },
            { rotulo: "Raramente", pontos: 3 }
        ]
    }
];

const niveisPegada = [
    { limite: 4, classe: "success", titulo: "Pegada leve", texto: "Seus hábitos já ajudam bastante o planeta. Compartilhe suas atitudes com amigos e familiares." },
    { limite: 9, classe: "warning", titulo: "Pegada moderada", texto: "Você está no caminho. Escolha um hábito e comece a mudá-lo esta semana pelo checklist." },
    { limite: 15, classe: "danger", titulo: "Pegada pesada", texto: "Há muito espaço para melhorar. Comece pelo checklist de hábitos e avance um passo de cada vez." }
];

function montarQuestionario() {
    const area = document.getElementById("perguntas-pegada");

    if (!area) {
        return;
    }

    for (let i = 0; i < perguntasPegada.length; i++) {
        const pergunta = perguntasPegada[i];
        const grupo = document.createElement("div");
        grupo.className = "mb-3";

        const rotulo = document.createElement("label");
        rotulo.className = "form-label";
        rotulo.setAttribute("for", pergunta.id);
        rotulo.textContent = (i + 1) + ". " + pergunta.texto;

        const seletor = document.createElement("select");
        seletor.className = "form-select";
        seletor.id = pergunta.id;
        seletor.required = true;

        const vazio = document.createElement("option");
        vazio.value = "";
        vazio.textContent = "Selecione uma opção";
        seletor.appendChild(vazio);

        for (let j = 0; j < pergunta.opcoes.length; j++) {
            const opcao = document.createElement("option");
            opcao.value = pergunta.opcoes[j].pontos;
            opcao.textContent = pergunta.opcoes[j].rotulo;
            seletor.appendChild(opcao);
        }

        grupo.appendChild(rotulo);
        grupo.appendChild(seletor);
        area.appendChild(grupo);
    }
}

function calcularPegada(evento) {
    evento.preventDefault();

    let total = 0;

    for (let i = 0; i < perguntasPegada.length; i++) {
        total += Number(document.getElementById(perguntasPegada[i].id).value);
    }

    let nivel = niveisPegada[niveisPegada.length - 1];

    for (let i = 0; i < niveisPegada.length; i++) {
        if (total <= niveisPegada[i].limite) {
            nivel = niveisPegada[i];
            break;
        }
    }

    const caixa = document.getElementById("resultado-pegada");
    caixa.className = "alert alert-" + nivel.classe + " mt-3";
    caixa.innerHTML = "<strong>" + nivel.titulo + "</strong> (" + total + " de " + perguntasPegada.length * 3 + " pontos). " + nivel.texto;
}

document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("form-pegada");

    montarQuestionario();

    if (formulario) {
        formulario.addEventListener("submit", calcularPegada);
    }
});
