'use client'

import React, { useMemo } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { ChevronRight, Home, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

const toTitleCase = (str: string) => {
    return str.split('-').map(word => {
        if (word.toLowerCase() === 'and') return 'and';
        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
}

const BreadcrumbProvider = () => {
    const pathname = usePathname()
    const router = useRouter()
    
    if (!pathname || pathname === '/') return null

    const paths = useMemo(() => pathname.split('/').filter(path => path), [pathname])

    const breadcrumbItems = useMemo(() => paths.map((path, index) => {
        const href = `/${paths.slice(0, index + 1).join('/')}`
        const isLast = index === paths.length - 1

        return (
            <React.Fragment key={path}>
                <BreadcrumbItem>
                    {isLast ? (
                        <BreadcrumbPage className="font-semibold text-foreground">
                            {toTitleCase(path)}
                        </BreadcrumbPage>
                    ) : (
                        <BreadcrumbLink asChild>
                            <Link 
                                href={href} 
                                className="text-muted-foreground hover:text-primary animate-fade"
                            >
                                {toTitleCase(path)}
                            </Link>
                        </BreadcrumbLink>
                    )}
                </BreadcrumbItem>
                {!isLast && (
                    <BreadcrumbSeparator>
                        <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                    </BreadcrumbSeparator>
                )}
            </React.Fragment>
        )
    }), [paths])

    return (
        <div className="sticky top-16 z-50 container">
            <div className="flex items-center gap-2 py-2 px-4 glass-effect rounded-md shadow-custom my-3">
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 hover:bg-accent-hover"
                    onClick={() => router.back()}
                >
                    <ArrowLeft className="h-4 w-4" />
                </Button>

                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink 
                                className="flex items-center text-muted-foreground hover:text-primary animate-fade" 
                                asChild
                            >
                                <Link href={'/'}>
                                    <Home className="h-4 w-4 mr-1" />
                                    Home
                                </Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>
                            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                        </BreadcrumbSeparator>
                        {breadcrumbItems}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </div>
    )
}

export default React.memo(BreadcrumbProvider)
