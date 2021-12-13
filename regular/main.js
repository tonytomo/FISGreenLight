const submit = document.getElementById("submit");
const clear = document.getElementById("clear");

const input1 = document.getElementById("input1");
const input2 = document.getElementById("input2");

const motor = document.getElementById("motor");
const mobil = document.getElementById("mobil");
const truk = document.getElementById("truk");
const v2 = document.getElementById("v2");
const result = document.getElementById("result");

let inputVar = [
  new Variable("vehicles", [
    new Term("sedikit", "down", [0, 25]),
    new Term("sedang", "updown", [20, 30, 40]),
    new Term("banyak", "up", [35, 60]),
  ]),
  new Variable("roadwidth", [
    new Term("sempit", "down", [0, 7]),
    new Term("sedang", "updown", [2, 10, 17]),
    new Term("lebar", "up", [13, 20]),
  ]),
];

let outputVar = new Variable("greentime", [
  new Term("sebentar", "down", [0, 18]),
  new Term("sedang", "updown", [12, 28, 40]),
  new Term("lama", "up", [35, 45]),
]);

let testrules = [
  new Rule(["sedikit", "sempit"], "sedang"),
  new Rule(["sedikit", "sedang"], "sebentar"),
  new Rule(["sedikit", "lebar"], "sebentar"),
  new Rule(["sedang", "sempit"], "sedang"),
  new Rule(["sedang", "sedang"], "sedang"),
  new Rule(["sedang", "lebar"], "sedang"),
  new Rule(["banyak", "sempit"], "lama"),
  new Rule(["banyak", "sedang"], "lama"),
  new Rule(["banyak", "lebar"], "lama"),
];

submit.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    submit.click();
  }
});

clear.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    clear.click();
  }
});

function clearAll() {
  motor.value = "";
  mobil.value = "";
  truk.value = "";
  v2.value = "";

  input1.innerHTML = `Kendaraan = 0 motor`;
  input2.innerHTML = `Lebar Jalan = 0 m`;
  result.innerHTML = 0 + " detik";
}

function doFIS() {
  let greentime = new FISenv(
    "Lama Lampu Hijau",
    testrules,
    inputVar,
    outputVar
  );

  let numwidth = 20;
  let numvehicle =
    parseInt(motor.value) + parseInt(mobil.value) * 2 + parseInt(truk.value * 8);
  if (v2.value != 0) {
    numwidth = v2.value;
  }

  let testans = 0;

  if (numvehicle != 0) {
    testans = greentime.calcResult([numvehicle, numwidth]);
  }

  if (Math.ceil(testans) != 0) {
    input1.innerHTML = `Kendaraan = ${numvehicle} motor`;
    input2.innerHTML = `Lebar Jalan = ${numwidth} m`;
    result.innerHTML = Math.ceil(testans) + " detik";
  }
}
