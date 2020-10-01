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
                ratesBoard.clearTable();
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
});
//#
moneyManager.conversionMoneyCallback = data => ApiConnector.convertMoney(data,response => {
    updateProfile (response.data, response.success, response.error || 'Сумма сконвертирована' );    
});
//#
moneyManager.sendMoneyCallback = data => ApiConnector.transferMoney(data,response => {
    updateProfile (response.data, response.success, response.error || 'Перевод успешно завершен' );    
});
function updateProfile (data, success, message) {
    if (success) ProfileWidget.showProfile(data);
    if (message) moneyManager.setMessage(success, message);    
};
//#
const favoritesWidget = new FavoritesWidget();
ApiConnector.getFavorites(response => {
    updateFavoritesUsersList(response.data, response.success, response.error || false);    
}
);
//#
favoritesWidget.addUserCallback = data => ApiConnector.addUserToFavorites(data,response => {
    updateFavoritesUsersList(response.data, response.success, response.error || 'Пользователь добавлен в избранное');    
});
//#
favoritesWidget.removeUserCallback = data => ApiConnector.removeUserFromFavorites(data,response => {
    updateFavoritesUsersList(response.data, response.success, response.error || 'Пользователь удален из избранного');    
});

function updateFavoritesUsersList (data, success, message) {
    if (success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(data);
        moneyManager.updateUsersList(data);        
    }
    if (message) favoritesWidget.setMessage(success, message);
        
}
