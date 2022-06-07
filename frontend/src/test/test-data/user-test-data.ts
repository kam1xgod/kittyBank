import {
    AuthErrors,
    User,
    UserEditErrors,
    UserRegistration,
    UserResetPasswordData
} from "../../types/types";

export const userData: User = {
    "id": 2,
    "mail": "test123@test.com",
    "firstname": "John",
    "lastname": "Doe",
    "active": true,
    "activationCode": null,
    "passwordResetCode": null,
    "role": "USER"
};

export const usersData: Array<User> = [{
    "id": 2,
    "mail": "test123@test.com",
    "firstname": "John",
    "lastname": "Doe",
    "active": true,
    "activationCode": null,
    "passwordResetCode": null,
    "role": "USER"
}];

export const userEditErrorsData: UserEditErrors = {
    firstNameError: "First name cannot be empty",
    lastNameError: "Last name cannot be empty"
};

export const authErrorsData: AuthErrors = {
    captchaError: "Fill captcha.",
    emailError: "First name cannot be empty",
    firstNameError: "Last name cannot be empty",
    lastNameError: "The password must be between 6 and 16 characters long",
    passwordError: "The password confirmation must be between 6 and 16 characters long",
    password2Error: "Email cannot be empty"
};

export const userResetPasswordData: UserResetPasswordData = {
    "mail": "test123@test.com",
    "password": "string",
    "password2": "string"
};

export const userRegistrationData: UserRegistration = {
    "mail": "test123@test.com",
    "firstname": "John",
    "lastname": "Doe",
    "password": "test123",
    "password2": "test123",
    // "captcha": "test",
};
