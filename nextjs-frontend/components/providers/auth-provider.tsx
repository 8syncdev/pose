'use client';

import dynamic from 'next/dynamic';
import { useAuth } from '@/hooks/use-auth';
import { withMotion, fadeAnimations } from '@/components/hoc/framer.config';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { User, LogIn, Settings, UserCircle, LogOut, CreditCard, GraduationCap, ShieldCheck } from 'lucide-react';
import type { AuthDataDto } from '@/lib/actions/auth/auth.dto';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Avatar,
    AvatarFallback
} from "@/components/ui/avatar";
import { useEffect, useState, useMemo, memo } from 'react';
import { useRouter } from 'next/navigation';
import { getUserRoles } from '@/lib/actions/user/user.action';
import type { RoleDto } from '@/lib/actions/user/user.dto';

interface AuthProviderProps {
    className?: string;
}

interface UserAvatarProps {
    user: AuthDataDto;
    onLogout: () => void;
}

const menuItems = [
    {
        label: 'Hồ sơ',
        icon: UserCircle,
        href: '/profile'
    },
    {
        label: 'Cài đặt', 
        icon: Settings,
        href: '/settings'
    },
    {
        label: 'Thanh toán',
        icon: CreditCard,
        href: '/payment'
    },
    {
        label: 'Khóa học của tôi',
        icon: GraduationCap,
        href: '/learning' 
    }
]

const adminMenuItem = {
    label: 'Quản trị',
    icon: ShieldCheck,
    href: '/dashboard'
}

const UserAvatar = memo(({ user, onLogout }: UserAvatarProps) => {
    const { logout } = useAuth();
    const router = useRouter();
    const MotionDiv = motion.div;
    const animatedProps = useMemo(() => withMotion({
        whileHover: { scale: 1.05 },
        whileTap: { scale: 0.95 },
        ...fadeAnimations.default
    }), []);

    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const checkAdminRole = async () => {
            try {
                const response = await getUserRoles(Number(user.userID));
                if (response.success && response.result) {
                    const roles = Array.isArray(response.result) ? response.result : [response.result];
                    setIsAdmin(roles.some((role: RoleDto) => role.name === 'admin'));
                }
            } catch (error) {
                console.error('Error checking admin role:', error);
            }
        };

        checkAdminRole();
    }, [user.userID]);

    const handleLogout = async () => {
        await logout();
        onLogout();
        router.refresh();
    }

    const finalMenuItems = isAdmin ? [...menuItems, adminMenuItem] : menuItems;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <MotionDiv {...animatedProps}>
                    <Avatar className="cursor-pointer hover:shadow-custom transition-shadow duration-200">
                        <AvatarFallback className="bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] font-semibold border-2 border-[hsl(var(--primary)_/_0.2)] shadow-[0_0_10px_hsl(var(--primary)_/_0.2)]">
                            {user.username.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                </MotionDiv>
            </DropdownMenuTrigger>
            
            <DropdownMenuContent className="w-56 glass-effect" align="end">
                <DropdownMenuLabel className="text-gradient-purple-blue font-bold">Tài khoản của tôi</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    {finalMenuItems.map((item) => (
                        <DropdownMenuItem 
                            key={item.href} 
                            onClick={() => router.push(item.href)}
                            className="hover:bg-[hsl(var(--primary)_/_0.1)] transition-colors duration-200"
                        >
                            <item.icon className="w-4 h-4 mr-2 text-[hsl(var(--primary))]" />
                            {item.label}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                    onClick={handleLogout} 
                    className="text-[hsl(var(--danger))] hover:bg-[hsl(var(--danger)_/_0.1)] transition-colors duration-200"
                >
                    <LogOut className="w-4 h-4 mr-2" />
                    Đăng xuất
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
})

UserAvatar.displayName = 'UserAvatar'

const SignInButton = memo(() => {
    const MotionLink = motion(Link);
    const animatedProps = useMemo(() => withMotion({
        whileHover: { scale: 1.05 },
        whileTap: { scale: 0.95 },
        ...fadeAnimations.default
    }), []);

    return (
        <MotionLink
            href="/sign-in"
            {...animatedProps}
            className="btn btn-primary flex items-center gap-2 shadow-custom hover:shadow-lg transition-shadow duration-200"
        >
            <LogIn className="w-4 h-4" />
            <span className="hidden sm:inline">Đăng nhập</span>
        </MotionLink>
    )
})

SignInButton.displayName = 'SignInButton'

const AuthProvider = ({ className }: AuthProviderProps) => {
    const { user, loading, logout } = useAuth();

    if (loading) {
        return (
            <div className="w-8 h-8 rounded-full bg-[hsl(var(--primary)_/_0.2)] animate-pulse shadow-custom" />
        )
    }

    return (
        <div className={`flex items-center justify-end gap-4 ${className}`}>
            {user ? (
                <UserAvatar user={user} onLogout={logout} />
            ) : (
                <SignInButton />
            )}
        </div>
    )
}

export default dynamic(() => Promise.resolve(AuthProvider), {
    ssr: false
})
