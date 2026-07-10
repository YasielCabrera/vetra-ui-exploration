"use client"

import * as React from "react"
import {
  ChevronDownIcon,
  ExpandIcon,
  MonitorIcon,
  PaletteIcon,
  PlusIcon,
  RefreshCwIcon,
  SmartphoneIcon,
  SquareMousePointerIcon,
  TabletIcon,
} from "lucide-react"

import { Button } from "@/modules/shared/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/modules/shared/components/ui/dropdown-menu"
import { Separator } from "@/modules/shared/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/modules/shared/components/ui/tooltip"
import { cn } from "@/modules/shared/lib/utils"

const PREVIEW_SERVICES = ["Connect", "Switchboard"] as const

const PREVIEW_APPS = [
  {
    label: "User",
    items: ["Profile", "Account", "Preferences"],
  },
  {
    label: "Host",
    items: ["Admin Host", "Tenant Host", "Public Host"],
  },
] as const

const PREVIEW_EDITORS = [
  {
    label: "Menu",
    items: ["Main Menu", "Sidebar Menu", "Context Menu"],
  },
  {
    label: "Client",
    items: ["Web Client", "Mobile Client", "Desktop Client"],
  },
  {
    label: "Document",
    items: ["Invoice Doc", "Contract Doc", "Report Doc"],
  },
  {
    label: "Drive",
    items: ["Team Drive", "Personal Drive", "Shared Drive"],
  },
] as const

type PreviewPage =
  | (typeof PREVIEW_SERVICES)[number]
  | (typeof PREVIEW_APPS)[number]["items"][number]
  | (typeof PREVIEW_EDITORS)[number]["items"][number]

type PreviewDevice = "desktop" | "tablet" | "mobile"

const DEVICE_LABELS: Record<PreviewDevice, string> = {
  desktop: "Desktop",
  tablet: "Tablet",
  mobile: "Mobile",
}

type PreviewToolbarProps = {
  page?: PreviewPage
  onPageChange?: (page: PreviewPage) => void
  device?: PreviewDevice
  onDeviceChange?: (device: PreviewDevice) => void
  onRefresh?: () => void
  onExpand?: () => void
  className?: string
}

export function PreviewToolbar({
  page: pageProp,
  onPageChange,
  device: deviceProp,
  onDeviceChange,
  onRefresh,
  onExpand,
  className,
}: PreviewToolbarProps) {
  const barRef = React.useRef<HTMLDivElement>(null)
  const [barWidth, setBarWidth] = React.useState<number>()
  const [page, setPage] = React.useState<PreviewPage>(pageProp ?? "Connect")
  const [device, setDevice] = React.useState<PreviewDevice>(
    deviceProp ?? "desktop",
  )

  const currentPage = pageProp ?? page
  const currentDevice = deviceProp ?? device

  React.useEffect(() => {
    const node = barRef.current
    if (!node) return

    const update = () => setBarWidth(node.offsetWidth)
    update()

    const observer = new ResizeObserver(update)
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const handlePageChange = (next: PreviewPage) => {
    if (pageProp === undefined) setPage(next)
    onPageChange?.(next)
  }

  const handleDeviceChange = (next: PreviewDevice) => {
    if (deviceProp === undefined) setDevice(next)
    onDeviceChange?.(next)
  }

  const DeviceIcon =
    currentDevice === "mobile"
      ? SmartphoneIcon
      : currentDevice === "tablet"
        ? TabletIcon
        : MonitorIcon

  return (
    <div
      className={cn(
        "@container flex h-10 shrink-0 items-center gap-1 overflow-hidden border-b border-border bg-muted/40 px-1.5 @[420px]:gap-2 @[420px]:px-2",
        className,
      )}
    >
      <div className="flex shrink-0 items-center gap-0.5">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              aria-label="Edit"
              className="px-1.5 text-muted-foreground @[480px]:px-2.5"
            >
              <SquareMousePointerIcon data-icon="inline-start" />
              <span className="hidden @[480px]:inline">Edit</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Edit</TooltipContent>
        </Tooltip>

        <Separator
          orientation="vertical"
          className="mx-0.5 h-4 self-center data-vertical:self-center @[420px]:mx-1.5"
        />

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label="Style"
              className="text-muted-foreground"
            >
              <PaletteIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Style</TooltipContent>
        </Tooltip>
      </div>

      <div
        ref={barRef}
        className="mx-auto flex h-8 min-w-0 max-w-[250px] flex-1 items-center rounded-full bg-secondary px-0.5 @[360px]:px-1"
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              aria-label="Refresh preview"
              className="shrink-0 rounded-full text-muted-foreground"
              onClick={onRefresh}
            >
              <RefreshCwIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Refresh</TooltipContent>
        </Tooltip>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-7 min-w-0 flex-1 justify-between gap-1 rounded-full px-2 text-muted-foreground @[360px]:px-3"
            >
              <span className="truncate">{currentPage}</span>
              <ChevronDownIcon data-icon="inline-end" className="shrink-0" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="center"
            className="min-w-0"
            style={barWidth ? { width: barWidth } : undefined}
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel>Services</DropdownMenuLabel>
              {PREVIEW_SERVICES.map((item) => (
                <DropdownMenuItem
                  key={item}
                  onSelect={() => handlePageChange(item)}
                >
                  {item}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuLabel>Apps</DropdownMenuLabel>
              {PREVIEW_APPS.map((app) => (
                <DropdownMenuSub key={app.label}>
                  <DropdownMenuSubTrigger>{app.label}</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>
                      <PlusIcon />
                      Create New
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {app.items.map((item) => (
                      <DropdownMenuItem
                        key={item}
                        onSelect={() => handlePageChange(item)}
                      >
                        {item}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              ))}
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuLabel>Editors</DropdownMenuLabel>
              {PREVIEW_EDITORS.map((editor) => (
                <DropdownMenuSub key={editor.label}>
                  <DropdownMenuSubTrigger>{editor.label}</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>
                      <PlusIcon />
                      Create New
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {editor.items.map((item) => (
                      <DropdownMenuItem
                        key={item}
                        onSelect={() => handlePageChange(item)}
                      >
                        {item}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex shrink-0 items-center gap-0.5 @[420px]:gap-1.5">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              aria-label={`Device: ${DEVICE_LABELS[currentDevice]}`}
              className="gap-0.5 px-1.5 text-muted-foreground @[360px]:gap-1 @[360px]:px-2.5"
            >
              <DeviceIcon />
              <ChevronDownIcon
                data-icon="inline-end"
                className="hidden @[360px]:block"
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-36">
            <DropdownMenuRadioGroup
              value={currentDevice}
              onValueChange={(value) =>
                handleDeviceChange(value as PreviewDevice)
              }
            >
              <DropdownMenuRadioItem value="desktop">
                <MonitorIcon />
                Desktop
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="tablet">
                <TabletIcon />
                Tablet
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="mobile">
                <SmartphoneIcon />
                Mobile
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <Separator
          orientation="vertical"
          className="mx-0.5 hidden h-4 self-center data-vertical:self-center @[360px]:block"
        />

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label="Expand preview"
              className="text-muted-foreground"
              onClick={onExpand}
            >
              <ExpandIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Expand</TooltipContent>
        </Tooltip>
      </div>
    </div>
  )
}

export type { PreviewDevice, PreviewPage }
