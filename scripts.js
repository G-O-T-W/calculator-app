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
                resetValues();
                ans = 0;
            }
        }
    }
    return ans;
}

function sendToDisplay(displayText) {
    // displayText is a string in all cases
    if (displayText.length <= 11) {
        display.textContent += displayText;
    } else {
        // to display bigInt results
        display.textContent = Number.parseFloat(displayText).toExponential(3);
    }
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
let leftOperand, rightOperand, operator, result, multipleOperatorExists = false;

const numericKeys = document.querySelectorAll("button.numericKeys");
numericKeys.forEach(button => {
    button.addEventListener("click", () => {
        // If display has zero then we need to remove that preceding zero
        if (
            display.textContent === "0" 
            || multipleOperatorExists 
            ) {
            clearDisplay();
            multipleOperatorExists = false;
        }
        // The current width of display can hold 14 digits at max
        if (display.textContent.length < 11) {
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
            // convert number to string to check if the result overflows display
            sendToDisplay(String(result));
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
        // convert number to string to check if the result overflows display
        sendToDisplay(String(result));
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
    if (!display.textContent.includes(".")) {2
        // Change "." to "0." when display is empty
        if (display.textContent === "") {
            sendToDisplay("0.");
        } else {
            sendToDisplay(decimalPointKey.textContent);
        }
    }
});

const deleteKey = document.querySelector("#deleteKey");
deleteKey.addEventListener("click", () => {
    // slice(start, end) will extract string from index <start> to <end - 1>
    display.textContent = display.textContent.slice(0,-1);
});

let clickEvent = new MouseEvent('click', {
    bubbles: true,
    cancelable: true
});
window.addEventListener("keydown", function (e) {
    let btn;
    switch (e.key) {
        case "0":
            btn = document.querySelector("#zero");
            break;
        case "1":
            btn = document.querySelector("#one");
            break;
        case "2":
            btn = this.document.querySelector("#two");
            break;
        case "3":
            btn = this.document.querySelector("#three");
            break;
        case "4":
            btn = this.document.querySelector("#four");
            break;
        case "5":
            btn = this.document.querySelector("#five");
            break;
        case "6":
            btn = this.document.querySelector("#six");
            break;
        case "7":
            btn = this.document.querySelector("#seven");
            break;
        case "8":
            btn = this.document.querySelector("#eight");
            break;
        case "9":
            btn = this.document.querySelector("#nine");
            break;
        case "+":
            btn = this.document.querySelector("#plus");
            break;
        case "-":
            btn = this.document.querySelector("#subtract");
            break;
        case "/":
            btn = this.document.querySelector("#divide");
            break;
        case "*":
            btn = this.document.querySelector("#multiply");
            break;
        case "=":
        case "Enter":
            btn = this.document.querySelector("#equalsToKey");
            break;
        case "Backspace":
            btn = this.document.querySelector("#deleteKey");
            break;
        case ".":
            btn = this.document.querySelector("#decimalPointKey");
    }
    if (btn) {
        log(`Keyboard => ${btn.textContent}`);
        btn.dispatchEvent(clickEvent);
    }
});