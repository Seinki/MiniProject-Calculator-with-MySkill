// instantiation variable for selector class
const displayHistory = document.querySelector(".display-history");
const displayInput = document.querySelector(".display-input");
const tempResult = document.querySelector(".temp-result");
const numbers = document.querySelectorAll(".number");
const operations = document.querySelectorAll(".operation");
const equal = document.querySelector(".equal");
const allClear = document.querySelector(".all-clear");
const lastEntityClear = document.querySelector(".last-entity-clear");

// Initialization global variable from variable selector class
let disHistory = "";
let disInput = "";
let result = null;
let lastOperation = "";
let haveDot = false;

// event looping for numbers
numbers.forEach((number) => {
  number.addEventListener("click", (e) => {
    if (e.target.innerText === "." && !haveDot) {
      haveDot = true;
      console.log(e.target.innerText);
    } else if (e.target.innerText === "." && haveDot) {
      console.log("sudah ada ", e.target.innerText);
      return;
    }
    disInput += e.target.innerText;
    displayInput.innerText = disInput;
  });
});

// event looping for operations
operations.forEach((operation) => {
  operation.addEventListener("click", (e) => {
    if (!disInput) return;
    haveDot = false;
    const operationName = e.target.innerText;
    if (disInput && disHistory && lastOperation) {
      console.log("Menjalankan operasi math");
      mathOperation();
    } else {
      result = parseFloat(disInput);
    }
    clearVar(operationName);
    lastOperation = operationName;
  });
});

// function for mathOperation() in operations above
function mathOperation() {
  if (lastOperation === "x") {
    result = parseFloat(result) * parseFloat(disInput);
  } else if (lastOperation === "+") {
    result = parseFloat(result) + parseFloat(disInput);
  } else if (lastOperation === "-") {
    result = parseFloat(result) - parseFloat(disInput);
  } else if (lastOperation === "/") {
    result = parseFloat(result) / parseFloat(disInput);
  } else if (lastOperation === "%") {
    result = parseFloat(result) % parseFloat(disInput);
  }
}

// function for clearVar() in operations above
function clearVar(name = "") {
  disHistory += disInput + " " + name + " ";
  displayHistory.innerText = disHistory;
  displayInput.innerText = "";
  disInput = "";
  tempResult.innerText = result;
}

// event for output result from operations
equal.addEventListener("click", () => {
  if (!disHistory || !disInput) return;
  haveDot = false;
  mathOperation();
  clearVar();
  displayInput.innerText = result;
  tempResult.innerText = "";
  disInput = result;
  disHistory = "";
});

// event for clear all from button 'C'
allClear.addEventListener('click', () => {
  haveDot = false;
  disHistory = "";
  displayHistory.innerText = "";
  disInput = "";
  displayInput.innerText = 0;
  result = "";
  tempResult.innerText = "";
  lastOperation = "";
});

// event for clear all from button 'C'
lastEntityClear.addEventListener('click', () => {
  displayInput.innerText = "";
  disInput = "";
});

// event keydown for input via keyboard
window.addEventListener('keydown', (e) => {
  if (
    e.key === "0" || e.key === "1" || e.key === "2" || e.key === "3" ||
    e.key === "4" || e.key === "5" || e.key === "6" || e.key === "7" ||
    e.key === "8" || e.key === "9"
  ) {
    clickButton(e.key);
  } else if (e.key === "+" || e.key === "-" || e.key === "x" || e.key === "/" || e.key === "%") {
    clickOperation(e.key);
  } else if (e.key === "Enter" || e.key === "=") {
    clickEqual();
  } else if (e.key === "Backspace") {
    clickClear();
  }
})

//function for event keydown 'numbers'
function clickButton(key) {
  numbers.forEach((button) => {
    if (button.innerText === key) {
      button.click();
    }
  })
}

//function for event keydown 'operator'
function clickOperation(key) {
  operations.forEach((operation) => {
    if (operation.innerText === key) {
      operation.click();
    }
  })
}

//function for event keydown 'Enter/equal'
function clickEqual() {
  equal.click();
}

//function for event keydown 'Clear'
function clickClear() {
  allClear.click();
}
