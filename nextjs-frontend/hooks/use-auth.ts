import { useEffect, useState, useCallback } from 'react';
import { getUserByToken } from '@/lib/actions/auth/auth.action';
import { getCookieToken, removeToken } from '@/lib/cookie';
import type { AuthDataDto, GetUserDataFromTokenDto } from '@/lib/actions/auth/auth.dto';
import { usePathname } from 'next/navigation';

export function useAuth() {
    const [user, setUser] = useState<AuthDataDto | null>(null);
    const [loading, setLoading] = useState(true);
    const pathname = usePathname();

    const checkAuth = useCallback(async () => {
        try {
            const token = await getCookieToken();
            
            if (!token) {
                setUser(null);
                return;
            }

            const response = await getUserByToken();
            if (response.success && response.result) {
                const userData = (response.result as GetUserDataFromTokenDto).user;
                setUser(userData);
            } else {
                setUser(null);
                await removeToken();
            }
        } catch (error) {
            console.error('Auth check failed:', error);
            setUser(null);
            await removeToken();
        } finally {
            setLoading(false);
        }
    }, []);

    const logout = useCallback(async () => {
        await removeToken();
        checkAuth();
    }, [checkAuth]);

    useEffect(() => {
        checkAuth()
    }, [pathname, checkAuth]);

    return {
        user,
        loading,
        isAuthenticated: !!user,
        checkAuth,
        logout
    };
}
