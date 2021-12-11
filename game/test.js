let inputVar = [
  new Variable("vehicles", [
    new Term("sedikit", "down", [0, 20]),
    new Term("sedang", "updown", [14, 20, 26]),
    new Term("banyak", "up", [20, 30]),
  ]),
  new Variable("roadwidth", [
    new Term("sempit", "down", [0, 6]),
    new Term("sedang", "updown", [4, 10, 16]),
    new Term("lebar", "up", [14, 20]),
  ]),
];

let outputVar = new Variable("greentime", [
  new Term("sebentar", "down", [0, 15]),
  new Term("sedang", "updown", [12, 25, 33]),
  new Term("lama", "up", [30, 50]),
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
]

function calculate() {
    let greentime = new FISenv("Lama Lampu Hijau", testrules, inputVar, outputVar);
  
    let numwidth = 20;
    let numvehicle =
      parseInt(nummotor) + parseInt(nummobil) * 2 + parseInt(numtruk * 8);
    if (v2.value != 0) {
      numwidth = v2.value;
    }

    let testans = greentime.calcResult([numvehicle, numwidth]);
    if (Math.ceil(testans) != 0) {
      red.style.opacity = 0.2;
      green.style.opacity = 1;
      countdown.innerHTML = Math.ceil(testans);
    }
  }


