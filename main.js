//przypisywanie przycisków
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

const charsNumbersArray = []; //tablica liczb oraz znaków wprowadzanych przez użytkownika

//zmienne pomocnicze
let result = 0;
let char = "";

//wpisanie działania do pobocznego inputa
const sideResultInputWrite = () => {
    sideResultInput.value = "";
    charsNumbersArray.forEach(element => {
        sideResultInput.value += element;
    })
};

//funkcja licząca wynik 
const giveResult = () => {
    //sprawdzamy czy pierwszym znakiem jest minus, wtedy dajemy liczbę przeciwną
    if(charsNumbersArray[0]=="-") {
        charsNumbersArray.splice(0,1);
        result = charsNumbersArray[0] * (-1);
    }
    else result = charsNumbersArray[0];

    //obliczanie wyniku
    for(let i=1; i<charsNumbersArray.length; i+=2) {
        char = charsNumbersArray[i];
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

//sprawdza czy użytkownik nie chce dodać na pierwszej pozycji znaku
const emptyTable = () => {
    if(charsNumbersArray.length==0) return true;
    else return false;
}

//sprawdzanie czy przed znakiem który chcemy wstawić jest inny znak, jeśli tak to go zamieniamy
const newChar = newChar => {
    if(charsNumbersArray[charsNumbersArray.length-1] == "+" || charsNumbersArray[charsNumbersArray.length-1] == "-" || charsNumbersArray[charsNumbersArray.length-1] == "*" || charsNumbersArray[charsNumbersArray.length-1] == "/") {
        charsNumbersArray.splice(charsNumbersArray.length-1, 1);
        charsNumbersArray.push(newChar);
    }
    else charsNumbersArray.push(newChar);
}

//wypisanie odpowiednej cyfry po naciśnięciu przycisku
numbers.forEach((element,index) => {
    element.addEventListener("click", () => {
        if(index == 9) mainResultInput.value += 0;
        else mainResultInput.value += index+1;
    })
});



//obsługa przycisków na klawiaturze
//cyfry
document.addEventListener("keydown", event => {
    if(event.key >=0 && event.key<=9) {
        mainResultInput.value += event.key;
    }
});

//backspace
document.addEventListener("keydown", event => {
    if(event.key == "Backspace") {
        mainResultInput.value =  mainResultInput.value.slice(0,mainResultInput.value.length-1);
    }
});



//obsługa znaków działań
//znak kropki
dotChar.addEventListener("click", () => {
    mainResultInput.value += ".";
});

//znak równa się
equalChar.addEventListener("click", () => {
    //spradzamy czy ostatnim podanym znakiem przed nacisnięciem równa się nie jest żaden znak, jeśli jest usuwamy go
    charsNumbersArray.push(parseFloat(mainResultInput.value));
    sideResultInputWrite();

    mainResultInput.value = "";
    sideResultInputWrite();
     
    giveResult();
});

//znak plus
addChar.addEventListener("click", () => {
    if(mainResultInput.value!="") charsNumbersArray.push(parseFloat(mainResultInput.value));
    sideResultInputWrite();
    mainResultInput.value = "";

    if(emptyTable()==false && charsNumbersArray[0]!="-") newChar("+");

    sideResultInputWrite();
});

//znak minus
minusChar.addEventListener("click", () => {
    if(mainResultInput.value!="") charsNumbersArray.push(parseFloat(mainResultInput.value));
    sideResultInputWrite();
    mainResultInput.value = "";
    
    newChar("-");

    sideResultInputWrite();
});

//znak mnożenia
multiplyChar.addEventListener("click", () => {
    if(mainResultInput.value!="") charsNumbersArray.push(parseFloat(mainResultInput.value));
    sideResultInputWrite();
    mainResultInput.value = "";
    
    if(emptyTable()==false && charsNumbersArray[0]!="-") newChar("*");

    sideResultInputWrite();
});

//znak dzielenia
devideChar.addEventListener("click", () => {
    if(mainResultInput.value!="") charsNumbersArray.push(parseFloat(mainResultInput.value));
    sideResultInputWrite();
    mainResultInput.value = "";

    if(emptyTable()==false && charsNumbersArray[0]!="-") newChar("/");

    sideResultInputWrite();
});

//znak czyść
clearButton.addEventListener("click", () => {
    mainResultInput.value = "";
    charsNumbersArray.splice(0,charsNumbersArray.length);
    sideResultInputWrite();
})

//historia 
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
