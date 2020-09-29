"use strict";

//#1

const userForm = new UserForm();
userForm.loginFormCallback = data => ApiConnector.login(data, response => {
    console.log(response);
    if (response.success) {
        console.log(response.userId);
        location.reload();
    }
    else {
        console.log(response.error);
        userForm.setLoginErrorMessage(response.error);
    }
    
});
userForm.registerFormCallback = data => ApiConnector.register(data, response => {
    console.log(response);
    if (response.success) {
        console.log(response.userId);
        location.reload();
    }
    else {
        console.log(response.error);
        userForm.setRegisterErrorMessage(response.error);
    }
    
});
//userForm.loginFormAction;
