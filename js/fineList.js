"use strict";
window.fineList = {
    searchFines : searchFines
}

//Ця зміна містить всі дані які в нас зберігаються у файлі data
let DB = data.finesData;

function searchFines(searchKey){
    return DB.filter(function(fine) {
        return fine.номер === searchKey || fine.тип === searchKey;
    });
}

