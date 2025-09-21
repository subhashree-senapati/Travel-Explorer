const searchBtn = document.getElementById('searchBtn');
const destinationInput = document.getElementById('destinationInput');
const photosDiv = document.getElementById('photos');
const weatherDiv = document.getElementById('weather');

// Replace with your own API keys
const UNSPLASH_ACCESS_KEY = 'WHtwC3vwZcXOv_vqbvnJ--3Jf-ZFLy6y1iFEJzan5UU';
const WEATHER_API_KEY = '6801111f65ecf698687f09b19728bf9d';

searchBtn.addEventListener('click', () => {
    const destination = destinationInput.value.trim();
    if (!destination) return alert("Please enter a destination");

    fetchPhotos(destination);
    fetchWeather(destination);
});

// Fetch photos from Unsplash
function fetchPhotos(destination) {
    photosDiv.innerHTML = "<p>Loading photos...</p>";
    fetch(`https://api.unsplash.com/search/photos?query=${destination}&per_page=9&client_id=${UNSPLASH_ACCESS_KEY}`)
        .then(res => res.json())
        .then(data => {
            photosDiv.innerHTML = '';
            data.results.forEach(photo => {
                const img = document.createElement('img');
                img.src = photo.urls.small;
                img.alt = photo.alt_description;
                photosDiv.appendChild(img);
            });
        })
        .catch(() => {
            photosDiv.innerHTML = "<p>Failed to load photos.</p>";
        });
}

// Fetch weather from OpenWeatherMap
function fetchWeather(destination) {
    weatherDiv.innerHTML = "<p>Loading weather...</p>";
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${destination}&units=metric&appid=${WEATHER_API_KEY}`)
        .then(res => res.json())
        .then(data => {
            if(data.cod !== 200) {
                weatherDiv.innerHTML = `<p>${data.message}</p>`;
                return;
            }
            weatherDiv.innerHTML = `
                <h2>${data.name}, ${data.sys.country}</h2>
                <p>Temperature: ${data.main.temp}°C</p>
                <p>Weather: ${data.weather[0].description}</p>
            `;
        })
        .catch(() => {
            weatherDiv.innerHTML = "<p>Failed to load weather.</p>";
        });
}
