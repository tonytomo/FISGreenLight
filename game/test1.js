let inputVar = [
  new Variable("vehicles", [
    new Term("sedikit", "down", [0, 25]),
    new Term("sedang", "updown", [20, 25, 30]),
    new Term("banyak", "updown", [28, 35, 45]),
    new Term("sangat banyak", "up", [40, 80]),
  ]),
  new Variable("roadwidth", [
    new Term("sempit", "down", [0, 7]),
    new Term("sedang", "updown", [2, 10, 17]),
    new Term("lebar", "up", [13, 20]),
  ]),
];

let outputVar = new Variable("greentime", [
  new Term("sebentar", "down", [0, 22]),
  new Term("sedang", "updown", [16, 28, 40]),
  new Term("lama", "up", [35, 45]),
]);

let testrules = [
  new Rule(["sedikit", "sempit"], "sedang"),
  new Rule(["sedikit", "sedang"], "sebentar"),
  new Rule(["sedikit", "lebar"], "sebentar"),
  new Rule(["sedang", "sempit"], "sedang"),
  new Rule(["sedang", "sedang"], "sedang"),
  new Rule(["sedang", "lebar"], "sebentar"),
  new Rule(["banyak", "sempit"], "lama"),
  new Rule(["banyak", "sedang"], "lama"),
  new Rule(["banyak", "lebar"], "sedang"),
  new Rule(["sangat banyak", "sempit"], "lama"),
  new Rule(["sangat banyak", "sedang"], "lama"),
  new Rule(["sangat banyak", "lebar"], "lama"),
];

function calculate() {
  let greentime = new FISenv(
    "Lama Lampu Hijau",
    testrules,
    inputVar,
    outputVar
  );

  let numwidth = 20;
  let numvehicle =
    parseInt(nummotor) + parseInt(nummobil) * 2 + parseInt(numtruk * 8);
  if (v2.value != 0) {
    numwidth = v2.value;
  }

  let testans = 0;

  if (numvehicle != 0) {
    testans = greentime.calcResult([numvehicle, numwidth]);
  }
  if (Math.ceil(testans) != 0) {
    red.style.opacity = 0.2;
    green.style.opacity = 1;
    countdown.innerHTML = Math.ceil(testans);
  }
}
