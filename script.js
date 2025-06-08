const board = document.getElementById("board");
const diceResult = document.getElementById("diceResult");
const rollBtn = document.getElementById("rollBtn");
const positionText = document.getElementById("positions");
const message = document.getElementById("message");

let yourPos = 1;
let computerPos = 1;
let isYourTurn = true;

const snakes = {
  16: 6,
  47: 26,
  49: 11,
  56: 53,
  62: 19,
  64: 60,
  87: 24,
  93: 73,
  95: 75,
  98: 78,
};

const ladders = {
  1: 38,
  3: 35,
  4: 23,
  9: 31,
  21: 42,
  28: 84,
  36: 44,
  51: 67,
  71: 91,
  80: 100,
};

function createBoard() {
  for (let i = 100; i > 0; i--) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.id = "cell-" + i;
    cell.innerHTML = i;

    if (snakes[i]) {
      cell.classList.add("snake");
      cell.innerHTML += " 🐍";
    } else if (ladders[i]) {
      cell.classList.add("ladder");
      cell.innerHTML += " 🪜";
    }

    board.appendChild(cell);
  }
}

function drawPlayers() {
  document.querySelectorAll(".player").forEach(el => el.remove());

  const yourIcon = document.createElement("div");
  yourIcon.className = "player you";
  yourIcon.textContent = "🧍";

  const compIcon = document.createElement("div");
  compIcon.className = "player computer";
  compIcon.textContent = "🤖";

  document.getElementById("cell-" + yourPos).appendChild(yourIcon);
  document.getElementById("cell-" + computerPos).appendChild(compIcon);

  positionText.textContent = `You: ${yourPos} | Computer: ${computerPos}`;
}

function movePlayer(name, pos, roll) {
  let next = pos + roll;
  if (next > 100) return pos;

  let final = next;
  let msg = "";

  if (ladders[next]) {
    final = ladders[next];
    msg = `${name} climbs ladder from ${next} to ${final}! 🪜`;
  } else if (snakes[next]) {
    final = snakes[next];
    msg = `${name} bitten by snake from ${next} to ${final}! 🐍`;
  }

  message.textContent = msg;
  return final;
}

function rollDice() {
  if (!isYourTurn) return;

  rollBtn.disabled = true;
  message.textContent = "";
  const roll = Math.floor(Math.random() * 6) + 1;
  diceResult.textContent = `You rolled: ${roll}`;

  yourPos = movePlayer("You", yourPos, roll);
  drawPlayers();

  if (yourPos === 100) {
    message.textContent = "🎉 You win!";
    return;
  }

  isYourTurn = false;
  setTimeout(computerTurn, 1500);
}

function computerTurn() {
  const roll = Math.floor(Math.random() * 6) + 1;
  diceResult.textContent = `Computer rolled: ${roll}`;

  computerPos = movePlayer("Computer", computerPos, roll);
  drawPlayers();

  if (computerPos === 100) {
    message.textContent = "💻 Computer wins!";
    rollBtn.disabled = true;
    return;
  }

  isYourTurn = true;
  rollBtn.disabled = false;
}

createBoard();
drawPlayers();
rollBtn.addEventListener("click", rollDice);
