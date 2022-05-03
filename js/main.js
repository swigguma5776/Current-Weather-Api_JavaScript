// create form variable 
const form = document.querySelector('#weatherDataForm')

form.addEventListener('submit', (event) =>{
    event.preventDefault();
    let city = document.querySelector('#city')
    let state = document.querySelector('#state')

    console.log(city.value) 
    console.log(typeof(city.value))
    getPhoto(city.value)
    console.log(state.value)
    
    form.innerHTML =`<input type="text" name='city' id="city" placeholder="City Here">        
    <input type="text" name='state' id="state" placeholder="State Here">  
    <button class="btn btn-secondary" type="submit" id="submitButton" onClick="clearData()">Clear Weather!</button>` 

    form.addEventListener('submit', (event) => {
        window.location.reload()
    })
})

// create a Get Photo Query!!!

const photokeySecret = 'Tb1C9rm1NRDTMNc5fVn52okrnJrF4YWFQ2wK27SNfSs'


const getPhoto = async (city) =>{    
    let request = await fetch(`https://api.unsplash.com/search/photos/?query=${city}&client_id=${photokeySecret}`,{        
        method: 'GET'    });      
        const response = await request.json()    
        console.log(response.results[0].urls.regular)
        
        let photo = response.results[0].urls.regular
        const html = `<img src="${photo}" class="card-img" alt="..."></div>`
      
        document.querySelector(DOM_Elements.photos).insertAdjacentHTML('beforeend',html)

        return response
       
}


const keySecret = 'b0588e9ecea5862ca8116a4dfd47edd7'


const getData = async (city, state) => {
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},US-${state}&appid=${keySecret}`)

    const data = await response.json(0)
    console.log(data)
    return data
}


//c Create aconstant to hold DOM Elements
const DOM_Elements = {
    weathers: '.weathers-list',
    photos: '.city-image'
}

// Create Weather List HTML
const createWeather = (city, forecast, feels_like, temp_high, temp_low, humidity) => {
    const tempFeelsFar = Math.floor(1.8*(feels_like-273) + 32)
    const tempHighFar = Math.floor(1.8*(temp_high-273) + 32) 
    const tempLowFar = Math.floor(1.8*(temp_low-273) + 32) 
    // const html = `<table class="table">
    //     <thead>
    //     <tr>
    //         <th scope="col">Forecast</th>
    //         <th scope="col">High Temperature</th>
    //         <th scope="col">Low Temperature</th>
    //         <th scope="col">Humidity</th>
    //     </tr>
    //     </thead>
    //     <tbody>
    //     <tr>
    //         <th scope="row">${forecast}</th>
    //         <td>${tempHighFar}℉</td>
    //         <td>${tempLowFar}℉</td>
    //         <td>${humidity}%</td>
    //     </tr>
    //     </tbody>
    // </table>`

    const html = 
            `<h3 class="card-title">Current Weather for ${city}</h3>
            <br>
            <h3 class="card-title">Forecast</h3>
            <h4 class="card-text">${forecast}</h4>
            <br>
            <h3 class="card-title">Feels Like</h3>
            <h4 class="card-text">${tempFeelsFar}℉</h4>
            <br>
            <h5 class="card-title">High Temperature</h5>
            <h6 class="card-text">${tempHighFar}℉</h6>
            <h5 class="card-title">Low Temperature</h5>
            <h6 class="card-text">${tempLowFar}℉</h6>
            <h5 class="card-title">Humidity</h5>
            <h6 class="card-text">${humidity}%</h6>`

    
    // Paste list item on document
    document.querySelector(DOM_Elements.weathers).insertAdjacentHTML('beforeend',html)
}

// Create function to loop over rangers and create each element 
const loadData = async () => {
    clearData()
    const weatherList = await getData(city.value, state.value);
    // const photo = await getPhoto(city.value);

    for (const key in weatherList){
        if (key == 'main'){
            console.log(weatherList.weather[0].description)
            console.log(weatherList.main.feels_like)
            console.log(weatherList.main.temp_max)
            console.log(weatherList.main.temp_min)
            console.log(weatherList.main.humidity)
            createWeather(weatherList.name, weatherList.weather[0].description, weatherList.main.feels_like, 
                weatherList.main.temp_max, weatherList.main.temp_min, weatherList.main.humidity)
        }
    }

    // createWeather(photo)

    // weatherList.forEach( weather => createWeather(weather.weather[0].description, weather.main.temp_max, 
    //     weather.main.temp_min, weather.main.humidity))

}

// Clear the data 
const clearData = () => {
    document.querySelector(DOM_Elements.weathers).innerHTML = ''; 
    
}