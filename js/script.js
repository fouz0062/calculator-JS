const previous = document.getElementById("pre");
const current = document.getElementById("cur");
const numBtn = document.querySelectorAll(".number");
const operation = document.querySelectorAll(".opr");
const equal = document.getElementById("equals");
const clearr = document.getElementById("clr");
const del = document.getElementById("del");

class Calculator {
    constructor(previous, current) {
        this.previous = previous;
        this.current = current;
        this.clear();
    }

    clear() {
        this.currentNum = "";
        this.previousNum = "";
        this.operationNum = undefined;
    }
    delete() {
        this.currentNum = this.currentNum.toString().slice(0, -1);
    }
    inptNumber(number) {
        if (number === "." && this.currentNum.includes(".")) return;
        this.currentNum += number.toString();
    }
    inputOperation(operation) {
        if (this.currentNum === "") return;
        if (this.previousNum !== "") {
            this.calculate();
        }
        this.operation = operation;
        this.previousNum = this.currentNum + this.operation;
        this.currentNum = "";
    }
    calculate() {
        let result;
        let prev = parseFloat(this.previousNum);
        let cur = parseFloat(this.currentNum);
        if (isNaN(prev) || isNaN(cur)) return;
        switch (this.operation) {
            case "+":
                result = prev + cur;
                break;
            case "-":
                result = prev - cur;
                break;
            case "*":
                result = prev * cur;
                break;
            case "/":
                result = prev / cur;
                break;
            default:
                return;
        }

        this.currentNum = result;
        this.operation = undefined;
        this.previousNum = "";
    }
    updateDisplay() {
        this.current.innerText = this.currentNum;
        this.previous.innerText = this.previousNum;
    }
}

const calc = new Calculator(previous, current);

numBtn.forEach((button) => {
    button.addEventListener("click", () => {
        calc.inptNumber(button.innerText);
        calc.updateDisplay();
        //console.log(button.innerText);
    });
});
operation.forEach((button) => {
    button.addEventListener("click", () => {
        calc.inputOperation(button.innerText);
        calc.updateDisplay();
        //console.log(button.innerText);
    });
});

clearr.addEventListener("click", () => {
    calc.clear();
    calc.updateDisplay();
});

equal.addEventListener("click", () => {
    calc.calculate();
    calc.updateDisplay();
});

del.addEventListener("click", () => {
    calc.delete();
    calc.updateDisplay();
});