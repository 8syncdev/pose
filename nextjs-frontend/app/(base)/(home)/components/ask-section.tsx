"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { TimelineContent } from "@/components/ui/animation/scroll/framer-timeline";
import { SparklesText } from "@/components/ui/animation/text/sparkles-text";
import {
  TextRevealCard,
  TextRevealCardTitle,
  TextRevealCardDescription,
} from "@/components/ui/card/reveal-card";
import { sendEmail } from "@/lib/actions/email.action";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DotPattern } from "@/components/ui/bg/dot-bg";

const formSchema = z.object({
  name: z.string().min(2, "Tên phải có ít nhất 2 ký tự"),
  contact: z.string().refine((val) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    return emailRegex.test(val) || phoneRegex.test(val);
  }, "Email hoặc số điện thoại không hợp lệ"),
  question: z.string().min(10, "Câu hỏi phải có ít nhất 10 ký tự"),
});

const namePlaceholders = [
  "Nhập tên của bạn...",
  "Tên của bạn là gì?",
  "Cho chúng tôi biết tên bạn...",
  "Xin chào, bạn tên là gì?",
];

const contactPlaceholders = [
  "Nhập email hoặc số điện thoại...",
  "Làm sao chúng tôi có thể liên hệ với bạn?",
  "Email hoặc số điện thoại của bạn...",
  "Thông tin liên hệ của bạn...",
];

const questionPlaceholders = [
  "Nhập câu hỏi của bạn...",
  "Bạn muốn hỏi điều gì?",
  "Chúng tôi có thể giúp gì cho bạn?",
  "Chia sẻ thắc mắc của bạn...",
  "Hãy đặt câu hỏi ngay...",
];

export default function AskSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    question: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [notifications, setNotifications] = useState<
    { id: number; text: string }[]
  >([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const clearForm = () => {
    setFormData({
      name: "",
      contact: "",
      question: "",
    });
    setErrors({});
  };

  const addNotification = (text: string) => {
    const id = Date.now();
    setNotifications((prev) => [{ id, text }, ...prev]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 5000);
  };

  const validateForm = () => {
    try {
      formSchema.parse(formData);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: { [key: string]: string } = {};
        error.errors.forEach((err) => {
          if (err.path) {
            newErrors[err.path[0]] = err.message;
          }
        });
        setErrors(newErrors);
        addNotification("Vui lòng kiểm tra lại thông tin!");
      }
      return false;
    }
  };

  const handleInputChange =
    (field: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
      // Clear error when user starts typing
      if (errors[field]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        });
      }
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const success = await sendEmail(
        formData.contact,
        `Name: ${formData.name}\nQuestion: ${formData.question}`
      );

      if (success) {
        addNotification("Câu hỏi của bạn đã được gửi thành công!");
        clearForm();
      } else {
        addNotification("Có lỗi xảy ra, vui lòng thử lại sau!");
      }
    } catch (error) {
      addNotification("Có lỗi xảy ra, vui lòng thử lại sau!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden bg-gradient-to-b from-background/80 to-background"
    >
      <DotPattern />
      <div className="container relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
        <TimelineContent animationNum={0} timelineRef={sectionRef}>
          <SparklesText
            text="Đặt câu hỏi cho chúng tôi"
            className="text-glow text-3xl sm:text-4xl lg:text-5xl text-center"
          />
        </TimelineContent>

        <TimelineContent animationNum={1} timelineRef={sectionRef}>
          <TextRevealCard
            text="Chúng tôi luôn sẵn sàng hỗ trợ bạn"
            revealText="Hãy để lại câu hỏi của bạn"
            className="mb-12 mx-auto backdrop-blur border-glow md:block hidden"
          >
            <TextRevealCardTitle className="text-gradient">
              Bạn có thắc mắc?
            </TextRevealCardTitle>
            <TextRevealCardDescription className="text-muted-foreground">
              Chúng tôi sẽ phản hồi trong vòng 24h
            </TextRevealCardDescription>
          </TextRevealCard>
        </TimelineContent>

        <TimelineContent animationNum={2} timelineRef={sectionRef}>
          <form
            onSubmit={handleSubmit}
            className="space-y-8 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border border-[hsl(var(--primary)_/_0.2)] shadow-custom"
          >
            <div className="space-y-6">
              <div className="transition-all duration-300 hover:scale-[1.02]">
                <Input
                  placeholder={namePlaceholders[0]}
                  onChange={handleInputChange("name")}
                  value={formData.name}
                />
                {errors.name && (
                  <p className="text-[hsl(var(--danger))] text-sm mt-2 ml-4 animate-fade">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="transition-all duration-300 hover:scale-[1.02]">
                <Input
                  placeholder={contactPlaceholders[0]}
                  onChange={handleInputChange("contact")}
                  value={formData.contact}
                />
                {errors.contact && (
                  <p className="text-[hsl(var(--danger))] text-sm mt-2 ml-4 animate-fade">
                    {errors.contact}
                  </p>
                )}
              </div>

              <div className="transition-all duration-300 hover:scale-[1.02]">
                <Input
                  placeholder={questionPlaceholders[0]}
                  onChange={handleInputChange("question")}
                  value={formData.question}
                />
                {errors.question && (
                  <p className="text-[hsl(var(--danger))] text-sm mt-2 ml-4 animate-fade">
                    {errors.question}
                  </p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full hover-scale"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="mr-2"
                  >
                    ⭮
                  </motion.span>
                  Đang gửi...
                </span>
              ) : (
                "Gửi câu hỏi"
              )}
            </Button>
          </form>
        </TimelineContent>

        <div className="fixed top-4 right-4 z-50">
          <AnimatePresence>
            {notifications.map(({ id, text }) => (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 100 }}
                className="glass-effect text-glow p-4 rounded-lg mb-2 shadow-lg animate-fade"
              >
                {text}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
