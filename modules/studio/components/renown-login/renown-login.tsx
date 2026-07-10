import Image from "next/image"

import { cn } from "@/modules/shared/lib/utils"

export function RenownLogin({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "group/sidebar-footer flex w-full items-baseline justify-start",
        className,
      )}
    >
      <Image
        src="/brand/connect/renown-short.png"
        alt="Renown Login"
        width={42}
        height={42}
        className="group-hover/sidebar-footer:hidden dark:hidden"
        unoptimized
      />
      <Image
        src="/brand/connect/renown-short-hover.png"
        alt="Renown Login Hover"
        width={42}
        height={42}
        className="hidden group-hover/sidebar-footer:block dark:hidden"
        unoptimized
      />
      <Image
        src="/brand/connect/renown-short-dark.png"
        alt="Renown Login"
        width={42}
        height={42}
        className="hidden dark:block dark:group-hover/sidebar-footer:hidden"
        unoptimized
      />
      <Image
        src="/brand/connect/renown-short-hover-dark.png"
        alt="Renown Login Hover"
        width={42}
        height={42}
        className="hidden dark:group-hover/sidebar-footer:block"
        unoptimized
      />
    </div>
  )
}
