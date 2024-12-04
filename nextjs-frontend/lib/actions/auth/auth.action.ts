import { post, get } from '../config';
import { DOMAIN_BE } from '../const';
import { AuthResponse, CreateTokenDto, TokenDto } from './auth.dto';
import { setCookieToken, getCookieToken } from '@/lib/cookie';

/**
 * Get authentication token by username and password
 * @param username - Username for authentication
 * @param password - Password for authentication
 * @returns AuthResponse containing token if successful
 */
export async function getToken(
    { username, password }: CreateTokenDto
): Promise<AuthResponse> {
    const response = await post<CreateTokenDto, AuthResponse>(
        `${DOMAIN_BE}/auth/token`,
        { username, password }
    );

    if (response.error) {
        return {
            success: false,
            message: response.error
        };
    }

    if (response.data?.success && response.data.result) {
        const tokenData = response.data.result as TokenDto;
        await setCookieToken(tokenData.token);
    }

    return response.data || {
        success: false,
        message: 'Invalid response format'
    };
}

/**
 * Get user data from authentication token
 * @returns AuthResponse containing user data if token is valid
 */
export async function getUserByToken(): Promise<AuthResponse> {
    const token = await getCookieToken();
    
    const response = await get<AuthResponse>(
        `${DOMAIN_BE}/auth/user`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    if (response.error) {
        return {
            success: false,
            message: response.error
        };
    }

    return response.data || {
        success: false,
        message: 'Invalid response format'
    };
}
