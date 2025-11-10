let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msgContainer");
let msg = document.querySelector("#msg");

let turnO = true; //playerX, playerO
let count = 0;

// Hide message container at start
msgContainer.classList.add("hide");

let playerO = prompt("Enter Player O Name:") || "Player O";
let playerX = prompt("Enter Player X Name:") || "Player X";

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      box.style.color = "White";
      turnO = false;
    } else {
      box.innerText = "X";
      box.style.color = "red";
      turnO = true;
    }
    box.disabled = true;
    count++;

    let isWinner = checkWinner();
    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");

  playerO = prompt("Enter Player O Name:") || "Player O";
  playerX = prompt("Enter Player X Name:") || "Player X";
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1val = boxes[pattern[0]].innerText;
    let pos2val = boxes[pattern[1]].innerText;
    let pos3val = boxes[pattern[2]].innerText;

    if (pos1val != "" && pos2val != "" && pos3val != "") {
      if (pos1val === pos2val && pos2val === pos3val) {
        let winnerName = pos1val === "O" ? playerO : playerX;
        showWinner(winnerName, pos1val);
        return true;
      }
    }
  }
};

const showWinner = (winnerName, symbol) => {
  msg.innerText = `🎉 Congratulations, ${winnerName}! 
  🎉 You won with "${symbol}"`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

newGameBtn.addEventListener("click", resetGame);
reset.addEventListener("click", resetGame);
