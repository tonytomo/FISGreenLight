# Traffic Light 4.0

Aplikasi penghitung lama lampu hijau agar lebih efisien dan efektif. Menggunakan algoritma FIS (Fuzzy Interference System) untuk menentukan lama lampu hijau.

## Langkah

1. Membuat variabel input, ex:
```
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
```
2. Membuat variabel output, ex:
```
let outputVar = new Variable("greentime", [
  new Term("sebentar", "down", [0, 15]),
  new Term("sedang", "updown", [12, 25, 33]),
  new Term("lama", "up", [30, 50]),
]);
```

3. Membuat rules yang dipakai, ex:
```
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
];
```

4. Tinggal mengimplementasikan, ex:
```
function main() {
    let greentime = new FISenv("Lama Lampu Hijau", testrules, inputVar, outputVar);

    let result = greentime.calcResult([input1, input2]);
  }
```

## Informasi tambahan

(Untuk sekarang) hanya bisa digunakan pada fungsi keanggotaan seperti dibawah ini:

![fungsi keanggotaan](https://github.com/tonytomo/FISGreenLight/blob/master/game/fungsi.PNG?raw=true)

Ada 3 tipe grafik:
* `down` dari atas ke bawah (ex: sedikit) dengan 2 input
* `updown` dari bawah-atas-bawah (ex: sedang) dengan 3 input
* `up` dari bawah ke atas (ex: banyak) dengan 2 input