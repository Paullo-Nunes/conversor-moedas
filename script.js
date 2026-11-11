const convertButton = document.querySelector(".convert-button")
const moedaSelecionada = document.getElementById("moeda-selecionada")

async function convertValues() {
    const valorInformado = document.querySelector(".valor-moeda").value
        .trim()
        .replace(/^R\$\s*/i, "")
        .replace(/\./g, "")
        .replace(",", ".")
    const valorInicial = Number(valorInformado)

    const valorParaConverter = document.querySelector(".moeda-entrada") //moeda Real

    const valorConvertido = document.querySelector(".moeda-saida") //outras moedas

    if (!Number.isFinite(valorInicial) || valorInicial <= 0) {
        alert("Digite um valor válido em reais, por exemplo: 10.000,00.")
        return
    }

    //Fazendo a requisição para a API de cotação de moedas

    const data = await fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,GBP-BRL,BTC-BRL").then(response => response.json());
    

    if (moedaSelecionada.value == "Dolar") {
        valorConvertido.innerHTML = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
        }).format(valorInicial / data.USDBRL.bid)
    }

    if (moedaSelecionada.value == "Euro") {
        valorConvertido.innerHTML = new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR"
        }).format(valorInicial / data.EURBRL.bid)
    }

    if (moedaSelecionada.value == "Libra") {
        valorConvertido.innerHTML = new Intl.NumberFormat("en-GB", {
            style: "currency",
            currency: "GBP"

        }).format(valorInicial / data.GBPBRL.bid)

    }

    if (moedaSelecionada.value == "Bitcoin") {
        const quantidadeBitcoin = valorInicial / data.BTCBRL.bid
        valorConvertido.textContent = `${new Intl.NumberFormat("pt-BR", {
            maximumFractionDigits: 8
        }).format(quantidadeBitcoin)} BTC`
    }
    //Ferramenta de conversão de moedas do javascript "Intel.NumberFormat" ler documentação
    valorParaConverter.textContent = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    }).format(valorInicial)



}

//Mudando de moeda

function mudarMoeda() {
    const nomeMoeda = document.querySelector(".moeda-dolar")//buscando pelo texto
    const imageMoeda = document.querySelector(".imagem-dolar")

    if (moedaSelecionada.value == "Dolar") {
        nomeMoeda.innerHTML = "Dólar americano"
        imageMoeda.src = "./assets/estados-unidos.png"

    }
    if (moedaSelecionada.value == "Euro") {
        nomeMoeda.innerHTML = "Euro"
        imageMoeda.src = "./assets/euro-imagem.png"

    }

    if (moedaSelecionada.value == "Libra") {
        nomeMoeda.innerHTML = "Libra"
        imageMoeda.src = "./assets/libra-imagem.png"

    }

    if (moedaSelecionada.value == "Bitcoin") {
        nomeMoeda.innerHTML = "Bitcoin"
        imageMoeda.src = "./assets/bitcoin1.png"

    }

    convertValues()


}
moedaSelecionada.addEventListener("change", mudarMoeda)
convertButton.addEventListener("click", convertValues)