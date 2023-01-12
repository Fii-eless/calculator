const buttons = document.querySelectorAll(".button");
const screenMinor = document.querySelector("#screenMinor");
let displayMajor = [];
let input = [];
const operators = ["!", "^", "+", "-", "/", "*", "="];

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
    if (e.key === "Backspace") input.splice(input.indexOf("Backspace"), 2);
    if (!key) input.push(e.key);
    if (key) input.push(e.key);
    if (input.includes("Enter")) input[input.indexOf("Enter")] = "=";
    if (e.key === "Backspace") backSpace(input);
    if (e.key === "Escape") clear(input);
    console.log(input)
}
buttons.forEach(button => button.addEventListener("click", logXter));
function logXter(e) {
  // if (!this.textContent) return;
  input.push(this.textContent);
  if (input.includes("×")) input[input.indexOf("×")] = "*";
  if (input.includes("÷")) input[input.indexOf("÷")] = "/";
  if (input.includes("−")) input[input.indexOf("−")] = "-";
  if (input.includes("Xy")) input[input.indexOf("Xy")] = "^";
  if (input.includes("X!")) input[input.indexOf("X!")] = "!";
  if (input.includes("+/-")) input[input.indexOf("+/-")] = "-";
  if (this.id === "clearAll") clear(input);
  if (this.id === "backspace") backSpace2(input);
  console.log(input)
  
  // return input
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

const add = function(a, b) {
    let rslt = a + b;
    return rslt;
  };
  
  const subtract = function(a, b) {
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
  
  const multiply = function([...arr]) {
    let args = arr;
    let times = args.reduce((total, arg) => {
      return total *= arg;
    }, 1);
    return times;
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
  