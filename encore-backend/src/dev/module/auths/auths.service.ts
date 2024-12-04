import { Header, Gateway, APIError } from "encore.dev/api";
import { authHandler } from "encore.dev/auth";
import log from "encore.dev/log";
import { UserService } from "./auths.module";
import { verifyToken } from "./auths.utils";
import { AuthDataDto } from "./auths.dto";

interface AuthParams {
    authorization: Header<"Authorization">;
}


const myAuthHandler = authHandler<AuthParams, AuthDataDto>(
    async (params) => {
        const authHeader = params.authorization;
        if (!authHeader) {
            throw APIError.unauthenticated("Missing Authorization header");
        }

        const [authType, token] = authHeader.split(' ');
        if (authType !== 'Bearer') {
            throw APIError.unauthenticated("Invalid authentication type");
        }

        try {
            const { sub: userId, username } = verifyToken(token);

            const userResponse = await UserService.findOne(parseInt(userId));
            if (!userResponse.success || !userResponse.result) {
                throw new Error("User not found");
            }

            const user = userResponse.result;
            if (Array.isArray(user)) {
                throw new Error("Unexpected array result");
            }

            if (!user.is_active) {
                throw APIError.unauthenticated("User account is inactive");
            }

            return { 
                userID: user.id?.toString() ?? '',
                username: user.username ?? '',
                email: user.email ?? '',
                phone: user.phone ?? ''
            };
        } catch (e) {
            log.error(e);
            throw APIError.unauthenticated("Invalid token", e as Error);
        }
    }
);

export const mygw = new Gateway({
    authHandler: myAuthHandler,
});
