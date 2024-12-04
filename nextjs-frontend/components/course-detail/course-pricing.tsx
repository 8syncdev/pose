import { memo } from "react";
import { TimelineContent } from "@/components/ui/animation/scroll/framer-timeline";
import { formatVNDCurrency } from "@/lib/currency.util";
import { Badge } from "@/components/ui/badge";
import type { Course } from "@/lib/actions/course/course.dto";

interface CoursePricingProps {
  price: number;
  discounted_price?: number;
  timelineRef: React.RefObject<HTMLDivElement>;
}

const calculateDiscount = (price: number, discounted_price: number): number => {
  return Math.round(((price - discounted_price) / price) * 100);
};

const PriceDisplay = memo(({ price, discounted_price }: Pick<Course, 'price' | 'discounted_price'>) => {
  if (discounted_price === 0) {
    return (
      <div className="flex items-center justify-center gap-4">
        <span className="text-4xl font-bold text-glow">MIỄN PHÍ</span>
        <Badge variant="destructive" className="animate-bounce text-lg">-100%</Badge>
      </div>
    );
  }

  if (!discounted_price || discounted_price === price) {
    return (
      <div className="flex justify-center">
        <span className="text-4xl font-bold text-glow">
          {formatVNDCurrency(price)}
        </span>
      </div>
    );
  }

  const discount = calculateDiscount(price, discounted_price);
  const isHighDiscount = discount >= 30;

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
      <span className={`text-4xl font-bold text-glow ${isHighDiscount ? 'text-red-500' : ''}`}>
        {formatVNDCurrency(discounted_price)}
      </span>
      <div className="flex flex-col items-center gap-2 sm:items-start">
        <span className="text-xl line-through text-muted-foreground">
          {formatVNDCurrency(price)}
        </span>
        <Badge 
          variant={isHighDiscount ? "destructive" : "secondary"}
          className={`text-lg ${isHighDiscount ? "animate-bounce" : ""}`}
        >
          -{discount}%
        </Badge>
      </div>
    </div>
  );
});

PriceDisplay.displayName = 'PriceDisplay';

export const CoursePricing = memo(({ price, discounted_price, timelineRef }: CoursePricingProps) => (
  <TimelineContent animationNum={4} timelineRef={timelineRef}>
    <div className="container mx-auto px-4 mb-6">
      <PriceDisplay price={price} discounted_price={discounted_price} />
    </div>
  </TimelineContent>
));

CoursePricing.displayName = 'CoursePricing';