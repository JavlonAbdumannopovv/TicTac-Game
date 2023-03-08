let box = document.querySelectorAll(".box");
let child = {
  classname: "box first",
  val: "x",
}

//NOTE - winning combination
const winCombination = [
  [0, 1, 2],
  [0, 3, 6],
  [2, 5, 8],
  [6, 7, 8],
  [3, 4, 5],
  [1, 4, 7],
  [0, 4, 8],
  [2, 4, 6],
];

let winObj = {
  text: "Player 1 win!",
}

let winBox = document.querySelector(".win");
winBox.innerHTML = `
  <div class="win-title">
  <h1>${winObj.text}</h1>
  <button>Restart</button>
  </div>
`;

let allItem = [];

//NOTE - players combinations
let player1Arr = [];
let player2Arr = []

box.forEach((item, i) => {
  //TODO - box hover
  item.onmouseover = (e) => {
    if (e.target.className == "box") {
      item.innerText = child.val;
    }
  }
  item.onmouseout = (e) => {
    if (e.target.className == "box") {
      item.innerText = "";
    }
  }


  //TODO - box clicked
  item.onclick = (e) => {
    allItem.push(1);
    if (e.target.className == "box" && child.classname == "box first") {
      item.className = child.classname;
      item.innerText = child.val;
      child.val = "O";
      child.classname = "box second";
      //NOTE - player1 array push
      player1Arr.push(i);
    }
    else if (e.target.className == "box" && child.classname == "box second") {
      item.className = child.classname;
      item.innerText = child.val;
      child.val = "x";
      child.classname = "box first";
      //NOTE - player1 array push
      player2Arr.push(i);
    }

    //TODO - win players
    if (player1Arr.length == 3 || player2Arr.length == 3) {
      function indexChange(ind) {
        let winPlayer1 = [];
        let winPlayer2 = [];
        winCombination[ind].forEach((winItem) => {
          //NOTE - Player 2
          let data1 = player2Arr.filter((pItem) => {
            return winItem == pItem;
          })
          if (data1[0] != null) {
            winPlayer2.push(data1[0]);
            if (winPlayer2.length == 3) {
              winObj.text = "Player 2 win!";
              winBox.classList.add("show");
            }
          };


          //NOTE - Player 1
          let data = player1Arr.filter((pItem) => {
            return winItem == pItem;
          })
          if (data[0] != null) {
            winPlayer1.push(data[0]);
            if (winPlayer1.length == 3) {
              winObj.text = "Player 1 win!";
              winBox.classList.add("show");
            }
          }

          //NOTE - repeat win box print
          winBox.innerHTML = "";
          winBox.innerHTML = `
            <div class="win-title">
            <h1>${winObj.text}</h1>
            <button>Restart</button>
            </div>
          `;
        });

        restart();
      };

      indexChange(0);
      indexChange(1);
      indexChange(2);
      indexChange(3);
      indexChange(4);
      indexChange(5);
      indexChange(6);
      indexChange(7);
    }
    if (allItem.length == 9) {
      winObj.text = "Equality, try again!";
      winBox.classList.add("show");

      //NOTE - repeat win box print
      winBox.innerHTML = "";
      winBox.innerHTML = `
       <div class="win-title">
       <h1>${winObj.text}</h1>
       <button>Restart</button>
       </div>
     `;
      restart();
    }
  }
});


//TODO - restart button click
function restart() {
  allItem = [];
  let restart = document.querySelector(".win-title button");
  restart.onclick = (e) => {
    box.forEach((item) => {
      item.innerHTML = "";
      item.className = "box";
      winBox.classList.remove("show");
      player1Arr = [];
      player2Arr = [];
    });
    // window.location.reload();
    if (child.classname == "box first") {
      child.val == "O";
    } else if (child.classname == "box second") {
      child.val == "x";
    }
  }
}











