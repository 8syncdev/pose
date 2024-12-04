"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState, useEffect, useRef } from "react";
import { createUser } from "@/lib/actions/user/user.action";
import { useRouter } from "next/navigation";
import { Lock, Mail, User } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { SparklesText } from "@/components/ui/animation/text/sparkles-text";
import ShinyButton from "@/components/ui/button/shinny-button";
import { GridPattern } from "@/components/ui/bg/grid-bg";
import { Sparkles } from "@/components/ui/sparkles/sparkles";
import { TimelineContent } from "@/components/ui/animation/scroll/framer-timeline";
import type { CreateUserDto } from "@/lib/actions/user/user.dto";
import dynamic from "next/dynamic";

// Form validation schema
export const formSchema = z.object({
  username: z.string().min(3, "Tên đăng nhập phải có ít nhất 3 ký tự"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Mật khẩu xác nhận không khớp",
  path: ["confirmPassword"],
});

// Type for form data
export type SignUpFormData = z.infer<typeof formSchema>;

// Type for registration response
export interface RegistrationResponse {
  success: boolean;
  message?: string;
}

// Main form component - Dynamically imported
export const SignUpForm = dynamic(() => Promise.resolve(function SignUpFormComponent() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();
  const timelineRef = useRef<HTMLDivElement>(null);

  // Initialize form with validation schema
  const form = useForm<SignUpFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: ""
    },
  });

  /**
   * Handle form submission
   * @param values Form values matching SignUpFormData type
   */
  const onSubmit = async (values: SignUpFormData) => {
    setIsLoading(true);
    try {
      const userData: CreateUserDto = {
        username: values.username,
        password: values.password
      };

      const response = await createUser(userData);

      if (!response.success) {
        toast({
          variant: "destructive",
          title: "Lỗi",
          description: response.message || "Đăng ký thất bại. Vui lòng thử lại.",
        });
        return;
      }

      toast({
        title: "Thành công", 
        description: "Đăng ký thành công! Vui lòng đăng nhập.",
      });
      router.push("/sign-in");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: error instanceof Error ? error.message : "Đăng ký thất bại. Vui lòng thử lại.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div ref={timelineRef} className="relative min-h-screen flex items-center justify-center w-full overflow-x-hidden">
      <GridPattern
        width={80}
        height={80}
        className="absolute inset-0 -z-10 w-screen h-screen"
        strokeDasharray="4 4"
      />
      
      <div className='absolute inset-0 [mask-image:radial-gradient(50%_50%,white,transparent)] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,hsl(var(--primary)),transparent_90%)] before:opacity-100'>
        <div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#ffffff2c_1px,transparent_1px),linear-gradient(to_bottom,#3a3a3a01_1px,transparent_1px)] bg-[size:70px_80px]'></div>
        <Sparkles
          density={400}
          size={1.4}
          direction='top'
          className='absolute inset-x-0 top-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_85%)]'
        />
      </div>

      <TimelineContent timelineRef={timelineRef} effect="fade" once>
        <Card className="w-full max-w-md mx-auto glass-effect">
          <CardHeader className="space-y-1">
            <SparklesText
              text="Đăng ký"
              className="!text-2xl font-bold text-center"
              colors={{ first: "#9E7AFF", second: "#FE8BBB" }}
            />
            <CardDescription className="text-center text-balance">
              Tạo tài khoản mới để truy cập hệ thống
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tên đăng nhập</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Input
                            placeholder="Nhập tên đăng nhập"
                            className="input pl-10"
                            disabled={isLoading}
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mật khẩu</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Input
                            type="password"
                            placeholder="Nhập mật khẩu"
                            className="input pl-10"
                            disabled={isLoading}
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Xác nhận mật khẩu</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Input
                            type="password"
                            placeholder="Nhập lại mật khẩu"
                            className="input pl-10"
                            disabled={isLoading}
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <ShinyButton type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? "Đang đăng ký..." : "Đăng ký"}
                </ShinyButton>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TimelineContent>
    </div>
  );
}), {
  ssr: false,
  loading: () => <div>Loading...</div>
});
