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
            ans = divide(leftOperand, rightOperand);
        }
    }
    return ans;
}

function sendToDisplay(buttonPressed) {
    // log(button.textContent);
    display.textContent += buttonPressed;
}

function parseOperands() {
    if (!isFloat) {
        leftOperand = parseInt(display.textContent.split(operator)[0]);
        rightOperand = parseInt(display.textContent.split(operator)[1]);
    } else {
        leftOperand = parseFloat(display.textContent.split(operator)[0]);
        rightOperand = parseFloat(display.textContent.split(operator)[1]);
    }
}

function parseResult() {
    // float % 1 will always give a remainder
    if (!Number.isInteger(result)) {
        log("hi");
        result = parseFloat(result.toFixed(3));
        // set the flag to true if the result is floating type
        isFloat = true;
    } else {
        log("hello");
        // set the flag to false if the result is integer type
        isFloat = false;
    }    
}

function operateEventHandler() {
    parseOperands();
    result = operate(operator, leftOperand, rightOperand);
    parseResult();
    // logging 
    log(`${leftOperand} ${operator} ${rightOperand} = ${result}`);
    log(`Is result decimal? ${isFloat}`);
    display.textContent = result;
    // to handle multiple operators
    operator = undefined;
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
    button.addEventListener("click", () => {
        // This handles the case multiple operators are pressed
        if (operator) {
            operateEventHandler();
        } 
        operator = button.textContent;
        sendToDisplay(operator);
    });    
});    

const decimalButton = document.querySelector("#decimal");
decimalButton.addEventListener("click", () => isFloat = true);

const operateKey = document.querySelector("#operate");
operateKey.addEventListener("click", operateEventHandler);  


