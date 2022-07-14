console.log('loading javascript file...!');

fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
        console.log(data)
    })
})



const weatherForm = document.querySelector('form')
const search = document.querySelector('input');
const message1 = document.querySelector('#error');
const message2 = document.querySelector('#data');


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location = search.value;
    message1.textContent="Loading..."
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            message1.textContent = data.error;
            console.log(data.error)
        }else{
            message1.textContent = data.location;
            message2.textContent = data.response.message;
            console.log(data.response.message);
        }
        
    })
})
})
//http://localhost:3000/weather?address=Mumbai