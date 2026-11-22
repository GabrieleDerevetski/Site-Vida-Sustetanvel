/*
    Projeto: Vida Sustentável
    Disciplina: Desenvolvimento Front-End para Web (DFEW.08) - Universidade Positivo
    Equipe: Rafaela de Souza Tavares e Gabriele Derevetski Pereira
    Arquivo: js/contato.js
    Descrição: formulário de contato com validação nativa, estados visuais e
    armazenamento das mensagens enviadas no localStorage.
*/

const CHAVE_MENSAGENS = "vidaSustentavel.mensagens";

function lerMensagens() {
    const salvo = localStorage.getItem(CHAVE_MENSAGENS);
    return salvo ? JSON.parse(salvo) : [];
}

function gravarMensagens(mensagens) {
    localStorage.setItem(CHAVE_MENSAGENS, JSON.stringify(mensagens));
}

function removerMensagem(indice) {
    const mensagens = lerMensagens();
    mensagens.splice(indice, 1);
    gravarMensagens(mensagens);
    desenharMensagens();
}

function desenharMensagens() {
    const lista = document.getElementById("lista-mensagens");
    const mensagens = lerMensagens();
    lista.innerHTML = "";

    if (mensagens.length === 0) {
        const vazio = document.createElement("li");
        vazio.className = "list-group-item text-muted";
        vazio.textContent = "Nenhuma mensagem enviada ainda.";
        lista.appendChild(vazio);
        return;
    }

    for (let i = mensagens.length - 1; i >= 0; i--) {
        const mensagem = mensagens[i];

        const item = document.createElement("li");
        item.className = "list-group-item";

        const titulo = document.createElement("strong");
        titulo.textContent = mensagem.assunto + " - " + mensagem.nome;

        const data = document.createElement("small");
        data.className = "d-block text-muted";
        data.textContent = mensagem.data + " | " + mensagem.email;

        const texto = document.createElement("p");
        texto.className = "mb-2 mt-1";
        texto.textContent = mensagem.texto;

        const botao = document.createElement("button");
        botao.type = "button";
        botao.className = "btn btn-outline-danger btn-sm";
        botao.textContent = "Excluir";
        botao.addEventListener("click", function () {
            removerMensagem(i);
        });

        item.appendChild(titulo);
        item.appendChild(data);
        item.appendChild(texto);
        item.appendChild(botao);
        lista.appendChild(item);
    }
}

function enviarMensagem(evento) {
    evento.preventDefault();

    const formulario = evento.target;
    const aviso = document.getElementById("aviso-contato");
    const mensagens = lerMensagens();

    mensagens.push({
        nome: document.getElementById("nome").value.trim(),
        email: document.getElementById("email").value.trim(),
        assunto: document.getElementById("assunto").value,
        texto: document.getElementById("mensagem").value.trim(),
        data: new Date().toLocaleString("pt-BR")
    });

    gravarMensagens(mensagens);
    desenharMensagens();

    formulario.reset();
    formulario.classList.remove("validado");

    aviso.className = "alert alert-success mt-3";
    aviso.textContent = "Mensagem registrada com sucesso. Ela fica salva neste navegador.";
}

document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("form-contato");
    const botaoEnviar = document.getElementById("botao-enviar");
    const aviso = document.getElementById("aviso-contato");

    desenharMensagens();

    botaoEnviar.addEventListener("click", function () {
        formulario.classList.add("validado");

        if (!formulario.checkValidity()) {
            aviso.className = "alert alert-danger mt-3";
            aviso.textContent = "Revise os campos destacados antes de enviar.";
        }
    });

    formulario.addEventListener("submit", enviarMensagem);
});
