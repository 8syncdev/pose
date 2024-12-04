import { DataResponse } from "../base.dto";

// Data required to create a new token
export type CreateTokenDto = {
    username: string;
    password: string;
}

// Response data for token creation
export type TokenDto = {
    token: string;
}

// Auth data included in responses
export type AuthDataDto = {
    userID: string;
    username: string;
    email: string;
    phone: string;
}

// Response for token test endpoint
export type GetUserDataFromTokenDto = {
    message: string;
    user: AuthDataDto;
}

// Response type for auth-related operations
export type AuthResponse = Omit<DataResponse, 'result'> & {
    result?: TokenDto | GetUserDataFromTokenDto;
}

