let currentTime = 0;
let isPlaying = false;
let numberSounds = [];
let waitingNumber = 6000;
let timeout = null;
const numbers = [];
const beat = document.querySelector(".beat");
const startBtn = document.querySelector(".start");
const stopBtn = document.querySelector(".stop");
const numberDiv = document.querySelector(".numberDiv");
const numberContainer = document.querySelector(".multiple-items");

function addShowcase(number) {
  $(".multiple-items").slick("slickAdd", `<div class="number">${number}</div>`);
}

function importSounds() {
  for (let i = 1; i <= 90; i++) {
    numberSounds[i] = `./assets/audio/${i}.mp3`;
  }
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * max) + min;
}

function playNumber() {
  timeout = setTimeout(() => {
    let rdNumber;
    do {
      rdNumber = randomNumber(1, 90);
    } while (numbers.includes(rdNumber));
    numbers.push(rdNumber);
    displayNumber(rdNumber);
    addShowcase(rdNumber);
    readNumber(rdNumber);

    playNumber();
  }, waitingNumber);
}

function stopNumber() {
  clearTimeout(timeout);
}

function readNumber(number) {
  const audio = new Audio(numberSounds[number]);
  audio.volume = 1;

  audio.play();
}

function displayNumber(number) {
  numberDiv.textContent = number;
}

function startBeat() {
  isPlaying = true;
  isPlaying && (startBtn.textContent = "Chơi lại");

  beat.currentTime = currentTime;
  beat.volume = 0.2;
  beat.play();

  playNumber();
}

function stopBeat() {
  isPlaying = false;
  startBtn.textContent = "Tiếp tục";
  currentTime = beat.currentTime;
  beat.pause();
}

function reset() {
  currentTime = 0;
  numbers = [];
}

startBtn.addEventListener("click", startBeat);
stopBtn.addEventListener("click", () => {
  stopBeat();
  stopNumber();
});

importSounds();
