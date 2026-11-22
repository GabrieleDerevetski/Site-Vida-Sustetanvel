/*
    Projeto: Vida Sustentável
    Disciplina: Desenvolvimento Front-End para Web (DFEW.08) - Universidade Positivo
    Equipe: Rafaela de Souza Tavares e Gabriele Derevetski Pereira
    Arquivo: js/midia.js
    Descrição: controles extras para o vídeo e o áudio da página de mídia (JavaScript puro).
*/

function formatarDuracao(segundos) {
    const minutos = Math.floor(segundos / 60);
    const resto = Math.round(segundos % 60);
    return minutos + " min " + (resto < 10 ? "0" : "") + resto + " s";
}

function mostrarDuracao(elemento, alvo) {
    if (isFinite(elemento.duration)) {
        alvo.textContent = "Duração: " + formatarDuracao(elemento.duration);
    } else {
        alvo.textContent = "Duração indisponível";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const video = document.getElementById("video-principal");
    const audio = document.getElementById("audio-principal");
    const duracaoVideo = document.getElementById("duracao-video");
    const duracaoAudio = document.getElementById("duracao-audio");
    const botoesVelocidade = document.querySelectorAll("[data-velocidade]");
    const repetir = document.getElementById("repetir-audio");
    const estadoVelocidade = document.getElementById("estado-velocidade");

    video.addEventListener("loadedmetadata", function () {
        mostrarDuracao(video, duracaoVideo);
    });

    audio.addEventListener("loadedmetadata", function () {
        mostrarDuracao(audio, duracaoAudio);
    });

    botoesVelocidade.forEach(function (botao) {
        botao.addEventListener("click", function () {
            const velocidade = Number(botao.dataset.velocidade);
            video.playbackRate = velocidade;
            estadoVelocidade.textContent = "Velocidade atual do vídeo: " + velocidade + "x";

            botoesVelocidade.forEach(function (outro) {
                outro.classList.remove("ativo");
            });

            botao.classList.add("ativo");
        });
    });

    repetir.addEventListener("change", function () {
        audio.loop = repetir.checked;
    });
});
