//dom elements

const calculator = document.querySelector(".calculator");
const result = document.querySelector(".calculator__result");
const keys = document.querySelector(".calculator__buttons");
const keysArray = document.querySelectorAll("button");

//calculate

function calculate(n1, operator, n2) {
  const firstNum = parseFloat(n1);
  const secondNum = parseFloat(n2);
  if (operator === "add") return firstNum + secondNum;

  if (operator === "subtract") return firstNum - secondNum;

  if (operator === "multiply") return firstNum * secondNum;

  if (operator === "divide") return firstNum / secondNum;
}

// listening to events
keys.addEventListener("click", (e) => {
  if (e.target.matches("button")) {
    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.keyContent;
    let resultNum = result.textContent;

    const previousKeyType = calculator.dataset.previousKeyType;

    keysArray.forEach((key) => key.classList.remove("clicked"));

    // number's keys
    if (!action) {
      if (
        resultNum === "0" ||
        previousKeyType === "operator" ||
        previousKeyType === "calculate"
      ) {
        result.textContent = key.innerText;
      } else {
        result.textContent += key.innerText;
      }
      calculator.dataset.previousKeyType = "number";
    }

    // operator's keys
    if (
      action === "add" ||
      action === "subtract" ||
      action === "multiply" ||
      action === "divide"
    ) {
      const secondNumber = resultNum;
      const firstNumber = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;

      if (
        firstNumber &&
        operator &&
        previousKeyType !== "operator" &&
        previousKeyType !== "calculate"
      ) {
        const calcValue = calculate(firstNumber, operator, secondNumber);
        result.textContent = calcValue;
        //update first value to calc value to prevent from wrong calculation
        calculator.dataset.firstValue = calcValue;
      } else {
        calculator.dataset.firstValue = resultNum;
      }

      key.classList.add("clicked");
      // Add custom attribute
      calculator.dataset.previousKeyType = "operator";
      calculator.dataset.operator = action;
    }

    // decimal key
    if (action === "decimal") {
      if (!result.textContent.includes(".")) {
        result.textContent += ".";
      }
      if (previousKeyType === "operator") {
        result.textContent = "0.";
      }
      calculator.dataset.previousKeyType = "decimal";
    }
    // change AC to CE
    if (action !== "clear") {
      const clearButton = calculator.querySelector("[data-action=clear]");
      clearButton.textContent = "CE";
    }
    // clear key
    if (action === "clear") {
      if (key.textContent === "AC") {
        calculator.dataset.firstValue = "";
        calculator.dataset.modValue = "";
        calculator.dataset.operator = "";
        calculator.dataset.previousKeyType = "";
      } else {
        key.textContent = "AC";
      }
      //clear result
      result.textContent = "0";
      calculator.dataset.previousKeyType = "clear";
    }

    // calculate key
    if (action === "calculate") {
      //calculate
      calculator.dataset.previousKeyType = "calculate";
      let secondNumber = resultNum;
      let firstNumber = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;

      if (firstNumber) {
        if (previousKeyType === "calculate") {
          firstNumber = resultNum;
          secondNumber = calculator.dataset.modValue;
        }
        result.textContent = calculate(firstNumber, operator, secondNumber);
      }

      calculator.dataset.modValue = secondNumber;
    }
  }
});
