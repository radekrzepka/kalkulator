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
let stringResult = "";


//wpisanie działania do pobocznego inputa
const sideResultInputWrite = () => {
    sideResultInput.value = "";
    charsNumbersArray.forEach(element => {
        sideResultInput.value += element;
    })
};

//obliczenie wyniku
const countResult = () => {
    stringResult = "";
    charsNumbersArray.forEach(element => {
        stringResult +=element;
    });
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
    if(mainResultInput.value!="") charsNumbersArray.push(parseFloat(mainResultInput.value));
    mainResultInput.value = "";
    sideResultInputWrite();
    countResult();
});

addChar.addEventListener("click", () => {
    charsNumbersArray.push(mainResultInput.value);
    mainResultInput.value = "";
    charsNumbersArray.push("+");
    sideResultInputWrite();
});

minusChar.addEventListener("click", () => {
    charsNumbersArray.push(mainResultInput.value);
    mainResultInput.value = "";
    charsNumbersArray.push("-");
    sideResultInputWrite();
});

multiplyChar.addEventListener("click", () => {
    charsNumbersArray.push(mainResultInput.value);
    mainResultInput.value = "";
    charsNumbersArray.push("*");
    sideResultInputWrite();
});

devideChar.addEventListener("click", () => {
    charsNumbersArray.push(mainResultInput.value);
    mainResultInput.value = "";
    charsNumbersArray.push("/");
    sideResultInputWrite();
});

//obsługa przycisku czyść
clearButton.addEventListener("click", () => {
    mainResultInput.value = "";
    charsNumbersArray.splice(0,charsNumbersArray.length);
    sideResultInputWrite();
})