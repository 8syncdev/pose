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
import { useState, useEffect, useRef, useCallback } from "react";
import { getToken } from "@/lib/actions/auth/auth.action";
import { useRouter } from "next/navigation";
import { Lock, Mail } from "lucide-react";
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
import dynamic from "next/dynamic";
import { useAuth } from "@/hooks/use-auth";

// Form schema with validation
export const formSchema = z.object({
  username: z.string().min(1, "Tên đăng nhập là bắt buộc"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

// Type for form data
export type SignInFormData = z.infer<typeof formSchema>;

// Main form component - Dynamically imported
export const SignInForm = dynamic(() => Promise.resolve(function SignInFormComponent() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();
  const timelineRef = useRef<HTMLDivElement>(null);
  const { user, checkAuth } = useAuth();

  // Check authentication on mount
  useEffect(() => {
    if (user) {
      toast({
        title: "Thông báo",
        description: "Bạn đã đăng nhập!",
      });
      router.push("/");
    }
  }, [user, toast, router]);

  // Initialize form with validation schema
  const form = useForm<SignInFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Handle form submission
  const onSubmit = useCallback(async (values: SignInFormData) => {
    setIsLoading(true);
    try {
      const response = await getToken({
        username: values.username,
        password: values.password,
      });

      if (!response.success) {
        toast({
          variant: "destructive",
          title: "Lỗi",
          description: response.message || "Đăng nhập thất bại. Vui lòng thử lại.",
        });
        return;
      }

      await checkAuth();
      
      toast({
        title: "Thành công",
        description: "Đăng nhập thành công!",
      });
      router.push("/");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: error instanceof Error ? error.message : "Đăng nhập thất bại. Vui lòng thử lại.",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast, router, checkAuth]);

  return (
    <div ref={timelineRef} className="relative flex items-center justify-center w-full h-full overflow-hidden">
      <GridPattern
        width={80}
        height={80}
        className="absolute inset-0 -z-10 w-full h-full"
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
              text="Đăng nhập"
              className="!text-2xl font-bold text-center"
              colors={{ first: "#9E7AFF", second: "#FE8BBB" }}
            />
            <CardDescription className="text-center text-balance">
              Nhập thông tin đăng nhập để truy cập tài khoản của bạn
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
                          <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
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
                <ShinyButton type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
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
