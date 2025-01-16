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
    isFloat = true;
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
            if (rightOperand != 0) {
                ans = divide(leftOperand, rightOperand);
            } else {
                alert("You cannot divide with zero!");
                ans = 0;
            }
        }
    }
    return ans;
}

function sendToDisplay(keyPressed) {
    // log(button.textContent);
    display.textContent += keyPressed;
}

function clearDisplay() {
    display.textContent = "";
}

function resetValues() {
    leftOperand = undefined;
    rightOperand = undefined;
    operator = undefined;
    result = undefined;
    isFloat = false;
    multipleOperatorExists = false;
}

function getResult() {
    rightOperand = parseFloat(display.textContent);
    return parseFloat(operate(operator, leftOperand, rightOperand).toFixed(3));
}

// logging function
function log(message) {
    console.log(message);
}    

const display = document.querySelector(".display");
let leftOperand, rightOperand, operator, result,
multipleOperatorExists = false;

const numericKeys = document.querySelectorAll("button.numericKeys");
numericKeys.forEach(button => {
    button.addEventListener("click", () => {
        // If display has zero then we need to remove that preceding zero
        if (
            display.textContent == 0 
            || multipleOperatorExists 
            ) {
            clearDisplay();
            multipleOperatorExists = false;
        }
        // The current width of display can hold 14 digits at max
        if (display.textContent.length <= 14) {
            sendToDisplay(button.textContent);
        }
    });  
});  

const operatorKeys = document.querySelectorAll("button.operatorKeys")
operatorKeys.forEach(button => {
    button.addEventListener("click", () => {
        // For case <operand> <operator> eg: 1 +
        if (
            leftOperand === undefined 
            && operator === undefined
            && display.textContent !== ""
        ) {
            log("<operand> <operator> eg: 1 +")
            leftOperand = parseFloat(display.textContent);
            operator = button.textContent;
            clearDisplay();
        } else if (
            // For case <operand> <operator> <operand> <operator> eg: 1 + 1 +
            leftOperand !== undefined
            && operator !== undefined
            && display.textContent !== ""
            && !multipleOperatorExists
        ) {
            log("<operand> <operator> <operand> <operator> eg: 1 + 1 +");
            multipleOperatorExists = true;
            result = getResult();
            clearDisplay();
            sendToDisplay(result);
            // console logging
            log(`${leftOperand} ${operator} ${rightOperand} = ${result}`);
            leftOperand = result;
            operator = button.textContent;
        } else if (
            // For case <operand> <operator> eg: 1 + -
            leftOperand !== undefined
            && operator !== undefined
            && (parseFloat(display.textContent) == result 
            || display.textContent === "") 
        ) {
            log("<operand> <operator> eg: ... 1 + -");
            operator = button.textContent;
        }
    });   
});    

const equalsToKey = document.querySelector("#equalsToKey");
equalsToKey.addEventListener("click", () => {
    if (
        leftOperand != undefined
        && operator != undefined
        && display.textContent !== ""
    ) {
        result = getResult();
        clearDisplay();
        sendToDisplay(result);
        // console logging
        log(`${leftOperand} ${operator} ${rightOperand} = ${result}`);
        resetValues();
    }
});

const allClearKey = document.querySelector("#allClearKey");
allClearKey.addEventListener("click", () => {
    resetValues();
    clearDisplay();
});

const decimalPointKey = document.querySelector("#decimalPointKey");
decimalPointKey.addEventListener("click", () => {
    if (!display.textContent.includes(".")) {
        sendToDisplay(decimalPointKey.textContent);
    }
})

