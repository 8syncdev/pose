import { Skeleton } from "@/components/ui/skeleton"
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function Loading() {
  return (
    <div className="h-[calc(100vh-4rem)]">
      <div className="border-b">
        <div className="container flex items-center justify-between py-4">
          <Skeleton className="h-8 w-[200px]" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-8 w-[100px]" />
            <Skeleton className="h-8 w-[100px]" />
          </div>
        </div>
      </div>

      <ResizablePanelGroup direction="horizontal" className="h-[calc(100%-4rem)]">
        <ResizablePanel defaultSize={50}>
          <Tabs defaultValue="description" className="h-full">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="description" disabled>Mô tả</TabsTrigger>
              <TabsTrigger value="solution" disabled>Giải pháp</TabsTrigger>
              <TabsTrigger value="submissions" disabled>Kết quả</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="h-[calc(100%-2.5rem)]">
              <div className="p-4 space-y-4">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-8 w-1/2" />
                <Skeleton className="h-16 w-full" />
              </div>
            </TabsContent>
          </Tabs>
        </ResizablePanel>

        <ResizableHandle className="w-1.5 data-[resize-handle-active]:bg-[hsl(var(--primary)_/_0.3)] hover:bg-[hsl(var(--muted)_/_0.5)] bg-[hsl(var(--border)_/_0.5)] transition-colors duration-200" />

        <ResizablePanel defaultSize={50}>
          <div className="h-full flex flex-col">
            <div className="border-b p-4 flex items-center justify-between">
              <Skeleton className="h-6 w-[120px]" />
              <Skeleton className="h-9 w-[100px]" />
            </div>
            <div className="flex-1 p-4">
              <Skeleton className="h-full w-full" />
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
