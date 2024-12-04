"use client";

import React, { useState, useCallback, memo, useEffect, useRef } from "react";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  Code2,
  PlayCircle,
  BookOpen,
  LockKeyhole,
  MessageSquare,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { createSubmission } from "@/lib/actions/exercise/exercise.action";
import type {
  Exercise,
  CreateSubmissionDto,
  SubmissionResponse,
  SubmissionWithTestDetails,
} from "@/lib/actions/exercise/exercise.dto";
import MarkdownRenderer from "@/components/shared/md/md-custom";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

import ExerciseHeader from "@/components/exercise-submission/exercise-header";
import CodeEditor from "@/components/exercise-submission/code-editor";
import TestResults from "@/components/exercise-submission/test-results";
import { AIChatSection } from "@/app/(admin)/dashboard/exercises/agent/render-page";

interface PageDetailExerciseProps {
  exId: number;
  initialExercise?: Exercise | null;
}

const PageDetailExercise = memo(
  ({ exId, initialExercise }: PageDetailExerciseProps) => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    if (!initialExercise) {
      toast({
        title: "Yêu cầu đăng nhập",
        description: "Vui lòng đăng nhập để tiếp tục",
        variant: "destructive",
      });
      router.push("/sign-in");
      return null;
    }

    const [code, setCode] = useState<string>("");
    const [results, setResults] = useState<SubmissionWithTestDetails | null>(
      null
    );
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState("description");
    const timelineRef = useRef<HTMLDivElement>(null);
    const [direction, setDirection] = useState<"horizontal" | "vertical">(
      "horizontal"
    );

    useEffect(() => {
      const handleResize = () => {
        setDirection(window.innerWidth >= 1024 ? "horizontal" : "vertical");
      };

      if (typeof window !== "undefined") {
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }
    }, []);

    const handleSubmit = useCallback(async () => {
      setIsSubmitting(true);
      try {
        const submissionData: CreateSubmissionDto = {
          exercise_id: exId,
          code,
          status: "pending",
          total_tests: 0,
          passed_tests: 0,
        };

        const response: SubmissionResponse = await createSubmission(
          submissionData
        );
        if (response.success && response.result) {
          setResults(response.result);
          setActiveTab("submissions");
        }
      } catch (error) {
        console.error("Submission error:", error);
      }
      setIsSubmitting(false);
    }, [code, exId]);

    const handleEditorChange = useCallback((value: string | undefined) => {
      setCode(value || "");
    }, []);

    return (
      <div className="pb-40 h-full">
        <ExerciseHeader exercise={initialExercise} />

        <ResizablePanelGroup
          direction={direction}
          className="h-[calc(100%-4rem)]"
        >
          <ResizablePanel defaultSize={50} className="min-w-[300px]">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="h-full"
            >
              <TabsList className="w-full justify-start">
                <TabsTrigger value="description" className="gap-2">
                  <BookOpen className="w-4 h-4" />
                  Mô tả
                </TabsTrigger>
                <TabsTrigger value="solution" className="gap-2">
                  <LockKeyhole className="w-4 h-4" />
                  Giải pháp
                </TabsTrigger>
                <TabsTrigger value="submissions" className="gap-2">
                  <PlayCircle className="w-4 h-4" />
                  Kết quả
                </TabsTrigger>
              </TabsList>

              <TabsContent
                value="description"
                className="h-[calc(100%-2.5rem)]"
              >
                <ScrollArea className="h-full">
                  <div className="p-4">
                    <MarkdownRenderer content={initialExercise.content || ""} />
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="solution" className="h-[calc(100%-2.5rem)]">
                <ScrollArea className="h-full">
                  <div className="p-4">
                    {initialExercise.solution_visibility === "public" ? (
                      <MarkdownRenderer
                        content={initialExercise.solution || ""}
                      />
                    ) : (
                      <Card className="p-4">
                        <div className="flex items-center gap-2 text-[hsl(var(--muted-foreground))]">
                          <LockKeyhole className="w-5 h-5" />
                          <p>
                            Giải pháp chỉ khả dụng cho người dùng{" "}
                            {initialExercise.solution_visibility}
                          </p>
                        </div>
                      </Card>
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent
                value="submissions"
                className="h-[calc(100%-2.5rem)]"
              >
                <ScrollArea className="h-full p-4">
                  <TestResults
                    results={results}
                    timelineRef={timelineRef}
                    isSubmitting={isSubmitting}
                    exercise={initialExercise}
                  />
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </ResizablePanel>

          <ResizableHandle className="w-1.5 data-[resize-handle-active]:bg-[hsl(var(--primary)_/_0.3)] hover:bg-[hsl(var(--muted)_/_0.5)] bg-[hsl(var(--border)_/_0.5)] transition-colors duration-200" />

          <ResizablePanel defaultSize={50}>
            <div className="h-full flex flex-col">
              <div className="border-b p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Code2 className="w-5 h-5" />
                  <span className="font-medium">Code Editor</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="icon">
                        <MessageSquare className="h-5 w-5" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent
                      side="right"
                      className="max-w-[800px] md:min-w-[500px] overflow-y-auto p-0 pt-10"
                    >
                      {isOpen && <AIChatSection id={exId.toString()} />}
                    </SheetContent>
                  </Sheet>
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="btn-primary"
                  >
                    {isSubmitting ? "Đang chạy..." : "Chạy code"}
                  </Button>
                </div>
              </div>

              <div className="flex-1">
                <ScrollArea className="h-full">
                  <CodeEditor
                    defaultValue={`# ${initialExercise.function_name}(${
                      initialExercise.param_style === "args"
                        ? "..."
                        : "input_list"
                    })`}
                    onChange={handleEditorChange}
                  />
                </ScrollArea>
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    );
  }
);

PageDetailExercise.displayName = "PageDetailExercise";

export default PageDetailExercise;
