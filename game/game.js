// Warna
const MOTOR_COL = "#0d3385";
const MOBIL_COL = "#ffa500";
const TRUK_COL = "#32cd32";

let motor = [];
let mobil = [];
let truk = [];

var nummotor = 0;
var nummobil = 0;
var numtruk = 0;

// element
const motorCounter = document.getElementById("motor");
const mobilCounter = document.getElementById("mobil");
const trukCounter = document.getElementById("truk");
const vehicle = document.getElementById("kendaraan");
const toggle = document.getElementById("toggle");
const v2 = document.getElementById("lebar");
const lebarjalan = document.getElementById("lebarjalan");
const roadWidth = document.getElementById("roadWidth");
const red = document.getElementById("red");
const green = document.getElementById("green");
const countdown = document.getElementById("countdown");

let chosen = "motor";

// Jika true, mulai menggambar
let isDrawing = false;
let x = 0;
let y = 0;

// Get canvas
const board = document.getElementById("board");
// Return 2d context
const ctx = board.getContext("2d");

// PLAY
function play() {
  doFIS();
}

// Change size
function changeSize() {
  let lebar = v2.value;
  if (lebar > 0) {
    clearAll();
    let boardWidth = lebar * 30;
    board.setAttribute("width", boardWidth.toString());
    lebarjalan.style.width = boardWidth.toString() + "px";
    roadWidth.innerHTML = `${lebar} meter`;
  }
}

// toggle
function toggleVehicle() {
  if (chosen == "motor") {
    chosen = "mobil";
    toggle.innerHTML = "mobil";
    toggle.style.backgroundColor = "#ffa500";
  } else if (chosen == "mobil") {
    chosen = "truk";
    toggle.innerHTML = "truk";
    toggle.style.backgroundColor = "#32cd32";
  } else {
    chosen = "motor";
    toggle.innerHTML = "motor";
    toggle.style.backgroundColor = "#0d3385";
  }
}

// clear all
function clearAll() {
  motor = [];
  mobil = [];
  truk = [];
  nummotor = 0;
  nummobil = 0;
  numtruk = 0;
  motorCounter.innerHTML = `Motor: 0`;
  mobilCounter.innerHTML = `Mobil: 0 (2)`;
  trukCounter.innerHTML = `Truk: 0 (8)`;
  vehicle.innerHTML = `= 0`;
  red.style.opacity = 1;
  green.style.opacity = 0.2;
  countdown.innerHTML = "";
  clearBoard();
}

// Fungsi menghapus board
function clearBoard() {
  ctx.clearRect(0, 0, board.width, board.height);
}

// Event listener for draw motor
board.addEventListener("mousedown", (e) => {
  x = e.offsetX;
  y = e.offsetY;
  isDrawing = true;
});
window.addEventListener("mouseup", (e) => {
  if (isDrawing === true) {
    drawLineObs(x, y);
    x = 0;
    y = 0;
    isDrawing = false;
  }
});

// Menggambar motor
function drawLineObs(x1, y1) {
  // Mengubah x,y menjadi kelipatan 20
  let newX;
  let newY;
  let flag = true;
  let temp = [];

  newX = x1 - (x1 % 20);
  newY = y1 - (y1 % 20);

  //  Cek stack
  if (chosen == "motor") {
    for (let i = 0; i < 1; i++) {
      for (let j = 0; j < 2; j++) {
        temp.push({ x: newX + 20 * i, y: newY + 20 * j });
      }
    }
  } else if (chosen == "mobil") {
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 3; j++) {
        temp.push({ x: newX + 20 * i, y: newY + 20 * j });
      }
    }
  } else {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 5; j++) {
        temp.push({ x: newX + 20 * i, y: newY + 20 * j });
      }
    }
  }

  // Mencegah motor stack di koordinat yang sama
  for (let i = 0; i < motor.length; i++) {
    for (let j = 0; j < temp.length; j++) {
      if (motor[i].x === temp[j].x && motor[i].y === temp[j].y) {
        flag = false;
      }
    }
  }
  // Mencegah mobil stack di koordinat yang sama
  for (let i = 0; i < mobil.length; i++) {
    for (let j = 0; j < temp.length; j++) {
      if (mobil[i].x === temp[j].x && mobil[i].y === temp[j].y) {
        flag = false;
      }
    }
  }
  // Mencegah truk stack di koordinat yang sama
  for (let i = 0; i < truk.length; i++) {
    for (let j = 0; j < temp.length; j++) {
      if (truk[i].x === temp[j].x && truk[i].y === temp[j].y) {
        flag = false;
      }
    }
  }

//   Mencegah overflow
  if (chosen == "motor") {
      if (newY > board.height - 40) {
          flag = false;
      }
  } else if (chosen == "mobil") {
      if (newX > board.width - 40) {
          flag = false;
      }
      if (newY > board.height - 60) {
          flag = false;
      }
  } else {
    if (newX > board.width - 60) {
        flag = false;
    }
    if (newY > board.height - 100) {
        flag = false;
    }
  }

  //   Jika benar
  if (flag) {
    if (chosen == "motor") {
      for (let i = 0; i < 1; i++) {
        for (let j = 0; j < 2; j++) {
          motor.push({ x: newX + 20 * i, y: newY + 20 * j });
        }
      }
      nummotor++;
      motorCounter.innerHTML = `Motor: ${nummotor}`;
    } else if (chosen == "mobil") {
      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 3; j++) {
          mobil.push({ x: newX + 20 * i, y: newY + 20 * j });
        }
      }
      nummobil++;
      mobilCounter.innerHTML = `Mobil: ${nummobil} (2)`;
    } else {
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 5; j++) {
          truk.push({ x: newX + 20 * i, y: newY + 20 * j });
        }
      }
      numtruk++;
      trukCounter.innerHTML = `Truk: ${numtruk} (8)`;
    }
  }
  vehicle.innerHTML = `= ${nummotor + nummobil * 2 + numtruk * 8}`;
  drawObs();
}

// Menggambar snake ke board
function drawObs() {
  // Menggambar setiap ruas
  if (chosen == "motor") {
    motor.forEach(drawObsPart);
  } else if (chosen == "mobil") {
    mobil.forEach(drawObsPart);
  } else {
    truk.forEach(drawObsPart);
  }
}

// Menggambar setiap ruas
function drawObsPart(obsPart) {
  // Mewarnai dan menggambar ruas
  if (chosen == "motor") {
    ctx.fillStyle = MOTOR_COL;
  } else if (chosen == "mobil") {
    ctx.fillStyle = MOBIL_COL;
  } else {
    ctx.fillStyle = TRUK_COL;
  }
  ctx.fillRect(obsPart.x, obsPart.y, 20, 20);
}
