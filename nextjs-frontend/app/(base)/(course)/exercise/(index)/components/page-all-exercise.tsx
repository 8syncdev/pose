"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Search, Sparkles, Code2, BookOpen, Hash, ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SparklesText } from "@/components/ui/animation/text/sparkles-text";
import { GridPattern } from "@/components/ui/bg/grid-bg";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { TimelineContent } from "@/components/ui/animation/scroll/framer-timeline";
import { getAllExercises } from "@/lib/actions/exercise/exercise.action";
import type { Exercise, ExerciseResponse } from "@/lib/actions/exercise/exercise.dto";
import type { Paginated } from "@/lib/actions/base.dto";
import MarkdownRenderer from "@/components/shared/md/md-custom";

const ITEMS_PER_PAGE = 12;

const ExerciseCard = ({ exercise, timelineRef }: { exercise: Exercise; timelineRef: React.RefObject<HTMLDivElement> }) => {
  const levelColors = {
    Easy: "bg-[hsl(var(--success))] text-white",
    Medium: "bg-[hsl(var(--warning))] text-white",
    Hard: "bg-[hsl(var(--danger))] text-white"
  };

  const visibilityStyles = {
    public: "bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))]",
    premium: "bg-gradient-to-r from-[hsl(var(--color-1))] to-[hsl(var(--color-2))] text-white",
    enterprise: "bg-gradient-to-r from-[hsl(var(--color-3))] to-[hsl(var(--color-4))] text-white"
  };

  return (
    <TimelineContent effect="combined" once timelineRef={timelineRef}>
      <Link href={`/exercise/${exercise.id}`}>
        <Card className={cn(
          "h-full transition-all duration-300",
          "hover:scale-[1.02] hover:shadow-lg",
          "border border-[hsl(var(--border))]",
          "hover:border-[hsl(var(--primary))]",
          "bg-gradient-to-br from-[hsl(var(--card))] to-[hsl(var(--background))]"
        )}>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Code2 className="w-5 h-5 text-[hsl(var(--primary))]" />
              <h3 className="text-xl font-bold text-gradient-purple-blue line-clamp-2">
                {exercise.name}
              </h3>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="mb-4">
              <MarkdownRenderer 
                content={exercise.content || ''} 
                className={cn(
                  "prose-sm max-h-[150px] overflow-hidden text-ellipsis", 
                  "!p-0 !border-0 !shadow-none !bg-transparent",
                  "[&>*:first-child]:!mt-0",
                  "[&>*:last-child]:!mb-0"
                )}
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge className={cn("text-xs", levelColors[exercise.level || 'Easy'])}>
                {exercise.level}
              </Badge>
              <Badge variant="outline" className="text-xs">
                <Hash className="w-3 h-3 mr-1" />
                {exercise.points} Points
              </Badge>
              <Badge 
                className={cn(
                  "text-xs",
                  visibilityStyles[exercise.content_visibility as keyof typeof visibilityStyles]
                )}
              >
                <Sparkles className="w-3 h-3 mr-1" />
                {exercise.content_visibility}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </Link>
    </TimelineContent>
  );
};

const PageAllExercise = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [pagination, setPagination] = useState<Paginated>();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const timelineRef = useRef<HTMLDivElement>(null);

  const debouncedSearch = useCallback(
    (value: string) => {
      setSearch(value);
      setCurrentPage(1);
    },
    []
  );

  const fetchExercises = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getAllExercises(currentPage, ITEMS_PER_PAGE);
      if (response.success && response.result) {
        setExercises(Array.isArray(response.result) ? response.result : [response.result]);
        setPagination(response.pagination);
      }
    } catch (error) {
      console.error("Error fetching exercises:", error);
    }
    setLoading(false);
  }, [currentPage]);

  useEffect(() => {
    fetchExercises();
  }, [fetchExercises]);

  const filteredExercises = useMemo(() => {
    return exercises.filter((exercise) =>
      exercise.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [exercises, search]);

  return (
    <div className="container py-8 min-h-screen" ref={timelineRef}>
      <div className="relative">
        <GridPattern
          width={40}
          height={40}
          x={-1}
          y={-1}
          className="absolute inset-x-0 -top-14 -bottom-14 text-[hsl(var(--muted))] [mask-image:linear-gradient(to_bottom,white_60%,transparent)]"
        />
        
        <div className="relative">
          <TimelineContent effect="fade" once timelineRef={timelineRef}>
            <div className="flex flex-col items-center text-center mb-12">
              <SparklesText text="Coding Exercises" />
              <p className="mt-4 text-[hsl(var(--muted-foreground))] max-w-2xl">
                Practice your coding skills with our collection of programming exercises. 
                From beginner to advanced levels, find the perfect challenge for you.
              </p>
            </div>
          </TimelineContent>

          <TimelineContent effect="blur" once timelineRef={timelineRef}>
            <div className="flex justify-center mb-8">
              <div className="relative w-full max-w-lg">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
                <Input
                  placeholder="Search exercises..."
                  className="pl-10"
                  onChange={(e) => debouncedSearch(e.target.value)}
                />
              </div>
            </div>
          </TimelineContent>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className={cn(
                  "h-[200px] animate-pulse",
                  "bg-gradient-to-br from-[hsl(var(--card))] to-[hsl(var(--background))]"
                )} />
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {filteredExercises.map((exercise) => (
                  <ExerciseCard key={exercise.id} exercise={exercise} timelineRef={timelineRef} />
                ))}
              </div>

              {pagination && (
                <Pagination className="justify-center">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        href="#"
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        aria-disabled={currentPage === 1}
                        className="hover:bg-[hsl(var(--primary)_/_0.1)]"
                      />
                    </PaginationItem>
                    {[...Array(pagination.totalPages)].map((_, i) => (
                      <PaginationItem key={i}>
                        <PaginationLink
                          href="#"
                          onClick={() => setCurrentPage(i + 1)}
                          isActive={currentPage === i + 1}
                          className={cn(
                            "hover:bg-[hsl(var(--primary)_/_0.1)]",
                            currentPage === i + 1 && "bg-[hsl(var(--primary)_/_0.1)]"
                          )}
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={() => setCurrentPage(prev => Math.min(pagination.totalPages, prev + 1))}
                        aria-disabled={currentPage === pagination.totalPages}
                        className="hover:bg-[hsl(var(--primary)_/_0.1)]"
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageAllExercise;
