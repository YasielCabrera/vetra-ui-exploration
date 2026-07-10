"use client"

import * as React from "react"
import {
  ChevronDownIcon,
  ExpandIcon,
  MonitorIcon,
  PaletteIcon,
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
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/modules/shared/components/ui/dropdown-menu"
import { Separator } from "@/modules/shared/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/modules/shared/components/ui/tooltip"
import { cn } from "@/modules/shared/lib/utils"

const PREVIEW_PAGES = ["Home", "Editor", "Settings"] as const

type PreviewPage = (typeof PREVIEW_PAGES)[number]
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
  const [page, setPage] = React.useState<PreviewPage>(pageProp ?? "Home")
  const [device, setDevice] = React.useState<PreviewDevice>(
    deviceProp ?? "desktop",
  )

  const currentPage = pageProp ?? page
  const currentDevice = deviceProp ?? device

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
        "grid h-10 shrink-0 grid-cols-[1fr_auto_1fr] items-center gap-2 border-b border-border bg-muted/40 px-2",
        className,
      )}
    >
      <div className="flex min-w-0 items-center justify-self-start gap-0.5">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="text-muted-foreground"
        >
          <SquareMousePointerIcon data-icon="inline-start" />
          Edit
        </Button>

        <Separator
          orientation="vertical"
          className="mx-1.5 h-4 self-center data-vertical:self-center"
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

      <div className="flex h-8 w-[250px] items-center rounded-full bg-secondary px-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              aria-label="Refresh preview"
              className="rounded-full text-muted-foreground"
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
              className="h-7 min-w-0 flex-1 justify-between rounded-full px-3 text-muted-foreground"
            >
              {currentPage}
              <ChevronDownIcon data-icon="inline-end" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="min-w-36">
            <DropdownMenuGroup>
              {PREVIEW_PAGES.map((item) => (
                <DropdownMenuItem
                  key={item}
                  onSelect={() => handlePageChange(item)}
                >
                  {item}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex min-w-0 items-center justify-self-end gap-1.5">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              aria-label={`Device: ${DEVICE_LABELS[currentDevice]}`}
              className="gap-1 text-muted-foreground"
            >
              <DeviceIcon />
              <ChevronDownIcon data-icon="inline-end" />
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
          className="mx-0.5 h-4 self-center data-vertical:self-center"
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
