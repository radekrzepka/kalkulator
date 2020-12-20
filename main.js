const numbers = document.querySelectorAll(".number");
const mainResultInput = document.querySelector(".mainInput");
const sideResultInput = document.querySelector(".sideInput");

const addChar = document.querySelector(".add");
const minusChar = document.querySelector(".minus");
const multiplyChar = document.querySelector(".multiply");
const devideChar = document.querySelector(".devide");

const dotChar = document.querySelector(".dot");
const equalChar = document.querySelector(".equal");
const clearButton = document.querySelector(".clear");

const charsNumbersArray = []; 

//wpisanie działania do pobocznego inputa
const sideResultInputWrite = () => {
    sideResultInput.value = "";
    charsNumbersArray.forEach(element => {
        sideResultInput.value += element;
    })
};

//obsługa przyicku cyfer
numbers.forEach((element,index) => {
    element.addEventListener("click", () => {
        if(index == 9) mainResultInput.value += 0;
        else mainResultInput.value += index+1;
    })
});

//znak kropki
dotChar.addEventListener("click", () => mainResultInput.value += ".");

//funkcja licząca wynik 
const giveResult = () => {   
    let result = charsNumbersArray[0];

    //obliczanie wyniku
    for(let i=1; i<charsNumbersArray.length; i+=2) {
        let char = charsNumbersArray[i];
        switch(char) {
            case "+":
                result += charsNumbersArray[i+1];
                break;
            case "-":
                result -= charsNumbersArray[i+1];
                break;
            case "*":
                result *= charsNumbersArray[i+1];
                break;
            case "/":
                result /= charsNumbersArray[i+1];
                break;
        }
        mainResultInput.value = result;
    }

    //wpisanie działania do historii
    const record = new Record(sideResultInput.value, result);
    history.push(record);
    showHistory();

    //czysczenie interfejsu
    charsNumbersArray.splice(0, charsNumbersArray.length);
    sideResultInputWrite();
}

//znak równa się
equalChar.addEventListener("click", () => {
    //spradzamy czy ostatnim podanym znakiem przed nacisnięciem równa się nie jest żaden znak, jeśli jest usuwamy go
    charsNumbersArray.push(parseFloat(mainResultInput.value));
    sideResultInputWrite();

    mainResultInput.value = "";
    sideResultInputWrite();
     
    giveResult();
});

//wpisanie liczby
const writeNumber = () => {
    if(mainResultInput.value!="") charsNumbersArray.push(parseFloat(mainResultInput.value));
    sideResultInputWrite();
    mainResultInput.value = "";
}

//sprawdzanie czy przed znakiem który chcemy wstawić jest inny znak, jeśli tak to go zamieniamy, a jeżeli tablica jest pusta nic nie wpisujemy
const writeChar = newChar => {
    if(charsNumbersArray[charsNumbersArray.length-1] == "+" || charsNumbersArray[charsNumbersArray.length-1] == "-" || charsNumbersArray[charsNumbersArray.length-1] == "*" || charsNumbersArray[charsNumbersArray.length-1] == "/") {
        charsNumbersArray.splice(charsNumbersArray.length-1, 1);
        charsNumbersArray.push(newChar);
    }
    else if(charsNumbersArray.length == 0) {}
    else charsNumbersArray.push(newChar);
}

//znak plus
addChar.addEventListener("click", () => {
    writeNumber();
    writeChar("+");
    sideResultInputWrite();
});

//znak minus
minusChar.addEventListener("click", () => {
    writeNumber();
    writeChar("-");
    sideResultInputWrite();
});

//znak mnożenia
multiplyChar.addEventListener("click", () => {
    writeNumber();
    writeChar("*");
    sideResultInputWrite();
});

//znak dzielenia
devideChar.addEventListener("click", () => {
    writeNumber();
    writeChar("/");
    sideResultInputWrite();
});

//znak czyść
clearButton.addEventListener("click", () => {
    mainResultInput.value = "";
    charsNumbersArray.splice(0,charsNumbersArray.length);
    sideResultInputWrite();
})

//obsługa histori działań
const history = [];

class Record {
    constructor(operation,result){
        this.operation = operation;
        this.result = result;
    }
}

//pokaż historię
const divApp = document.querySelector(".app");
let divHistory = document.querySelector(".history");

const showHistory = () => {
    divHistory.remove();
    divHistory = document.createElement("div");
    divHistory.classList.add("history");
    divApp.appendChild(divHistory);    

    history.forEach((element,index) => {
        const div = document.createElement("div");
        div.classList.add("record");
        divHistory.appendChild(div);

        const spanOperation = document.createElement("span");
        spanOperation.classList.add("operation");
        spanOperation.textContent = history[index].operation;

        const spanResult = document.createElement("span");
        spanResult.classList.add("result");
        spanResult.textContent = history[index].result;

        div.appendChild(spanOperation);
        div.appendChild(spanResult);
    });
}