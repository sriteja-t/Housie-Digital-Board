const pickedItemElement = document.getElementById('picked-item');
const pickButton = document.getElementById('pick-button');
const numbersContainer = document.getElementById('numbers-container');
const coinAudio = document.getElementById('coin-audio');
const minNumber = 1; 
const maxNumber = 90; 
const synth = window.speechSynthesis;

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

pickButton.addEventListener('click', () => {
    if (availableNumbers.length === 0) {
        pickedItemElement.textContent = 'Game Over';
        pickButton.disabled = true;
        return;
    }

    const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    const randomItem = availableNumbers.splice(randomIndex, 1)[0]; 
    pickedItemElement.textContent = randomItem;

    coinAudio.play();

    const pickedNumberElements = document.querySelectorAll('.number');
    for (const element of pickedNumberElements) {
        if (parseInt(element.textContent) === randomItem) {
            element.classList.add('selected');
            break; 
        }
    }
    setTimeout(() => {
        const utterance = new SpeechSynthesisUtterance(`The number is ${randomItem.toString()}`);
        synth.speak(utterance);
    }, 900);
});
