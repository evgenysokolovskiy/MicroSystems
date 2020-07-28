const weather = require('openweather-apis')
//const url = https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=28401e3d490ab6d999a890e571dbc542
module.exports = function ({ https }) {
    const url =
        'https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=28401e3d490ab6d999a890e571dbc542'

    https.get(url, (res) => {
        res.setEncoding('utf8')
        let body = ''
        res.on('data', (data) => {
            body += data
        })

        res.on('end', () => {
            body = JSON.parse(body)
            console.log(body)
        })
    })
    /*
    app.get('https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=28401e3d490ab6d999a890e571dbc542', function (req, res) {
        console.log(req)
    })
    */

    /*
    async function fetchWeather() {
        const data = await fetch('https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=28401e3d490ab6d999a890e571dbc542')
        console.log(data)
    }

    fetchWeather()
*/
    /*
    weather.setLang('ru')

    weather.setCity('Vologda')

    // 'metric'  'internal'  'imperial'
    weather.setUnits('metric');

    // check http://openweathermap.org/appid#get for get the APPID
    weather.setAPPID('28401e3d490ab6d999a890e571dbc542')


    // get the Temperature  
    weather.getTemperature(function(err, temp){
        console.log(temp);
    });

    // get the Atm Pressure
    weather.getPressure(function(err, pres){
        console.log(pres);
    });

    // get the Humidity
    weather.getHumidity(function(err, hum){
        console.log(hum);
    });

    // get the Description of the weather condition
    weather.getDescription(function(err, desc){
        console.log(desc);
    });

    // get all the JSON file returned from server (rich of info)
    weather.getAllWeather(function(err, JSONObj){
        console.log(JSONObj);
    })
*/
}
