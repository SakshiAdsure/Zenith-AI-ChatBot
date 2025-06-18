const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

function speak(text) {
    const text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;
    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    var day = new Date();
    var hour = day.getHours();

    if (hour >= 0 && hour < 12) {
        speak("Good Morning Boss...");
    } else if (hour >= 12 && hour < 17) {
        speak("Good Afternoon Master...");
    } else {
        speak("Good Evening Beautiful...");
    }
}

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

function fetchWeather(city) {
    // Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
    const apiKey = 'YOUR_API_KEY'; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const weatherDescription = data.weather[0].description;
            const temperature = data.main.temp;

            const weatherInfo = `Current weather in ${city}: ${weatherDescription}. Temperature: ${temperature}°C`;
            speak(weatherInfo);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            speak('Sorry, I could not fetch the weather information.');
        });
}

recognition.onresult = (event) => {
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());
};

btn.addEventListener('click', () => {
    content.textContent = "Listening...";
    recognition.start();
});

function takeCommand(message) {
    if (message.includes('hey') || message.includes('hello')) {
        speak("Hello Precious, How May I Help You?");
    } else if (message.includes("open google")) {
        window.open("https://google.com", "_blank");
        speak("Opening Google...");
    } else if (message.includes("open youtube")) {
        window.open("https://youtube.com", "_blank");
        speak("Opening Youtube...");
    } else if (message.includes("open facebook")) {
        window.open("https://facebook.com", "_blank");
        speak("Opening Facebook...");
    } else if (message.includes('weather in')) {
        const city = message.split('weather in')[1].trim();
        fetchWeather(city);
    } else {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "I found some information for " + message + " on Google";
        speak(finalText);
    }
}

window.addEventListener('load', () => {
    speak("Initializing ZENITH...");
    wishMe();
});


// const btn = document.querySelector('.talk');
// const content = document.querySelector('.content');

// function speak(text) {
//     const text_speak = new SpeechSynthesisUtterance(text);
//     text_speak.rate = 1;
//     text_speak.volume = 1;
//     text_speak.pitch = 1;
//     window.speechSynthesis.speak(text_speak);
// }

// function wishMe() {
//     var day = new Date();
//     var hour = day.getHours();

//     if (hour >= 0 && hour < 12) {
//         speak("Good Morning Boss...");
//     } else if (hour >= 12 && hour < 17) {
//         speak("Good Afternoon Master...");
//     } else {
//         speak("Good Evening Beautiful...");
//     }
// }

// const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
// const recognition = new SpeechRecognition();

// // Hardcoded weather data for Pune
// const puneWeather = {
//     description: "Partly cloudy",
//     temperature: 28 // in Celsius
// };

// function fetchWeather(city) {
//     // Hardcoded weather data for Pune
//     const weatherDescription = puneWeather.description;
//     const temperature = puneWeather.temperature;

//     const weatherInfo = `Current weather in Pune: ${weatherDescription}. Temperature: ${temperature}°C`;
//     speak(weatherInfo);
// }

// recognition.onresult = (event) => {
//     const currentIndex = event.resultIndex;
//     const transcript = event.results[currentIndex][0].transcript;
//     content.textContent = transcript;
//     takeCommand(transcript.toLowerCase());
// };

// btn.addEventListener('click', () => {
//     content.textContent = "Listening...";
//     recognition.start();
// });

// function takeCommand(message) {
//     if (message.includes('hey') || message.includes('hello')) {
//         speak("Hello Precious, How May I Help You?");
//     } else if (message.includes("open google")) {
//         window.open("https://google.com", "_blank");
//         speak("Opening Google...");
//     } else if (message.includes("open youtube")) {
//         window.open("https://youtube.com", "_blank");
//         speak("Opening Youtube...");
//     } else if (message.includes("open facebook")) {
//         window.open("https://facebook.com", "_blank");
//         speak("Opening Facebook...");
//     } else if (message.includes('weather in')) {
//         const city = message.split('weather in')[1].trim();
//         if (city.toLowerCase() === 'pune') {
//             fetchWeather(city);
//         } else {
//             speak("Sorry, I can only provide weather information for Pune at the moment.");
//         }
//     } else {
//         window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
//         const finalText = "I found some information for " + message + " on Google";
//         speak(finalText);
//     }
// }

// window.addEventListener('load', () => {
//     speak("Initializing ZENITH...");
//     wishMe();
// });
