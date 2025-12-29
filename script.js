let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turno=true;
let count = 0;

let xScore = 0;
let oScore = 0;
let drawScore = 0;

const xScoreEl = document.querySelector("#x-score");
const oScoreEl = document.querySelector("#o-score");
const drawScoreEl = document.querySelector("#draw-score");


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

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if (turno) {
            box.innerText = "O";
            box.classList.add("o");
            turno = false;
        } else {
            box.innerText = "X";
            box.classList.add("x");
            turno = true;
        }

        box.disabled = true;
        count++;

        let isWinner = checkWinner();
        if (count === 9 && !isWinner) {
            gameDraw();
        }   
    })
})

const resetGame = () => {
  turno = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};

const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");

  drawScore++;
  drawScoreEl.innerText = drawScore;

  disableBoxes();
};


const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
    box.classList.remove("x", "o");
  }
};


const showWinner = (winner) => {
  msg.innerText = `Congratulation, winner is ${winner}`;
  msgContainer.classList.remove("hide");

  if (winner === "X") {
    xScore++;
    xScoreEl.innerText = xScore;
  } else {
    oScore++;
    oScoreEl.innerText = oScore;
  }

  disableBoxes();
};


const checkWinner = () =>{
    for( let pattern of winPatterns ){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
         if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
            showWinner(pos1Val);
            return true;
            }
        }
    }
}

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

const themeBtn = document.querySelector("#theme-btn");

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");

  themeBtn.innerText =
    document.body.classList.contains("light") ? "☀️" : "🌙";
});
