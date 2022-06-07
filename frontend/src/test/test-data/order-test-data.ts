import {Transfer, TransferError} from "../../types/types";

export const orderRequestData = {
    "firstName": "John",
    "lastName": "Doe",
    "city": "New York",
    "address": "Wall Street1",
    "postIndex": 1234567890,
    "phoneNumber": "1234567890",
    "email": "test123@test.com",
    "perfumesId": [33, 34],
    "totalPrice": 840
};

export const transferData: Transfer = {
    "id": 1,
    "dateTime": "2022-28-04",
    "status": "COMPLETE",
    "commission": 0.0,
    "amount": 100.0,
    "senderNumber": "1298472498812",
    "recipientNumber": "398974892148"
};

// todo: write normal test for transfersData.

// export const transfersData: Array<Transfer> = [
//     {
//         "id": 1,
//         "totalPrice": 840,
//         "date": "2021-04-07",
//         "firstName": "John",
//         "lastName": "Doe",
//         "city": "New York",
//         "address": "Wall Street1",
//         "email": "test123@test.com",
//         "phoneNumber": "1234567890",
//         "postIndex": 1234567890
//     },
//     {
//         "id": 2,
//         "totalPrice": 240,
//         "date": "2021-04-07",
//         "firstName": "John",
//         "lastName": "Doe",
//         "city": "New York",
//         "address": "Wall Street1",
//         "email": "test123@test.com",
//         "phoneNumber": "1234567890",
//         "postIndex": 1234567890
//     },
//     {
//         "id": 3,
//         "totalPrice": 163,
//         "date": "2021-04-07",
//         "firstName": "Ivan",
//         "lastName": "Ivanov",
//         "city": "Moscow",
//         "address": "Tverskaya street 1",
//         "email": "ivan123@test.com",
//         "phoneNumber": "1234567890",
//         "postIndex": 1234567890
//     },
//     {
//         "id": 4,
//         "totalPrice": 780,
//         "date": "2021-04-07",
//         "firstName": "Ivan",
//         "lastName": "Ivanov",
//         "city": "Moscow",
//         "address": "Tverskaya street 1",
//         "email": "ivan123@test.com",
//         "phoneNumber": "1234567890",
//         "postIndex": 1234567890
//     },
//     {
//         "id": 5,
//         "totalPrice": 196,
//         "date": "2021-04-07",
//         "firstName": "Ivan",
//         "lastName": "Ivanov",
//         "city": "Moscow",
//         "address": "Tverskaya street 1",
//         "email": "ivan123@test.com",
//         "phoneNumber": "1234567890",
//         "postIndex": 1234567890
//     }
// ];

// export const orderErrorData: OrderError =  {
//     emailError: "Email cannot be empty",
//     firstNameError: "Fill in the input field",
//     lastNameError: "Fill in the input field",
//     cityError: "Fill in the input field",
//     addressError: "Fill in the input field",
//     postIndexError: "Post index cannot be empty",
//     phoneNumberError: "Phone number cannot be empty",
// };
