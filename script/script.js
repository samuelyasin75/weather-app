document.querySelector('#buscar').addEventListener('click', async (Event) => {
    Event.preventDefault()
    const cidadeNome = document.querySelector('#cidade').value
    if (!cidadeNome) {
        alert('Preencha o nome da cidade')
    }
    // Recolhendo o código da cidade atráves do nome
    var apiKey = {method: 'GET', headers: {Authorization: 'Bearer zpka_a7b5081ba5434130baa1bee2334e9c9c_2752036a'}}
    var apiUrl = `https://dataservice.accuweather.com/locations/v1/cities/search?q=${encodeURI(cidadeNome)}&language=pt-br&details=true`
    var results = await fetch(apiUrl, apiKey)
    var json = await results.json()
    var cidadeCode = json[0].Key
    var pais = json[0].Country.ID

    // Recolhendo os dados climáticos atráves do código da cidade
    var apiKey = {method: 'GET', headers: {Authorization: 'Bearer zpka_a7b5081ba5434130baa1bee2334e9c9c_2752036a'}}
    var apiUrl = `https://dataservice.accuweather.com/currentconditions/v1/${encodeURI(cidadeCode)}?language=pt-br`
    
    var results = await fetch(apiUrl, apiKey)
    var json = await results.json()

    cardDados(json, pais)
})

function cardDados(json, pais) {
    const temperatura = json[0].Temperature.Metric.Value
    const tempo = json[0].WeatherText
    const divCentral = document.querySelector('#centralResultadosBusca')
    divCentral.innerHTML += `
    <arcticle>
        <h2>${document.querySelector('#cidade').value}</h2>
        <small>${pais}</small>
        <p>Temp. ${temperatura} </br> Tempo: ${tempo}</p>
    </arcticle>
    `
}