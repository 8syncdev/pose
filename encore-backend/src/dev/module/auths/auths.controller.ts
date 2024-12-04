import { api, APIError } from "encore.dev/api";
import { UserService } from "./auths.module";
import { generateToken } from "./auths.utils";
import { User } from "../users/users.model";
import { getAuthData } from "encore.dev/internal/codegen/auth";
import { CreateTokenDto, TokenDto, AuthDataDto, TestTokenDto, AuthResponse } from "./auths.dto";

export const getToken = api(
    { expose: true, auth: false, method: "POST", path: "/auth/token" },
    async ({ username, password }: CreateTokenDto): Promise<AuthResponse> => {
        const userResponse = await UserService.login(username, password);
        if (!userResponse.success || !userResponse.result) {
            throw APIError.unauthenticated("Invalid credentials");
        }

        const user = userResponse.result as User;
        if (Array.isArray(user)) {
            throw new Error("Unexpected array result");
        }
        if (!user.id) {
            throw new Error("User ID is undefined");
        }
        const token = generateToken(user.id.toString(), user.username);

        return { 
            success: true,
            result: { token } as TokenDto 
        };
    }
);

export const getUserByToken = api(
    { expose: true, auth: true, method: "GET", path: "/auth/user" },
    async (): Promise<AuthResponse> => {
        const authData = getAuthData<AuthDataDto>();
        if (!authData) {
            throw APIError.unauthenticated("Invalid or missing authentication data");
        }
        return {
            success: true,
            result: {
                message: "Token is valid",
                user: authData
            } as TestTokenDto
        };
    }
);
