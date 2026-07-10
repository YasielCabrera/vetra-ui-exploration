"use client"

import * as React from "react"
import Editor, {
  type BeforeMount,
  type Monaco,
  type OnMount,
} from "@monaco-editor/react"
import { useTheme } from "next-themes"

import { Skeleton } from "@/modules/shared/components/ui/skeleton"
import { getMonacoLanguage } from "@/modules/studio/lib/get-monaco-language"

type MonacoPaneProps = {
  path: string
  value: string
  language?: string
  onChange: (value: string) => void
}

/**
 * Monaco copies editor.foreground / editor.background into token rules, which
 * only accept #RRGGBB or #RRGGBBAA — never #RGB shorthand or CSS functions.
 * Keep these as literal 6/8-digit hex (do not read CSS variables).
 */
const LIGHT_THEME_COLORS = {
  background: "#ffffff",
  foreground: "#1b1e24",
  muted: "#f3f5f7",
  border: "#e2e5ea",
  accent: "#eef0f3",
} as const

const DARK_THEME_COLORS = {
  background: "#1b1e24",
  foreground: "#fcfcfc",
  muted: "#343839",
  border: "#485265",
  accent: "#373e4d",
} as const

function defineVetraThemes(monaco: Monaco) {
  monaco.editor.defineTheme("vetra-dark", {
    base: "vs-dark",
    inherit: true,
    rules: [],
    colors: {
      "editor.background": DARK_THEME_COLORS.background,
      "editor.foreground": DARK_THEME_COLORS.foreground,
      "editorLineNumber.foreground": "#6c7275",
      "editorLineNumber.activeForeground": DARK_THEME_COLORS.foreground,
      "editor.lineHighlightBackground": DARK_THEME_COLORS.muted,
      "editor.selectionBackground": DARK_THEME_COLORS.accent,
      "editorGutter.background": DARK_THEME_COLORS.background,
      "editorWidget.background": DARK_THEME_COLORS.background,
      "editorWidget.border": DARK_THEME_COLORS.border,
      "scrollbarSlider.background": "#6c727566",
      "scrollbarSlider.hoverBackground": "#6c727599",
    },
  })

  monaco.editor.defineTheme("vetra-light", {
    base: "vs",
    inherit: true,
    rules: [],
    colors: {
      "editor.background": LIGHT_THEME_COLORS.background,
      "editor.foreground": LIGHT_THEME_COLORS.foreground,
      "editorLineNumber.foreground": "#6c7275",
      "editorLineNumber.activeForeground": LIGHT_THEME_COLORS.foreground,
      "editor.lineHighlightBackground": LIGHT_THEME_COLORS.muted,
      "editor.selectionBackground": LIGHT_THEME_COLORS.accent,
      "editorGutter.background": LIGHT_THEME_COLORS.background,
      "editorWidget.background": LIGHT_THEME_COLORS.background,
      "editorWidget.border": LIGHT_THEME_COLORS.border,
      "scrollbarSlider.background": "#6c727566",
      "scrollbarSlider.hoverBackground": "#6c727599",
    },
  })
}

export function MonacoPane({
  path,
  value,
  language,
  onChange,
}: MonacoPaneProps) {
  const { resolvedTheme } = useTheme()
  const containerRef = React.useRef<HTMLDivElement>(null)
  const editorRef = React.useRef<Parameters<OnMount>[0] | null>(null)
  const monacoRef = React.useRef<Monaco | null>(null)
  const isLightRef = React.useRef(resolvedTheme === "light")

  const isLight = resolvedTheme === "light"
  const monacoTheme = isLight ? "vetra-light" : "vetra-dark"
  isLightRef.current = isLight

  const handleBeforeMount: BeforeMount = (monaco) => {
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ESNext,
      allowNonTsExtensions: true,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      module: monaco.languages.typescript.ModuleKind.ESNext,
      jsx: monaco.languages.typescript.JsxEmit.ReactJSX,
      esModuleInterop: true,
    })
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: false,
    })
    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: false,
    })
    defineVetraThemes(monaco)
  }

  const handleMount: OnMount = (editor, monaco) => {
    editorRef.current = editor
    monacoRef.current = monaco
    defineVetraThemes(monaco)
    monaco.editor.setTheme(isLightRef.current ? "vetra-light" : "vetra-dark")
    editor.focus()
    editor.layout()
  }

  React.useEffect(() => {
    const monaco = monacoRef.current
    if (!monaco) return
    monaco.editor.setTheme(monacoTheme)
  }, [monacoTheme])

  React.useEffect(() => {
    const node = containerRef.current
    if (!node || typeof ResizeObserver === "undefined") return

    const observer = new ResizeObserver(() => {
      editorRef.current?.layout()
    })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  React.useEffect(() => {
    editorRef.current?.layout()
  }, [path, monacoTheme])

  return (
    <div
      ref={containerRef}
      className="min-h-0 min-w-0 flex-1 overflow-hidden bg-background"
    >
      <Editor
        path={path}
        theme={monacoTheme}
        language={getMonacoLanguage(path, language)}
        value={value}
        onChange={(next) => onChange(next ?? "")}
        beforeMount={handleBeforeMount}
        onMount={handleMount}
        loading={
          <div className="flex size-full flex-col gap-2 bg-background p-4">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-2/5" />
          </div>
        }
        options={{
          fontSize: 13,
          fontFamily:
            "var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
          fontLigatures: true,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          padding: { top: 12, bottom: 12 },
          renderLineHighlight: "line",
          cursorBlinking: "smooth",
          smoothScrolling: true,
          wordWrap: "on",
          bracketPairColorization: { enabled: true },
          guides: {
            indentation: true,
            bracketPairs: true,
          },
        }}
      />
    </div>
  )
}
