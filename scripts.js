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
            if (rightOperand != 0) {
                ans = divide(leftOperand, rightOperand);
            } else {
                alert("You cannot divide with zero!")
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

function parseTextToNumber(text) {
    return parseInt(text);
}

function parseResult(number) {
    if (operator == "/") {
        return parseFloat(number.toFixed(3));
    } else {
        return number;
    }

}

function resetCalculator() {
    leftOperand = undefined;
    rightOperand = undefined;
    operator = undefined;
}

// logging function
function log(message) {
    console.log(message);
}    

const display = document.querySelector(".display");
let leftOperand, rightOperand, operator;

const numericKeys = document.querySelectorAll("button.numericKeys");
numericKeys.forEach(button => {
    button.addEventListener("click", () => {
        // The current width of display can hold 14 digits at max
        if (display.textContent.length <= 14) {
            sendToDisplay(button.textContent);
        }
    });  
});  

const operatorKeys = document.querySelectorAll("button.operatorKeys")
operatorKeys.forEach(button => {
    button.addEventListener("click", () => {
        // This handles the case multiple operators are pressed
        if (operator === undefined) {
            leftOperand = parseTextToNumber(display.textContent);
            operator = button.textContent;
            clearDisplay();
        } 
    });    
});    

const equalsToKey = document.querySelector("#equalsToKey");
equalsToKey.addEventListener("click", () => {
    if (
        leftOperand !== undefined
        && operator !== undefined
        && display.textContent !== ""
    ) {
        rightOperand = parseTextToNumber(display.textContent);
        clearDisplay();
        result = parseResult(operate(operator, leftOperand, rightOperand));
        sendToDisplay(result);
        // console display
        log(`${leftOperand} ${operator} ${rightOperand} = ${result}`);
        resetCalculator();
    }
});

// const allClearKey = document.querySelector()
