const buttons = document.querySelectorAll(".button");
const screenMinor = document.querySelector("#screenMinor");
let displayMajor = [];
let input = [];
let inputClone = [];
const operators = ["!", "^", "+", "-", "/", "*"];
const arithM = ["+", "-"];
const geoM = ["/", "*", "^", "!"];
const equator = "=";
let operationArgs = [];
let operationRslt = [];

buttons.forEach(button => button.addEventListener("mouseover", Highlight));
function Highlight(e) {
    this.classList.add("highlight");
}
buttons.forEach(button => button.addEventListener("mouseout", noLight));
function noLight(e) {
    this.classList.remove("highlight");
}
document.addEventListener("keydown", returnKey);
function returnKey(e) {
    const key = document.querySelector(`.button[data-key="${e.keyCode}"]`);
    const special = document.querySelector(`.button[data-code="${e.keyCode}"]`);
    if (!key && !special) return;
    if (e.key === "Backspace") {
      input.splice(input.indexOf("Backspace"), 2);
      inputClone.splice(inputClone.indexOf("Backspace"), 2);
    }
    if (!key) {input.push(e.key); inputClone.push(e.key);}
    if (key) {input.push(e.key); inputClone.push(e.key);}
    if (input.includes("Enter")) {input[input.indexOf("Enter")] = "="; inputClone[inputClone.indexOf("Enter")] = "=";}
    formatInput(input);
    getResult();
    if (e.key === "Escape") {clear(input); clear(inputClone); clear(operationArgs); clear(operationRslt)}
    if (e.key === "Backspace") {
      backSpace(input); backSpace(inputClone);
      if (!input[0]) operationArgs.pop();
    }
    console.log(input);
    console.log(inputClone);
    console.log(operationArgs);
    console.log(operationRslt);
}
buttons.forEach(button => button.addEventListener("click", logXter));
function logXter(e) {
  input.push(this.textContent);
  if (input.includes("×")) input[input.indexOf("×")] = "*";
  if (input.includes("÷")) input[input.indexOf("÷")] = "/";
  if (input.includes("−")) input[input.indexOf("−")] = "-";
  if (input.includes("Xy")) input[input.indexOf("Xy")] = "^";
  if (input.includes("X!")) input[input.indexOf("X!")] = "!";
  if (input.includes("+/-")) input[input.indexOf("+/-")] = "-";
  if (this.id === "clearAll") clear(input);
  if (this.id === "backspace") {
    backSpace2(input); backSpace2(inputClone);
    if (!input[0]) operationArgs.pop();
  }
  console.log(input)
}
function backSpace(arr) {
  arr.splice(arr.indexOf("Backspace"), 2);
}
function backSpace2(arr) {
  arr.splice(arr.length - 2, 2);
}
function clear(arr) {
  for (let i = arr.length; i > 0; i-- ) arr.pop();
}
function formatInput(input) {
  for (let i=0; i < input.length; i++) {
    if (input[0] === "=" && operationArgs.length >= 1) {
      operationRslt[0] = operationArgs[0];
      clear(operationArgs); clear(input);
    } else if (input[0] === "=") {
        operationRslt[0] = 0;
        clear(input);
    }  else if (arithM.includes(input[0]) && !operationArgs[0]) {
        operationArgs[0] = 0; operationArgs.push(input[0]);
        clear(input);
    } else if (arithM.includes(input[0]) && operationArgs[0]) {
        operationArgs.push(input[0]);
        clear(input);
    } else if (geoM.includes(input[0]) && !operationArgs[0]) {
        operationArgs[0] = 1; operationArgs.push(input[0]);
        clear(input);
    } else if (geoM.includes(input[0]) && operationArgs[0]) {
        operationArgs.push(input[0]);
        clear(input);
    } else if (operators.includes(input[i]) || equator.includes(input[i])) { 
        operationArgs.push(parseFloat(input.splice(0, input.length - 1).join("")));
        operationArgs.push(input[input.length -1]);
        clear(input);
    } else if (!operators.includes(input[0]) && operationArgs.length <= 1) {
        clear(operationArgs);
        clear(operationRslt);
    }
  }
  
}

function getResult() {
  if (operationArgs.length === 2 && operationArgs[1] === "=") {
    operationRslt[0] = operationArgs[0];
    operationArgs.pop();
  }
  if (operationArgs[1] === "+" && operationArgs[2] === "+" || operationArgs[1] === "+" && geoM.includes(operationArgs[2])) {
    clear(input); clear(inputClone); clear(operationArgs); clear(operationRslt)
    operationRslt[0] = "SYNTAX ERROR!";
  }
  if (operationArgs.length > 3 && operationArgs[2] === "-" && !operators.includes(operationArgs[3]) ) {
    let negNum = parseFloat(operationArgs[2] + operationArgs[3]);
    if (typeof negNum === "number") {
     operationArgs[2] = negNum;
    } else {
      clear(input); clear(inputClone); clear(operationArgs); clear(operationRslt)
      operationRslt[0] = "SYNTAX ERROR!";
    }
  }
  if (operationArgs.length === 2 && operationArgs[1] === "!") {
      operationRslt[0] = factorial(operationArgs[0]);
      clear(input); clear(operationArgs);
      operationArgs[0] = operationRslt[0];
      clear(inputClone);
    // }
  }
  if (operationArgs.length > 3 && operationArgs[1] === "+") {
    if (operationArgs[3] === "=" || operationArgs[4] === "=") {
      operationRslt[0] = add(operationArgs[0], operationArgs[2]);
      clear(input); clear(operationArgs); clear(inputClone);
      operationArgs[0] = operationRslt[0];
    } else {
      operationRslt[0] = add(operationArgs[0], operationArgs[2]);
      clear(input); clear(operationArgs);
      operationArgs[0] = operationRslt[0];
      operationArgs[1] = inputClone[inputClone.length - 1];
      clear(inputClone);
    }
  }
  if (operationArgs.length > 3 && operationArgs[1] === "-") {
    if (operationArgs[3] === "=" || operationArgs[4] === "=") {
      operationRslt[0] = subtract(operationArgs[0], operationArgs[2]);
      clear(input); clear(operationArgs); clear(inputClone);
      operationArgs[0] = operationRslt[0];
    } else {
      operationRslt[0] = subtract(operationArgs[0], operationArgs[2]);
    clear(input); clear(operationArgs);
    operationArgs[0] = operationRslt[0];
    operationArgs[1] = inputClone[inputClone.length - 1];
    clear(inputClone);
    }
  }
  if (operationArgs.length > 3 && operationArgs[1] === "*") {
    if (operationArgs[3] === "=" || operationArgs[4] === "=") {
      operationRslt[0] = multiply(operationArgs[0], operationArgs[2]);
      clear(input); clear(operationArgs); clear(inputClone);
      operationArgs[0] = operationRslt[0];
    } else {
      operationRslt[0] = multiply(operationArgs[0], operationArgs[2]);
      clear(input); clear(operationArgs);
      operationArgs[0] = operationRslt[0];
      operationArgs[1] = inputClone[inputClone.length - 1];
      clear(inputClone);
    }
  }
  if (operationArgs.length > 3 && operationArgs[1] === "/") {
    if (operationArgs[3] === "=" || operationArgs[4] === "=") {
      operationRslt[0] = divide(operationArgs[0], operationArgs[2]);
      clear(input); clear(operationArgs); clear(inputClone);
      operationArgs[0] = operationRslt[0];
    } else {
      operationRslt[0] = divide(operationArgs[0], operationArgs[2]);
      clear(input); clear(operationArgs);
      operationArgs[0] = operationRslt[0];
      operationArgs[1] = inputClone[inputClone.length - 1];
      clear(inputClone);
    }
  }
  if (operationArgs.length > 3 && operationArgs[1] === "^") {
    if (operationArgs[3] === "=" || operationArgs[4] === "=") {
      operationRslt[0] = power(operationArgs[0], operationArgs[2]);
      clear(input); clear(operationArgs); clear(inputClone);
      operationArgs[0] = operationRslt[0];
    } else {
      operationRslt[0] = power(operationArgs[0], operationArgs[2]);
      clear(input); clear(operationArgs);
      operationArgs[0] = operationRslt[0];
      operationArgs[1] = inputClone[inputClone.length - 1];
      clear(inputClone);
    }
  }
}
function displayInput() {

}

function add(a, b) {
    let rslt = a + b;
    return rslt;
  };
  
 function subtract(a, b) {
    let rslt = a - b;
    return rslt;
  };
  
  const sum = function([...arr]) {
    let args = arr;
    let added = args.reduce((total, arg) => {
      return total += arg;
    }, 0);
    return added;
  }
  
  const multiply = function(a, b) {
    let times = a * b;
    return times;
  }
  const divide = function(a, b) {
    let fraction = a / b;
    return fraction;
  }
  const power = function(a, b) {
    let exp = a ** b;
      return exp;
  };
  
  const factorial = function(a) {
    let fact = 1;
      for (let i = 1; i <= a; i++) {
      fact *= i;
    }
    return fact;
  };