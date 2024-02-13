let currentTime = 0;
let isPlaying = false;
let numberSounds = [];
let waitingNumber = 6000;
let timeout = null;
let numbers = [];
const beat = document.querySelector(".beat");
const startBtn = document.querySelector(".start");
const stopBtn = document.querySelector(".stop");
const winBtn = document.querySelector(".win");
const resetBtn = document.querySelector(".reset");
const numberDiv = document.querySelector(".numberDiv");
const numberContainer = document.querySelector(".multiple-items");
const checkWinInput = document.querySelector("#checkWin");
const checkWinBtn = document.querySelector("#checkWinBtn");
const winInputOverlay = document.querySelector(".overlay");

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
  if (numbers.length < 90) {
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

function hideStartButton() {
  startBtn.classList.add("hide");
}

function showStartButton() {
  startBtn.classList.remove("hide");
}

function hideStopButton() {
  stopBtn.classList.add("hide");
}

function showStopButton() {
  stopBtn.classList.remove("hide");
}

function hideWinButton() {
  winBtn.classList.add("hide");
}

function showWinButton() {
  winBtn.classList.remove("hide");
}

function showCheckWinOverlay() {
  winInputOverlay.classList.remove("hide");
}

function hideCheckWinOverlay() {
  winInputOverlay.classList.add("hide");
}

function startBeat() {
  isPlaying = true;
  beat.currentTime = currentTime;
  beat.volume = 0.2;
  beat.play();
}

function stopBeat() {
  isPlaying = false;
  currentTime = beat.currentTime;
  beat.pause();
}

function reset() {
  currentTime = 0;
  numbers = [];

  numberDiv.textContent = "...";
  showStopButton();
  hideCheckWinOverlay();
  hideStartButton();
  startBeat();
  playNumber();
  $(".multiple-items").slick("slickRemove", null, null, true);
}

function check() {
  const numberArr = checkWinInput.value.split(",").map((t) => +t);
  console.log(numbers);
  return numberArr.every((v) => numbers.includes(v));
}

startBtn.addEventListener("click", () => {
  hideStartButton();
  startBeat();
  playNumber();
  showStopButton();
  showWinButton();
});
stopBtn.addEventListener("click", () => {
  startBtn.textContent = "Tiếp tục";
  showStartButton();
  stopBeat();
  stopNumber();
  hideStopButton();
});

winBtn.addEventListener("click", () => {
  startBtn.textContent = "Tiếp tục";
  showStartButton();
  stopBeat();
  stopNumber();
  showCheckWinOverlay();
  hideStopButton();
});

checkWinBtn.addEventListener("click", () => {
  const isValid = check();
  const checkText = document.querySelector(".checkText");

  const TEXT = isValid ? "Chúc mừng bạn yêu" : "Ê ê, báo động giả nhen";
  checkText.textContent = TEXT;
  checkText.className = `checkText ${isValid ? "success" : "error"}`;
});

resetBtn.addEventListener("click", () => {
  reset();
});

winInputOverlay.addEventListener("click", (e) => {
  const winInput = document.querySelector(".winInput");
  if (!winInput.contains(e.target) && !resetBtn.contains(e.target)) {
    hideCheckWinOverlay();
  }
});

function init() {
  importSounds();
  hideStopButton();
  hideWinButton();
  hideCheckWinOverlay();
}

init();
