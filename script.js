const pickedItemElement = document.getElementById('picked-item');
const pickButton = document.getElementById('pick-button');
const numbersContainer = document.getElementById('numbers-container');
const coinAudio = document.getElementById('coin-audio');
const coinToggle = document.getElementById('coin-toggle');
const speechToggle = document.getElementById('speech-toggle');
const repeatToggle = document.getElementById('repeat-toggle');
const timeIntervalSelect = document.getElementById('time-interval');
const minNumber = 1; 
const maxNumber = 90; 
const synth = window.speechSynthesis;

let autoGenerateInterval;
const pickedItems = new Set(); 

const availableNumbers = Array.from({ length: maxNumber - minNumber + 1 }, (_, index) => index + minNumber);

for (let i = minNumber; i <= maxNumber; i++) {
    const numberElement = document.createElement('div');
    numberElement.textContent = i;
    numberElement.classList.add('number');
    numberElement.addEventListener('click', () => {
        if (!pickedItems.has(i)) {
            pickedItems.add(i);
            numberElement.classList.add('selected');
        }
    });
    numbersContainer.appendChild(numberElement);
}

function generateNumber() {
    if (availableNumbers.length === 0) {
        pickedItemElement.textContent = 'Game Over';
        pickButton.disabled = true;
        return;
    }

    const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    const randomItem = availableNumbers.splice(randomIndex, 1)[0]; 
    pickedItemElement.textContent = randomItem;

    if (coinToggle.checked) {
        coinAudio.play();
    }

    const pickedNumberElements = document.querySelectorAll('.number');
    for (const element of pickedNumberElements) {
        if (parseInt(element.textContent) === randomItem) {
            element.classList.add('selected');
            break; 
        }
    }
    if (speechToggle.checked) {
        if (repeatToggle.checked) {
            for (let i = 0; i < 2; i++) {
                setTimeout(() => {
                    const utterance = new SpeechSynthesisUtterance(`The number is ${randomItem.toString()}`);
                    synth.speak(utterance);
                }, 900);
            }
        } else {
            setTimeout(() => {
                const utterance = new SpeechSynthesisUtterance(`The number is ${randomItem.toString()}`);
                synth.speak(utterance);
            }, 900);
        }
    }
}

pickButton.addEventListener('click', () => {
    generateNumber(); 
});

timeIntervalSelect.addEventListener('change', () => {
    const selectedInterval = parseInt(timeIntervalSelect.value);
    clearInterval(autoGenerateInterval);
    
    if (selectedInterval > 0) {
        autoGenerateInterval = setInterval(() => {
            generateNumber();
        }, selectedInterval);
    }
});
