document.querySelector('#buscar').addEventListener('click', async (Event) => {
    Event.preventDefault()
    var cidadeNome = document.querySelector('#cidade').value
    if (!cidadeNome) {
        alert('Preencha o nome da cidade')
    }
    // Recolhendo o código da cidade atráves do nome
    var apiKey = {method: 'GET', headers: {Authorization: 'Bearer zpka_a7b5081ba5434130baa1bee2334e9c9c_2752036a'}}
    var apiUrl = `https://dataservice.accuweather.com/locations/v1/cities/search?q=${encodeURI(cidadeNome)}&language=pt-br&details=true`
    var results = await fetch(apiUrl, apiKey)
    var json = await results.json()
    var cidadeDados = {nome: json[0].EnglishName, code: json[0].Key, pais: json[0].Country.ID}

    // Recolhendo os dados climáticos atráves do código da cidade
    var apiKey = {method: 'GET', headers: {Authorization: 'Bearer zpka_a7b5081ba5434130baa1bee2334e9c9c_2752036a'}}
    var apiUrl = `https://dataservice.accuweather.com/currentconditions/v1/${encodeURI(cidadeDados.code)}?language=pt-br`
    
    var results = await fetch(apiUrl, apiKey)
    var json = await results.json()

    cardDados(json, cidadeDados)
})

function cardDados(json, cidadeDados) {
    const temperatura = json[0].Temperature.Metric.Value
    const tempo = json[0].WeatherText
    const divCentral = document.querySelector('#centralResultadosBusca')
    apagarConteudo()
    divCentral.innerHTML += `
    <arcticle>
        <h2>${cidadeDados.nome}</h2>
        <small>${cidadeDados.pais}</small>
        <p>Temp. ${temperatura} </br> Tempo: ${tempo}</p>
    </arcticle>
    `
}

function apagarConteudo() {
    document.getElementById('cidade').value = ''
}