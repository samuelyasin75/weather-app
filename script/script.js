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
    var cidadeDados = {nome: json[0].EnglishName, code: json[0].Key, pais: json[0].Country.ID, isDay: function () {if(json[0].IsDayTime == true) {return '&#x1F506;'} else { return '&#x1F319;'}}} 

    // Recolhendo os dados climáticos atráves do código da cidade
    var apiKey = {method: 'GET', headers: {Authorization: 'Bearer zpka_8111cf3b21b2491cbd9a140cfe47a967_04b7d335'}}
    var apiUrl = `https://dataservice.accuweather.com/currentconditions/v1/${cidadeDados.code}?language=pt-br`
    
    var results = await fetch(apiUrl, apiKey)
    var json = await results.json()
    console.log(json)
    cardDados(json, cidadeDados)
})

function cardDados(json, cidadeDados) {
    const temperatura = json[0].Temperature.Metric.Value
    const tempo = json[0].WeatherText
    const divCentral = document.querySelector('#centralResultadosBusca')
    apagarConteudo()
    divCentral.innerHTML += `
    <article>
        <h2>${cidadeDados.nome}</h2>
        <small>${cidadeDados.pais}</small>
        <p>Horário: ${cidadeDados.isDay()}Temp. ${temperatura} </br> ${tempo}</p>
    </article>
    `
}

function apagarConteudo() {
    document.getElementById('cidade').value = ''
}