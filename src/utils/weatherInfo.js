const request = require('postman-request');

const weatherInfo = (long, lat, callback)=>{
    const URL = "http://api.weatherstack.com/current?access_key=ce8c3be9c50718447a9c6aa58ccecf3a&query="+long+","+lat+"&units=f";  //16.308717,74.102399&units=f;
    request({url: URL, json: true}, (error, {body})=>{
        if(error){
            callback('Unable to connect server', undefined);
        }else if(body.error){
            callback({
                message: body.error.info,
                code: body.error.code,
                type: body.error.type,
            }, undefined)
        }else{
            callback(undefined,{
                name: body.location.name,
                country:body.location.country,
                temperature: body.current.temperature,
                weather_descriptions : body.current.weather_descriptions[0],
                message : `${body.current.weather_descriptions[0]} . It is curretly ${body.current.temperature} degress out, It feels like ${body.current.precip} % chance of rain.`
            
            })
        }
    })
}

 module.exports = weatherInfo;



// const request = require('postman-request');

// const weatherInfo = (long, lat, callback)=>{
//     const URL = "http://api.weatherstack.com/current?access_key=ce8c3be9c50718447a9c6aa58ccecf3a&query="+long+","+lat+"&units=f";  //16.308717,74.102399&units=f;
//     request({url: URL, json: true}, (error, response)=>{
//         if(error){
//             callback('Unable to connect server', undefined);
//         }else if(response.body.error){
//             callback({
//                 message: response.body.error.info,
//                 code: response.body.error.code,
//                 type: response.body.error.type,
//             }, undefined)
//         }else{
//             callback(undefined,{
//                 name: response.body.location.name,
//                 country:response.body.location.country,
//                 temperature: response.body.current.temperature,
//                 weather_descriptions : response.body.current.weather_descriptions[0],
//                 message : `${response.body.current.weather_descriptions[0]} . It is curretly ${response.body.current.temperature} degress out, It feels like ${response.body.current.feelslike} degress out.`
            
//             })
//         }
//     })
// }

// module.exports = weatherInfo;