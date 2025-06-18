
const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

// function speak(text) {
//     const text_speak = new SpeechSynthesisUtterance(text);

//     text_speak.rate = 1;
//     text_speak.volume = 1;
//     text_speak.pitch = 1;

//     window.speechSynthesis.speak(text_speak);   
// }


function speak(text) {
    const text_speak = new SpeechSynthesisUtterance(text);

function takeCommand(message) {
    if (message.includes('hey') || message.includes('hello')) {
        speak("Hello Precious, How May I Help You?");
    } else if (message.includes("how are you")) {
        speak("I'm just a program, but thanks for asking!");
    } else {
        speak("I didn't understand that. Can you please repeat?");
    }


    // Personalized responses based on input
    if (text.includes('hello')) {
        text_speak.text = "Hello there! How can I assist you today?";
    } else if (text.includes('how are you')) {
        text_speak.text = "I'm just a program, but thanks for asking!";
    } 
    else {
        // Default response
        text_speak.text = text;
    }

    // Set speech parameters
    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;

    // Speak the text
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

window.addEventListener('load', () => {
    speak("Initializing ZENITH...");
    wishMe();
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

function tellJoke() {
    // Replace this with your code to fetch a joke from an API or local collection
    const joke = "Why did the computer go to the doctor? Because it had a virus!";
    
    // Speak the joke
    speak(joke);
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
    } else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "This is what I found on the internet regarding " + message;
        speak(finalText);
    } else if (message.includes('wikipedia')) {
        window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "").trim()}`, "_blank");
        const finalText = "This is what I found on Wikipedia regarding " + message;
        speak(finalText);
    } else if (message.includes('time')) {
        const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        const finalText = "The current time is " + time;
        speak(finalText);
    } else if (message.includes('date')) {
        const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" });
        const finalText = "Today's date is " + date;
        speak(finalText);
    } else if (message.includes('calculator')) {
        window.open('Calculator:///');
        const finalText = "Opening Calculator";
        speak(finalText);
    }else if (message.includes("tell me a joke")) {
        tellJoke(); // Call the tellJoke function
    }else {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "I found some information for " + message + " on Google";
        speak(finalText);
    }
}
