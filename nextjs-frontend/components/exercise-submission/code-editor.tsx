import { memo, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useTheme } from "next-themes";

const MonacoEditor = dynamic(
  () => import("@monaco-editor/react").then((mod) => mod.Editor),
  { ssr: false }
);

interface CodeEditorProps {
  defaultValue: string;
  onChange: (value: string | undefined) => void;
}

const CodeEditor = memo(({ defaultValue, onChange }: CodeEditorProps) => {
  const { setTheme: setSystemTheme } = useTheme();
  const [language, setLanguage] = useState("python");
  const [fontSize, setFontSize] = useState(14);
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [theme, setTheme] = useState("vs-light");

  useEffect(() => {
    // Sync Monaco theme with system theme
    if (theme === "vs-dark") {
      setSystemTheme("dark");
    } else {
      setSystemTheme("light");
    }
  }, [theme, setSystemTheme]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-wrap gap-4 p-4 border-b glass-effect">
        <div className="flex items-center gap-2 min-w-[12.5rem] flex-1">
          <Label className="text-foreground whitespace-nowrap">Language:</Label>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="select w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="javascript">JavaScript</SelectItem>
              <SelectItem value="typescript">TypeScript</SelectItem>
              <SelectItem value="java">Java</SelectItem>
              <SelectItem value="cpp">C++</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2 min-w-[12.5rem] flex-1">
          <Label className="text-foreground whitespace-nowrap">
            Font Size: {fontSize}px
          </Label>
          <Slider
            className="w-full"
            value={[fontSize]}
            onValueChange={([value]) => setFontSize(value)}
            min={10}
            max={24}
            step={1}
          />
        </div>

        <div className="flex items-center gap-2 min-w-[9.375rem]">
          <Label className="text-foreground">Line Numbers:</Label>
          <Switch
            checked={showLineNumbers}
            onCheckedChange={setShowLineNumbers}
            className="checkbox"
          />
        </div>

        <div className="flex items-center gap-2 min-w-[9.375rem]">
          <Label className="text-foreground">Theme:</Label>
          <Select value={theme} onValueChange={setTheme}>
            <SelectTrigger className="select w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="vs-dark">Dark</SelectItem>
              <SelectItem value="light">Light</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex-1">
        <MonacoEditor
          height="100%"
          defaultLanguage={language}
          language={language}
          defaultValue={defaultValue}
          onChange={onChange}
          theme={theme}
          options={{
            minimap: { enabled: false },
            fontSize: fontSize,
            lineNumbers: showLineNumbers ? "on" : "off",
            scrollBeyondLastLine: false,
            automaticLayout: true,
            quickSuggestions: {
              other: true,
              comments: true,
              strings: true,
            },
            suggestFontSize: fontSize,
            suggest: {
              preview: true,
              showColors: true,
              showIcons: true,
              showStatusBar: true,
              previewMode: "subwordSmart",
            },
            wordWrap: "on",
          }}
        />
      </div>
    </div>
  );
});

CodeEditor.displayName = "CodeEditor";
export default CodeEditor;
