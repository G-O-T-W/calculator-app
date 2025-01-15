function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, leftOperand, rightOperand) {
    let ans;
    switch (operator) {
        case '+': {
            ans = add(leftOperand, rightOperand);
            break;
        }
        case '-': {
            ans = subtract(leftOperand, rightOperand);
            break;
        }
        case '*': {
            ans = multiply(leftOperand, rightOperand);
            break;
        }
        case '/': {
            log("hi");
            ans = divide(leftOperand, rightOperand);
        }
    }
    return ans;
}

function sendToDisplay(buttonPressed) {
    // log(button.textContent);
    display.textContent += buttonPressed;
}

// logging function
function log(message) {
    console.log(message);
}

const display = document.querySelector(".display");
let isFloat = false;
let result;
let leftOperand, rightOperand, operator;

const numericButtons = document.querySelectorAll("button.keys");
numericButtons.forEach(button => {
    button.addEventListener("click", () => sendToDisplay(button.textContent));
});

const operatorButtons = document.querySelectorAll("button.operator")
operatorButtons.forEach(button => {
    // Our code parses for only one operator at a time
    button.addEventListener("click", () => {
        operator = button.textContent
    });
});

const decimalButton = document.querySelector("#decimal");
decimalButton.addEventListener("click", () => isFloat = true);

const operateKey = document.querySelector("#operate");
operateKey.addEventListener("click", () => {
    if (!isFloat) {
        leftOperand = parseInt(display.textContent.split(operator)[0]);
        rightOperand = parseInt(display.textContent.split(operator)[1]);
    } else {
        leftOperand = parseFloat(display.textContent.split(operator)[0]);
        rightOperand = parseFloat(display.textContent.split(operator)[1]);
    }
    result = operate(operator, leftOperand, rightOperand);
    log(typeof result);
    if (!Number.isInteger(result)) {
        result = result.toFixed(3);
    }
    display.textContent = result;
    // reset the flag to for next operate
    isFloat = false;
    // 
    operator = undefined;
});

//operate(operator, leftOperand, rightOperand)