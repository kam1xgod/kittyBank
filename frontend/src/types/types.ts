import { type } from "os";

export type Account = {
    id: number
    number: string
    balance: number
    currency: string
    lastTransactionDate: string
    type: string
    creditLimit: number
    status: string
    paymentSystem: string
    card: Partial<Card>
    percentage: number
    canWithdraw: boolean
    canDeposit: boolean
    closable: boolean
    capitalized: boolean
    min: number
    max: number
    years: number
    minMonth: number
    dateOpened: string
    code: string
}

export type SavingPlan = {
    id: number
    canWithdraw: boolean
    canDeposit: boolean
    closable: boolean
    capitalized: boolean
    min: number
    max: number
    years: number
    percentage: number
}

export type Card = {
    id: number
    number: string
    monthYear: string
    cvv: string
}

export type AccountError = {
    typeError: string
    currencyError: string
    paymentSystemError: string
    statusError: string
    creditLimitError: string
    percentageError: string
};

export type Transfer = {
    id: number
    dateTime: string
    status: string
    commission: number
    amount: number
    senderNumber: string
    recipientNumber: string
};

export type TransferError = {
    amountError: string
    senderNumberError: string
    recipientNumberError: string
};

export type SavingPlanError = {
    minError: string
    maxError: string
    yearsError: string
    percentageError: string
};

export type Credit = {
    id: number
    date: string
    daysLeft: number
    status: string
    total: number
    penalty: number
    amount: number
    currency: string
    account: string
}

export type CreditError = {
    amountError: string
}

export type CreditRequest = {
    id: number
    mail: string
}

export type User = {
    id: number
    mail: string
    firstname: string
    lastname: string
    activationCode: string | null
    passwordResetCode: string | null
    active: boolean
    role: string
};

export type UserEdit = {
    id: number | undefined
    firstname: string | undefined
    lastname: string | undefined
};

export type UserEditErrors = {
    firstNameError: string
    lastNameError: string
};

export type UserData = {
    mail: string
    password: string
};

export type UserRegistration = {
    mail: string
    firstname: string
    lastname: string
    password: string
    password2: string
};

export type UserResetPasswordData = {
    mail: string | undefined
    password: string
    password2: string
};

export type AuthErrors = {
    captchaError: string
    emailError: string
    firstNameError: string
    lastNameError: string
    passwordError: string
    password2Error: string
};

export type FilterParamsType = {
    perfumers: Array<string>
    genders: Array<string>
    prices: Array<number>
    sortByPrice?: boolean
};
