"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { Loader2, User, Mail, Phone, Globe2, Clock, Languages } from "lucide-react"
import { getUserById, updateUser } from "@/lib/actions/user/user.action"
import type { UserDto, UpdateUserDto } from "@/lib/actions/user/user.dto"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ProfilePage() {
    const [user, setUser] = useState<UserDto | null>(null)
    const [loading, setLoading] = useState(true)
    const [updating, setUpdating] = useState(false)
    const [formData, setFormData] = useState<UpdateUserDto>({})

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await getUserById(1) // Replace with actual user ID
                if (response.success && response.result) {
                    const userData = response.result as UserDto
                    setUser(userData)
                    setFormData({
                        email: userData.email || '',
                        phone: userData.phone || '',
                        first_name: userData.first_name || '',
                        last_name: userData.last_name || '',
                        bio: userData.bio || '',
                        preferred_language: userData.preferred_language || '',
                        timezone: userData.timezone || ''
                    })
                }
            } catch (error) {
                toast({
                    title: "Lỗi",
                    description: "Không thể tải thông tin người dùng",
                    variant: "destructive"
                })
            } finally {
                setLoading(false)
            }
        }

        fetchUser()
    }, [])

    const handleSubmit = async () => {
        if (!user?.id) return

        setUpdating(true)
        try {
            const response = await updateUser(user.id, formData)
            if (response.success) {
                toast({
                    title: "Thành công",
                    description: "Đã cập nhật thông tin cá nhân",
                })
            } else {
                throw new Error(response.message)
            }
        } catch (error) {
            toast({
                title: "Lỗi",
                description: "Không thể cập nhật thông tin",
                variant: "destructive"
            })
        } finally {
            setUpdating(false)
        }
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="h-6 w-6 animate-spin" />
            </div>
        )
    }

    return (
        <div className="container max-w-4xl py-10">
            <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="profile">Thông tin cá nhân</TabsTrigger>
                    <TabsTrigger value="settings">Cài đặt</TabsTrigger>
                </TabsList>

                <TabsContent value="profile">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-4">
                                <Avatar className="h-20 w-20">
                                    <AvatarImage src={user?.profile_picture || ''} />
                                    <AvatarFallback>
                                        <User className="h-10 w-10" />
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <CardTitle>{user?.username}</CardTitle>
                                    <CardDescription>Quản lý thông tin cá nhân của bạn</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="first_name">Tên</Label>
                                    <Input
                                        id="first_name"
                                        value={formData.first_name || ''}
                                        onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="last_name">Họ</Label>
                                    <Input
                                        id="last_name"
                                        value={formData.last_name || ''}
                                        onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <div className="relative">
                                    <Mail className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="email"
                                        className="pl-8"
                                        value={formData.email || ''}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone">Số điện thoại</Label>
                                <div className="relative">
                                    <Phone className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="phone"
                                        className="pl-8"
                                        value={formData.phone || ''}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="bio">Giới thiệu</Label>
                                <Textarea
                                    id="bio"
                                    value={formData.bio || ''}
                                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                    rows={4}
                                />
                            </div>

                            <Button onClick={handleSubmit} disabled={updating} className="w-full">
                                {updating ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Đang cập nhật...
                                    </>
                                ) : (
                                    'Lưu thay đổi'
                                )}
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="settings">
                    <Card>
                        <CardHeader>
                            <CardTitle>Cài đặt</CardTitle>
                            <CardDescription>Quản lý cài đặt tài khoản của bạn</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="language">Ngôn ngữ</Label>
                                <div className="relative">
                                    <Languages className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="language"
                                        className="pl-8"
                                        value={formData.preferred_language || ''}
                                        onChange={(e) => setFormData({ ...formData, preferred_language: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="timezone">Múi giờ</Label>
                                <div className="relative">
                                    <Globe2 className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="timezone"
                                        className="pl-8"
                                        value={formData.timezone || ''}
                                        onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                                    />
                                </div>
                            </div>

                            <Button onClick={handleSubmit} disabled={updating} className="w-full">
                                {updating ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Đang cập nhật...
                                    </>
                                ) : (
                                    'Lưu thay đổi'
                                )}
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
