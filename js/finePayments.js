"use strict";
/**
Перед вами список полів. Це можна сказати пряме посилання на кожне із полів форми.
Якщо ви додасте до змінної .value (fineNumber.value) то отримаєте значення
яке зберігається в цьому полі.
 */
let fineNumber = document.getElementById("fineNumber");
let passport = document.getElementById("passport");
let creditCardNumber = document.getElementById("creditCardNumber");
let cvv = document.getElementById("cvv");
let amount = document.getElementById("amount");
let buttonSubmit = document.getElementById("payFine");

//Ця зміна містить всі дані які в нас зберігаються у файлі data
let DB = data.finesData;

const reFineNumberOrCvv = /^\d{3}$/;
const rePassport = /^[А-ЩЬЮЯҐЄІЇІ]{2}\d{6}$/;
const reCreditCard = /^(3[47]|4\d|5[1-5]|6\d)\d{14}$/;
const reAmount = /^[1-9][\d][\d]?$/;

/**
Вам необхідно реалізувати наступний функціонал.
Зробити валідацію до всіх полів
1. Номер та сума повинні бути однакові як в існуючого штрафу - якщо ні видавати
alert "Номер не співпадає" або "Сума не співпадає"

2. Паспортні дані у форматі - перші дві літери укр алфавіту, та 6 цифр.
Якщо не співпадає то видавати alert "Не вірний паспортний номер"

3. Номер кредитної карки 16 цифр -
якщо не співпадає то видавати alert "Не вірна кредитна картка"

4. cvv 3 цифри - якщо не співпадає то видавати alert "Не вірний cvv".

Якщо валідація проходить успішно, то виконати оплату,
 тобто вам потрібно видалити обєкт з DB
 */

 function findMatchingFine(fineNumber, amount) {
    for (let index in DB) {
        const fine = DB[index];
        if (fine.номер === fineNumber && fine.сума == amount) {
            return fine;
        }
    }
    return null;
}

buttonSubmit.addEventListener('click',payFine);
function payFine(){
    const matchingFine = findMatchingFine(fineNumber.value, amount.value);

if (
    reFineNumberOrCvv.test(fineNumber.value) == false ||
    rePassport.test(passport.value) == false ||
    reCreditCard.test(creditCardNumber.value) == false ||
    reFineNumberOrCvv.test(cvv.value) == false ||
    reAmount.test(amount.value) == false ||
    cvv.value === '000'   
) {
    if (reFineNumberOrCvv.test(fineNumber.value) === false) {
    alert("Номер штрафу не співпадає");
    return;
    }
    if (rePassport.test(passport.value) === false) {
    alert("Не вірний паспортний номер");
    return;
    }
    if (reCreditCard.test(creditCardNumber.value) === false) {
    alert("Не вірна кредитна картка");
    return;
    }
    if (reFineNumberOrCvv.test(cvv.value) === false || cvv.value === '000') {
    alert("Не вірний cvv");
    return;
    }
    if (reAmount.test(amount.value) === false) {
    alert("Сума не співпадає");
    return;
    }
} else if (!matchingFine) { 
    if (fineNumber !== fineNumber.value && amount.value !== amount.value) {
        alert("Номер тa сума не співпадають");
        return;
    }
    if (fineNumber === fineNumber.value && amount.value !== amount.value) {
        alert("Сума не співпадає");
        return;
    }
    if (fineNumber !== fineNumber.value && amount.value === amount.value) {
        alert("Номер штрафу не співпадає");
        return;
    } 

} else {

    const fineIndex = DB.indexOf(matchingFine);
    if(fineIndex !== -1) {
    DB.splice(fineIndex, 1);
    alert("Оплата успішна");
    } else {
        alert("Помилка оплати");
    }
}
}