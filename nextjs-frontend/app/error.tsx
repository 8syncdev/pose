'use client';

import { Button } from "@/components/ui/button";
import { Home, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { fadeAnimations, createSlideAnimation } from "@/components/hoc/framer.config";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
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
        className="text-center"
      >
        <div className="flex justify-center mb-4">
          <AlertCircle className="w-12 h-12 text-[hsl(var(--danger))]" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Đã xảy ra lỗi!</h1>
        <p className="text-muted-foreground mb-8">
          Rất tiếc, đã có lỗi xảy ra. Vui lòng thử lại sau.
        </p>
        <div className="flex gap-4 justify-center">
          <Button
            onClick={reset}
            variant="default"
            size="lg"
            className="gap-2 hover-scale"
          >
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2"
            >
              Thử lại
            </motion.span>
          </Button>
          
          <Button
            asChild
            variant="outline"
            size="lg"
            className="gap-2 hover-scale"
          >
            <motion.a
              href="/"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2"
            >
              <Home className="w-5 h-5" />
              Về trang chủ
            </motion.a>
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
