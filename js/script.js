const buttons = document.querySelectorAll(".button");
let displayMinor = [];
let displayMajor = [];
let input = "";

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
    if (!key) input += e.key;
    if (key) input += e.key;
}
buttons.forEach(button => button.addEventListener("click", logXter));
function logXter(e) {
  if (!this.textContent) return;
  if (this.textContent == "Xy")  this.textContent = "^";
  if (this.textContent == "X!") this.textContent = "!";
  if (this.textContent == "+/-") this.textContent = "-";
  input += this.textContent;
  console.log(input)
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
  