let inputVar = [
  new Variable("vehicles", [
    new Term("sedikit", "down", [0, 20]),
    new Term("sedang", "updown", [20, 30, 45]),
    new Term("banyak", "updown", [30, 45, 60]),
    new Term("sangat banyak", "up", [50, 80]),
  ]),
  new Variable("roadwidth", [
    new Term("sempit", "down", [0, 5]),
    new Term("sedang", "updown", [2, 7, 12]),
    new Term("lebar", "updown", [10, 14, 16]),
    new Term("sangat lebar", "up", [15, 20]),
  ]),
];

let outputVar = new Variable("greentime", [
  new Term("sebentar", "down", [0, 15]),
  new Term("sedang", "updown", [10, 25, 40]),
  new Term("lama", "up", [35, 45]),
]);

let testrules = [
  new Rule(["sedikit", "sempit"], "sebentar"),
  new Rule(["sedikit", "sedang"], "sebentar"),
  new Rule(["sedikit", "lebar"], "sebentar"),
  new Rule(["sedikit", "sangat lebar"], "sebentar"),
  new Rule(["sedang", "sempit"], "sedang"),
  new Rule(["sedang", "sedang"], "sedang"),
  new Rule(["sedang", "lebar"], "sebentar"),
  new Rule(["sedang", "sangat lebar"], "sebentar"),
  new Rule(["banyak", "sempit"], "lama"),
  new Rule(["banyak", "sedang"], "lama"),
  new Rule(["banyak", "lebar"], "sedang"),
  new Rule(["banyak", "sangat lebar"], "sedang"),
  new Rule(["sangat banyak", "sempit"], "lama"),
  new Rule(["sangat banyak", "sedang"], "lama"),
  new Rule(["sangat banyak", "lebar"], "lama"),
  new Rule(["sangat banyak", "sangat lebar"], "lama"),
];

function calculate() {
  let greentime = new FISenv(
    "Lama Lampu Hijau",
    testrules,
    inputVar,
    outputVar
  );

  let numwidth = 10;
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
