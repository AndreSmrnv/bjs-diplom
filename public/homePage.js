"use strict";

//#2
//#
const logoutButton = new LogoutButton();

logoutButton.action = () => ApiConnector.logout(response => {
    console.log(response);
    if (response.success) {
        console.log(response.success);
        location.reload();
    }    
});
//#
ApiConnector.current(response => {
        console.log(response);
        if (response.success) {
            console.log(response.success);
            ProfileWidget.showProfile(response.data);
        }
    }
);
//#
const ratesBoard = new RatesBoard();
function getExchangeRate () {
    ApiConnector.getStocks(response => {
            console.log(response);
            if (response.success) {
                console.log(response.success);
                ratesBoard.clearTable;
                ratesBoard.fillTable(response.data);
            }
        }
    );
}
getExchangeRate ();
let delayRefreshExchangeRate = 60000;
let timerIdRefreshExchangeRate = setInterval(() => getExchangeRate (), 60000);
//#
const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = data => ApiConnector.addMoney(data,response => {
    console.log(response);
    if (response.success) {
        console.log(response.success);
        ProfileWidget.showProfile(response.data);
        moneyManager.setMessage(response.success, 'Балланс пополнен');
    } 
    else {
        console.log(response);
        moneyManager.setMessage(response.success, response.error);
    }   
});
//#
moneyManager.conversionMoneyCallback = data => ApiConnector.convertMoney(data,response => {
    console.log(response);
    if (response.success) {
        console.log(response.success);
        ProfileWidget.showProfile(response.data);
        moneyManager.setMessage(response.success, 'Сумма сконвертирована');
    } 
    else {
        console.log(response);
        moneyManager.setMessage(response.success, response.error);
    }   
});
//#
// conversionMoneyCallback

/*
addMoney({ currency, amount }, callback) — запрос на добавление денег авторизованному пользователю
*/