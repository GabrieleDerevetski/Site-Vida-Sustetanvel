/*
    Projeto: Vida Sustentável
    Disciplina: Desenvolvimento Front-End para Web (DFEW.08) - Universidade Positivo
    Equipe: Rafaela de Souza Tavares e Gabriele Derevetski Pereira
    Arquivo: js/calculadoras.js
    Descrição: calculadoras de energia (consumo de aparelho e troca por LED) e de água (consumo diário).
*/

const faixasEnergia = [
    { limite: 10, classe: "success", texto: "Consumo baixo. Continue assim!" },
    { limite: 50, classe: "info", texto: "Consumo moderado. Vale conferir se o aparelho fica ligado sem necessidade." },
    { limite: 100, classe: "warning", texto: "Consumo alto. Reduzir o tempo de uso faz diferença na conta." },
    { limite: Infinity, classe: "danger", texto: "Consumo muito alto. Este aparelho pesa bastante na conta de luz." }
];

const faixasAgua = [
    { limite: 110, classe: "success", texto: "Excelente: você está dentro da referência de cerca de 110 litros por pessoa por dia." },
    { limite: 200, classe: "warning", texto: "Atenção: há espaço para economizar, principalmente no banho." },
    { limite: Infinity, classe: "danger", texto: "Consumo alto. Reduzir o tempo de banho e fechar a torneira ajuda muito." }
];

function formatarNumero(valor, casas) {
    return valor.toLocaleString("pt-BR", { minimumFractionDigits: casas, maximumFractionDigits: casas });
}

function escolherFaixa(faixas, valor) {
    for (let i = 0; i < faixas.length; i++) {
        if (valor <= faixas[i].limite) {
            return faixas[i];
        }
    }
    return faixas[faixas.length - 1];
}

function lerNumero(id) {
    return parseFloat(document.getElementById(id).value);
}

function calcularEnergia(evento) {
    evento.preventDefault();

    const potencia = lerNumero("potencia");
    const horas = lerNumero("horas-dia");
    const dias = lerNumero("dias-mes");
    const tarifa = lerNumero("tarifa");
    const caixa = document.getElementById("resultado-energia");

    if (isNaN(potencia) || isNaN(horas) || isNaN(dias) || isNaN(tarifa)) {
        caixa.className = "alert alert-warning mt-3";
        caixa.textContent = "Preencha todos os campos com números.";
        return;
    }

    const kwh = (potencia * horas * dias) / 1000;
    const custo = kwh * tarifa;
    const faixa = escolherFaixa(faixasEnergia, kwh);

    caixa.className = "alert alert-" + faixa.classe + " mt-3";
    caixa.innerHTML = "Consumo estimado: <strong>" + formatarNumero(kwh, 2) + " kWh/mês</strong>, cerca de <strong>R$ " + formatarNumero(custo, 2) + "</strong> por mês.<br>" + faixa.texto;
}

function calcularTrocaPorLed(evento) {
    evento.preventDefault();

    const quantidade = lerNumero("qtd-lampadas");
    const horas = lerNumero("horas-lampada");
    const tarifa = lerNumero("tarifa-led");
    const caixa = document.getElementById("resultado-led");

    if (isNaN(quantidade) || isNaN(horas) || isNaN(tarifa)) {
        caixa.className = "alert alert-warning mt-3";
        caixa.textContent = "Preencha todos os campos com números.";
        return;
    }

    const consumoAntigo = (quantidade * 60 * horas * 30) / 1000;
    const consumoLed = (quantidade * 9 * horas * 30) / 1000;
    const economiaKwh = consumoAntigo - consumoLed;
    const economiaReais = economiaKwh * tarifa;

    caixa.className = "alert alert-success mt-3";
    caixa.innerHTML = "Trocando " + quantidade + " lâmpada(s) incandescente(s) de 60 W por LED de 9 W, você economiza cerca de <strong>" + formatarNumero(economiaKwh, 2) + " kWh</strong> e <strong>R$ " + formatarNumero(economiaReais, 2) + "</strong> por mês.";
}

function calcularAgua(evento) {
    evento.preventDefault();

    const minutosBanho = lerNumero("minutos-banho");
    const vazao = lerNumero("vazao-chuveiro");
    const descargas = lerNumero("descargas-dia");
    const litrosDescarga = lerNumero("litros-descarga");
    const minutosDentes = lerNumero("minutos-dentes");
    const caixa = document.getElementById("resultado-agua");

    if (isNaN(minutosBanho) || isNaN(descargas) || isNaN(minutosDentes)) {
        caixa.className = "alert alert-warning mt-3";
        caixa.textContent = "Preencha todos os campos com números.";
        return;
    }

    const banho = minutosBanho * vazao;
    const sanitario = descargas * litrosDescarga;
    const dentes = minutosDentes * 2;
    const totalDia = banho + sanitario + dentes;
    const totalMes = totalDia * 30;
    const faixa = escolherFaixa(faixasAgua, totalDia);

    caixa.className = "alert alert-" + faixa.classe + " mt-3";
    caixa.innerHTML = "Banho: " + formatarNumero(banho, 0) + " L | Descargas: " + formatarNumero(sanitario, 0) + " L | Escovação: " + formatarNumero(dentes, 0) + " L<br>Total: <strong>" + formatarNumero(totalDia, 0) + " litros por dia</strong> (" + formatarNumero(totalMes, 0) + " litros por mês).<br>" + faixa.texto;
}

document.addEventListener("DOMContentLoaded", function () {
    const formEnergia = document.getElementById("form-energia");
    const formLed = document.getElementById("form-led");
    const formAgua = document.getElementById("form-agua");

    if (formEnergia) {
        formEnergia.addEventListener("submit", calcularEnergia);
    }

    if (formLed) {
        formLed.addEventListener("submit", calcularTrocaPorLed);
    }

    if (formAgua) {
        formAgua.addEventListener("submit", calcularAgua);
    }
});
