console.log("Javascript loaded!");

const submit = document.getElementById("submit");
const clear = document.getElementById("clear");

const input1 = document.getElementById("input1");
const input2 = document.getElementById("input2");

const motor = document.getElementById("motor");
const mobil = document.getElementById("mobil");
const truk = document.getElementById("truk");
const v2 = document.getElementById("v2");
const result = document.getElementById("result");

var kendaraan = 0;
var lebar = 0;

var rules = [
  {
    kendaraan: "sedikit",
    lebar: "sempit",
    lama: "sedang",
    termKendaraan: 0,
    termLebar: 0,
    alpha: 0,
    zi: 0,
    alphazi: 0,
  },
  {
    kendaraan: "sedikit",
    lebar: "sedang",
    lama: "sebentar",
    termKendaraan: 0,
    termLebar: 0,
    alpha: 0,
    zi: 0,
    alphazi: 0,
  },
  {
    kendaraan: "sedikit",
    lebar: "lebar",
    lama: "sebentar",
    termKendaraan: 0,
    termLebar: 0,
    alpha: 0,
    zi: 0,
    alphazi: 0,
  },
  {
    kendaraan: "sedang",
    lebar: "sempit",
    lama: "sedang",
    termKendaraan: 0,
    termLebar: 0,
    alpha: 0,
    zi: 0,
    alphazi: 0,
  },
  {
    kendaraan: "sedang",
    lebar: "sedang",
    lama: "sedang",
    termKendaraan: 0,
    termLebar: 0,
    alpha: 0,
    zi: 0,
    alphazi: 0,
  },
  {
    kendaraan: "sedang",
    lebar: "lebar",
    lama: "sebentar",
    termKendaraan: 0,
    termLebar: 0,
    alpha: 0,
    zi: 0,
    alphazi: 0,
  },
  {
    kendaraan: "banyak",
    lebar: "sempit",
    lama: "lama",
    termKendaraan: 0,
    termLebar: 0,
    alpha: 0,
    zi: 0,
    alphazi: 0,
  },
  {
    kendaraan: "banyak",
    lebar: "sedang",
    lama: "lama",
    termKendaraan: 0,
    termLebar: 0,
    alpha: 0,
    zi: 0,
    alphazi: 0,
  },
  {
    kendaraan: "banyak",
    lebar: "lebar",
    lama: "sedang",
    termKendaraan: 0,
    termLebar: 0,
    alpha: 0,
    zi: 0,
    alphazi: 0,
  },
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
  // do fis
  let sumalpha = 0;
  let sumalphazi = 0;

  kendaraan =
    parseInt(motor.value) +
    parseInt(mobil.value) * 2 +
    parseInt(truk.value * 8);
  lebar = v2.value;

  for (let i = 0; i < rules.length; i++) {
    rules[i].termKendaraan = kendaraanTerm(rules[i].kendaraan);
    rules[i].termLebar = lebarTerm(rules[i].lebar);
    rules[i].alpha = Math.min(rules[i].termKendaraan, rules[i].termLebar);
    rules[i].zi = lamaTerm(rules[i].lama, rules[i].alpha);
    rules[i].alphazi = rules[i].alpha * rules[i].zi;

    sumalpha += rules[i].alpha;
    sumalphazi += rules[i].alphazi;

    // console.log(rules[i]);
  }
  console.log(`kendaraan: ${kendaraan}, lebar: ${lebar}`);
  console.log("lama green light: " + sumalphazi / sumalpha + " detik");

  input1.innerHTML = `Kendaraan = ${kendaraan} motor`;
  input2.innerHTML = `Lebar Jalan = ${lebar} m`;
  result.innerHTML = Math.ceil(sumalphazi / sumalpha) + " detik";
}

function kendaraanTerm(term) {
  // IF kendaraan sedikit
  if (term == "sedikit") {
    if (kendaraan == 0) return 1;
    else if (kendaraan > 0 && kendaraan < 20) return (20 - kendaraan) / 20;
    else return 0;
  }
  // IF kendaraan sedang
  else if (term == "sedang") {
    if (kendaraan == 20) return 1;
    else if (kendaraan > 14 && kendaraan < 20) return (kendaraan - 14) / 6;
    else if (kendaraan > 20 && kendaraan < 26) return (26 - kendaraan) / 6;
    else return 0;
  }
  // IF kendaraan banyak
  else {
    if (kendaraan >= 30) return 1;
    else if (kendaraan > 20 && kendaraan < 30) return (kendaraan - 20) / 10;
    else return 0;
  }
}

function lebarTerm(term) {
  // IF lebar sempit
  if (term == "sempit") {
    if (lebar == 0) return 1;
    else if (lebar > 0 && lebar < 6) return (6 - lebar) / 6;
    else return 0;
  }
  // IF lebar sedang
  else if (term == "sedang") {
    if (lebar == 10) return 1;
    else if (lebar > 4 && lebar < 10) return (lebar - 4) / 6;
    else if (lebar > 10 && lebar < 16) return (16 - lebar) / 6;
    else return 0;
  }
  // IF lebar lebar
  else {
    if (lebar >= 20) return 1;
    else if (lebar > 14 && lebar < 20) return (lebar - 14) / 6;
    else return 0;
  }
}

function lamaTerm(termvar, term) {
  // IF lama sebentar
  if (termvar == "sebentar") {
    return 15 - 15 * term;
  }
  // IF lama sedang
  else if (termvar == "sedang") {
    return 7 * term + 12;
  }
  // IF lama lama
  else {
    return 20 * term + 30;
  }
}
