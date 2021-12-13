class FISenv {
  constructor(name, rules, inputvar, outputvar) {
    this.name = name;
    this.rules = rules;
    this.inputvar = inputvar;
    this.outputvar = outputvar;
  }

  static name() {
    return this.name;
  }

  calcResult(input) {
    let ready = true;
    let sumalpha = 0;
    let sumalphazi = 0;

    let ans = [];

    for (let i = 0; i < input.length; i++) {
      if (input[i] == 0) {
        ready = false;
      }
    }

    if (ready) {
      for (let i = 0; i < this.rules.length; i++) {
        let result = {};
        let calc = [];

        for (let j = 0; j < this.inputvar.length; j++) {
          result[`input${j}`] = this.inputvar[j]
            .getTerm(this.rules[i].input[j])
            .result(input[j]);
          calc.push(result[`input${j}`]);
        }
        
        result[`alpha`] = Math.min.apply(Math, calc);
        result[`zi`] = this.outputvar.getTerm(this.rules[i].output).output(result[`alpha`]);
        result[`alphazi`] = result[`alpha`] * result[`zi`];

        ans.push(result);

        sumalpha += result[`alpha`];
        sumalphazi += result[`alphazi`];
      }
    }

    return sumalphazi / sumalpha;
  }
}

class Rule {
  constructor(input, output) {
    this.input = input;
    this.output = output;
  }

  static input(index) {
    return this.input[index];
  }

  static output() {
    return this.output;
  }
}

class Variable {
  constructor(name, terms) {
    this.name = name;
    this.terms = terms;
  }

  static name() {
    return this.name;
  }

  getTerm(name) {
    for (let i = 0; i < this.terms.length; i++) {
      if (this.terms[i].name == name) return this.terms[i];
    }
  }
}

class Term {
  constructor(name, type, x) {
    this.name = name;
    this.type = type;
    this.x = x;
  }

  static name() {
    return this.name;
  }

  output(input) {
    if (this.type == "down") {
      return this.x[1] - (this.x[1] - this.x[0]) * input;
    } else if (this.type == "updown") {
      // return (this.x[1]- this.x[0]) * input + this.x[1];
      // return this.x[2] - (this.x[2] - this.x[1]) * input;
      if (input < this.x[1]) {
        return (this.x[1]- this.x[0]) * input + this.x[1];
      } else {
        return this.x[2] - (this.x[2] - this.x[1]) * input;
      }
    } else if (this.type == "up"){
      return (this.x[1] - this.x[0]) * input + this.x[1];
    } else {
      return 0;
    }
  }

  result(input) {
    if (this.type == "down") {
      if (input == this.x[0]) return 1;
      else if (input > this.x[0] && input < this.x[1])
        return (this.x[1] - input) / (this.x[1] - this.x[0]);
      else return 0;
    } else if (this.type == "updown") {
      if (input == this.x[1]) return 1;
      else if (input > this.x[0] && input < this.x[1])
        return (input - this.x[0]) / (this.x[1] - this.x[0]);
      else if (input > this.x[1] && input < this.x[2])
        return (this.x[2] - input) / (this.x[2] - this.x[1]);
      else return 0;
    } else if (this.type == "up") {
      if (input >= this.x[1]) return 1;
      else if (input > this.x[0] && input < this.x[1])
        return (input - this.x[0]) / (this.x[1] - this.x[0]);
      else return 0;
    } else {
      return 0;
    }
  }
}
