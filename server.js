const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const request = require('request');

const apiKey = '5d82eb3b51efbf82cc9106657f559823';


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').__express);



app.get('/', function(req, res) {
    res.render('index');
});

app.post('/', function(req, res) {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    request(url, function(err, response, body) {
        if(err) {
            res.render('index', {weather: null, error: 'Error, please try again'});
        }
        else {
            let weather = JSON.parse(body);
            if(weather.main == undefined){
                res.render('index', {weather: null, error: 'Error, please try again'})
            }
            else {
                let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
                res.render('index', {weather: weatherText, error: null});
            }
        }
    });
});

app.listen(port, function () {
    console.log('App listening on port '+port+'!');
});
