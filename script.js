const convertButton = document.querySelector(".convert-button")
const moedaSelecionada = document.getElementById("moeda-selecionada")

async function convertValues() {
    const valorInicial = document.querySelector(".valor-moeda").value

    const valorParaConverter = document.querySelector(".moeda-entrada") //moeda Real

    const valorConvertido = document.querySelector(".moeda-saida") //outras moedas

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
        valorConvertido.innerHTML = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"

        }).format(valorInicial / data.BTCBRL.bid)

    }
    //Ferramenta de conversão de moedas do javascript "Intel.NumberFormat" ler documentação
    valorParaConverter.innerHTML = new Intl.NumberFormat("pt-BR", {
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