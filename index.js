const tableElement = document.querySelector("#table");
const timerDisplay = document.querySelector("#timer");
let numbersArray = [];
let count = 1;
let time = 20;
const gameEndText = ["G", "a", "m", "e", "O", "v", "e", "r"];
const winText = ["Y", "o", "u", "W", "i", "n"];

function initializeGame() {
  createNumbersArray();
  createTable();
  updateTimerDisplay();
  startTimer();
}

function createNumbersArray() {
  for (let i = 1; i <= 16; i++) {
    numbersArray.push(i);
  }
}

function createTable() {
  let tableHTML = "";
  for (let i = 0; i < 4; i++) {
    tableHTML += "<tr>";
    for (let j = 0; j < 4; j++) {
      let randomIndex = rand(0, numbersArray.length - 1);
      tableHTML += `<td>${numbersArray[randomIndex]}</td>`;
      numbersArray.splice(randomIndex, 1);
    }
    tableHTML += "</tr>";
  }
  tableElement.innerHTML = tableHTML;
}

function startTimer() {
  setInterval(() => {
    if (time >= 1) {
      time--;
      updateTimerDisplay();
    } else {
      endGame();
    }
  }, 1000);
}

function endGame() {
  disableCells();
  updateTable(gameEndText);
  clearInterval(t);
}

function winGame() {
  disableCells();
  updateTable(winText);
  clearInterval(t);
}

function disableCells() {
  let cells = document.querySelectorAll("td");
  cells.forEach((cell) => {
    cell.removeAttribute("onclick");
    cell.style.background = "#fff";
  });
}

function updateTable(textArray) {
  let tableHTML = "";
  for (let i = 0; i < textArray.length; i += 4) {
    tableHTML += '<tr style="background:black; color:yellow;">';
    for (let j = i; j < i + 4; j++) {
      tableHTML += `<td>${textArray[j]}</td>`;
    }
    tableHTML += "</tr>";
  }
  tableElement.innerHTML = tableHTML;
}

function handleCellClick(cell) {
  if (count === 16) {
    winGame();
  }
  if (cell.innerHTML == count) {
    cell.style.background = "#CFF27E";
    count++;
  }
}

function updateTimerDisplay() {
  timerDisplay.innerHTML = time;
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

initializeGame();

tableElement.addEventListener("click", (event) => {
  if (event.target.tagName === "TD") {
    handleCellClick(event.target);
  }
});
