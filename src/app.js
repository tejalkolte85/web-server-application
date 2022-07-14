const path = require('path') //core node module not need to install bcz it is build-in
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const weatherInfo = require('./utils/weatherInfo');

const app = express();
//console.log(__dirname);

//path for express config
const publicDirPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials');

//setup handlebar engine and view loation
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);
//setup static directory to serve
app.use(express.static(publicDirPath))


//app.com
//app.com/help
//app.com/about

//route to the root url that is app.com in our case
//hadler handles the request to the particular url location
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Mars Doe'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        name: 'Jena',
        helpText: 'this is some helpful text'
    })
})

app.get('/about', (req, res) =>{
    res.render('about',{
        title:'About Me',
        name : 'Mars Doe'
    });
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:'No Address Provided'
        })
    }
    geocode(req.query.address, (error,{longitude, latitude,location} ={})=>{
        if (error) {
            return res.send({
                error });
        }
        console.log("logitude : " + longitude + " Latitude : " + latitude)
        weatherInfo(latitude,longitude, (error, response) => {
            if (error) {
                return res.send(error);
            } else {
                return res.send({
                    response,
                    location,
                    address:req.query.address
                });
              
            }
        })
    })

})

app.get('/products', (req, res)=>{
    console.log(req.query);
    if(!req.query.search){
        return res.send({
            error:'Please provide search term'
        })
    }
    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'help article not found',
        title: 'Help'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Jena',
        error: 'Page not found'
    })
})




//start the server
app.listen(3000, () => {
    console.log("Server is up and Running")
});


//---------------commented work------------------------
  // res.sendFile(publicDirPath+'/about.html')
   // res.send('<h2 style="text-align: center"> About Page</h2>');
    //const data = '<div><h1 style="text-align: center">Weather Forecaste Info</h1><div style ="text-align: right"><p style = "text-align:right">Developed By User</p> <strong style ="padding-right : 70px"> Mars-18</strong></div><hr/></div>';
    //res.send(data);
    //res.sendFile(publicDirPath + '/weather.html')

    //app.get('/json-data', (req, res) => {
        //     const location = {
        //         "name": "Cooria",
        //         "country": "India",
        //         "region": "Maharashtra",
        //         "lat": "19.083",
        //         "lon": "72.883",
        //         "timezone_id": "Asia/Kolkata",
        //         "localtime": "2022-07-12 08:26",
        //         "localtime_epoch": 1657614360,
        //         "utc_offset": "5.50"
        //     }
        //     res.send(location)
        // })