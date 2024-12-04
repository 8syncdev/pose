'use client';

import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { motion } from "framer-motion";
import { fadeAnimations, createSlideAnimation } from "@/components/hoc/framer.config";

export default function NotFound() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen"
      variants={fadeAnimations.withScale}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div
        variants={createSlideAnimation({
          direction: "down",
          duration: 0.5,
          distance: 30
        })}
      >
        <h1 className="text-4xl font-bold mb-4">404 - Không tìm thấy trang</h1>
        <p className="text-muted-foreground mb-8 text-center">
          Trang bạn đang tìm kiếm không tồn tại.
        </p>
        <Button
          asChild
          variant="default"
          size="lg"
          className="gap-2 hover-scale"
        >
          <motion.a
            href="/"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Home className="w-5 h-5" />
            Về trang chủ
          </motion.a>
        </Button>
      </motion.div>
    </motion.div>
  );
}
