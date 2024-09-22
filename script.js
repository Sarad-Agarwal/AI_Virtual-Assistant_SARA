let aura = document.getElementById("aura");

function speak(text) {
    let speak_text = new SpeechSynthesisUtterance(text);
    speak_text.rate = 1;
    speak_text.pitch = 1;
    speak_text.volume = 1;
    speak_text.lang = "hi-IN"; // Hindi, India as language setting

    // Fetch available voices
    let voices = window.speechSynthesis.getVoices();

    // Select a female voice, for example, an Indian female voice (if available)
    let femaleVoice = voices.find(voice => voice.name.includes("Female") || voice.name.includes("Zira") || voice.lang === "hi-IN");

    // If found, set it as the voice for the utterance
    if (femaleVoice) {
        speak_text.voice = femaleVoice;
    } else {
        console.warn("Female voice not found, using default voice.");
    }

    window.speechSynthesis.speak(speak_text);
}

window.speechSynthesis.onvoiceschanged = () => {
    console.log("Voices have been loaded.");
};

function wishMe() {
    let day = new Date();
    let hours = day.getHours();
    if (hours >= 0 && hours < 12) {
        speak("Good Morning Dear");
    } else if (hours >= 12 && hours <= 16) {
        speak("Good Afternoon Dear");
    } else if (hours > 16 && hours <= 22) {
        speak("Good Evening Dear");
    } else {
        speak("Good Night Dear, Have sweet Dreams");
    }
}

window.addEventListener("load", () => {
    wishMe()
});

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();

recognition.onresult = (e) => {
    let currIndex = e.resultIndex;
    let transcript = e.results[currIndex][0].transcript;
    content.innerText = transcript;
    takeCommand(transcript);
};

let btn = document.querySelector("button");
btn.addEventListener("click", () => {
    recognition.start();
    btn.style.display = "none";
    aura.style.display = "block";
});

function takeCommand(message) {
    btn.style.display = "flex";
    aura.style.display = "none";
    message = message.toLowerCase();

    console.log("Received Message: ", message);

    if (message.includes("hello") || message.includes("hey")) {
        speak("Hello sir, what can I help you with?");
    }
    else if (message.includes("who are you")) {
        speak("I am the Virtual Assistant created by Itian Sarad Agarwal.");
    }
    else if (message.includes("what is your name") || message.includes("what's your name")) {
        speak("My name is Sara, I am a virtual assistant");
    }
    else if (message.includes("open youtube")) {
        speak("Opening YouTube");
        window.open("https://www.youtube.com", "_blank");
    }
    else if (message.includes("open google")) {
        speak("Opening Google");
        window.open("https://www.google.com", "_blank");
    }
    else if (message.includes("open facebook")) {
        speak("Opening Facebook");
        window.open("https://www.facebook.com", "_blank");
    }
    else if (message.includes("open instagram")) {
        speak("Opening Instagram");
        window.open("https://www.instagram.com", "_blank");
    }
    else if (message.includes("open twitter")) {
        speak("Opening Twitter");
        window.open("https://www.twitter.com", "_blank");
    }
    else if (message.includes("thank you")) {
        speak("It's my pleasure to help you");
    }
    else if (message.includes("open calculator")) {
        speak("Opening Calculator");
        window.open("calculator://");
    }
    else if (message.includes("time")) {
        let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speak(time);
    }
    else {
        speak(`This is what I found on the internet about ${message.replace("sara", "") || message.replace("sarah", "")}`);
        window.open(`https://www.google.com/search?q=${message.replace("sara", "") || message.replace("sarah", "")}`, "_blank");
    }
}
