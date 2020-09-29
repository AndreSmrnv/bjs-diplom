"use strict";

//#2
//#
const logoutButton = new LogoutButton();

logoutButton.action = () => ApiConnector.logout(response => {
    if (response.success) {
        location.reload();
    }    
});
//#
ApiConnector.current(response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
        }
    }
);
//#
const ratesBoard = new RatesBoard();
function getExchangeRate () {
    ApiConnector.getStocks(response => {
            if (response.success) {
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
    updateProfile (response.data, response.success, response.error || 'Балланс пополнен' );
    /*
    if (response.success) {
        ProfileWidget.showProfile(response.data);
        moneyManager.setMessage(response.success, 'Балланс пополнен');
    } 
    else {
        moneyManager.setMessage(response.success, response.error);
    } 
    */  
});
//#
moneyManager.conversionMoneyCallback = data => ApiConnector.convertMoney(data,response => {
    updateProfile (response.data, response.success, response.error || 'Сумма сконвертирована' );
    /*
    if (response.success) {
        ProfileWidget.showProfile(response.data);
        moneyManager.setMessage(response.success, 'Сумма сконвертирована');
    } 
    else {
        moneyManager.setMessage(response.success, response.error);
    }  
    */ 
});
//#
moneyManager.sendMoneyCallback = data => ApiConnector.transferMoney(data,response => {
    updateProfile (response.data, response.success, response.error || 'Перевод успешно завершен' );
    /*
    if (response.success) {
        ProfileWidget.showProfile(response.data);
        moneyManager.setMessage(response.success, 'Перевод успешно завершен');
    } 
    else {
        moneyManager.setMessage(response.success, response.error);
    }
    */   
});
function updateProfile (data, success, message) {
    if (success) {
        ProfileWidget.showProfile(data);
        moneyManager.setMessage(success, message);
    } 
    else {
        moneyManager.setMessage(success, message);
    } 
};
//#
const favoritesWidget = new FavoritesWidget();
ApiConnector.getFavorites(response => {
    updateFavoritesUsersList(response.data, response.success, response.error || false);
     /*
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);       
    }
    else {
        favoritesWidget.setMessage(response.success, response.error);
    } 
     */
}
);
//#
favoritesWidget.addUserCallback = data => ApiConnector.addUserToFavorites(data,response => {
    updateFavoritesUsersList(response.data, response.success, response.error || 'Пользователь добавлен в избранное');
    /*
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
        favoritesWidget.setMessage(response.success, 'Пользователь добавлен в избранное');       
    } 
    else {
        favoritesWidget.setMessage(response.success, response.error);
    } 
    */  
});
//#
favoritesWidget.removeUserCallback = data => ApiConnector.removeUserFromFavorites(data,response => {
    updateFavoritesUsersList(response.data, response.success, response.error || 'Пользователь удален из избранного');
    /*
    if (response.success) {        
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
        favoritesWidget.setMessage(response.success, 'Пользователь удален из избранного');        
    } 
    else {        
        favoritesWidget.setMessage(response.success, response.error);
    }
    */   
});
function updateFavoritesUsersList (data, success, message) {
    if (success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(data);
        moneyManager.updateUsersList(data);        
    }
    if (message) favoritesWidget.setMessage(success, message);
        
}
// removeUserCallback

/*

*/