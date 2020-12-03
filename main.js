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


//przypisanie po kliknięciu odpowiedniej wartości do znaku
numbers.forEach((element,index) => {
    element.addEventListener("click", () => {
        if(index == 9) mainResultInput.value += 0;
        else mainResultInput.value += index+1;
    })
});

//obsługa znaków działań
dotChar.addEventListener("click", () => {
    mainResultInput.value += ".";
});

equalChar.addEventListener("click", () => {
    //spradzamy czy ostatnim podanym znakiem przed nacisnięciem równa się nie jest żaden znak, jeśli jest usuwamy go
    charsNumbersArray.push(parseFloat(mainResultInput.value));
    sideResultInputWrite();

    if((charsNumbersArray[charsNumbersArray.length-1] == "+" || charsNumbersArray[charsNumbersArray.length-1] == "-" || charsNumbersArray[charsNumbersArray.length-1] == "*" || charsNumbersArray[charsNumbersArray.length-1] == "/")==true) {
        charsNumbersArray.splice(charsNumbersArray.length-1,1);
    }
    
    mainResultInput.value = "";
    sideResultInputWrite();
     
    giveResult();

    charsNumbersArray.splice(0,charsNumbersArray.length);
    sideResultInputWrite();
});

addChar.addEventListener("click", () => {
    if(mainResultInput.value!="") charsNumbersArray.push(parseFloat(mainResultInput.value));
    sideResultInputWrite();
    mainResultInput.value = "";

    if(emptyTable()==false || charsNumbersArray[0]!="-") newChar("+");

    sideResultInputWrite();
});

minusChar.addEventListener("click", () => {
    if(mainResultInput.value!="") charsNumbersArray.push(parseFloat(mainResultInput.value));
    sideResultInputWrite();
    mainResultInput.value = "";
    
    newChar("-");

    sideResultInputWrite();
});

multiplyChar.addEventListener("click", () => {
    if(mainResultInput.value!="") charsNumbersArray.push(parseFloat(mainResultInput.value));
    sideResultInputWrite();
    mainResultInput.value = "";
    
    if(emptyTable()==false) newChar("*");

    sideResultInputWrite();
});

devideChar.addEventListener("click", () => {
    if(mainResultInput.value!="") charsNumbersArray.push(parseFloat(mainResultInput.value));
    sideResultInputWrite();
    mainResultInput.value = "";

    if(emptyTable()==false) newChar("/");

    sideResultInputWrite();
});

//obsługa przycisku czyść
clearButton.addEventListener("click", () => {
    mainResultInput.value = "";
    charsNumbersArray.splice(0,charsNumbersArray.length);
    sideResultInputWrite();
})