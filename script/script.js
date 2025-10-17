document.querySelector('#buscar').addEventListener('click', async (Event) => {
    Event.preventDefault()
    var cidadeNome = document.querySelector('#cidade').value
    apagarConteudo()
    if (!cidadeNome) {
        alert('Preencha o nome da cidade')
    }
    // Recolhendo o código da cidade atráves do nome
    var apiKey = {method: 'GET', headers: {Authorization: 'Bearer zpka_8111cf3b21b2491cbd9a140cfe47a967_04b7d335'}}
    var apiUrl = `https://dataservice.accuweather.com/locations/v1/cities/search?q=${encodeURI(cidadeNome)}&language=pt-br&details=true`
    var results = await fetch(apiUrl, apiKey)
    var json = await results.json()
    var cidadeDados = {nome: json[0].EnglishName, code: json[0].Key, pais: json[0].Country.ID} 

    // Recolhendo os dados climáticos atráves do código da cidade
    var apiKey = {method: 'GET', headers: {Authorization: 'Bearer zpka_8111cf3b21b2491cbd9a140cfe47a967_04b7d335'}}
    var apiUrl = `https://dataservice.accuweather.com/currentconditions/v1/${cidadeDados.code}?language=pt-br`
    
    var results = await fetch(apiUrl, apiKey)
    var json = await results.json()
    console.log(json)
    cardDados(json, cidadeDados)
})

// functions para determinar emojis de acordo com os dados da cidade
function diaOuNoite(json) {
    if (json[0].IsDayTime == true) {
        return '&#x1F506; Dia'
    } else {
        return '&#x1F319; Noite'
    }
}

function temperatCidade(json) {
    var tempCidade = json[0].Temperature.Metric.Value
    if (tempCidade >= 22) {
        var emote = '&#x1F525;'
    } else {
        var emote = '&#x1F9CA;'
    }

    return `${emote} ${tempCidade}°C`
}

function tempoCidade(json) {
    var tempo = json[0].WeatherIcon
    if (tempo >= 6) {
        return '&#x1F325; Nublado'
    } else {
        return '&#x2600; Ensolarado'
    }
}

function cardDados(json, cidadeDados) {
    const divCentral = document.querySelector('#centralResultadosBusca')
    apagarConteudo()
    divCentral.innerHTML += `
    <article>
        <h2>${cidadeDados.nome}</h2>
        <small>${cidadeDados.pais}</small>
        <p>${diaOuNoite(json)} <br> ${temperatCidade(json)} </br> ${tempoCidade(json)}</p>
    </article>
    `
}

function apagarConteudo() {
    document.getElementById('cidade').value = ''
}