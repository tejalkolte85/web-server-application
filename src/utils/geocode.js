const request = require('postman-request');
const geocode = (address, callback)=>{
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoibWFycy00NSIsImEiOiJjbDVnandzM24wMDdtM2p0OGt0YTFvYmQ4In0.Nm-VXT1Rda-Mw1nOrclCSA&limit=1';
    request({url,json:true}, (error, {body}={})=>{
        if(error){
            callback('unable to connect to location', undefined)
        }else if(body.message === 'Not Authorized - Invalid Token'){
            callback('you are not autorized..!', undefined)
        }else if(body.features.length === 0){
            callback('Unable to find location, Try another search', undefined)
        }else{
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name,
            });
        }
    })
}

module.exports = geocode;


// const request = require('postman-request');
// const geocode = (address, callback)=>{
//     const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoibWFycy00NSIsImEiOiJjbDVnandzM24wMDdtM2p0OGt0YTFvYmQ4In0.Nm-VXT1Rda-Mw1nOrclCSA&limit=1';
//     request({url: url,json:true}, (error, response)=>{
//         if(error){
//             callback('unable to connect to location', undefined)
//         }else if(response.body.message === 'Not Authorized - Invalid Token'){
//             callback('you are not autorized..!', undefined)
//         }else{
//             callback(undefined, {
//                 longitude: response.body.features[0].center[0],
//                 latitude: response.body.features[0].center[1],
//                 location: response.body.features[0].place_name,
//             });
//         }
//     })
// }
