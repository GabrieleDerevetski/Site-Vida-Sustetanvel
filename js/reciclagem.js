/*
    Projeto: Vida Sustentável
    Disciplina: Desenvolvimento Front-End para Web (DFEW.08) - Universidade Positivo
    Equipe: Rafaela de Souza Tavares e Gabriele Derevetski Pereira
    Arquivo: js/reciclagem.js
    Descrição: consulta interativa "Qual lixeira?" da página de reciclagem.
*/

const residuos = [
    { nome: "Garrafa PET", cor: "vermelha", material: "plástico", classe: "danger", dica: "Esvazie, enxágue e amasse a garrafa antes de descartar." },
    { nome: "Jornal e revista", cor: "azul", material: "papel", classe: "primary", dica: "Mantenha o papel seco e limpo para que possa ser reciclado." },
    { nome: "Pote de vidro", cor: "verde", material: "vidro", classe: "success", dica: "Retire as tampas e lave o pote. Vidro quebrado deve ser embalado com cuidado." },
    { nome: "Lata de refrigerante", cor: "amarela", material: "metal", classe: "warning", dica: "Enxágue a lata e amasse para ocupar menos espaço." },
    { nome: "Casca de fruta", cor: "marrom", material: "resíduo orgânico", classe: "secondary", dica: "Ideal para compostagem caseira ou para a coleta de orgânicos, quando houver." },
    { nome: "Pilha e bateria", cor: "laranja", material: "resíduo perigoso", classe: "info", dica: "Não vão no lixo comum. Leve a um ponto de coleta específico." },
    { nome: "Embalagem de salgadinho", cor: "cinza", material: "resíduo não reciclável ou misto", classe: "dark", dica: "Embalagens metalizadas misturadas costumam ir para o lixo comum." },
    { nome: "Caixa de papelão", cor: "azul", material: "papel", classe: "primary", dica: "Desmonte a caixa e retire fitas adesivas grandes antes de descartar." }
];

function preencherListaDeResiduos() {
    const seletor = document.getElementById("item-residuo");

    if (!seletor) {
        return;
    }

    for (let i = 0; i < residuos.length; i++) {
        const opcao = document.createElement("option");
        opcao.value = i;
        opcao.textContent = residuos[i].nome;
        seletor.appendChild(opcao);
    }
}

function consultarLixeira(evento) {
    evento.preventDefault();

    const seletor = document.getElementById("item-residuo");
    const caixa = document.getElementById("resultado-residuo");

    if (seletor.value === "") {
        caixa.className = "alert alert-warning mt-3";
        caixa.textContent = "Escolha um item da lista para saber onde descartar.";
        return;
    }

    const item = residuos[Number(seletor.value)];
    caixa.className = "alert alert-" + item.classe + " mt-3";
    caixa.innerHTML = "<strong>" + item.nome + "</strong>: descarte na lixeira <strong>" + item.cor + "</strong> (" + item.material + "). " + item.dica;
}

document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("form-lixeira");

    preencherListaDeResiduos();

    if (formulario) {
        formulario.addEventListener("submit", consultarLixeira);
    }
});
